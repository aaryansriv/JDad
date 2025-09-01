import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PromptInput } from "./PromptInput";
import { JsonOutput } from "./JsonOutput";

export const PromptOptimizer: React.FC = () => {
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState("");

  const handleSubmit = async (prompt: string) => {
    setIsLoading(true);
    // Fake API delay
    setTimeout(() => {
      setResult({
        original_prompt: prompt,
        task: "Generate optimized JSON",
        style: "Concise",
        output_format: "JSON",
        entities: ["Prompt", "Optimization"],
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleEditPrompt = (prompt: string) => {
    setEditingPrompt(prompt);
    setResult(null);
  };

  const reset = () => {
    setResult(null);
    setEditingPrompt("");
  };

  return (
    <div className="space-y-3">
      {/* Input Panel */}
      <AnimatePresence mode="wait">
        {!result && (
          <motion.div
            key="input"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl"
          >
            <PromptInput 
              onSubmit={handleSubmit} 
              isLoading={isLoading} 
              initialPrompt={editingPrompt}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Output Panel */}
      <AnimatePresence>
        {result && (
          <motion.div
            key="json"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl"
          >
            <JsonOutput result={result} onEditPrompt={handleEditPrompt} />
            <div className="mt-6 text-center">
              <button
                onClick={reset}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all font-semibold shadow-lg"
              >
                New Prompt
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};