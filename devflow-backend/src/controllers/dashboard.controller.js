const db = require("../config/db");

exports.getDashboard = (req, res) => {

    const dashboard = {};

    // Total Users
    db.query("SELECT COUNT(*) AS totalUsers FROM users", (err, users) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        dashboard.totalUsers = users[0].totalUsers;

        // Total Projects
        db.query("SELECT COUNT(*) AS totalProjects FROM projects", (err, projects) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            dashboard.totalProjects = projects[0].totalProjects;

            // Total Tasks
            db.query("SELECT COUNT(*) AS totalTasks FROM tasks", (err, tasks) => {

                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }

                dashboard.totalTasks = tasks[0].totalTasks;

                // Total Teams
                db.query("SELECT COUNT(*) AS totalTeams FROM teams", (err, teams) => {

                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });
                    }

                    dashboard.totalTeams = teams[0].totalTeams;

                    // Completed Tasks
                    db.query(
                        "SELECT COUNT(*) AS completedTasks FROM tasks WHERE status='Completed'",
                        (err, completed) => {

                            if (err) {
                                return res.status(500).json({
                                    success: false,
                                    message: err.message
                                });
                            }

                            dashboard.completedTasks = completed[0].completedTasks;

                            // Pending Tasks
                            db.query(
                                "SELECT COUNT(*) AS pendingTasks FROM tasks WHERE status='Pending'",
                                (err, pending) => {

                                    if (err) {
                                        return res.status(500).json({
                                            success: false,
                                            message: err.message
                                        });
                                    }

                                    dashboard.pendingTasks = pending[0].pendingTasks;

                                    // In Progress Tasks
                                    db.query(
                                        "SELECT COUNT(*) AS inProgressTasks FROM tasks WHERE status='In Progress'",
                                        (err, progress) => {

                                            if (err) {
                                                return res.status(500).json({
                                                    success: false,
                                                    message: err.message
                                                });
                                            }

                                            dashboard.inProgressTasks = progress[0].inProgressTasks;

                                            res.json({
                                                success: true,
                                                dashboard
                                            });

                                        }
                                    );

                                }
                            );

                        }
                    );

                });

            });

        });

    });

};