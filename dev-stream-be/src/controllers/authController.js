const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    console.log("Register API hit");
    console.log(req.body);
    const { username, email, password, role } = req.body;
    try {
        const existingUser = await User.findOne({
            email
        })
        if (existingUser) {
            return res.status(409).json({ error: "Email already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role
        });
        return res.status(201).json({ message: "User registered successfully" })
    } catch (error) {
        console.log(error)
        if (error.name === "ValidationError") {
            return res.status(400).json({ error: error.message })
        }
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({
            email
        });
        if (!existingUser) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid email or password" })
        }
        const token = jwt.sign({
            userId: existingUser._id,
            email,
            role: existingUser.role
        }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({token})

    } catch (error) {
        console.log("login error:", error);
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

module.exports = {
    register,
    login
}