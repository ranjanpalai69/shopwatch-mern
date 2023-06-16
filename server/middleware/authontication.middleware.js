const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.headers?.token;

  if (!token) {
    return res.status(400).json({ msg: "Please provide token" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    if (decodedToken) {
      const userId = decodedToken.userId;
      req.body.userId = userId;
      next();
    } else {
      res.status(401).json({ error: "Invalid token" });
    }
  } catch (err) {
    // console.log("authentication error::-",err);
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token expired" });
    } else if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Invalid token" });
    } else {
      return res.status(500).json({ msg: "Server error" });
    }
  }
};

module.exports = authenticateUser;

