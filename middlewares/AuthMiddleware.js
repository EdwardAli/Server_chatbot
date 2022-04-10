const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) {
    return res.status(401).json({ error: "Shop not logged in!" });
  }

  try {
    const validToken = verify(accessToken, "chatbotsecret");
    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { validateToken };
