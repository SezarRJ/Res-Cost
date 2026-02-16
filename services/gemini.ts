
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
      contents: `بصفتك خبير في تسعير المطاعم، اقترح 3 خيارات سعرية لطبق "${dishName}". تكلفة الطبق الإجمالية هي ${cost} ${currency} والهامش المستهدف هو ${targetMargin}%.
      قم بتوفير خيار محافظ (Conservative)، متوازن (Balanced)، وهجومي (Aggressive).
      اشرح السبب لكل خيار وتأثيره المتوقع على جذب الزبائن في السوق المحلي.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            conservative: { type: Type.NUMBER, description: 'Slightly lower price for high volume' },
            balanced: { type: Type.NUMBER, description: 'The ideal price to hit target margin' },
            aggressive: { type: Type.NUMBER, description: 'Premium pricing for high perceived value' },
            reasoning: { type: Type.STRING, description: 'Detailed reasoning for the balanced choice in Arabic' },
          },
          required: ["conservative", "balanced", "aggressive", "reasoning"],
        },
      },
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("AI Price Guidance Error:", error);
    const base = cost / (1 - targetMargin / 100);
    return {
      conservative: Math.ceil(base * 0.92 / 250) * 250,
      balanced: Math.ceil(base / 250) * 250,
      aggressive: Math.ceil(base * 1.15 / 250) * 250,
      reasoning: "تم حساب السعر بناءً على الهامش المستهدف تلقائياً كإجراء احتياطي."
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
      contents: `بصفتك مساعد مطبخ ذكي، راجع مكونات وصفة "${dishName}". 
      حدد المكونات التي قد تحتاج لتعديل في الكمية أو الوحدة لتكون مطابقة لمعايير المطاعم الاحترافية. 
      المكونات: ${JSON.stringify(ingredients)}. 
      إذا كانت الكمية 0، اقترح كمية منطقية بناءً على الوصفة التقليدية للطبق.`,
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
              reason: { type: Type.STRING, description: 'Reason for modification in Arabic' },
            },
            required: ["ingredientIndex", "originalName", "suggestedQuantity", "suggestedUnit", "reason"],
          }
        },
      },
    });

    const text = response.text || '[]';
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Recipe Assistant Error:", error);
    return [];
  }
};
