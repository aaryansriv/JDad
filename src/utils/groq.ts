// src/utils/groq.ts

export function initializeGroq() {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    
    if (!apiKey) {
      throw new Error("Missing GROQ API key. Please set VITE_GROQ_API_KEY in your .env file.");
    }
    return {
      baseUrl: "https://api.groq.com/openai/v1/chat/completions",
      apiKey,
    };
  }
  
  export async function optimizePromptToJson({ prompt }: { prompt: string }) {
    const { baseUrl, apiKey } = initializeGroq();
  
    console.log("Sending request to Groq API..."); // Debug log
  
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { 
            role: "system", 
            content: `You are an advanced Prompt-to-JSON Structurer. 


            Your goal is to transform ANY natural language instruction into a **rich, detailed JSON schema** that captures intent, structure, and all meaningful context.
            Rules:
                1. Output ONLY a valid JSON object.
                2. Do NOT include Markdown code blocks (no triple backticks).
                3. Do NOT include any explanation or text outside the JSON.
                4. Always include all keys, even if empty.
                5. If possible, enrich the JSON with subtasks, constraints, audience, expansions, etc.
            
            The JSON MUST always include the following fields:
            {
              "original_prompt": "<exact user text>",
              "task": "<clear restatement of what is being asked>",
              "entities": [ "all key subjects, objects, or themes" ],
              "subtasks": [ "list of smaller steps needed to complete the task" ],
              "constraints": [ "rules, formatting requirements, limitations" ],
              "style": "<tone, formality, or style cues>",
              "output_format": "<essay, code, list, json, plan, etc>",
              "audience": "<intended audience if inferable>",
              "examples": [ "explicit or implicit examples from the user" ],
              "expansion": [ "extra angles, subtopics, or details that would enrich the output" ]
            }
            
            ⚡ Guidelines:
            - Always keep ALL keys, even if empty.
            - Be precise, do not lose important details.
            - Expand vague prompts with logical subpoints and related aspects.
            - Output ONLY valid JSON with no commentary.` 
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.1, // Lower temperature for more consistent JSON output
        max_tokens: 2048,
      }),
    });
  
    console.log("Response status:", response.status); // Debug log
  
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error Response:", errorText); // Debug log
      
      try {
        const errorJson = JSON.parse(errorText);
        throw new Error(`Groq API error: ${errorJson.error?.message || response.statusText}`);
      } catch {
        throw new Error(`Groq API error: ${response.status} ${response.statusText}`);
      }
    }
  
    const data = await response.json();
    console.log("Full API Response:", data); // Debug log
  
    // Extract the content from the API response
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      throw new Error("No content received from API");
    }
  
    console.log("Raw content:", content); // Debug log
  
    // Try to parse the JSON content
    try {
      const jsonResult = JSON.parse(content);
      return jsonResult;
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      console.error("Content that failed to parse:", content);
      
      // If JSON parsing fails, return a structured error response
      return {
        original_prompt: prompt,
        task: "Failed to parse LLM response",
        entities: [],
        constraints: ["Error parsing JSON response"],
        style: "error",
        output_format: "error",
        examples: [],
        error: "The LLM response was not valid JSON",
        raw_response: content
      };
    }
  }
  
  export function hasValidApiKey(): boolean {
    return !!import.meta.env.VITE_GROQ_API_KEY;
  }