import jwt from "jsonwebtoken";

export const authenticationMiddleware = async function (req, res, next) {
  try {
    const tokenHeader = req.headers["authorization"];

    if (!tokenHeader) return next();
    if (!tokenHeader.startsWith("Bearer")) {
      return res.status(400).json({
        error: "authorization header must start with Bearer",
      });
    }

    const token = tokenHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    next();
  }
};

export const ensureAuthenticatedMiddleware = async function (req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: "You are not logged in!" });
  }
  next();
};

export const restrictedToRoleMiddleware = function (role) {
  return function (req, res, next) {
    if ((req.user.role !== role)) {
      return res
        .status(401)
        .json({ error: "You are not authoriezed to access this resources!" });
    }
    return next();
  };
};
