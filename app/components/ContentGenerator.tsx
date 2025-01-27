'use client'

import { useState } from 'react';

interface ContentGeneratorProps {
  onGenerate: (content: string, platforms: string[]) => void;
}

export default function ContentGenerator({ onGenerate }: ContentGeneratorProps) {
  const [content, setContent] = useState('');
  const [platforms, setPlatforms] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(content, platforms);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter your content here"
        className="w-full p-2 border rounded"
        rows={4}
      />
      <div>
        <label className="block mb-2">Select platforms:</label>
        {['Facebook', 'Twitter', 'LinkedIn', 'Instagram'].map((platform) => (
          <label key={platform} className="inline-flex items-center mr-4">
            <input
              type="checkbox"
              value={platform}
              checked={platforms.includes(platform)}
              onChange={(e) => {
                if (e.target.checked) {
                  setPlatforms([...platforms, platform]);
                } else {
                  setPlatforms(platforms.filter((p) => p !== platform));
                }
              }}
              className="mr-2"
            />
            {platform}
          </label>
        ))}
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Generate
      </button>
    </form>
  );
}
