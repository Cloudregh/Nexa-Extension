import { GoogleGenAI } from '@google/genai'

const MODEL = 'gemini-2.5-flash' // or 'gemini-3.1-flash-lite' for even higher limits

const getApiKey = () => {
  return 'AIzaSyBl2bDN9lWzQCwrfa81mg4g8jKJWi_nMDc';
};

export async function generateAi(text: string, SYSTEM_PROMPT: string): Promise<string> {
  const apiKey = await getApiKey()

  const ai = new GoogleGenAI({ apiKey })

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [
      {
        role: 'user',
        parts: [{ text: `${SYSTEM_PROMPT}\n\n---\n\n${text}` }],
      },
    ],
  })

  return response.text ?? ''
}
