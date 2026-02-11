
import { GoogleGenAI } from "@google/genai";

const MODEL_NAME = 'gemini-2.5-flash-image';

<<<<<<< Updated upstream
function handleGeminiError(error: any): string {
  console.error("Gemini API Error Detail:", error);
  const errorMessage = error?.message || String(error);
  
  if (errorMessage.includes('429') || errorMessage.includes('RESOURCE_EXHAUSTED')) {
    if (errorMessage.includes('limit: 0')) {
      return "Model Availability Error: This specific AI model (Gemini 2.5 Flash Image) appears to be restricted for your API key or region. Please check your Google AI Studio project settings or try a different key.";
    }
    return "Rate Limit Exceeded: You've hit the free tier quota. Please wait about 60 seconds and try your request again.";
  }
  
  if (errorMessage.includes('500') || errorMessage.includes('Internal Server Error')) {
    return "AI Studio is currently experiencing heavy load. Please try again in a few moments.";
  }

  if (errorMessage.includes('API_KEY_INVALID')) {
    return "Invalid API Key: Please check your configuration and ensure your API key is correct.";
  }

  return `AI Generation Error: ${errorMessage.split('\n')[0]}`;
}

export async function generateHeadshot(base64Image: string, stylePrompt: string): Promise<string> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image.split(',')[1],
              mimeType: 'image/png',
            },
          },
          {
            text: `Please transform this casual photo into a professional headshot. Use the following style description: ${stylePrompt}. Maintain the person's facial features and likeness while upgrading the clothing, lighting, and background to look professional and high-quality. Only return the image.`,
          },
        ],
      },
    });

    const candidate = response.candidates?.[0];
    if (!candidate?.content?.parts) {
      throw new Error("The model did not return a response. This can happen with very strict safety filters.");
    }

    for (const part of candidate.content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    throw new Error("No image data was generated. The AI might have refused the prompt.");
  } catch (error) {
    throw new Error(handleGeminiError(error));
  }
}

export async function editHeadshot(base64Image: string, editPrompt: string): Promise<string> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image.split(',')[1],
              mimeType: 'image/png',
            },
          },
          {
            text: `Based on this professional headshot, perform the following modification: ${editPrompt}. Ensure the person's facial likeness remains consistent. Only return the modified image.`,
          },
        ],
      },
    });

    const candidate = response.candidates?.[0];
    if (!candidate?.content?.parts) {
      throw new Error("The model did not return a response for the edit.");
    }

    for (const part of candidate.content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    throw new Error("No modified image was returned.");
  } catch (error) {
    throw new Error(handleGeminiError(error));
  }
=======
export async function generateHeadshot(base64Image: string, stylePrompt: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image.split(',')[1],
              mimeType: 'image/png',
            },
          },
          {
            text: `Please transform this casual photo into a professional headshot. Use the following style description: ${stylePrompt}. Maintain the person's facial features and likeness while upgrading the clothing, lighting, and background to look professional and high-quality. Only return the image.`,
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  } catch (error) {
    handleGeminiError(error);
  }



  throw new Error("No image data returned from Gemini");
}

export async function editHeadshot(base64Image: string, editPrompt: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image.split(',')[1],
              mimeType: 'image/png',
            },
          },
          {
            text: `Based on this professional headshot, perform the following modification: ${editPrompt}. Ensure the person's facial likeness remains consistent. Only return the modified image.`,
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  } catch (error) {
    handleGeminiError(error);
  }



  throw new Error("No image data returned from Gemini");
>>>>>>> Stashed changes
}

function handleGeminiError(error: any): never {
  console.error("Gemini API Error:", error);

  if (error.message?.includes("429") || error.status === 429 || error.message?.includes("quota")) {
    throw new Error("Daily quota exceeded. The free tier of Gemini API simulates a 'busy' studio. Please wait a minute and try again.");
  }

  throw error;
}
