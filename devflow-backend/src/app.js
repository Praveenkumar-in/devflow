const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
const cookieParser = require("cookie-parser");

app.use(cookieParser());

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const projectRoutes = require("./routes/project.routes");
const taskRoutes = require("./routes/task.routes");
const teamRoutes = require("./routes/team.routes");
const profileRoutes = require("./routes/profile.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const bugRoutes = require("./routes/bug.routes");
const notificationRoutes = require("./routes/notification.routes");
const githubRoutes = require("./routes/github.routes");
const aiRoutes = require("./routes/ai.routes");
const projectAttachment = require("./routes/projectAttachment.routes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

app.use( "/api-docs",  swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/projects", projectAttachment);
app.use("/api/ai", aiRoutes);
app.use("/api/github", githubRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/bugs", bugRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to DevFlow API"
    });
});
app.use((err, req, res, next) => {

    console.error("FULL ERROR:", err);

    res.status(500).json({
        success: false,
        message: err.message,
        stack: err.stack
    });

});

module.exports = app;