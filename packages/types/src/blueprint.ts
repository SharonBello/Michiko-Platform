export type QuestionType = 'multiple-choice' | 'true-false' | 'fill-blank' | 'match' | 'voice';

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options?: string[];
  correctAnswer: string;
  points: number;
  hints: string[];
}

export interface NPC {
  id: string;
  name: string;
  dialogue: string;
  role: 'guide' | 'tutor' | 'challenger';
}

export interface GameScene {
  id: string;
  name: string;
  description: string;
  questions: Question[];
  npcs: NPC[];
  assetRefs: string[];
}

export interface Blueprint {
  id: string;
  gameId: string;
  title: string;
  subject: string;
  ageGroup: string;
  mechanic: string;
  theme: 'EduVerse' | 'ChronoWorld' | 'NexusAcademy';
  scenes: GameScene[];
  totalQuestions: number;
  estimatedDuration: number;
  status: 'pending' | 'approved' | 'building' | 'done';
  createdAt: Date;
}