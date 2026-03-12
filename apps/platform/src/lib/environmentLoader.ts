import type { EnvironmentConfig } from '@michiko/types';

const BASE = import.meta.env.VITE_API_URL ?? '';

let cache: EnvironmentConfig[] | null = null;

export async function loadEnvironments(): Promise<EnvironmentConfig[]> {
    if (cache) return cache;

    const res = await fetch(`${BASE}/api/environments`);
    if (!res.ok) throw new Error('Failed to fetch environments');
    const data = await res.json();
    cache = data.environments as EnvironmentConfig[];
    return cache;
}

export async function getEnvironmentConfig(
    id: string
): Promise<EnvironmentConfig | undefined> {
    const envs = await loadEnvironments();
    return envs.find(e => e.id === id);
}

export async function matchEnvironment(
    subject: string,
    topic: string
): Promise<EnvironmentConfig> {
    const envs = await loadEnvironments();
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

export function clearEnvironmentCache() {
    cache = null;
}