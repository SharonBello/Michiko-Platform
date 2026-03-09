import type { Blueprint, GameScene, Question } from '@michiko/types';
import type { WizardData } from '../pages/GameWizard/GameWizard';

function makeQuestions(data: WizardData): Question[] {
    const types = data.questionTypes;
    return Array.from({ length: data.questionCount }, (_, i) => ({
        id: `q-${i + 1}`,
        type: types[i % types.length] as Question['type'],
        text: `Sample question ${i + 1} about ${data.topic}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 'Option A',
        points: 10,
        hints: [`Think about what you know about ${data.topic}`],
    }));
}

function makeScenes(data: WizardData): GameScene[] {
    return [
        {
            id: 'scene-intro',
            name: 'Introduction Hub',
            description: `Welcome area introducing the ${data.topic} theme.`,
            questions: [],
            npcs: [
                { id: 'npc-guide', name: 'Guide', dialogue: `Welcome! Today we explore ${data.topic}.`, role: 'guide' },
            ],
            assetRefs: [],
        },
        {
            id: 'scene-main',
            name: 'Main Learning Zone',
            description: `Core gameplay area for ${data.subject} — ${data.topic}.`,
            questions: makeQuestions(data).slice(0, Math.ceil(data.questionCount * 0.7)),
            npcs: [
                { id: 'npc-tutor', name: 'Tutor', dialogue: 'Answer correctly to unlock the next area!', role: 'tutor' },
            ],
            assetRefs: [],
        },
        {
            id: 'scene-challenge',
            name: 'Challenge Room',
            description: 'Harder questions and bonus challenges.',
            questions: makeQuestions(data).slice(Math.ceil(data.questionCount * 0.7)),
            npcs: [],
            assetRefs: [],
        },
    ];
}

export function mockGenerateBlueprint(data: WizardData): Blueprint {
    return {
        id: `bp-${Date.now()}`,
        gameId: `game-${Date.now()}`,
        title: data.title || 'Untitled Game',
        subject: data.subject as Blueprint['subject'],
        ageGroup: data.ageGroup as Blueprint['ageGroup'],
        mechanic: data.mechanic as Blueprint['mechanic'],
        theme: data.theme as Blueprint['theme'],
        scenes: makeScenes(data),
        totalQuestions: data.questionCount,
        estimatedDuration: data.questionCount * 2,
        status: 'pending',
        createdAt: new Date(),
    };
}