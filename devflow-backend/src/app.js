const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
const cookieParser = require("cookie-parser");

app.use(cookieParser());

const authRoutes = require("./routes/auth.routes");

app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to DevFlow API"
    });
});

module.exports = app;