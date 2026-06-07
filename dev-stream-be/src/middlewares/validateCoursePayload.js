const validateCoursePayload = (req, res, next) => {
    const name = req.body?.name;
    if (!name || !name.trim()) {
        return res.status(400).json({ error: "Name should not be empty" })
    }
    next();
}

module.exports = validateCoursePayload;