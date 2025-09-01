import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Copy,
  CheckCircle,
  Download,
  Lightbulb,
  Target,
  Palette,
  FileText,
  Tag,
  ChevronDown,
  ChevronUp,
  Edit3,
} from "lucide-react";

interface JsonOutputProps {
  result: any;
  onEditPrompt?: (prompt: string) => void;
}

export const JsonOutput: React.FC<JsonOutputProps> = ({ result, onEditPrompt }) => {
  const [copied, setCopied] = useState(false);
  const [showAllEntities, setShowAllEntities] = useState(false);
  const [showFullFormat, setShowFullFormat] = useState(false);
  const [showFullPrompt, setShowFullPrompt] = useState(false);

  if (!result) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(result, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleDownload = () => {
    const dataStr = JSON.stringify(result, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "optimized-prompt.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  // Helper function to truncate text
  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Helper function to get display entities
  const getDisplayEntities = () => {
    if (!result.entities || result.entities.length === 0) return [];
    if (showAllEntities || result.entities.length <= 3) return result.entities;
    return result.entities.slice(0, 3);
  };

  const hasMoreEntities = result.entities && result.entities.length > 3;
  const outputFormatText = result.output_format || "No format specified";
  const shouldTruncateFormat = outputFormatText.length > 100;
  const originalPromptText = result.original_prompt || "";
  const shouldTruncatePrompt = originalPromptText.length > 120;

  return (
    <div className="w-full space-y-6 mt-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-2">
          Optimized JSON Structure
        </h2>
        <p className="text-gray-400">
          Your prompt has been transformed into a structured format
        </p>
      </div>

      {/* Original Prompt */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 min-h-20 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <h3 className="font-semibold text-amber-300 text-sm">Original Prompt</h3>
          </div>
          <div className="flex items-center gap-2">
            {onEditPrompt && (
              <button
                onClick={() => onEditPrompt(originalPromptText)}
                className="text-amber-400 hover:text-amber-300 transition-colors flex-shrink-0 p-1 hover:bg-white/10 rounded-lg"
                title="Edit prompt"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            )}
            {shouldTruncatePrompt && (
              <button
                onClick={() => setShowFullPrompt(!showFullPrompt)}
                className="text-amber-400 hover:text-amber-300 transition-colors flex-shrink-0"
              >
                {showFullPrompt ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
        </div>
        <div className="flex-1">
          <p className="text-gray-200 leading-relaxed text-sm">
            {showFullPrompt || !shouldTruncatePrompt
              ? originalPromptText
              : truncateText(originalPromptText, 120)}
          </p>
        </div>
      </div>

      {/* Info Grid - Fixed Heights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 h-32 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-blue-400" />
            <h4 className="font-semibold text-blue-300">Task</h4>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-gray-200 text-sm leading-relaxed">
              {result.task || "No specific task identified"}
            </p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 h-32 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <Palette className="w-5 h-5 text-purple-400" />
            <h4 className="font-semibold text-purple-300">Style</h4>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-gray-200 text-sm leading-relaxed">
              {result.style || "No specific style specified"}
            </p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 h-32 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-400" />
              <h4 className="font-semibold text-green-300">Output Format</h4>
            </div>
            {shouldTruncateFormat && (
              <button
                onClick={() => setShowFullFormat(!showFullFormat)}
                className="text-green-400 hover:text-green-300 transition-colors"
              >
                {showFullFormat ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-gray-200 text-sm leading-relaxed">
              {showFullFormat || !shouldTruncateFormat
                ? outputFormatText
                : truncateText(outputFormatText)}
            </p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 h-32 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-orange-400" />
              <h4 className="font-semibold text-orange-300">Key Entities</h4>
            </div>
            {hasMoreEntities && (
              <button
                onClick={() => setShowAllEntities(!showAllEntities)}
                className="text-orange-400 hover:text-orange-300 transition-colors"
              >
                {showAllEntities ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="flex flex-wrap gap-2">
              {result.entities && result.entities.length > 0 ? (
                <>
                  {getDisplayEntities().map((entity: string, index: number) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded-full text-xs whitespace-nowrap"
                    >
                      {entity}
                    </span>
                  ))}
                  {hasMoreEntities && !showAllEntities && (
                    <span className="px-2 py-1 bg-orange-500/10 text-orange-400 rounded-full text-xs">
                      +{result.entities.length - 3} more
                    </span>
                  )}
                </>
              ) : (
                <span className="text-gray-400 text-sm">No entities identified</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* JSON Viewer */}
      <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="flex items-center justify-between p-4 bg-white/5 border-b border-white/10">
          <h3 className="font-bold text-gray-100">Complete JSON Structure</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-2 text-sm text-blue-400 hover:text-blue-300 hover:bg-white/10 rounded-lg transition-all"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy JSON
                </>
              )}
            </button>
          </div>
        </div>
        <div className="max-h-96 overflow-auto">
          <SyntaxHighlighter
            language="json"
            style={oneDark}
            customStyle={{
              margin: 0,
              borderRadius: 0,
              fontSize: "14px",
              lineHeight: "1.6",
              padding: "20px",
              background: "transparent",
            }}
          >
            {JSON.stringify(result, null, 2)}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};