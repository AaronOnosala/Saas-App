import { NextRequest, NextResponse } from 'next/server';
import { generateContent } from '../../utils/openai';

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not set in the environment variables');
    }

    const { content, platform } = await req.json();
    console.log('Received request:', { content, platform });
    const generatedContent = await generateContent(content, platform, apiKey);
    console.log('Generated content:', generatedContent);
    
    return NextResponse.json({ content: generatedContent });
  } catch (error) {
    console.error('Detailed error in POST /api/generate:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: error instanceof Error && error.message.includes('rate limit exceeded') ? 429 : 500 });
  }
}
