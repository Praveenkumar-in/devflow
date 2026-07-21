const Groq = require("groq-sdk");
const db = require("../config/db");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

exports.askAI = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_completion_tokens: 1024,
    });

    const answer = completion.choices[0].message.content;

    // Save to AI History (optional)
    if (req.user && req.user.id) {
      db.query(
        "INSERT INTO ai_history (user_id, prompt, response) VALUES (?, ?, ?)",
        [req.user.id, prompt, answer],
        (err) => {
          if (err) console.log(err);
        }
      );
    }

    res.status(200).json({
      success: true,
      prompt,
      response: answer,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAIHistory = (req, res) => {
  db.query(
    "SELECT * FROM ai_history ORDER BY created_at DESC",
    (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      res.status(200).json({
        success: true,
        history: results,
      });
    }
  );
};
exports.reviewCode = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Code is required"
      });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are a senior software engineer. Review the code and suggest improvements, bugs, security issues, performance optimizations, and best practices."
        },
        {
          role: "user",
          content: code
        }
      ],
      temperature: 0.4
    });


    res.json({
      success: true,
      review: completion.choices[0].message.content
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
exports.explainBug = async (req, res) => {
    try {

        const { error } = req.body;

        if (!error) {
            return res.status(400).json({
                success: false,
                message: "Error message is required"
            });
        }

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: "You are an expert software engineer. Explain the error, identify possible causes, and provide step-by-step solutions with sample code if applicable."
                },
                {
                    role: "user",
                    content: error
                }
            ],
            temperature: 0.4
        });

        const explanation = completion.choices[0].message.content;

        // Save to AI History
        db.query(
            "INSERT INTO ai_history (user_id, prompt, response) VALUES (?, ?, ?)",
            [req.user.id, error, explanation],
            (err) => {
                if (err) console.log(err);
            }
        );

        res.json({
            success: true,
            explanation
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};