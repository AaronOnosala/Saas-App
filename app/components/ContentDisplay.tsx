'use client'

import { useState } from 'react';
import PromptEditModal from './PromptEditModal';

interface ContentDisplayProps {
  platform: string;
  content: string;
  onEdit: (platform: string, newContent: string) => void;
  onRegenerateContent: (platform: string, prompt: string) => void;
}

export default function ContentDisplay({
  platform,
  content,
  onEdit,
  onRegenerateContent,
}: ContentDisplayProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);

  const handleSave = () => {
    onEdit(platform, editedContent);
    setIsEditing(false);
  };

  const handlePromptSave = (newPrompt: string) => {
    onRegenerateContent(platform, newPrompt);
    setIsPromptModalOpen(false);
  };

  return (
    <div className="mb-4 p-4 border rounded">
      <h3 className="text-lg font-semibold mb-2">{platform}</h3>
      {isEditing ? (
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          rows={4}
        />
      ) : (
        <p className="mb-2">{content}</p>
      )}
      <div className="space-x-2">
        {isEditing ? (
          <button onClick={handleSave} className="px-3 py-1 bg-green-500 text-white rounded">
            Save
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="px-3 py-1 bg-blue-500 text-white rounded">
            Edit
          </button>
        )}
        <button
          onClick={() => setIsPromptModalOpen(true)}
          className="px-3 py-1 bg-purple-500 text-white rounded"
        >
          Edit Prompt
        </button>
        <button className="px-3 py-1 bg-green-500 text-white rounded">Publish</button>
      </div>
      <PromptEditModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
        onSave={handlePromptSave}
        initialPrompt={`Repurpose the following content for a ${platform} post:\n\n${content}`}
      />
    </div>
  );
}
