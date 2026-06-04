function requireLogin(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ success: false, message: 'Please login first' });
  }
}

module.exports = requireLogin;
