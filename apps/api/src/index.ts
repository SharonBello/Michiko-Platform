import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import validateRouter from './routes/validate';
import gamesRouter from './routes/games';
import blueprintsRouter from './routes/blueprints';

const app = express();
const PORT = process.env.PORT ?? 8080;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/validate', validateRouter);
app.use('/api/games', gamesRouter);
app.use('/api/blueprints', blueprintsRouter);

app.listen(PORT, () => console.log(`Michiko API running on :${PORT}`));