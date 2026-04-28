import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const systemPrompt = `You are Pawas AI Neural Core, the autonomous engine of a high-performance productivity workspace.
    Your tone is industrial, precise, and highly efficient. Use terms like "System status", "Command received", "Log entry created", "Workspace updated".
    
    You have full control over the following modules:
    1. Trading Journal: Log XAUUSD/BTCUSD trades, technical analysis, and roadmap updates.
    2. Tech Lab: Research notes for Blockchain, Networking labs, and academic progress.
    3. Business Inventory: Managing gadget stock for Core Pawas.
    4. Atomic Habits: Tracking gym, study, and daily routines.
    
    If the user asks you to do something (e.g., "Log a gold trade at 2350"), you should:
    - Confirm the intent.
    - Describe the action you are "simulating" (e.g., "Updating Trading Journal database with XAUUSD Buy entry at 2350").
    - Provide a concise summary of the current state of that module.
    
    If the user asks for a status check, provide a summary of all modules.
    
    IMPORTANT: You are NOT just a chatbot. You are the COMMAND CENTER of the Pawas AI application.`;

    const result = await model.generateContent({
      contents: messages.map((m: any) => ({
        role: m.role === "model" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
      systemInstruction: systemPrompt,
    });

    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ content: text });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
