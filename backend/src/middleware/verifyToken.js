const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        let token = req.cookies?.token;

        if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token && req.headers["x-access-token"]) {
            token = req.headers["x-access-token"];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access denied. Please login first.",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or Expired Token",
        });
    }
};

module.exports = verifyToken;