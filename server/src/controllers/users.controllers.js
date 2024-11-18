import { prisma } from "./../app.js";
import ApiResponse from "../utils/ApiResponse.js";

export const signInUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password,
      },
    });
    const response = new ApiResponse("sucess", 200, user.id);
    return res.json(response);
  } catch (error) {
    console.error(error.message);
    res.json({
      status: 500,
      message: "Internal error occured",
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
        password: password,
      },
    });
    const response = ApiResponse("sucess", 200, user.id);
    return res.json(response);
  } catch (error) {
    console.error(error.message);
    res.json(errorHandler(true, 200, user.id));
  }
};
