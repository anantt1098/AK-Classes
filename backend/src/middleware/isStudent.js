const isStudent = (req, res, next) => {
    if (req.user.role !== "student") {
        return res.status(403).json({
            success: false,
            message: "Only students can access this resource.",
        });
    }

    next();
};

module.exports = isStudent;