import { Router } from 'express';
import { db } from '../lib/firestore';

const router = Router();

// GET /api/environments — fetch all environment configs
router.get('/', async (_req, res) => {
    try {
        const snapshot = await db.collection('environments').get();
        const environments = snapshot.docs.map(doc => doc.data());
        res.json({ environments });
    } catch (err) {
        console.error('GET /api/environments error:', err);
        res.status(500).json({ error: 'Failed to fetch environments' });
    }
});

export default router;