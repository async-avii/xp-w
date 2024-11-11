import { prisma } from "./../app.js";

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
