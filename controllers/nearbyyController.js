const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

// Initialize Nearbyy client
async function initializeNearbyyClient() {
  const module = await import('@nearbyy/core');
  return new module.NearbyyClient({
    API_KEY: process.env.NEARBYY_API_KEY,
  });
}

const nearbyyPromise = initializeNearbyyClient();

async function getContextResponse(req, res) {
  const { message } = req.body;
  const nearbyy = await nearbyyPromise;
  const context = await nearbyy.semanticSearch({
    limit: 3,
    query: message,
  });

  if (!context.success) {
    console.error(context.error);
    return res.send("No context available.");
  }

  const ctxMsg = context.data.items.map((item) => item.text).join('\n\n');
  console.log('Context:', ctxMsg);

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  try {
    const systemMessage = 'You are a professional bodybuilding trainer. Your task is to help achieve insane gains. Remember, "To get insane gains, first you have to be insane." Use information from the provided context to give more accurate information';
    // const systemMessage = If you are given relevant context, answer the user's query with it. If the context does not include the answer, STATE that you don't have enough information to answer the query but still try to answer it without the context.;
    const contextMessage = `RELEVANT CONTEXT TO THE USER'S QUERY]:\n ${ctxMsg}`;
    const userMessage = message;

    const completePrompt = `${systemMessage}\n\n${contextMessage}\n\n[USERS QUERY]: ${userMessage}`;

    const result = await model.generateContent(completePrompt);
    const response = await result.response;
    const text = await response.text();

    return res.json({ response: text });
  } catch (err) {
    console.log('Error getting response from Gemini', err);
    return res.status(500).json({ error: 'Error getting response from Gemini' });
  }
}

module.exports = { getContextResponse };