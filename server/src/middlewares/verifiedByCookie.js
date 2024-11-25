import jwt from "jsonwebtoken";
export default async function verifiedByCookie(req, res, next) {
  const token = req.token;
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  if (payload.isVerified === true) next();
  else {
    res.json({
      status: 403,
      success: false,
    });
  }
}
