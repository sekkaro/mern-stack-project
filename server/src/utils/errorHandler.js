export const errorHandler = (err, res) => {
  console.log(err);
  res.status(err.status || 500);
  if (err.code === 11000 && err.keyValue.hasOwnProperty("email")) {
    err.message = "user has already been signed up with this email";
  }
  res.json({
    message: err.message,
  });
};

export const throwError = (msg, status = 500) => {
  const error = new Error(msg);
  error.status = status;
  throw error;
};
