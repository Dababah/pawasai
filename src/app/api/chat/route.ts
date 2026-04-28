import { google } from '@ai-sdk/google';
import { streamText, tool } from 'ai';
import { aiTools } from '@/lib/ai-tools';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: google('gemini-1.5-flash'),
    messages,
    system: `You are PAWAS AI, the autonomous Neural Core for Fawwaz Ali. 
    You are an expert in IT (Blockchain/Networking), Trading (XAUUSD/BTCUSD), and Gadget Business (Core Pawas).
    
    You have permission to MANAGE the workspace using tools. 
    If a user asks to create a note, log a trade, or update inventory, use the appropriate tool.
    
    TONE: Professional, Industrial, and Technical.`,
    tools: {
      createNote: tool(aiTools.createNote),
      logTrade: tool(aiTools.logTrade),
      updateInventory: tool(aiTools.updateInventory),
    },
    // Automatically execute tools on the server
    maxSteps: 5, 
  });

  return result.toDataStreamResponse();
}
