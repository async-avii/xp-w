import jwt from "jsonwebtoken";
export default function verifiedByCookie(req, res, next) {
  const token = req.token;
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  if (payload.userIsVerified === true) {
    req.id = payload.userId;
    next();
  } else if (payload.userIsVerified === false) {
    res.json({
      status: 403,
      success: "Not Verified",
    });
  }
}
