import { Router } from 'express';
import { blueprintsCol, gamesCol } from '../lib/collections';

const router = Router();

// GET /api/blueprints/:id
router.get('/:id', async (req, res) => {
    const ownerId = req.headers['x-user-id'] as string;
    if (!ownerId) return res.status(401).json({ error: 'Unauthorised' });

    try {
        const doc = await blueprintsCol().doc(req.params.id).get();
        if (!doc.exists) return res.status(404).json({ error: 'Blueprint not found' });
        res.json({ id: doc.id, ...doc.data() });
    } catch (err) {
        console.error('GET /blueprints/:id error:', err);
        res.status(500).json({ error: 'Failed to fetch blueprint' });
    }
});

// POST /api/blueprints/:id/approve
router.post('/:id/approve', async (req, res) => {
    const ownerId = req.headers['x-user-id'] as string;
    if (!ownerId) return res.status(401).json({ error: 'Unauthorised' });

    try {
        const ref = blueprintsCol().doc(req.params.id);
        const doc = await ref.get();
        if (!doc.exists) return res.status(404).json({ error: 'Blueprint not found' });

        const blueprint = doc.data()!;

        // Update blueprint status
        await ref.update({ status: 'approved', approvedAt: new Date().toISOString() });

        // Update parent game status to 'ready'
        if (blueprint.gameId) {
            await gamesCol().doc(blueprint.gameId).update({
                status: 'ready',
                updatedAt: new Date().toISOString(),
            });
        }

        res.json({ success: true, blueprintId: req.params.id });
    } catch (err) {
        console.error('POST /blueprints/:id/approve error:', err);
        res.status(500).json({ error: 'Failed to approve blueprint' });
    }
});

// POST /api/blueprints — save generated blueprint
router.post('/', async (req, res) => {
    const ownerId = req.headers['x-user-id'] as string;
    if (!ownerId) return res.status(401).json({ error: 'Unauthorised' });

    try {
        const blueprint = {
            ...req.body,
            ownerId,
            status: 'pending',
            createdAt: new Date().toISOString(),
        };
        const ref = await blueprintsCol().add(blueprint);
        res.status(201).json({ id: ref.id, ...blueprint });
    } catch (err) {
        console.error('POST /blueprints error:', err);
        res.status(500).json({ error: 'Failed to save blueprint' });
    }
});

export default router;