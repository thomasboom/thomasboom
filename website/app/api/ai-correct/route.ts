import { NextResponse } from 'next/server';

type AiRequest = {
  title?: string;
  content?: string;
};

const DEFAULT_MODEL = 'arcee-ai/trinity-large-preview:free';

export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Missing OPENROUTER_API_KEY on the server.' },
      { status: 500 }
    );
  }

  let payload: AiRequest = {};
  try {
    payload = (await request.json()) as AiRequest;
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON payload.' },
      { status: 400 }
    );
  }

  const title = payload.title?.toString() ?? '';
  const content = payload.content?.toString() ?? '';

  if (!title && !content) {
    return NextResponse.json({ error: 'Nothing to correct.' }, { status: 400 });
  }

  const model = process.env.OPENROUTER_MODEL ?? DEFAULT_MODEL;
  const referer = process.env.OPENROUTER_REFERER ?? 'http://localhost:3000';

  const openRouterResponse = await fetch(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': referer,
        'X-Title': 'Thomasboom Blog Editor',
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        messages: [
          {
            role: 'system',
            content: [
              'You are a careful copy editor.',
              'Purpose: apply a light touch to smooth flow and fix errors, with small rephrases when clarity improves.',
              'Do:',
              '- Fix grammar, typos, spacing, and punctuation.',
              '- Make micro-clarity tweaks or short rephrases that do not change meaning.',
              'Do NOT:',
              '- Add or remove facts, sentences, paragraphs, or sections.',
              '- Rewrite for style, voice, or tone.',
              '- Change markdown structure, headings, or formatting.',
              'Keep meaning, tone, and markdown intact. Prefer single-word or single-phrase fixes, but short sentence-level edits are allowed. Always add a `.` to a end of a scenence.',
            ].join('\n'),
          },
          {
            role: 'user',
            content: [
              'Fix the following blog draft with the lightest possible touch for smoother flow (grammar, typos, spacing, micro-clarity).',
              'Return JSON ONLY with keys "title" and "content".',
              '',
              'Title:',
              title,
              '',
              'Content:',
              content,
            ].join('\n'),
          },
        ],
      }),
    }
  );

  if (!openRouterResponse.ok) {
    const text = await openRouterResponse.text();
    return NextResponse.json(
      { error: `OpenRouter error (${openRouterResponse.status}): ${text}` },
      { status: 502 }
    );
  }

  const data = (await openRouterResponse.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const raw = data.choices?.[0]?.message?.content ?? '';
  let parsed: { title?: string; content?: string } | null = null;

  try {
    parsed = JSON.parse(raw);
  } catch {
    const match = raw.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        parsed = JSON.parse(match[0]);
      } catch {
        parsed = null;
      }
    }
  }

  return NextResponse.json({
    title: typeof parsed?.title === 'string' ? parsed.title : title,
    content: typeof parsed?.content === 'string' ? parsed.content : content,
  });
}
