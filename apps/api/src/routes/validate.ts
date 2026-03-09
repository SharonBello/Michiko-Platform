import { Router } from 'express';
import Anthropic from '@anthropic-ai/sdk';

const router = Router();
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

router.post('/topic', async (req, res) => {
    const { subject, topic } = req.body as { subject: string; topic: string };

    try {
        const message = await client.messages.create({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 100,
            system: 'You are a validation assistant for an educational VR game platform. Respond with valid JSON only, no other text.',
            messages: [{
                role: 'user',
                content: `Subject: "${subject}"\nTopic: "${topic}"\n\nIs this topic educationally relevant and not gibberish?\n\nRespond with JSON only:\n{"valid": true or false, "message": "brief explanation, max 15 words"}`,
            }],
        });

        const text = (message.content[0] as { text: string }).text;
        const result = JSON.parse(text.replace(/```json|```/g, '').trim());
        res.json(result);
    } catch (err) {
        console.error('Validate error:', err);
        res.json({ valid: true, message: '' }); // fail open
    }
});

export default router;