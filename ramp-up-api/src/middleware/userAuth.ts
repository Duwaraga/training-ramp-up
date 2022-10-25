const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (
  req: { headers: { authorization: string }; email: any },
  res: { sendStatus: (arg0: number) => void },
  next: () => void
) {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      if (token == null) res.sendStatus(401);
      const userData = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
      if (userData) {
        next();
      }
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    console.log(e);
  }
};
