// services/AIService.js

// Example using Google Gemini AI (adjust based on your AI provider)
const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY; // Store this in environment variables
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent';


export const sendPrompt = async (prompt) => {
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    // Return in the format your component expects
    return {
      response: {
        text: () => data.candidates[0].content.parts[0].text
      }
    };

  } catch (error) {
    console.error('Error calling AI service:', error);
    throw error;
  }
};

// Alternative implementation for OpenAI GPT
export const sendPromptOpenAI = async (prompt) => {
  const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY';
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    return {
      response: {
        text: () => data.choices[0].message.content
      }
    };

  } catch (error) {
    console.error('Error calling OpenAI:', error);
    throw error;
  }
};