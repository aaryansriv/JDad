import React, { useState, useEffect } from "react";
import { Sparkles, Send } from "lucide-react";

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
  initialPrompt?: string; // Add optional initial prompt prop
}

const examplePrompts = [
  "Write a product description for a new smartphone",
  "Create a marketing email for a fitness app",
  "Generate a blog post about sustainable living",
  "Write code documentation for a React component",
];

export const PromptInput: React.FC<PromptInputProps> = ({
  onSubmit,
  isLoading,
  initialPrompt = "", // Default to empty string
}) => {
  const [prompt, setPrompt] = useState(initialPrompt);

  // Update prompt when initialPrompt changes (for edit functionality)
  useEffect(() => {
    setPrompt(initialPrompt);
  }, [initialPrompt]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt.trim());
    }
  };

  const useExample = (example: string) => {
    setPrompt(example);
  };

  return (
    <div className="w-full space-y-6">
      {/* Title */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Transform Your Prompt
        </h2>
        <p className="text-gray-400 leading-relaxed">
          Enhance your prompt for better GPT performance
        </p>
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            className="w-full h-40 px-5 py-4 bg-white/5 border border-white/10 rounded-2xl resize-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 placeholder-gray-500 text-gray-100"
            disabled={isLoading}
          />
          <div className="absolute bottom-4 right-4 text-xs text-gray-500 bg-black/30 px-2 py-1 rounded-md">
            {prompt.length}/1000
          </div>
        </div>

        <button
          type="submit"
          disabled={!prompt.trim() || isLoading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-700 disabled:to-gray-700 text-white px-6 py-4 rounded-2xl font-semibold transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Optimizing...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Optimize Prompt
            </>
          )}
        </button>
      </form>

      {/* Example Prompts */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
          <Send className="w-4 h-4 text-blue-400" />
          Try these examples:
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {examplePrompts.map((example, index) => (
            <button
              key={index}
              onClick={() => useExample(example)}
              className="text-left p-4 text-sm text-gray-200 bg-white/5 hover:bg-white/10 rounded-2xl transition-all duration-200 border border-white/10 hover:border-blue-400/50 hover:shadow-lg"
              disabled={isLoading}
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};