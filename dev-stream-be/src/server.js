require('dotenv').config();
const express = require('express');
const router = require('./routes/courseRoutes');
const loggerMiddleware = require('./middlewares/loggerMiddleware');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
    }
    catch (error) {
        console.log("MongoDB connection failed: ", error);
        process.exit(1);
    }
}

app.get('/', (req, res) => {
    res.send("Backend App running")
});
app.use(loggerMiddleware);
app.use('/api/courses', router);

startServer();

