import { prisma } from "../app.js";
import jwt from "jsonwebtoken";
import ApiResponse from "../utils/ApiResponse.js";

export const createOrganisation = async (req, res) => {
  const { name, description, logoUrl } = req.body;
  try {
    const checkStatus = await prisma.user.findFirst({
      where: {
        id: req.id,
      },
      select: {
        organisation: true,
      },
    });

    if (checkStatus.organisation.length == 1) {
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
    } else {
      res.json({
        status: 403,
        message: "You already have an organisation",
      });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

export const createLink = async (req, res) => {
  const id = req.params.id;
  const secretId = jwt.sign(id, process.env.JWT_SECRET);
  res.send(secretId);
};

export const joinOrganisation = async (req, res) => {};
