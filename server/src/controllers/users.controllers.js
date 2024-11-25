import { prisma } from "./../app.js";
import ApiResponse from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUpUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        isVerified: true,
      },
    });
    const payload = {
      userId: user.id,
      userIsVerified: user.isVerified,
    };
    const response = new ApiResponse("sucess", 200, user.id);
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.cookie("token", token, { httpOnly: true });
    return res.json(response);
  } catch (error) {
    console.error(error.message);
    res.json({
      status: 500,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const fetchUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    const checkPass = await bcrypt.compare(password, fetchUser.password);
    if (checkPass) {
      const payload = {
        userId: fetchUser.id,
        userIsVerified: fetchUser.isVerified,
      };
      const response = new ApiResponse("sucess", 200, fetchUser.id);
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      res.cookie("token", token, { httpOnly: true });
      return res.json(response);
    } else {
      res.json({
        status: 401,
        message: "Invalid password",
      });
    }
  } catch (error) {
    console.error(error.message);
    res.json({
      status: 500,
      message: "Internal error occured",
    });
  }
};

export const verifyUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        isVerified: true,
      },
      select: {
        id: true,
        isVerified: true,
      },
    });
    const token = jwt.sign(user, process.env.JWT_SECRET);
    res.cookie("token", token, { httpOnly: true });
    const resp = new ApiResponse("sucess", 200, user.id, true);
    return res.json(resp);
  } catch (error) {
    console.error(error.message);
    res.json({
      status: 500,
      message: error.message,
    });
  }
};
