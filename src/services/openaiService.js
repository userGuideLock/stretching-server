require('dotenv').config();
const { OpenAI } = require('openai');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateRecommendations(text, categories) {
  const prompt = `
    Based on the following text, perform the following tasks:
    1. Extract the main keywords.
    2. Recommend the most suitable category from the provided list of categories.
    3. Suggest a relevant wellness program based on the extracted keywords.
    4. Recommend appropriate daily healing content based on the extracted keywords.

    Note: Place a lower priority on keywords related to stress relief activities compared to other general keywords.

    The responses should be in Korean and each item should be a single word.

    Respond strictly in the following JSON format:

    {
      "keywords": ["키워드1", "키워드2", "키워드3"],
      "recommendedCategory": "카테고리명",
      "recommendedWellnessProgram": "프로그램명 (한 단어)",
      "recommendedHealingContent": "컨텐츠명 (구체적인 구문)"
    }

    Text: "${text}"
    Categories: ["${categories.join('", "')}"]
  `;

  const completion = await client.chat.completions.create({
    messages: [
      {
        role: 'system',
        content:
          'You are a helpful assistant designed to output JSON in a structured format.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-4o-mini',
    response_format: { type: 'json_object' },
  });

  const recommendationsResponse = completion.choices[0].message.content.trim();
  try {
    const jsonResponse = JSON.parse(recommendationsResponse);
    console.log(jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.error('Failed to parse GPT response:', error);
    return null;
  }
}

module.exports = {
  generateRecommendations,
};
