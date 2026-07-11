const validateCoursePayload = (req, res, next) => {
    const {name, description, category} = req.body;

    const allowedCategories = [
        "frontend",
        "backend",
        "database",
        "devops",
        "cloud"
    ];

    if (!name || !name.trim()) {
        return res.status(400).json({ error: "Name should not be empty" })
    }
    if (description && description.trim().length > 500) {
        return res.status(400).json({ error: "Description should not contain more than 500 characters" })
    }
    if(!category || !category.trim()){
        return res.status(400).json({ error: "Category should not be empty" })
    }
    if(!allowedCategories.includes(category?.trim().toLowerCase())){
        return res.status(400).json({error: "Category must be one of: frontend, backend, database, devops, cloud"})
    }
    next();
}

module.exports = validateCoursePayload;