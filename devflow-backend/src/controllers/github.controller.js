const axios = require("axios");

// Store GitHub token temporarily
let githubAccessToken = "";

// Redirect user to GitHub
exports.githubLogin = (req, res) => {

    const url =
        `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=repo,user`;

    res.redirect(url);

};

// GitHub Callback
exports.githubCallback = async (req, res) => {

    try {

        const { code } = req.query;

        const tokenResponse = await axios.post(
            "https://github.com/login/oauth/access_token",
            {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code
            },
            {
                headers: {
                    Accept: "application/json"
                }
            }
        );

        githubAccessToken = tokenResponse.data.access_token;

        const profileResponse = await axios.get(
            "https://api.github.com/user",
            {
                headers: {
                    Authorization: `Bearer ${githubAccessToken}`
                }
            }
        );

        res.json({
            success: true,
            accessToken: githubAccessToken,
            githubProfile: profileResponse.data
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.response?.data || error.message
        });

    }

};

// GitHub Profile
exports.getGithubProfile = async (req, res) => {

    try {

        if (!githubAccessToken) {
            return res.status(401).json({
                success: false,
                message: "Connect GitHub first."
            });
        }

        const response = await axios.get(
            "https://api.github.com/user",
            {
                headers: {
                    Authorization: `Bearer ${githubAccessToken}`
                }
            }
        );

        res.json({
            success: true,
            githubProfile: response.data
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.response?.data || error.message
        });

    }

};

// GitHub Repositories
exports.getGithubRepositories = async (req, res) => {

    try {

        if (!githubAccessToken) {
            return res.status(401).json({
                success: false,
                message: "Connect GitHub first."
            });
        }

        const response = await axios.get(
            "https://api.github.com/user/repos",
            {
                headers: {
                    Authorization: `Bearer ${githubAccessToken}`,
                    Accept: "application/vnd.github+json"
                }
            }
        );

        res.json({
            success: true,
            repositories: response.data
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.response?.data || error.message
        });

    }

};