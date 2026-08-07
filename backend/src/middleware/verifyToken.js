const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        // console.log("Cookies:", req.cookies);
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Access denied. Please login first.",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or Expired Token",
        });
    }
};

module.exports = verifyToken;