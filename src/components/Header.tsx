import React from "react";
import { Brain } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo + Title */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg">
              <Brain className="w-7 h-7 text-white drop-shadow-md" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                PromptOptimizer
              </h1>
              <p className="text-sm text-gray-400">
                Transform prompts into powerful JSON structures
              </p>
            </div>
          </div>

          {/* Powered by Badge */}
          <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl shadow-md">
            <a 
              href="https://www.linkedin.com/in/aaryan-srivastava-1912a6270/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-300 hover:text-blue-400 hover:scale-105 transition-all duration-200 cursor-pointer">
              Made by Aaryan💙
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
