function roleMiddleware(requiredRole) {
  return (req, res, next) => {
    if (req.user && req.user.role === requiredRole) {
      return next();
    }
    res.status(403).send('Access Denied');
  };
}

module.exports = roleMiddleware;
