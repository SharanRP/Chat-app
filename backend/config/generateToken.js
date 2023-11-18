const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({ id }, 'sharanrp35', { expiresIn: "21d" });
}
module.exports = generateToken