import { useState } from "react";
import { motion } from "framer-motion";

import ChatPanel from "./ChatPanel";
import CodeReviewPanel from "./CodeReviewPanel";
import BugExplanationPanel from "./BugExplanationPanel";
import HistoryPanel from "./HistoryPanel";
import PromptSuggestions from "./PromptSuggestions";

const AiAssistant = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const [prompt, setPrompt] = useState("");

  return (
    <motion.div
      className="container-fluid ai-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}

      <div className="ai-header glass-card mb-4">

        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

          <div>

            <h2 className="mb-1">

              <i className="bi bi-robot me-2 text-info"></i>

              AI Assistant

            </h2>

            <p className="text-muted mb-0">

              Your intelligent coding companion powered by Groq AI

            </p>

          </div>

          <span className="badge ai-badge">

            <i className="bi bi-stars me-2"></i>

            Powered by Groq AI

          </span>

        </div>

      </div>

      {/* Tabs */}

      <div className="glass-card mb-4">

        <ul className="nav nav-pills ai-tabs p-3">

          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "chat" ? "active" : ""
              }`}
              onClick={() => setActiveTab("chat")}
            >
              <i className="bi bi-chat-dots me-2"></i>
              Chat
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "review" ? "active" : ""
              }`}
              onClick={() => setActiveTab("review")}
            >
              <i className="bi bi-code-slash me-2"></i>
              Code Review
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "bug" ? "active" : ""
              }`}
              onClick={() => setActiveTab("bug")}
            >
              <i className="bi bi-bug me-2"></i>
              Bug Explanation
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "history" ? "active" : ""
              }`}
              onClick={() => setActiveTab("history")}
            >
              <i className="bi bi-clock-history me-2"></i>
              History
            </button>
          </li>

        </ul>

      </div>

      {/* Main Workspace */}

      <div className="glass-card ai-workspace p-4">

        {activeTab === "chat" && (
          <>
            <ChatPanel
              prompt={prompt}
              setPrompt={setPrompt}
            />

            <PromptSuggestions
              onSelectPrompt={setPrompt}
            />
          </>
        )}

        {activeTab === "review" && (
          <>
            <CodeReviewPanel
              prompt={prompt}
              setPrompt={setPrompt}
            />

            <PromptSuggestions
              onSelectPrompt={setPrompt}
            />
          </>
        )}

        {activeTab === "bug" && (
          <>
            <BugExplanationPanel
              prompt={prompt}
              setPrompt={setPrompt}
            />

            <PromptSuggestions
              onSelectPrompt={setPrompt}
            />
          </>
        )}

        {activeTab === "history" && (
          <HistoryPanel />
        )}

      </div>

      {/* Features */}

      {activeTab !== "history" && (

        <div className="row g-3 mt-4">

          <div className="col-lg-4">

            <div className="glass-card ai-feature-card">

              <i className="bi bi-chat-dots-fill text-info"></i>

              <h5>AI Chat</h5>

              <p>

                Ask programming questions, generate code,
                SQL queries and documentation.

              </p>

            </div>

          </div>

          <div className="col-lg-4">

            <div className="glass-card ai-feature-card">

              <i className="bi bi-code-slash text-success"></i>

              <h5>Code Review</h5>

              <p>

                Discover bugs, security issues and
                performance improvements.

              </p>

            </div>

          </div>

          <div className="col-lg-4">

            <div className="glass-card ai-feature-card">

              <i className="bi bi-bug-fill text-danger"></i>

              <h5>Bug Explanation</h5>

              <p>

                Explain errors and receive
                detailed AI-powered solutions.

              </p>

            </div>

          </div>

        </div>

      )}

    </motion.div>
  );
};

export default AiAssistant;