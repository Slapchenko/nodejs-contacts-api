const errorHandling = (сontroller) => {
  return async (req, res, next) => {
    try {
      await сontroller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = errorHandling;