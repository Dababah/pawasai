import { generateText } from 'ai';
import { google } from '@ai-sdk/google';

export async function POST(req: Request) {
  try {
    const { content, action } = await req.json();

    let prompt = '';
    if (action === 'rewrite') {
      prompt = `Rewrite the following text to be more professional, clear, and well-structured. Maintain the original meaning but improve the vocabulary and flow:\n\n${content}`;
    } else if (action === 'summarize') {
      prompt = `Provide a concise summary of the following text. Use bullet points for key takeaways if appropriate:\n\n${content}`;
    } else if (action === 'fix-grammar') {
      prompt = `Fix any grammar or spelling mistakes in the following text. Do not change the tone or structure unless necessary for correctness:\n\n${content}`;
    } else {
      return Response.json({ error: 'Invalid action' }, { status: 400 });
    }

    const { text } = await generateText({
      model: google('gemini-1.5-flash'), // Flash is good for quick edits
      prompt: prompt,
      system: "You are a professional editor and academic writing assistant for Muhammad Fawwaz Ali, a tech student and researcher. Your tone is professional, technical, and precise.",
    });

    return Response.json({ result: text });
  } catch (error) {
    console.error('AI Edit Error:', error);
    return Response.json({ error: 'AI processing failed' }, { status: 500 });
  }
}
