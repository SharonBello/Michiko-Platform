import type { Blueprint, GameScene, Question } from '@michiko/types';

export interface GameState {
    currentSceneIndex: number;
    currentQuestionIndex: number;
    score: number;
    totalQuestions: number;
    answered: Set<string>;
    complete: boolean;
}

export function initGameState(blueprint: Blueprint): GameState {
    const total = blueprint.scenes.reduce((n, s) => n + (s.questions?.length ?? 0), 0);
    return {
        currentSceneIndex: 0,
        currentQuestionIndex: 0,
        score: 0,
        totalQuestions: total,
        answered: new Set(),
        complete: false,
    };
}

export function getCurrentScene(blueprint: Blueprint, state: GameState): GameScene | null {
    return blueprint.scenes[state.currentSceneIndex] ?? null;
}

export function getCurrentQuestion(blueprint: Blueprint, state: GameState): Question | null {
    const scene = getCurrentScene(blueprint, state);
    return scene?.questions?.[state.currentQuestionIndex] ?? null;
}

export function answerQuestion(
    blueprint: Blueprint,
    state: GameState,
    answer: string
): GameState {
    const question = getCurrentQuestion(blueprint, state);
    if (!question || state.answered.has(question.id)) return state;

    const correct = answer === question.answer;
    const answered = new Set(state.answered);
    answered.add(question.id);

    const scene = getCurrentScene(blueprint, state)!;
    const qCount = scene.questions?.length ?? 0;
    const nextQIdx = state.currentQuestionIndex + 1;
    const nextScene = nextQIdx >= qCount;
    const nextSIdx = nextScene ? state.currentSceneIndex + 1 : state.currentSceneIndex;
    const complete = nextScene && nextSIdx >= blueprint.scenes.length;

    return {
        ...state,
        score: state.score + (correct ? 1 : 0),
        answered,
        currentSceneIndex: nextScene ? nextSIdx : state.currentSceneIndex,
        currentQuestionIndex: nextScene ? 0 : nextQIdx,
        complete,
    };
}