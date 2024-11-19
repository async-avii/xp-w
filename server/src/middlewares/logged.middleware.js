export function loggedMiddleware(req, res, next) {
  const seek = req.cookies.token;
  if (seek) {
    next();
  } else {
    res.json({
      status: 401,
      message: "Unauthorized",
    });
  }
}
