import styles from './NPCDialogue.module.scss';

interface Props {
    npcName: string;
    dialogue: string;
    onDismiss: () => void;
}

export function NPCDialogue({ npcName, dialogue, onDismiss }: Props) {
    return (
        <div className={styles.wrap}>
            <div className={styles.card}>
                <div className={styles.avatar}>{npcName[0]}</div>
                <div className={styles.body}>
                    <div className={styles.name}>{npcName}</div>
                    <p className={styles.text}>"{dialogue}"</p>
                    <button className={styles.btn} onClick={onDismiss}>
                        Start questions →
                    </button>
                </div>
            </div>
        </div>
    );
}