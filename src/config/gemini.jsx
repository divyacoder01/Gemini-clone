import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const API_KEY = "AIzaSyBox26gOJv2EzcfWXlzDl0cqGymLQQ62uU";
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 200,
  responseMimeType: "text/plain",
};

async function runChat(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
    ],
  });

  const result = await chatSession.sendMessage(prompt);
  const response = result.response.text();

    // Beautify the response
    const beautifiedResponse = formatResponse(response);
    console.log(beautifiedResponse);
    return beautifiedResponse;
}

function formatResponse(response) {
  // Add line breaks or formatting for a cleaner look
  return response
    .split('. ') // Split sentences for better readability
    .map(sentence => `• ${sentence.trim()}.`) // Add bullets
    .join('\n\n'); // Join with double line breaks for spacing
}

export default runChat; 