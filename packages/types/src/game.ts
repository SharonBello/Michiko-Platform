export type GameStatus = 'draft' | 'building' | 'ready' | 'live' | 'archived';
export type AgeGroup = '5-7' | '7-9' | '9-11' | '11-14' | '12-15' | '14-18';
export type SubjectDomain = 'math' | 'science' | 'history' | 'language' | 'geography' | 'arts';
export type GameMechanic = 'quiz' | 'exploration' | 'challenge' | 'puzzle' | 'simulation';

export interface Game {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  subject: SubjectDomain;
  ageGroup: AgeGroup;
  mechanic: GameMechanic;
  theme: 'EduVerse' | 'ChronoWorld' | 'NexusAcademy';
  status: GameStatus;
  createdAt: Date;
  updatedAt: Date;
}
