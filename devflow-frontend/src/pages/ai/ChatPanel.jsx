import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { askAI } from "../../services/aiService";

const ChatPanel = ({ prompt, setPrompt }) => {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (prompt) {
      setPrompt(prompt);
    }
  }, [prompt, setPrompt]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) {
      return toast.error("Please enter a prompt.");
    }

    try {
      setLoading(true);

      const res = await askAI(prompt);

      setResponse(res.response);

      toast.success("AI response generated.");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to get AI response."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setPrompt("");
    setResponse("");
  };

  const copyResponse = async () => {
    if (!response) return;

    try {
      await navigator.clipboard.writeText(response);
      toast.success("Copied to clipboard.");
    } catch {
      toast.error("Failed to copy.");
    }
  };

  return (
  <motion.div
    className="ai-chat-panel"
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
  >
    {/* Header */}

    <div className="ai-panel-header mb-4">

      <div className="d-flex align-items-center">

        <div className="ai-icon primary">

          <i className="bi bi-robot"></i>

        </div>

        <div className="ms-3">

          <h4 className="fw-bold mb-1">

            Ask DevFlow AI

          </h4>

          <small className="text-muted">

            Generate code, debug errors, design APIs and much more.

          </small>

        </div>

      </div>

    </div>

    {/* Input */}

    <form onSubmit={handleSubmit}>

      <div className="mb-3">

        <textarea
          className="form-control ai-textarea"
          rows={4}
          placeholder="Ask anything about React, Node.js, Express, SQL, Bootstrap, JWT..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

      </div>

      <div className="d-flex gap-2">

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >

          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Thinking...
            </>
          ) : (
            <>
              <i className="bi bi-stars me-2"></i>
              Ask AI
            </>
          )}

        </button>

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={handleClear}
        >

          <i className="bi bi-arrow-counterclockwise me-2"></i>

          Reset

        </button>

      </div>

    </form>

    {/* Response */}

    {response && (

      <motion.div
        className="glass-card ai-answer-card mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >

        <div className="d-flex justify-content-between align-items-center mb-3">

          <h5 className="mb-0">

            <i className="bi bi-robot text-primary me-2"></i>

            AI Response

          </h5>

          <button
            className="btn btn-outline-primary btn-sm"
            onClick={copyResponse}
          >

            <i className="bi bi-clipboard me-2"></i>

            Copy

          </button>

        </div>

        <div className="ai-response">

          <pre className="ai-response-text mb-0">

            {response}

          </pre>

        </div>

      </motion.div>

    )}

    {!loading && !response && (

      <div className="glass-card ai-empty-card mt-4">

        <div className="text-center">

          <i className="bi bi-stars display-4 text-primary"></i>

          <h4 className="mt-3">

            Ready to help

          </h4>

          <p className="text-muted">

            Ask about React, Express, Node.js, SQL,
            authentication, Bootstrap, deployment,
            debugging or software architecture.

          </p>

        </div>

      </div>

    )}

  </motion.div>
);
};

export default ChatPanel;