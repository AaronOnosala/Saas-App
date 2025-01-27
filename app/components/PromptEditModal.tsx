'use client'

import { useState } from 'react';

interface PromptEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newPrompt: string) => void;
  initialPrompt: string;
}

export default function PromptEditModal({ isOpen, onClose, onSave, initialPrompt }: PromptEditModalProps) {
  const [prompt, setPrompt] = useState(initialPrompt);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Prompt</h2>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          rows={6}
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button onClick={() => onSave(prompt)} className="px-4 py-2 bg-blue-500 text-white rounded">
            Save & Regenerate
          </button>
        </div>
      </div>
    </div>
  );
}
