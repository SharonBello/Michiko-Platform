import { Router } from 'express';
import { blueprintsCol, gamesCol } from '../lib/collections';
import { generateBlueprint } from '../services/blueprintService';
import { generateShareCode } from '../lib/shareCode';

const router = Router();

router.post('/generate', async (req, res) => {
    const ownerId = req.headers['x-user-id'] as string;
    if (!ownerId) return res.status(401).json({ error: 'Unauthorised' });

    try {
        const blueprint = await generateBlueprint(req.body);
        res.json(blueprint);
    } catch (err) {
        console.error('POST /blueprints/generate error:', err);
        res.status(500).json({ error: 'Failed to generate blueprint' });
    }
});

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

router.post('/:id/approve', async (req, res) => {
    const ownerId = req.headers['x-user-id'] as string;
    if (!ownerId) return res.status(401).json({ error: 'Unauthorised' });

    try {
        const ref = blueprintsCol().doc(req.params.id);
        const doc = await ref.get();
        if (!doc.exists) return res.status(404).json({ error: 'Blueprint not found' });

        const blueprint = doc.data()!;
        await ref.update({ status: 'approved', approvedAt: new Date().toISOString() });

        if (blueprint.gameId) {
            const shareCode = generateShareCode();
            await gamesCol().doc(blueprint.gameId).update({
                status: 'ready',
                shareCode,
                updatedAt: new Date().toISOString(),
            });
        }

        res.json({ success: true, blueprintId: req.params.id });
    } catch (err) {
        console.error('POST /blueprints/:id/approve error:', err);
        res.status(500).json({ error: 'Failed to approve blueprint' });
    }
});

router.get('/by-game/:gameId', async (req, res) => {
    const ownerId = req.headers['x-user-id'] as string;
    if (!ownerId) return res.status(401).json({ error: 'Unauthorised' });

    try {
        const snap = await blueprintsCol()
            .where('gameId', '==', req.params.gameId)
            .where('status', '==', 'approved')
            .limit(1)
            .get();

        if (snap.empty) return res.status(404).json({ error: 'Blueprint not found' });
        res.json({ id: snap.docs[0].id, ...snap.docs[0].data() });
    } catch (err) {
        console.error('GET /blueprints/by-game/:gameId error:', err);
        res.status(500).json({ error: 'Failed to fetch blueprint' });
    }
});
router.put('/:id', async (req, res) => {
    const ownerId = req.headers['x-user-id'] as string;
    if (!ownerId) return res.status(401).json({ error: 'Unauthorised' });

    try {
        const ref = blueprintsCol().doc(req.params.id);
        const doc = await ref.get();
        if (!doc.exists) return res.status(404).json({ error: 'Blueprint not found' });
        if (doc.data()?.ownerId !== ownerId) return res.status(403).json({ error: 'Forbidden' });

        await ref.update({
            ...req.body,
            updatedAt: new Date().toISOString(),
        });

        const updated = await ref.get();
        res.json({ id: updated.id, ...updated.data() });
    } catch (err) {
        console.error('PUT /blueprints/:id error:', err);
        res.status(500).json({ error: 'Failed to update blueprint' });
    }
});

export default router;