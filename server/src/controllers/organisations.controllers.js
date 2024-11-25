import { prisma } from "../app.js";
import jwt from "jsonwebtoken";

export const createOrganisation = async (req, res) => {
  const id = req.id;
  try {
    const reqUser = await prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        _count: {
          select: {
            organisation: true,
          },
        },
      },
    });

    if (reqUser._count.organisation < 3) {
      const org = await prisma.organisation.create({
        data: {
          name: req.body.name,
          description: req.body.description,
          logoUrl: req.body.logoUrl,
          user: {
            connect: {
              id,
            },
          },
        },
      });
      res.json({
        status: true,
        msg: "Organisation created",
        data: org.id,
      });
    } else {
      res.json({
        status: false,
        msg: "Organisation limit reached",
      });
    }
  } catch (error) {
    res.json({
      status: false,
      msg: error.message,
    });
  }
};

export const createLink = async (req, res) => {
  const id = req.params.id;
  const secretId = jwt.sign(id, process.env.JWT_SECRET);
  res.send(secretId);
};
