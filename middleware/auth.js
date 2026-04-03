const jwt = require("jsonwebtoken");

const secret = "access";

function authenticateJWT(req, res, next) {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    jwt.verify(token.split(" ")[1], secret, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }

        req.user = user;
        next();
    });
}

module.exports = { authenticateJWT, secret };