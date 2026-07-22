import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { explainBug } from "../../services/aiService";

const BugExplanationPanel = ({ prompt, setPrompt }) => {
  const [errorText, setErrorText] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (prompt) {
      setErrorText(prompt);
    }
  }, [prompt]);

  const handleExplain = async (e) => {
    e.preventDefault();

    if (!errorText.trim()) {
      return toast.error("Please enter an error message.");
    }

    try {
      setLoading(true);
      const res = await explainBug(errorText);

      if (res?.explanation) {
        setExplanation(res.explanation);
        toast.success("Bug explained successfully.");
      } else {
        toast.error("No explanation returned from AI service.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to explain the error."
      );
    } finally {
      setLoading(false);
    }
  };

  const clearExplanation = () => {
    setErrorText("");
    setPrompt("");
    setExplanation("");
  };

  const copyExplanation = async () => {
    if (!explanation) return;

    try {
      await navigator.clipboard.writeText(explanation);
      toast.success("Copied to clipboard.");
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

        <div className="ai-icon danger">

          <i className="bi bi-bug-fill"></i>

        </div>

        <div className="ms-3">

          <h4 className="mb-1 fw-bold">
            AI Bug Analyzer
          </h4>

          <small className="text-muted">
            Explain errors, stack traces and runtime exceptions.
          </small>

        </div>

      </div>

    </div>

    {/* Input */}

    <form onSubmit={handleExplain}>

      <div className="mb-3">

        <textarea
          className="form-control ai-code-input"
          rows={8}
          placeholder={`Paste any error...

Example:

TypeError: Cannot read properties of undefined (reading 'map')

ReferenceError: user is not defined

SQL Error...

Stack Trace...
`}
          value={errorText}
          onChange={(e) => setErrorText(e.target.value)}
        />

      </div>

      <div className="d-flex gap-2">

        <button
          className="btn btn-danger"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Analyzing...
            </>
          ) : (
            <>
              <i className="bi bi-stars me-2"></i>

              Explain Error
            </>
          )}
        </button>

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={clearExplanation}
        >
          <i className="bi bi-arrow-counterclockwise me-2"></i>

          Reset
        </button>

      </div>

    </form>

    {/* Output */}

    {explanation && (

      <motion.div
        className="glass-card ai-answer-card mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >

        <div className="d-flex justify-content-between align-items-center mb-3">

          <h5 className="mb-0">

            <i className="bi bi-lightbulb-fill text-warning me-2"></i>

            AI Explanation

          </h5>

          <button
            className="btn btn-outline-warning btn-sm"
            onClick={copyExplanation}
          >

            <i className="bi bi-clipboard me-2"></i>

            Copy

          </button>

        </div>

        <div className="ai-response">

          <pre className="ai-response-text mb-0">
            {explanation}
          </pre>

        </div>

      </motion.div>

    )}

    {!loading && !explanation && (

      <div className="glass-card ai-empty-card mt-4">

        <div className="text-center">

          <i className="bi bi-bug-fill display-4 text-danger"></i>

          <h4 className="mt-3">

            Bug Analyzer Ready

          </h4>

          <p className="text-muted">

            Paste any React, Node.js, Express, SQL or JavaScript
            error and AI will explain the cause, possible fixes
            and best practices.

          </p>

        </div>

      </div>

    )}

  </motion.div>
);
};

export default BugExplanationPanel;