import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

//routes import
import userRouter from "./routes/user.router.js";

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export { prisma };
export default app;
