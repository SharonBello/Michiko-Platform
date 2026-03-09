import { db } from './firestore';

export const gamesCol = () => db.collection('games');
export const blueprintsCol = () => db.collection('blueprints');