const isTeacher = (req, res, next) => {
    if (req.user.role !== "teacher") {
        return res.status(403).json({
            message: "Only teachers can access this resource.",
        });
    }

    next();
};

module.exports = isTeacher;