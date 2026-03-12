import Anthropic from '@anthropic-ai/sdk';
import type { Blueprint, SceneLayout, EnvironmentConfig, NPCArchetype } from '@michiko/types';
import { db } from '../lib/firestore';

const client = new Anthropic();

interface BlueprintInput {
  title: string;
  subject: string;
  topic: string;
  ageGroup: string;
  mechanic: string;
  theme: string;
  questionCount: number;
  questionTypes: string[];
  gameId: string;
  ownerId: string;
}

// ── Fetch all environment configs from Firestore ──────────────
async function loadEnvironments(): Promise<EnvironmentConfig[]> {
  const snap = await db.collection('environments').get();
  return snap.docs.map(d => d.data() as EnvironmentConfig);
}

// ── Score environments by keyword match ───────────────────────
function matchEnvironment(
  envs: EnvironmentConfig[],
  subject: string,
  topic: string
): EnvironmentConfig {
  const needle = `${subject} ${topic}`.toLowerCase();
  let best: EnvironmentConfig | undefined;
  let bestScore = 0;

  for (const env of envs) {
    let score = 0;
    for (const kw of env.topicKeywords) {
      if (needle.includes(kw.toLowerCase())) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      best = env;
    }
  }

  return best ?? envs.find(e => e.id === 'default') ?? envs[0]!;
}

// ── Format NPC archetypes for the prompt ──────────────────────
function formatArchetypes(npcs: NPCArchetype[]): string {
  return npcs.map(n =>
    `- Role: ${n.role} | Style: ${n.dialogueStyle} | Suggested names: ${n.names.slice(0, 3).join(', ')}`
  ).join('\n');
}

export async function generateBlueprint(input: BlueprintInput): Promise<Blueprint> {
  // Load environments and find best match
  const envs = await loadEnvironments();
  const envConfig = matchEnvironment(envs, input.subject, input.topic);

  const prompt = buildPrompt(input, envConfig);

  const message = await client.messages.create({
    model: 'claude-haiku-4-5',
    max_tokens: 4000,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = message.content
    .filter(b => b.type === 'text')
    .map(b => (b as { type: 'text'; text: string }).text)
    .join('');

  return parseBlueprint(text, input, envConfig);
}

function buildPrompt(input: BlueprintInput, env: EnvironmentConfig): string {
  return `You are an educational game designer. Create a detailed game blueprint as a single JSON object.

Topic: "${input.topic}"
Subject: ${input.subject}
Age group: ${input.ageGroup} year olds
Game mechanic: ${input.mechanic}
Total questions: ${input.questionCount}
Question types to use: ${input.questionTypes.join(', ')}

ENVIRONMENT (already selected for you — do not change it):
- id: "${env.id}"
- name: "${env.name}"
- description: "${env.description}"

SCENE LAYOUT (use these exact values):
- environment: "${env.id}"
- skyColor: "${env.palette.skyColor}"
- fogColor: "${env.palette.fogColor}"
- fogDensity: ${env.palette.fogDensity}
- groundColor: "${env.palette.groundColor}"
- lightColor: "${env.palette.lightColor}"
- ambientColor: "${env.palette.ambientColor}"
- accentColor: "${env.palette.accentColor}"

NPC ARCHETYPES FOR THIS ENVIRONMENT — use these to create NPCs that fit the world:
${formatArchetypes(env.npcs)}

Return ONLY a valid JSON object with this exact structure:
{
  "title": "engaging game title",
  "estimatedDuration": 15,
  "sceneLayout": {
    "environment": "${env.id}",
    "skyColor": "${env.palette.skyColor}",
    "fogColor": "${env.palette.fogColor}",
    "fogDensity": ${env.palette.fogDensity},
    "groundColor": "${env.palette.groundColor}",
    "lightColor": "${env.palette.lightColor}",
    "ambientColor": "${env.palette.ambientColor}",
    "accentColor": "${env.palette.accentColor}"
  },
  "scenes": [
    {
      "id": "scene-1",
      "name": "scene name that fits ${env.name}",
      "description": "scene description",
      "npcs": [
        {
          "id": "npc-1",
          "name": "pick a name from the archetype suggestions above",
          "role": "guide",
          "dialogue": "dialogue matching the archetype style, hinting at the questions"
        }
      ],
      "questions": [
        {
          "id": "q-1",
          "type": "multiple-choice",
          "text": "question text",
          "options": ["A", "B", "C", "D"],
          "answer": "A",
          "explanation": "why this is correct",
          "points": 10
        }
      ]
    }
  ]
}

Rules:
- Create exactly 3 scenes
- Distribute ${input.questionCount} questions across the 3 scenes
- Each scene must have 1-2 NPCs
- Use names and dialogue styles from the archetypes provided
- Make questions age-appropriate for ${input.ageGroup} year olds
- Questions must be specifically about "${input.topic}"
- For "match" type: options MUST use pipe format ["Left|Right", "Term|Definition"]
- For "true-false" type: options must be ["True", "False"], answer must be "True" or "False"
- For "multiple-choice" type: provide exactly 4 options
- Return ONLY the JSON object, no other text`;
}

function parseBlueprint(text: string, input: BlueprintInput, env: EnvironmentConfig): Blueprint {
  const clean = text
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim();

  let parsed: any;
  try {
    parsed = JSON.parse(clean);
  } catch {
    const match = clean.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('No valid JSON found in AI response');
    parsed = JSON.parse(match[0]);
  }

  const now = new Date().toISOString();

  // Always use the Firestore palette — never trust AI to invent colors
  const sceneLayout: SceneLayout = {
    environment: env.id,
    skyColor: env.palette.skyColor,
    fogColor: env.palette.fogColor,
    fogDensity: env.palette.fogDensity,
    groundColor: env.palette.groundColor,
    lightColor: env.palette.lightColor,
    ambientColor: env.palette.ambientColor,
    accentColor: env.palette.accentColor,
  };

  return {
    gameId: input.gameId,
    ownerId: input.ownerId,
    title: parsed.title ?? input.title,
    subject: input.subject,
    ageGroup: input.ageGroup,
    mechanic: input.mechanic,
    theme: input.theme,
    sceneLayout,
    scenes: parsed.scenes ?? [],
    totalQuestions: parsed.scenes?.reduce(
      (n: number, s: any) => n + (s.questions?.length ?? 0), 0
    ) ?? 0,
    estimatedDuration: parsed.estimatedDuration ?? 15,
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  };
}