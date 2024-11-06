import express from "express";
import asyncHandler from "./handlers/asyncHandler.js";
import { PrismaClient } from "@prisma/client";
import { errorHandler } from "./handlers/errorHandler.js";

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
    res.json(asyncHandler(true, 200, newUser.id));
  } catch (error) {
    console.error(error.message);
    res.json(errorHandler(true, 200, newUser.id));
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
