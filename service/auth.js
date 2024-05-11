const jwt = require("jsonwebtoken");
const secret = "neha$123@#";

function setUser(user) {
    return jwt.sign({
        _id: user._id,
        username: user.username,
    }, secret);
}

function getUser(token) {
    if(!token) return null;
    return jwt.verify(token, secret);
}

module.exports = {
    setUser, 
    getUser,
}