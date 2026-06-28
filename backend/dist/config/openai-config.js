import OpenAI from "openai";
export const configureOpenAI = () => {
    return new OpenAI({
        apiKey: process.env.OPENROUTER_API_KEY,
        baseURL: 'https:openrouter.ai/api/v1'
    });
};
//# sourceMappingURL=openai-config.js.map