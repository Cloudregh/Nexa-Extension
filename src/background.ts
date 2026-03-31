import { generateAi } from './SWhelpers/aiGenerator'

// chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
//   console.log("Service Worker: I am awake!");

//   if (message.type === 'PROCESS_TEXT') {
//     generateNotes(message.text)
//       .then((result) => sendResponse({ result }))
//       .catch((err) =>
//         sendResponse({ error: err instanceof Error ? err.message : 'Unknown error' })
//       )
//     return true
//   }
// })



const cleanText = async (text: string) => {
  const systemPrompt = `
Act as a Transcription Architect. Clean raw, noisy STT data into a professional document.

RULES:
1. STRIP NOISE: Remove filler (um, uh, like), stutters, and false starts.
2. REPAIR: Fix phonetic STT errors using context (e.g., "react hooks" not "react books").
3. STRUCTURE: Add punctuation, paragraphs, and capitalization for readability.
4. FAITHFULNESS: Clean the "how," but never change the "what." 

OUTPUT:
- **Cleaned Transcript**: The polished text.
- **Summary**: 2-3 sentence overview.
- **Key Takeaways**: Bullet points of main facts.
- **Action Items**: Checklist of tasks/deadlines.

STRICT: No preamble. Start with "Cleaned Transcript". Use standard markdown formatting.
`;

return await generateAi(text, systemPrompt)
}


export const generateNotes = async (text: string) => {
  const cleaned = await cleanText(text)
  const systemPrompt = `
    Act as a Senior Executive Assistant. Analyze the provided CLEANED transcript to generate high-value notes.

    OBJECTIVES:
    1. SYNTHESIZE: Summarize the core purpose and outcome in 2-3 concise sentences.
    2. CATEGORIZE: Extract key concepts, data points, or decisions into a bulleted list.
    3. ACTIONABLE INTEL: List specific tasks, owners (if mentioned), and deadlines. If none, state "No specific action items."
    4. STRUCTURE: Use Markdown for maximum scannability (H2 for sections, bolding for emphasis).

    OUTPUT STRUCTURE:
    ## 📝 Summary
    [Overview]

    ## 💡 Key Takeaways
    - [Point 1]
    - [Point 2]

    ## ✅ Action Items
    - [ ] [Task]

    STRICT: No preamble. Start directly with "## 📝 Summary".
  `


  return await generateAi(cleaned, systemPrompt)
}