/* eslint-disable prettier/prettier */
const jwtToken = require('jsonwebtoken');
require("dotenv").config();

export default function AdminMiddleware(req, res, next) {
  let token;
  console.log("object");
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  
    if (token == null) res.sendStatus(401);

    const decode = jwtToken.verify(token, process.env.ACCESS_TOKEN_KEY);
    
    if (decode.role == 'Admin') {
      next();
    }
    if (decode.role == 'User' && req.method == 'GET') {
      next();
    }
  } else {
    res.sendStatus(401);
  }
}
