import { prisma } from "../app.js";
import jwt from "jsonwebtoken";
import ApiResponse from "../utils/ApiResponse.js";
import ErrorResponse from "../utils/ErrorResponse.js";

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
    const response = new ApiResponse("sucess", 200, newOrg.id, true);
    res.json(response);
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
  const secretId = jwt.sign(id, process.env.JWT_SECRET);
  res.send(secretId);
};

export const joinOrganisation = async (req, res) => {
  const id = req.params.id;
  const userId = req.id;
  const decoded = jwt.decode(id);
  try {
    const newMember = await prisma.member.create({
      data: {
        organisation: {
          connect: {
            id: decoded,
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
    console.log(error);
    res.json(error);
  }
};
