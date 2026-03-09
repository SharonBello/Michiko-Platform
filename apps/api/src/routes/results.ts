import { Router } from 'express';
import { db } from '../lib/firestore';

const router = Router();
const resultsCol = () => db.collection('results');

// POST /api/results — save player score (public)
router.post('/', async (req, res) => {
    try {
        const { gameId, blueprintId, playerName, score, total, timeSecs } = req.body;

        if (!gameId || !playerName) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const result = {
            gameId,
            blueprintId,
            playerName: playerName.trim(),
            score,
            total,
            timeSecs,
            playedAt: new Date().toISOString(),
        };

        const ref = await resultsCol().add(result);
        res.status(201).json({ id: ref.id, ...result });
    } catch (err) {
        console.error('POST /results error:', err);
        res.status(500).json({ error: 'Failed to save result' });
    }
});

// GET /api/results/:gameId — teacher views results (auth required)
router.get('/:gameId', async (req, res) => {
    const ownerId = req.headers['x-user-id'] as string;
    if (!ownerId) return res.status(401).json({ error: 'Unauthorised' });

    try {
        const snap = await resultsCol()
            .where('gameId', '==', req.params.gameId)
            .orderBy('playedAt', 'desc')
            .get();

        const results = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        res.json(results);
    } catch (err) {
        console.error('GET /results/:gameId error:', err);
        res.status(500).json({ error: 'Failed to fetch results' });
    }
});

export default router;