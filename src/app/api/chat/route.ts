import { NextResponse } from 'next/server';

// Kita menggunakan Edge Runtime untuk streaming
export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Default ke model gemini jika tidak dispesifikasikan lain,
    // Google Gemini 1.5 Pro sangat populer dan bagus di OpenRouter.
    const model = 'google/gemini-pro';

    const apiKey = process.env.OPENROUTER_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ error: "OpenRouter API Key not configured. Please add OPENROUTER_API_KEY to your .env.local file." }, { status: 500 });
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: 'You are Eva AI, a helpful and friendly AI assistant. Call the user "V". Reply in Indonesian.' },
          ...messages
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter Error:", errorText);
      return NextResponse.json({ error: "Gagal menyambungkan ke OpenRouter" }, { status: response.status });
    }

    // Kembalikan stream SSE secara langsung ke client
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error: any) {
    console.error("Routing Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
