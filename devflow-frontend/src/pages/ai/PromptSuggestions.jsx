import { motion } from "framer-motion";

const suggestions = [
  {
    icon: "bi-chat-dots",
    color: "primary",
    title: "Explain JWT",
    prompt:
      "Explain JWT Authentication with Node.js and Express using simple examples.",
  },
  {
    icon: "bi-code-slash",
    color: "success",
    title: "Review React Code",
    prompt:
      "Review this React component and suggest performance improvements.",
  },
  {
    icon: "bi-bug",
    color: "danger",
    title: "Debug Error",
    prompt:
      "Explain why this JavaScript error occurs and provide the best solution.",
  },
  {
    icon: "bi-database",
    color: "warning",
    title: "Generate SQL",
    prompt:
      "Generate optimized SQL queries for CRUD operations with joins.",
  },
  {
    icon: "bi-diagram-3",
    color: "info",
    title: "REST API",
    prompt:
      "Design a scalable REST API with authentication and role-based access.",
  },
  {
    icon: "bi-lightning-charge",
    color: "secondary",
    title: "Optimize Node",
    prompt:
      "Optimize my Express API for speed, scalability and performance.",
  },
];

const PromptSuggestions = ({ onSelectPrompt }) => {
  return (
    <div className="ai-suggestions mt-4">

      <div className="d-flex justify-content-between align-items-center mb-3">

        <h5 className="fw-bold mb-0">

          <i className="bi bi-stars text-warning me-2"></i>

          Quick Prompts

        </h5>

        <small className="text-muted">

          Click any prompt to auto-fill the AI input.

        </small>

      </div>

      <div className="row g-3">

        {suggestions.map((item, index) => (

          <div
            className="col-xl-4 col-lg-6"
            key={index}
          >

            <motion.div
              whileHover={{
                y: -6,
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="glass-card ai-prompt-card"
              onClick={() => onSelectPrompt(item.prompt)}
            >

              <div className={`ai-prompt-icon bg-${item.color}`}>

                <i className={`bi ${item.icon}`}></i>

              </div>

              <div className="flex-grow-1">

                <h6 className="fw-bold mb-2">

                  {item.title}

                </h6>

                <p className="text-muted small mb-0">

                  {item.prompt}

                </p>

              </div>

              <i className="bi bi-arrow-up-right ai-prompt-arrow"></i>

            </motion.div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default PromptSuggestions;