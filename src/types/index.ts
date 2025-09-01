// src/types/index.ts

export interface JsonResponse {
  original_prompt: string;
  task: string;
  entities: string[];
  constraints: string[];
  style: string;
  output_format: string;
  examples: string[];
}

// If you have error responses, you might also want:
export interface JsonResponseWithError extends JsonResponse {
  error?: string;
  raw_response?: string;
}