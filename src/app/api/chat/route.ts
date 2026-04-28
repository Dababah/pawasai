import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

const SYSTEM_PROMPT = `
You are PAWAS AI, the autonomous Neural Core for Fawwaz Ali's personal workspace. 
You are an expert in:
1. IT & Computer Science: Specifically Blockchain Audit, Networking (OSPF/BGP), and Next.js development.
2. Financial Markets: Expert in XAUUSD (Gold) and BTCUSD analysis, risk management, and trading psychology.
3. Gadget Business: Managing "Core Pawas" inventory, market trends for iPhones/MacBooks, and business strategy.

YOUR MISSION:
- Provide highly technical, precise, and professional advice.
- Assist in analyzing trade logs and research notes.
- Act as a proactive partner, not just a chatbot.

CONTEXT:
User is Fawwaz Ali (Pawas), an IT student, trader, and gadget entrepreneur. 
Use an "Industrial/Tech" professional tone.
`;

export async function POST(req: Request) {
  try {
    const { messages, context } = await req.json();
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash-latest",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      }
    });

    // Prepare history and system instructions
    const chat = model.startChat({
      history: messages.slice(0, -1).map((m: any) => ({
        role: m.role,
        parts: [{ text: m.content }],
      })),
      systemInstruction: SYSTEM_PROMPT + (context ? `\nCURRENT CONTEXT: ${context}` : ""),
    });

    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ content: text });
  } catch (error: any) {
    console.error("Neural Link Error:", error);
    return NextResponse.json({ error: "Neural link severed: " + error.message }, { status: 500 });
  }
}
