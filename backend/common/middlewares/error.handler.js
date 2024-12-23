const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';
  const errorCode = err.errorCode || '';

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      code: errorCode,
    },
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    error: {
      message: `The route ${req.url} does not exist.`,
      code: 'NOT_FOUND',
    },
  });
};

export { errorHandler, notFoundHandler };