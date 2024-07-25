require('dotenv').config();
const { OpenAI } = require('openai');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function extractKeywords(text) {
  const prompt = `
    Extract the main keywords from the following text. Respond strictly in the following JSON format:
    
    {
      "keywords": ["keyword1", "keyword2", "keyword3"]
    }
    
    Text: "${text}"
  `;

  const completion = await client.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant designed to output JSON.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-4o-mini',
    response_format: { type: 'json_object' },
  });

  const keywordsResponse = completion.choices[0].message.content.trim();
  try {
    const jsonResponse = JSON.parse(keywordsResponse);
    if (Array.isArray(jsonResponse.keywords)) {
      return jsonResponse.keywords;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('Failed to parse GPT response:', error);
    return [];
  }
}

async function recommendCategory(keywords, categories) {
  const prompt = `
    Based on the following keywords, recommend the most suitable category from the list of categories provided. 
    Note: Place a lower priority on keywords related to stress relief activities compared to other general keywords. 
    Respond strictly in the following JSON format:
    
    {
      "recommendedCategory": "category_name"
    }
    
    Keywords: ["${keywords.join('", "')}"]
    Categories: ["${categories.join('", "')}"]
  `;

  const completion = await client.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant designed to output JSON.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-4o-mini',
    response_format: { type: 'json_object' },
  });

  const recommendedCategoryResponse =
    completion.choices[0].message.content.trim();
  try {
    const jsonResponse = JSON.parse(recommendedCategoryResponse);
    if (typeof jsonResponse.recommendedCategory === 'string') {
      return jsonResponse.recommendedCategory;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('Failed to parse GPT response:', error);
    return null;
  }
}

module.exports = {
  extractKeywords,
  recommendCategory,
};
