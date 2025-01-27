import OpenAI from 'openai';

console.log('OPENAI_API_KEY:', process.env.NEXT_PUBLIC_OPENAI_API_KEY ? 'Set' : 'Not set');

if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set in the environment variables');
}

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

export async function generateContent(prompt: string, platform: string, apiKey: string): Promise<string> {
  const openai = new OpenAI({ apiKey });

  try {
    console.log(`Generating content for platform: ${platform}`);
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant that repurposes content for social media platforms." },
        { role: "user", content: `Repurpose the following content for a ${platform} post:\n\n${prompt}` }
      ],
    });

    if (!response.choices[0].message?.content) {
      throw new Error('No content generated from OpenAI');
    }

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Detailed error in generateContent:', error);
    if (error instanceof Error) {
      if (error.message.includes('429') || error.message.includes('exceeded your current quota')) {
        throw new Error('OpenAI API rate limit exceeded. Please try again later or check your plan.');
      }
      throw new Error(`Failed to generate content: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while generating content');
    }
  }
}