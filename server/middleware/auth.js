const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  // Clone the request headers to avoid modifying the original request
  const headers = { ...req.headers };
  const authHeader = headers.authorization;

  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch {
      req.user = null;
    }
  } else {
    req.user = null;
  }

  // Ensure we don't modify the original request body
  if (req.body && typeof req.body === 'object') {
    req.body = { ...req.body };
  }

  next();
};

module.exports = authMiddleware;
