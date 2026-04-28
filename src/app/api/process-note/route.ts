import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { createBrowserClient } from '@supabase/ssr'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { content, noteId } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const prompt = `
      Analyze the following note content and determine if it describes a business transaction or inventory change for a gadget business (e.g., buying/selling iPhones, MacBooks, Sony headphones).
      
      CONTENT:
      "${content}"

      If it is a transaction, extract the following JSON:
      {
        "is_transaction": true,
        "item_name": "string",
        "action": "buy" | "sell" | "stock_update",
        "quantity": number,
        "price": "string",
        "category": "Smartphone" | "Laptop" | "Tablet" | "Audio" | "Accessory"
      }
      If it's NOT a transaction, return:
      { "is_transaction": false }
      
      ONLY return valid JSON.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().replace(/```json|```/g, "").trim();
    const extraction = JSON.parse(text);

    if (extraction.is_transaction) {
      // In a real app, you would use a service role client to update Supabase
      // Here we just return the extraction for the UI to handle or log
      return NextResponse.json({ 
        action_required: true, 
        data: extraction,
        message: `Detected ${extraction.action} action for ${extraction.item_name}. Sync recommended.`
      });
    }

    return NextResponse.json({ action_required: false });
  } catch (error: any) {
    console.error("Note Processing Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
