import { Router } from 'express';
import { gamesCol, blueprintsCol } from '../lib/collections';

const router = Router();

// GET /api/share/:code — public, no auth needed
router.get('/:code', async (req, res) => {
    try {
        const snap = await gamesCol()
            .where('shareCode', '==', req.params.code.toUpperCase())
            .where('status', '==', 'ready')
            .limit(1)
            .get();

        if (snap.empty) return res.status(404).json({ error: 'Game not found' });

        const doc = snap.docs[0];
        const game = { id: doc.id, ...doc.data() };

        // Find the approved blueprint for this game
        const bpSnap = await blueprintsCol()
            .where('gameId', '==', doc.id)
            .where('status', '==', 'approved')
            .limit(1)
            .get();

        if (bpSnap.empty) return res.status(404).json({ error: 'No approved blueprint' });

        const bp = { id: bpSnap.docs[0].id, ...bpSnap.docs[0].data() };
        res.json({ game, blueprint: bp });
    } catch (err) {
        console.error('GET /share/:code error:', err);
        res.status(500).json({ error: 'Failed to fetch game' });
    }
});

export default router;