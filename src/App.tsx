import React, { useState, useEffect } from "react";
import { Brain, Sparkles, Zap, Cpu, FileJson, ChevronDown, Edit3 } from "lucide-react";
import { Header } from "./components/Header";
import { PromptInput } from "./components/PromptInput";
import { JsonOutput } from "./components/JsonOutput";
import { ErrorMessage } from "./components/ErrorMessage";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { initializeGroq, optimizePromptToJson, hasValidApiKey } from "./utils/groq";
import { JsonResponse } from "./types";
import { AnimatePresence, motion } from "framer-motion";
import { SparkleBackground } from "./components/SparkleBackground";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<JsonResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState(""); // Add state to track current prompt
  const apiKeyAvailable = hasValidApiKey();

  useEffect(() => {
    if (apiKeyAvailable) {
      try {
        initializeGroq();
      } catch (error) {
        setError("Failed to initialize Groq client. Please check your API key in .env file.");
      }
    }
  }, [apiKeyAvailable]);

  const handlePromptSubmit = async (prompt: string) => {
    if (!apiKeyAvailable) {
      setError("Please set your Groq API key in the .env file.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);
    setCurrentPrompt(prompt); // Store the current prompt

    try {
      const optimizedResult = await optimizePromptToJson({ prompt });
      setResult(optimizedResult);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPrompt = (promptToEdit: string) => {
    setCurrentPrompt(promptToEdit); // Set the prompt in PromptInput
    setResult(null); // Clear the result to go back to input view
    setError(null); // Clear any errors
  };

  const expandInput = () => {
    setResult(null);
    // Keep the current prompt so user can continue editing
  };

  const dismissError = () => setError(null);
  const reset = () => {
    setResult(null);
    setCurrentPrompt(""); // Clear the current prompt when resetting
  };

  if (!apiKeyAvailable) {
    return (
      <div className="min-h-screen bg-neutral-950 text-gray-100">
        <Header />
        <main className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-white">Setup Required</h1>
          <p className="text-gray-400 mt-4">
            Please add your Groq API key to the <code>.env</code> file to continue.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-gray-100">
       <SparkleBackground />
        <Header />

      <main className="max-w-3xl mx-auto px-4 py-10 space-y-8">
        {/* Hero */}
        <div className="text-center space-y-4">
          <div className="flex justify-center gap-3 items-center">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-xl">
              <Brain className="w-7 h-7 text-white" />
            </div>
            
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
            Prompt to JSON
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Transform natural language prompts into optimized JSON structures for enhanced LLM performance
          </p>
          <div className="flex justify-center gap-4 text-sm text-gray-500 mt-2">
            <span className="flex items-center gap-1"><Cpu className="w-4 h-4 text-blue-400" /> Powered by Groq</span>
            <span className="flex items-center gap-1"><Sparkles className="w-4 h-4 text-emerald-400" /> AI-Optimized</span>
            <span className="flex items-center gap-1"><Zap className="w-4 h-4 text-amber-400" /> Lightning Fast</span>
          </div>
        </div>

        {/* Error Message */}
        {error && <ErrorMessage message={error} onDismiss={dismissError} />}

        {/* Input + Output (stacked with animation) */}
        <div className="space-y-6">
          {/* PromptInput */}
          <motion.div
            layout
            animate={{
              height: result ? "120px" : "auto",
              opacity: result ? 0.7 : 1,
            }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl relative"
          >
            {/* Clickable overlay when collapsed */}
            {result && (
              <div 
                onClick={expandInput}
                className="absolute inset-0 z-10 cursor-pointer hover:bg-white/5 transition-all duration-200 flex items-center justify-center"
              >
                <div className="text-center">
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:from-blue-300 hover:to-purple-400 transition-all">
                    
                  </h3>
                  <p className="text-sm text-gray-400 hover:text-gray-300 mt-1">
                    
                  </p>
                </div>
              </div>
            )}
            
            <PromptInput 
              onSubmit={handlePromptSubmit} 
              isLoading={isLoading}
              initialPrompt={currentPrompt} // Pass the current prompt to PromptInput
            />
          </motion.div>

          {/* JsonOutput */}
          <AnimatePresence>
            {result && (
              <motion.div
                key="output"
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl"
              >
                {isLoading ? (
                  <div className="py-10">
                    <LoadingSpinner />
                    <p className="text-center text-gray-400 mt-4">Optimizing your prompt...</p>
                  </div>
                ) : (
                  <JsonOutput 
                    result={result} 
                    onEditPrompt={handleEditPrompt} // Pass the edit handler
                  />
                )}
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
      </main>
    </div>
  );
}

export default App;