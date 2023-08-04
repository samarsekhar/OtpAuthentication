const jwt = require("jsonwebtoken");

const createToken = (id) => {
  let paylod = { id: id };
  let options = { expiresIn: "id" };
  return jwt.sign(paylod, process.env.JWT_SECRET, options);
};

module.exports = createToken;
