import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { reviewCode } from "../../services/aiService";

const CodeReviewPanel = ({ prompt, setPrompt }) => {
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (prompt) {
      setCode(prompt);
    }
  }, [prompt]);

  const handleReview = async (e) => {
    e.preventDefault();

    if (!code.trim()) {
      return toast.error("Please paste your code.");
    }

    try {
      setLoading(true);
      const res = await reviewCode(code);

      if (res?.review) {
        setReview(res.review);
        toast.success("Code reviewed successfully.");
      } else {
        toast.error("No review returned from AI service.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to review code."
      );
    } finally {
      setLoading(false);
    }
  };

  const clearReview = () => {
    setCode("");
    setPrompt("");
    setReview("");
  };

  const copyReview = async () => {
    if (!review) return;

    try {
      await navigator.clipboard.writeText(review);
      toast.success("Review copied.");
    } catch {
      toast.error("Failed to copy.");
    }
  };
return (
  <motion.div
    className="ai-panel"
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
  >
    {/* Header */}

    <div className="ai-panel-header mb-4">

      <div className="d-flex align-items-center">

        <div className="ai-icon success">

          <i className="bi bi-code-slash"></i>

        </div>

        <div className="ms-3">

          <h4 className="fw-bold mb-1">

            AI Code Reviewer

          </h4>

          <small className="text-muted">

            Review your code for bugs, security, performance and best practices.

          </small>

        </div>

      </div>

    </div>

    {/* Input */}

    <form onSubmit={handleReview}>

      <div className="mb-3">

        <textarea
          className="form-control ai-code-input"
          rows={10}
          placeholder={`Paste your code here...

Supports:

• JavaScript
• React
• Node.js
• Express
• SQL
• HTML / CSS
• Python
• Java
`}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

      </div>

      <div className="d-flex gap-2">

        <button
          type="submit"
          className="btn btn-success"
          disabled={loading}
        >

          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Reviewing...
            </>
          ) : (
            <>
              <i className="bi bi-stars me-2"></i>
              Review Code
            </>
          )}

        </button>

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={clearReview}
        >

          <i className="bi bi-arrow-counterclockwise me-2"></i>

          Reset

        </button>

      </div>

    </form>

    {/* AI Review */}

    {review && (

      <motion.div
        className="glass-card ai-answer-card mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >

        <div className="d-flex justify-content-between align-items-center mb-3">

          <h5 className="mb-0">

            <i className="bi bi-code-slash text-success me-2"></i>

            AI Review

          </h5>

          <button
            className="btn btn-outline-success btn-sm"
            onClick={copyReview}
          >

            <i className="bi bi-clipboard me-2"></i>

            Copy

          </button>

        </div>

        <div className="ai-response">

          <pre className="ai-response-text mb-0">

            {review}

          </pre>

        </div>

      </motion.div>

    )}

    {/* Empty State */}

    {!loading && !review && (

      <div className="glass-card ai-empty-card mt-4">

        <div className="text-center">

          <i className="bi bi-code-square display-4 text-success"></i>

          <h4 className="mt-3">

            AI Code Reviewer Ready

          </h4>

          <p className="text-muted">

            Paste your source code and receive an AI-powered review
            including security analysis, performance improvements,
            clean code suggestions and best practices.

          </p>

        </div>

      </div>

    )}

  </motion.div>
);
  
};

export default CodeReviewPanel;
