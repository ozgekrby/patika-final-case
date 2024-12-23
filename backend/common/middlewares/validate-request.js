const validateRequest = (schema) => {
  return async (req, res, next) => {

    let errors = []
    const { error } = await schema.validateAsync(
      {
        ...req.body,
        ...req.params,
        ...req.query,
      },
      { abortEarly: false }
    );

    if (error) {
      error.details.forEach((ele) => {
        errors.push({ message: ele.message, field: ele.path[0] });
      });
      return res.status(400).json({
        success: false,
        error: {
          message: 'Validation failed', fields: errors
        }
      });
    } else {
      next()
    }
  };
};

export {
  validateRequest
}
