import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT ?? 8080;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'michiko-api', ts: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Michiko API running on :${PORT}`);
});
