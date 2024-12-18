import { prisma } from "../app.js";
import jwt from "jsonwebtoken";
import ApiResponse from "../utils/ApiResponse.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import { errorCodes } from "../utils/enums.js";

export const getOrganisation = async (req, res) => {
  const id = req.params.id;
  try {
    const org = await prisma.organisation.findFirst({
      where: {
        id,
      },
    });
    const response = new ApiResponse("sucess", 200, org, true);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

export const createOrganisation = async (req, res) => {
  const { name, description, logoUrl } = req.body;
  try {
    const newOrg = await prisma.organisation.create({
      data: {
        name,
        description,
        logoUrl,
        user: {
          connect: {
            id: req.id,
          },
        },
      },
    });

    await prisma.member.create({
      data: {
        organisation: {
          connect: {
            id: newOrg.id,
          },
        },
        user: {
          connect: {
            id: req.id,
          },
        },
        role: "CREATOR",
      },
    });
    res.json({
      status: "success",
      code: 200,
      message: newOrg.id,
    });
  } catch (error) {
    if (error.code === "P2014") {
      const errorResponse = new ErrorResponse(
        403,
        error.code,
        "Organisation already exists"
      );
      res.json(errorResponse);
    } else {
      const errorResponse = new ErrorResponse(
        403,
        error.code,
        "Internal Server Error"
      );
      res.json(errorResponse);
    }
  }
};

export const createLink = async (req, res) => {
  const id = req.params.id;
  const timeFrame = Number(req.query.t);
  // console.log(typeof timeFrame);
  if (isNaN(timeFrame)) {
    return res.status(400).send("Invalid time frame");
  } else {
    const secretId = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: `${timeFrame}m`,
    });
    res.send(secretId);
  }
};

export const joinOrganisation = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.id;
    const decoded = jwt.verify(id, process.env.JWT_SECRET);
    const newMember = await prisma.member.create({
      data: {
        organisation: {
          connect: {
            id: decoded.payload.id,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return res.json(newMember);
  } catch (error) {
    if (error.message === "jwt expired") {
      const errorResponse = new ErrorResponse(
        403,
        errorCodes[403],
        "Jwt Expired"
      );
      return res.json(errorResponse);
    }
  }
};
