import { useState } from 'react';

export type AiState = 'idle' | 'checking' | 'passed' | 'warning';

interface AiResult {
    valid: boolean;
    message: string;
}

async function fetchRelevanceCheck(subject: string, topic: string): Promise<AiResult> {
    try {
        const res = await fetch('/api/validate/topic', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ subject, topic }),
        });
        return await res.json();
    } catch {
        return { valid: true, message: '' };
    }
}

export function useAiValidation() {
    const [state, setState] = useState<AiState>('idle');
    const [message, setMessage] = useState('');

    async function check(subject: string, topic: string): Promise<boolean> {
        setState('checking');
        const result = await fetchRelevanceCheck(subject, topic);
        if (result.valid) {
            setState('passed');
            return true;
        } else {
            setState('warning');
            setMessage(result.message);
            return false;
        }
    }

    function reset() { setState('idle'); setMessage(''); }

    return { state, message, check, reset };
}