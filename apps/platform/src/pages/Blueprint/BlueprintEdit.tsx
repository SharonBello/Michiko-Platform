import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';
import type { Blueprint } from '@michiko/types';
import { useEditBlueprint } from './edit/useEditBlueprint';
import { EditQuestionCard } from './edit/EditQuestionCard';
import { EditNPCCard } from './edit/EditNPCCard';
import styles from './BlueprintReview.module.scss';

export default function BlueprintEdit() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
    const [activeScene, setActiveScene] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        // Find approved blueprint for this game
        api.getBlueprintByGameId(id)
            .then(setBlueprint)
            .catch(() => navigate(`/games/${id}`))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className={styles.loading}><span className={styles.spinner} /></div>;
    if (!blueprint) return null;

    return <BlueprintEditInner blueprint={blueprint} gameId={id!} />;
}

function BlueprintEditInner({ blueprint: initial, gameId }: { blueprint: Blueprint; gameId: string }) {
    const navigate = useNavigate();
    const [activeScene, setActiveScene] = useState(0);
    const { blueprint, updateQuestion, updateNPC, deleteQuestion, save, saving, saved } =
        useEditBlueprint(initial);

    const scene = blueprint.scenes[activeScene];

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <img src="/logo.png" alt="Michiko VR" className={styles.logo} />
                    <div>
                        <h1 className={styles.title}>{blueprint.title}</h1>
                        <p className={styles.meta}>{blueprint.theme}</p>
                    </div>
                </div>
                <div className={styles.headerRight}>
                    <button className={styles.saveBtn} onClick={() => navigate(`/games/${gameId}`)} disabled={saving}>
                        ← Back
                    </button>
                    <button className={styles.approveBtn} onClick={async () => { await save(); navigate(`/games/${gameId}`); }} disabled={saving}>
                        {saved ? '✓ Saved' : saving ? 'Saving…' : 'Save changes'}
                    </button>
                </div>
            </div>

            <div className={styles.body}>
                <aside className={styles.sceneList}>
                    <div className={styles.sceneListTitle}>Scenes</div>
                    {blueprint.scenes.map((s, i) => (
                        <button
                            key={s.id}
                            className={`${styles.sceneBtn} ${i === activeScene ? styles.sceneBtnActive : ''}`}
                            onClick={() => setActiveScene(i)}
                        >
                            <span className={styles.sceneNum}>{i + 1}</span>
                            <span className={styles.sceneName}>{s.name}</span>
                            <span className={styles.sceneQCount}>{s.questions.length}q</span>
                        </button>
                    ))}
                </aside>

                <div className={styles.detail}>
                    <div className={styles.sceneHeader}>
                        <h2 className={styles.sceneName2}>{scene.name}</h2>
                        <p className={styles.sceneDesc}>{scene.description}</p>
                    </div>

                    {scene.npcs.length > 0 && (
                        <div className={styles.section}>
                            <div className={styles.sectionTitle}>NPCs</div>
                            {scene.npcs.map(npc => (
                                <EditNPCCard
                                    key={npc.id}
                                    npc={npc}
                                    onChange={patch => updateNPC(scene.id, npc.id, patch)}
                                />
                            ))}
                        </div>
                    )}

                    {scene.questions.length > 0 && (
                        <div className={styles.section}>
                            <div className={styles.sectionTitle}>Questions ({scene.questions.length})</div>
                            <div className={styles.qList}>
                                {scene.questions.map((q, i) => (
                                    <EditQuestionCard
                                        key={q.id}
                                        question={q}
                                        index={i}
                                        onChange={patch => updateQuestion(scene.id, q.id, patch)}
                                        onDelete={() => deleteQuestion(scene.id, q.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}