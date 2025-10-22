import { GoogleGenAI, Type } from "@google/genai";
import { AiResponseData } from '../types';

// FIX: Per coding guidelines, initialize directly with process.env.API_KEY
// and assume it is available in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    answer: {
      type: Type.STRING,
      description: 'A clear, concise, and helpful answer to the student\'s question. Format using Markdown.',
    },
    videos: {
      type: Type.ARRAY,
      description: 'An array of up to 3 relevant YouTube video resources.',
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: 'The title of the video.' },
          url: { type: Type.STRING, description: 'The full URL of the YouTube video.' },
        },
        required: ['title', 'url'],
      },
    },
    quiz: {
      type: Type.OBJECT,
      description: 'A multiple-choice quiz question to test understanding.',
      properties: {
        question: { type: Type.STRING, description: 'The quiz question.' },
        options: {
          type: Type.ARRAY,
          description: 'An array of 4 possible answers.',
          items: { type: Type.STRING },
        },
        answer: { type: Type.STRING, description: 'The correct answer from the options.' },
      },
      required: ['question', 'options', 'answer'],
    },
  },
  required: ['answer', 'videos', 'quiz'],
};


export const generateAiResponse = async (prompt: string): Promise<AiResponseData> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      // FIX: Simplified `contents` for a single text prompt, per guidelines.
      contents: prompt,
      config: {
        systemInstruction: `You are ted.ai, a helpful AI assistant for university students. Your persona is like a friendly, knowledgeable librarian. Your goal is to help students learn and understand topics better, not to do their work for them. For the user's prompt, provide a clear, helpful answer formatted in Markdown. Also, find up to 3 relevant educational YouTube videos and provide one multiple-choice quiz question with 4 options and the correct answer to help them test their knowledge. Stay away from plagiarism and cite reliable sources implicitly through your expert-level answers.`,
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    // It's possible for the model to wrap the JSON in markdown backticks
    const cleanedJsonText = jsonText.replace(/^```json\n?/, '').replace(/```$/, '');
    
    const parsedData = JSON.parse(cleanedJsonText);
    
    // Basic validation
    if (!parsedData.answer || !Array.isArray(parsedData.videos) || !parsedData.quiz) {
        throw new Error("Received malformed data from AI.");
    }

    return parsedData as AiResponseData;
    
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to get a valid response from AI: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while contacting the AI.");
  }
};
