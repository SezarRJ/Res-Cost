
import { GoogleGenAI, Type } from "@google/genai";
import { AIPriceRecommendation } from "../types";

// Correctly initialize GoogleGenAI with the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface AISuggestion {
  ingredientIndex: number;
  originalName: string;
  suggestedQuantity: number;
  suggestedUnit: string;
  reason: string;
}

export const getAIPriceGuidance = async (
  dishName: string,
  cost: number,
  currency: string,
  targetMargin: number
): Promise<AIPriceRecommendation> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `بصفتك خبير في تسعير المطاعم في العراق، اقترح 3 خيارات سعرية لطبق "${dishName}" تكلفت الهامش المستهدف هو ${targetMargin}%. تكلفة الطبق هي ${cost} ${currency}.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            conservative: { type: Type.NUMBER, description: 'Conservative price' },
            balanced: { type: Type.NUMBER, description: 'Balanced price' },
            aggressive: { type: Type.NUMBER, description: 'Aggressive price' },
            reasoning: { type: Type.STRING, description: 'Reasoning in Arabic' },
          },
          required: ["conservative", "balanced", "aggressive", "reasoning"],
        },
      },
    });

    // Access the text property directly from the response.
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("AI Price Guidance Error:", error);
    const base = cost / (1 - targetMargin / 100);
    return {
      conservative: Math.ceil(base * 0.95 / 250) * 250,
      balanced: Math.ceil(base / 250) * 250,
      aggressive: Math.ceil(base * 1.1 / 250) * 250,
      reasoning: "تم حساب السعر بناءً على الهامش المستهدف تلقائياً (فشل في استدعاء الذكاء الاصطناعي)."
    };
  }
};

export const getAIRecipeAssistantSuggestions = async (
  dishName: string,
  ingredients: { name: string; quantity: number; unit: string }[]
): Promise<AISuggestion[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `بصفتك مساعد مطبخ ذكي، قم بمراجعة مكونات وصفة "${dishName}". اقترح تصحيحات للكميات أو الوحدات المفقودة أو غير المنطقية. المكونات الحالية: ${JSON.stringify(ingredients)}. ركز على المقادير القياسية للمطاعم في الشرق الأوسط. إذا كانت الكمية 0 أو الوحدة فارغة، استنتج القيمة المنطقية لهذا الطبق.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              ingredientIndex: { type: Type.INTEGER },
              originalName: { type: Type.STRING },
              suggestedQuantity: { type: Type.NUMBER },
              suggestedUnit: { type: Type.STRING },
              reason: { type: Type.STRING, description: 'Reasoning in Arabic' },
            },
            required: ["ingredientIndex", "originalName", "suggestedQuantity", "suggestedUnit", "reason"],
          }
        },
      },
    });

    // Access the text property directly from the response.
    const text = response.text || '[]';
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Recipe Assistant Error:", error);
    return [];
  }
};
