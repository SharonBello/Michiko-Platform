import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export interface WizardInput {
    title: string;
    subject: string;
    topic: string;
    ageGroup: string;
    mechanic: string;
    theme: string;
    questionCount: number;
    questionTypes: string[];
    gameId: string;
}

export async function generateBlueprint(input: WizardInput) {
    const prompt = buildPrompt(input);

    const message = await client.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 4000,
        system: `You are a VR educational game designer. 
Generate structured game blueprints as valid JSON only. 
No explanation, no markdown, no backticks. Pure JSON only.`,
        messages: [{ role: 'user', content: prompt }],
    });

    const text = (message.content[0] as { text: string }).text;
    const clean = text.replace(/```json|```/g, '').trim();
    return JSON.parse(clean);
}

function buildPrompt(input: WizardInput): string {
    return `Generate a VR educational game blueprint for:
- Title: "${input.title}"
- Subject: ${input.subject}
- Topic: ${input.topic}
- Age group: ${input.ageGroup} years old
- Game mechanic: ${input.mechanic}
- Visual theme: ${input.theme}
- Number of questions: ${input.questionCount}
- Question types: ${input.questionTypes.join(', ')}

Return a JSON object with exactly this structure:
{
  "gameId": "${input.gameId}",
  "title": "${input.title}",
  "theme": "${input.theme}",
  "scenes": [
    {
      "id": "scene-1",
      "name": "Scene name",
      "description": "What happens in this scene",
      "npcs": [
        {
          "id": "npc-1",
          "name": "NPC name",
          "role": "guide | villain | neutral",
          "dialogue": "What this NPC says to the player"
        }
      ],
      "questions": [
        {
          "id": "q-1",
          "type": "${input.questionTypes[0]}",
          "text": "Question text here?",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "answer": "Option A",
          "explanation": "Why this is correct"
        }
      ]
    }
  ]
}

Rules:
- Create exactly 3 scenes
- Distribute ${input.questionCount} questions across the 3 scenes
- Each scene must have 1-2 NPCs
- Make questions age-appropriate for ${input.ageGroup} year olds
- Questions must be specifically about "${input.topic}"
- Make the NPC names and scene names fit the "${input.theme}" theme`;
}