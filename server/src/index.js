import express from "express";
import asyncHandler from "./utils/asyncHandler.js";
import { PrismaClient } from "@prisma/client";
import { errorHandler } from "./utils/errorHandler.js";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        fullName,
        email,
        password,
      },
    });
    const response = ApiResponse("sucess", 200, newUser.id);
    return response;
  } catch (error) {
    console.error(error.message);
    res.json(errorHandler(true, 200, newUser.id));
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    const response = ApiResponse("sucess", 200, user.id);
    return response;
  } catch (error) {
    console.error(error.message);
    res.json(errorHandler(true, 200, user.id));
  }
});

app.post("/create-organisation/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, logoUrl } = req.body;
  try {
    const check = await prisma.user.findUnique({
      where: {
        id: id,
        isVerified: true,
      },
    });
    if (check) {
      const newOrganisation = await prisma.organisation.create({
        data: {
          name,
          description,
          logoUrl,
          user: {
            connect: {
              id: id,
            },
          },
        },
      });

      res.json({
        flag: true,
        data: newOrganisation.id,
      });
    } else {
      res.json({
        flag: false,
        error: "User is not verified",
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      flag: false,
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
