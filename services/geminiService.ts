import { GoogleGenAI } from "@google/genai";
import type { NewsData, NewsItem } from '../types';

export async function fetchAiWebEngineeringNews(): Promise<NewsData> {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Generate a list of the latest news items and trends regarding the use of Artificial Intelligence in web engineering from the last 7 days.
    Focus on recent developments, new tools, and notable projects.
    For each item, provide a clear title and a concise summary.
    IMPORTANT: Your response MUST be a valid JSON array of objects, where each object has a "title" and "summary" key.
    Do not include any other text, markdown, or formatting outside of the JSON array itself.
    Example: [{"title": "Example Title", "summary": "Example summary."}]
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    let responseText = response.text;
    
    // The model might wrap the JSON in markdown backticks. This removes them.
    const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch && jsonMatch[1]) {
        responseText = jsonMatch[1];
    } else if (responseText.startsWith('```') && responseText.endsWith('```')) {
      responseText = responseText.substring(3, responseText.length - 3);
    }
    
    const newsItems: NewsItem[] = JSON.parse(responseText.trim());
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];

    // The response for groundingChunks is not always in the expected format.
    // We filter here to ensure we only process chunks that have a valid `web` property.
    const validSources = sources.filter((s: any) => s && s.web && s.web.uri && s.web.title);

    return {
      newsItems,
      sources: validSources,
    };
  } catch (error) {
    console.error("Error fetching or parsing news from Gemini API:", error);
     if (error instanceof SyntaxError) {
        throw new Error("Failed to parse the news data. The format received was invalid.");
    }
    if (error instanceof Error) {
        throw new Error(`Failed to fetch news: ${error.message}`);
    }
    throw new Error("An unknown error occurred while fetching news.");
  }
}