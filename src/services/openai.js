import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  throw new Error('OpenAI API key is missing. Please add it to your .env file.');
}

const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true
});

const shouldSkipToken = (token) => {
  // Skip empty tokens, whitespace, quotes, and special characters
  const skipPatterns = [
    /^[\s"'`]+$/, // whitespace or quotes only
    /^$/, // empty
    /^[\u200B-\u200D\uFEFF]$/, // zero-width spaces
  ];
  
  return skipPatterns.some(pattern => pattern.test(token));
};

export async function getTokenPredictions(text) {
  try {
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: text,
      max_tokens: 1,
      temperature: 0.7,
      n: 20, // Request more to account for filtered tokens
      logprobs: 20
    });

    // Process and filter predictions
    const processedTokens = new Map();

    response.choices.forEach((choice) => {
      const token = choice.text;
      const probability = Math.exp(choice.logprobs.token_logprobs[0]);

      // Skip unwanted tokens
      if (shouldSkipToken(token)) return;

      // For duplicates, keep the one with higher probability
      if (!processedTokens.has(token) || processedTokens.get(token).probability < probability) {
        processedTokens.set(token, { token, probability });
      }
    });

    // Convert to array, sort by probability, and take top 10
    return Array.from(processedTokens.values())
      .sort((a, b) => b.probability - a.probability)
      .slice(0, 10);

  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
}
