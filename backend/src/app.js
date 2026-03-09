const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://prepforge-web.onrender.com"
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

/* Health check route for Keep-Alive */
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'active', timestamp: new Date() });
});

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)


if (process.env.NODE_ENV === "production") {
    const INTERVAL = 14 * 60 * 1000; // 14 minutes
    const BACKEND_URL = process.env.BACKEND_URL || "https://prepforge-api.onrender.com";

    setInterval(async () => {
        try {
            await axios.get(`${BACKEND_URL}/api/health`);
            console.log("Keep-alive ping successful");
        } catch (err) {
            console.error("Keep-alive ping failed:", err.message);
        }
    }, INTERVAL);
}


module.exports = app