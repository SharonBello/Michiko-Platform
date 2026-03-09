import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { Blueprint, GameScene } from '@michiko/types';
import styles from './BlueprintReview.module.scss';
import { api } from './../../lib/api';

export default function BlueprintReview() {
    const navigate = useNavigate();
    const location = useLocation();
    const blueprint = (location.state as { blueprint: Blueprint } | null)?.blueprint;

    const [activeScene, setActiveScene] = useState(0);
    const [approved, setApproved] = useState(false);

    if (!blueprint) {
        navigate('/');
        return null;
    }

    async function handleApprove() {
        if (!blueprint?.id) return;
        await api.approveBlueprint(blueprint.id);
        navigate(`/game/${blueprint.id}`);
    }

    const scene: GameScene = blueprint.scenes[activeScene];

    return (
        <div className={styles.page}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <img src="/logo.png" alt="Michiko VR" className={styles.logo} />
                    <div>
                        <h1 className={styles.title}>{blueprint.title}</h1>
                        <p className={styles.meta}>
                            {blueprint.subject} · {blueprint.ageGroup} yrs · {blueprint.mechanic} · {blueprint.theme}
                        </p>
                    </div>
                </div>
                <div className={styles.headerRight}>
                    <span className={styles.statPill}>{blueprint.totalQuestions} questions</span>
                    <span className={styles.statPill}>~{blueprint.estimatedDuration} min</span>
                    <button
                        className={`${styles.approveBtn} ${approved ? styles.approveDone : ''}`}
                        onClick={handleApprove}
                        disabled={approved}
                    >
                        {approved ? '✓ Approved — building…' : '✦ Approve & Build'}
                    </button>
                </div>
            </div>

            <div className={styles.body}>
                {/* Scene list */}
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

                {/* Scene detail */}
                <div className={styles.detail}>
                    <div className={styles.sceneHeader}>
                        <h2 className={styles.sceneName2}>{scene.name}</h2>
                        <p className={styles.sceneDesc}>{scene.description}</p>
                    </div>

                    {/* NPCs */}
                    {scene.npcs.length > 0 && (
                        <div className={styles.section}>
                            <div className={styles.sectionTitle}>NPCs</div>
                            {scene.npcs.map(npc => (
                                <div key={npc.id} className={styles.npcCard}>
                                    <div className={styles.npcAvatar}>{npc.name.charAt(0)}</div>
                                    <div>
                                        <div className={styles.npcName}>{npc.name}
                                            <span className={styles.npcRole}>{npc.role}</span>
                                        </div>
                                        <div className={styles.npcDialogue}>"{npc.dialogue}"</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Questions */}
                    {scene.questions.length > 0 && (
                        <div className={styles.section}>
                            <div className={styles.sectionTitle}>Questions ({scene.questions.length})</div>
                            <div className={styles.qList}>
                                {scene.questions.map((q, i) => (
                                    <div key={q.id} className={styles.qCard}>
                                        <div className={styles.qHeader}>
                                            <span className={styles.qNum}>Q{i + 1}</span>
                                            <span className={styles.qType}>{q.type}</span>
                                            <span className={styles.qPoints}>{q.points}pts</span>
                                        </div>
                                        <div className={styles.qText}>{q.text}</div>
                                        {q.options && (
                                            <div className={styles.qOptions}>
                                                {q.options.map((opt, oi) => (
                                                    <span
                                                        key={oi}
                                                        className={`${styles.qOption} ${opt === q.correctAnswer ? styles.qCorrect : ''}`}
                                                    >
                                                        {opt === q.correctAnswer && '✓ '}{opt}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {scene.questions.length === 0 && scene.npcs.length === 0 && (
                        <div className={styles.emptyScene}>No content in this scene yet.</div>
                    )}
                </div>
            </div>
        </div>
    );
}