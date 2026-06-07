const mongoose = require('mongoose');

const validateObjectId = (req, res, next) => {
    const id = req.params?.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: "Invalid course id"})
    }
    next();
}

module.exports = validateObjectId;