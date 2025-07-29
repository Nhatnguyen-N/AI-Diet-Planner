import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
if (!apiKey) throw new Error("Thiếu API Key"); // Kiểm tra key
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const CalculateCaloriesAI = model.startChat({
  generationConfig,
  history: [],
});

export const GenerateAIRecipe = model.startChat({
  generationConfig,
  history: [],
});

export const GenerateRecipeImage = async (input) =>
  await fetch("https://modelslab.com/api/v6/realtime/text2img", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      key: process.env.EXPO_PUBLIC_MODELSLAB_API_KEY, //access api key from your dashboard,
      prompt: input,
      negative_prompt:
        "(worst quality:2), (low quality:2), (normal quality:2), (jpeg artifacts), (blurry), (duplicate), (morbid), (mutilated), (out of frame), (extra limbs), (bad anatomy), (disfigured), (deformed), (cross-eye), (glitch), (oversaturated), (overexposed), (underexposed), (bad proportions), (bad hands), (bad feet), (cloned face), (long neck), (missing arms), (missing legs), (extra fingers), (fused fingers), (poorly drawn hands), (poorly drawn face), (mutation), (deformed eyes), watermark, text, logo, signature, grainy, tiling, censored, nsfw, ugly, blurry eyes, noisy image, bad lighting, unnatural skin, asymmetry",
      samples: "1",
      height: "1024",
      width: "1024",
      safety_checker: false,
      seed: null,
      base64: false,
      webhook: null,
      track_id: null,
    }),
  });
