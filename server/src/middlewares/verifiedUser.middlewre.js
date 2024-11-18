import { prisma } from "../app.js";

export default async function verifiedUser(req, res, next) {
  const id = req.params.id;
  const checkStatus = await prisma.user.findFirst({
    where: {
      id,
      isVerified: true,
    },
  });
  if (checkStatus) {
    next();
  } else {
    res.json({
      ststus: false,
      msg: "User not verified",
    });
  }
}
