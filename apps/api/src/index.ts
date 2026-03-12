import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import validateRouter from './routes/validate';
import gamesRouter from './routes/games';
import blueprintsRouter from './routes/blueprints';
import shareRouter from './routes/share';
import resultsRouter from './routes/results';
import environmentsRouter from './routes/environments';

const app = express();
const PORT = process.env.PORT ?? 8080;

app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:5173'] }));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/validate', validateRouter);
app.use('/api/games', gamesRouter);
app.use('/api/blueprints', blueprintsRouter);
app.use('/api/share', shareRouter);
app.use('/api/results', resultsRouter);
app.use('/api/environments', environmentsRouter);

app.listen(PORT, () => console.log(`Michiko API running on :${PORT}`));