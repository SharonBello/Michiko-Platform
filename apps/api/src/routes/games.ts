import { Router } from 'express';
import { gamesCol } from '../lib/collections';

const router = Router();

// GET /api/games — list games for authenticated user
router.get('/', async (req, res) => {
    const ownerId = req.headers['x-user-id'] as string;
    if (!ownerId) return res.status(401).json({ error: 'Unauthorised' });

    try {
        const snap = await gamesCol()
            .where('ownerId', '==', ownerId)
            .orderBy('createdAt', 'desc')
            .get();

        const games = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        res.json(games);
    } catch (err) {
        console.error('GET /games error:', err);
        res.status(500).json({ error: 'Failed to fetch games' });
    }
});

// GET /api/games/:id — get single game
router.get('/:id', async (req, res) => {
    const ownerId = req.headers['x-user-id'] as string;
    if (!ownerId) return res.status(401).json({ error: 'Unauthorised' });

    try {
        const doc = await gamesCol().doc(req.params.id).get();
        if (!doc.exists) return res.status(404).json({ error: 'Game not found' });

        const data = doc.data()!;
        if (data.ownerId !== ownerId) return res.status(403).json({ error: 'Forbidden' });

        res.json({ id: doc.id, ...data });
    } catch (err) {
        console.error('GET /games/:id error:', err);
        res.status(500).json({ error: 'Failed to fetch game' });
    }
});

// POST /api/games — create game from wizard data
router.post('/', async (req, res) => {
    const ownerId = req.headers['x-user-id'] as string;
    if (!ownerId) return res.status(401).json({ error: 'Unauthorised' });

    const { title, subject, topic, ageGroup, mechanic, theme, questionCount, questionTypes } = req.body;

    if (!title || !subject || !mechanic || !theme) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const now = new Date().toISOString();
        const gameData = {
            ownerId,
            title,
            subject,
            topic,
            ageGroup,
            mechanic,
            theme,
            questionCount,
            questionTypes,
            status: 'building',
            description: `${subject} game about ${topic} for ${ageGroup} year olds.`,
            createdAt: now,
            updatedAt: now,
        };

        const ref = await gamesCol().add(gameData);
        res.status(201).json({ id: ref.id, ...gameData });
    } catch (err) {
        console.error('POST /games error:', err);
        res.status(500).json({ error: 'Failed to create game' });
    }
});

export default router;