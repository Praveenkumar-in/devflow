import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { getAIHistory } from "../../services/aiService";

const HistoryPanel = () => {
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      setLoading(true);

      const res = await getAIHistory();

      setHistory(res.history || []);
      setFilteredHistory(res.history || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load AI history."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    const keyword = search.toLowerCase();

    const filtered = history.filter(
      (item) =>
        item.prompt?.toLowerCase().includes(keyword) ||
        item.response?.toLowerCase().includes(keyword)
    );

    setFilteredHistory(filtered);
  }, [search, history]);

  const copyResponse = async (text) => {
    try {
      await navigator.clipboard.writeText(text);

      toast.success("Copied to clipboard.");
    } catch {
      toast.error("Failed to copy.");
    }
  };

  return (
  <motion.div
    className="ai-history-panel"
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
  >
    {/* Header */}

    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

      <div>

        <h4 className="fw-bold mb-1">

          <i className="bi bi-clock-history text-primary me-2"></i>

          AI Conversation History

        </h4>

        <small className="text-muted">

          Browse and search your previous AI conversations.

        </small>

      </div>

      <button
        className="btn btn-outline-primary"
        onClick={fetchHistory}
      >
        <i className="bi bi-arrow-clockwise me-2"></i>

        Refresh

      </button>

    </div>

    {/* Search */}

    <div className="glass-card p-3 mb-4">

      <div className="input-group">

        <span className="input-group-text bg-transparent border-0">

          <i className="bi bi-search"></i>

        </span>

        <input
          type="text"
          className="form-control border-0 shadow-none"
          placeholder="Search prompts or AI responses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

    </div>

    {/* Loading */}

    {loading ? (

      <div className="text-center py-5">

        <div className="spinner-border text-primary"></div>

        <p className="mt-3 text-muted">

          Loading AI history...

        </p>

      </div>

    ) : filteredHistory.length === 0 ? (

      <div className="glass-card ai-empty-card">

        <div className="text-center">

          <i className="bi bi-clock-history display-4 text-secondary"></i>

          <h4 className="mt-3">

            No History Yet

          </h4>

          <p className="text-muted">

            Every AI conversation you have will appear here.

          </p>

        </div>

      </div>

    ) : (

      <div className="d-flex flex-column gap-4">

        {filteredHistory.map((item) => (

          <motion.div
            key={item.id}
            className="glass-card ai-history-item"
            whileHover={{ y: -4 }}
          >

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">

              <span className="badge bg-primary">

                <i className="bi bi-calendar-event me-2"></i>

                {new Date(item.created_at).toLocaleString()}

              </span>

              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => copyResponse(item.response)}
              >

                <i className="bi bi-clipboard me-2"></i>

                Copy

              </button>

            </div>

            {/* Prompt */}

            <div className="mb-4">

              <div className="d-flex align-items-center mb-2">

                <i className="bi bi-person-circle text-info me-2"></i>

                <strong>You</strong>

              </div>

              <div className="ai-history-prompt">

                {item.prompt}

              </div>

            </div>

            {/* Response */}

            <div>

              <div className="d-flex align-items-center mb-2">

                <i className="bi bi-robot text-primary me-2"></i>

                <strong>DevFlow AI</strong>

              </div>

              <div className="ai-history-response">

                <pre className="ai-response-text mb-0">

                  {item.response}

                </pre>

              </div>

            </div>

          </motion.div>

        ))}

      </div>

    )}

  </motion.div>
);
};

export default HistoryPanel;