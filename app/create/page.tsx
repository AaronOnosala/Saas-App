'use client'

import { useState } from 'react';
import ContentGenerator from '../components/ContentGenerator';
import ContentDisplay from '../components/ContentDisplay';

export default function CreateScreen() {
  const [generatedContent, setGeneratedContent] = useState<Record<string, string>>({});

  const handleGenerate = async (content: string, platforms: string[]) => {
    const newContent: Record<string, string> = {};
    for (const platform of platforms) {
      try {
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content, platform }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        newContent[platform] = data.content || 'No content generated';
      } catch (error) {
        console.error(`Error generating content for ${platform}:`, error);
        newContent[platform] = `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
        // Add a user-friendly message for rate limit errors
        if (error instanceof Error && error.message.includes('rate limit exceeded')) {
          newContent[platform] = 'OpenAI API rate limit exceeded. Please try again later.';
        }
      }
    }
    setGeneratedContent(newContent);
  };

  const handleEdit = (platform: string, newContent: string) => {
    setGeneratedContent(prev => ({ ...prev, [platform]: newContent }));
  };

  const handleRegenerateContent = async (platform: string, prompt: string) => {
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: prompt, platform }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setGeneratedContent(prev => ({ ...prev, [platform]: data.content || 'No content generated' }));
    } catch (error) {
      console.error(`Error regenerating content for ${platform}:`, error);
      setGeneratedContent(prev => ({ ...prev, [platform]: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }));
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <ContentGenerator onGenerate={handleGenerate} />
      <div className="mt-8">
        {Object.entries(generatedContent).map(([platform, content]) => (
          <ContentDisplay
            key={platform}
            platform={platform}
            content={content}
            onEdit={handleEdit}
            onRegenerateContent={handleRegenerateContent}
          />
        ))}
      </div>
    </div>
  );
}
