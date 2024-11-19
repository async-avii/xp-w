import express from "express";
import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cookieParser());

//routes import
import userRouter from "./routes/user.router.js";
import organisationRouter from "./routes/organisation.router.js";

app.use("/user", userRouter);
app.use("/organisations", organisationRouter);

app.get("/", (req, res) => {
  res.cookie("token", "test");
  res.send("Hello World!");
});
app.get("/get-cookie", (req, res) => {
  console.log(req.cookies);
  res.send(req.cookies);
});

export { prisma };
export default app;
