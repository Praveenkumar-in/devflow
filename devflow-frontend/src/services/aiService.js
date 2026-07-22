import api from "./api";


// Ask AI
export const askAI = async (prompt) => {
  const { data } = await api.post("/ai/ask", {
    prompt,
  });

  return data;
};


// Get AI History
export const getAIHistory = async () => {
  const { data } = await api.get("/ai/history");

  return data;
};


// Review Source Code
export const reviewCode = async (code) => {
  const { data } = await api.post(
    "/ai/code-review",
    {
      code,
    }
  );

  return data;
};


// Explain Bug / Error
export const explainBug = async (error) => {
  const { data } = await api.post(
    "/ai/bug-explanation",
    {
      error,
    }
  );

  return data;
};