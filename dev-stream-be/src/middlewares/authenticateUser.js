const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    try {
        if (!authHeader) return res.status(401).json({ error: "Authorization header missing" })
        console.log('headers: ', req.headers);
        if(!authHeader.startsWith("Bearer ")){
            return res.status(401).json({error: "Invalid authorization header"});
        }
        const token = authHeader.split(' ')[1];
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedPayload;
        console.log('req.user: ', req.user)
        next();
    } catch (error) {
        if(error.name === "TokenExpiredError"){
            return res.status(401).json({error: "Token has expired"})
        }
        if(error.name === "JsonWebTokenError"){
            return res.status(401).json({error: "Invalid token"})
        }
        return res.status(500).json({error: "Internal Server Error"});
    }
}

module.exports = authenticateUser;
