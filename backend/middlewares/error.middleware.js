export function errorMiddleware(err, req, res, next) {
  console.error(err);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Ошибка валидации",
      errors: Object.values(err.errors).map((error) => error.message),
    });
  }

  return res.status(500).json({
    message: err.message || "Internal server error",
  });
}
