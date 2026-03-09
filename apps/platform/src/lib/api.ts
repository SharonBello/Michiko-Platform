import type { Game, Blueprint, GameResult } from '@michiko/types';
import { auth } from './firebase';
import type { WizardData } from './../pages/GameWizard/GameWizard';

async function getHeaders(): Promise<Record<string, string>> {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  return {
    'Content-Type': 'application/json',
    'x-user-id': user.uid,
  };
}

export const api = {
  async getGames(): Promise<Game[]> {
    const res = await fetch('/api/games', { headers: await getHeaders() });
    if (!res.ok) throw new Error('Failed to fetch games');
    return res.json();
  },

  async getGame(id: string): Promise<Game> {
    const res = await fetch(`/api/games/${id}`, { headers: await getHeaders() });
    if (!res.ok) throw new Error('Failed to fetch game');
    return res.json();
  },

  async createGame(data: Omit<Game, 'id' | 'createdAt' | 'updatedAt' | 'ownerId'> & { topic?: string }): Promise<Game> {
    const res = await fetch('/api/games', {
      method: 'POST',
      headers: await getHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create game');
    return res.json();
  },

  async getBlueprint(id: string): Promise<Blueprint> {
    const res = await fetch(`/api/blueprints/${id}`, { headers: await getHeaders() });
    if (!res.ok) throw new Error('Failed to fetch blueprint');
    return res.json();
  },

  async saveBlueprint(blueprint: Omit<Blueprint, 'id'>): Promise<Blueprint> {
    const res = await fetch('/api/blueprints', {
      method: 'POST',
      headers: await getHeaders(),
      body: JSON.stringify(blueprint),
    });
    if (!res.ok) throw new Error('Failed to save blueprint');
    return res.json();
  },

  async approveBlueprint(id: string): Promise<void> {
    const res = await fetch(`/api/blueprints/${id}/approve`, {
      method: 'POST',
      headers: await getHeaders(),
    });
    if (!res.ok) throw new Error('Failed to approve blueprint');
  },

  async generateBlueprint(wizardData: WizardData & { gameId: string }): Promise<Blueprint> {
    const res = await fetch('/api/blueprints/generate', {
      method: 'POST',
      headers: await getHeaders(),
      body: JSON.stringify(wizardData),
    });
    if (!res.ok) throw new Error('Failed to generate blueprint');
    return res.json();
  },

  async getGameByCode(code: string): Promise<{ game: Game; blueprint: Blueprint }> {
    const res = await fetch(`/api/share/${code}`);
    if (!res.ok) throw new Error('Game not found');
    return res.json();
  },

  async getResults(gameId: string): Promise<GameResult[]> {
    const res = await fetch(`/api/results/${gameId}`, { headers: await getHeaders() });
    if (!res.ok) throw new Error('Failed to fetch results');
    return res.json();
  },

  async saveResult(result: Omit<GameResult, 'id' | 'playedAt'>): Promise<GameResult> {
    const res = await fetch('/api/results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result),
    });
    if (!res.ok) throw new Error('Failed to save result');
    return res.json();
  },

  async updateBlueprint(id: string, blueprint: Partial<Blueprint>): Promise<Blueprint> {
    const res = await fetch(`/api/blueprints/${id}`, {
      method: 'PUT',
      headers: await getHeaders(),
      body: JSON.stringify(blueprint),
    });
    if (!res.ok) throw new Error('Failed to update blueprint');
    return res.json();
  },

  async getBlueprintByGameId(gameId: string): Promise<Blueprint> {
    const res = await fetch(`/api/blueprints/by-game/${gameId}`, {
      headers: await getHeaders(),
    });
    if (!res.ok) throw new Error('Blueprint not found');
    return res.json();
  },

  async deleteGame(id: string): Promise<void> {
    const res = await fetch(`/api/games/${id}`, {
      method: 'DELETE',
      headers: await getHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete game');
  },

  async duplicateGame(id: string): Promise<Game> {
    const res = await fetch(`/api/games/${id}/duplicate`, {
      method: 'POST',
      headers: await getHeaders(),
    });
    if (!res.ok) throw new Error('Failed to duplicate game');
    return res.json();
  },
  
};