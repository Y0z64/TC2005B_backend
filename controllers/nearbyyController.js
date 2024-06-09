const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// Initialize Nearbyy client
async function initializeNearbyyClient() {
  const module = await import("@nearbyy/core");
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

  const ctxMsg = context.data.items.map((item) => item.text).join("\n\n");
  console.log("Context:", ctxMsg);

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const personalityPrompt = `You are ProTimeBot, a friendly and efficient productivity assistant. Help users organize tasks, set goals, provide productivity tips, and track time. Respond with clear, actionable advice in a positive and encouraging tone. Also, if any present next will be some relevant context next, use it to respond to the user query`;
    const contextMessage = `{RELEVANT CONTEXT TO THE USER'S QUERY}:\n ${ctxMsg}`;
    const input = message;

    const completePrompt = `${personalityPrompt}\n\n${contextMessage}\n\n{USERS QUERY}: ${input}`;

    const result = await model.generateContent(completePrompt);
    const response = await result.response;
    const text = await response.text();

    return res.json({ response: text });
  } catch (err) {
    console.log("Error getting response from Gemini", err);
    return res
      .status(500)
      .json({ error: "Error getting response from Gemini" });
  }
}

async function uploadFiles(req, res) {
  const { files } = req.body;
  const nearbyy = await nearbyyPromise;

  const { success, error, data } = await nearbyy.uploadFiles({
    fileUrls: [...files],
  });

  if (success) {
    console.log("File uploaded successfully");
    return res.json({ ...data, success });
  } else {
    console.error(`Error uploading file: ${error}`);
    console.error(data);
    return res
      .status(500)
      .json({ error: "Error getting response from nearbyy" });
  }
}

module.exports = { getContextResponse, uploadFiles };
