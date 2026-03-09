import { useState, useCallback } from 'react';
import type { Blueprint, GameScene, Question, NPC } from '@michiko/types';
import { api } from '../../../lib/api';

export function useEditBlueprint(initial: Blueprint) {
    const [blueprint, setBlueprint] = useState<Blueprint>(initial);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const updateQuestion = useCallback((
        sceneId: string,
        questionId: string,
        patch: Partial<Question>
    ) => {
        setBlueprint(prev => ({
            ...prev,
            scenes: prev.scenes.map(s =>
                s.id !== sceneId ? s : {
                    ...s,
                    questions: s.questions.map(q =>
                        q.id !== questionId ? q : { ...q, ...patch }
                    ),
                }
            ),
        }));
    }, []);

    const updateNPC = useCallback((
        sceneId: string,
        npcId: string,
        patch: Partial<NPC>
    ) => {
        setBlueprint(prev => ({
            ...prev,
            scenes: prev.scenes.map(s =>
                s.id !== sceneId ? s : {
                    ...s,
                    npcs: s.npcs.map(n =>
                        n.id !== npcId ? n : { ...n, ...patch }
                    ),
                }
            ),
        }));
    }, []);

    const deleteQuestion = useCallback((sceneId: string, questionId: string) => {
        setBlueprint(prev => ({
            ...prev,
            scenes: prev.scenes.map(s =>
                s.id !== sceneId ? s : {
                    ...s,
                    questions: s.questions.filter(q => q.id !== questionId),
                }
            ),
        }));
    }, []);

    async function save() {
        if (!blueprint.id) return;
        setSaving(true);
        try {
            await api.updateBlueprint(blueprint.id, { scenes: blueprint.scenes });
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } finally {
            setSaving(false);
        }
    }

    return { blueprint, updateQuestion, updateNPC, deleteQuestion, save, saving, saved };
}