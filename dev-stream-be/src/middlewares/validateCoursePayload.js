const validateCoursePayload = (req, res, next) => {
    const {name, description} = req.body;
    if (!name || !name.trim()) {
        return res.status(400).json({ error: "Name should not be empty" })
    }
    if (description && description.trim().length > 500) {
        return res.status(400).json({ error: "Description should not contain more than 500 characters" })
    }
    next();
}

module.exports = validateCoursePayload;