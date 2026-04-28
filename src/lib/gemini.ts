import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

export const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-pro", // Upgraded to Pro for core reasoning
});

export const embeddingModel = genAI.getGenerativeModel({ 
  model: "text-embedding-004" 
});

export const getEmbeddings = async (text: string) => {
  try {
    const result = await embeddingModel.embedContent(text);
    return result.embedding.values;
  } catch (error) {
    console.error("Embedding Error:", error);
    return null;
  }
};

export const neuralCore = async (prompt: string, context?: any) => {
  try {
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "You are Pawas AI Neural Core, an advanced agentic productivity assistant. You have full control over the user's workspace, including trading logs, tech notes, inventory, and habits. Use a professional, efficient, and 'industrial' tone." }],
        },
        {
          role: "model",
          parts: [{ text: "Understood. Pawas AI Neural Core online. System status: Ready for command input. How can I optimize your productivity today?" }],
        },
      ],
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Neural Core Error:", error);
    return "Error communicating with Neural Core. Please check API configuration.";
  }
};
