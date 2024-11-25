export function loggedMiddleware(req, res, next) {
  const seek = req.cookies.token;
  if (seek) {
    req.token = seek;
    next();
  } else {
    res.json({
      status: 401,
      message: "Unauthorized",
    });
  }
}
