import express, { Request, Response } from 'express';
import cors from 'cors';
import { healthRouter } from './routes/health.js';
import { helloRouter } from './routes/hello.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());

app.use((req: Request, res: Response, next: Function) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    message: 'Eyeable API is running',
    endpoints: {
      health: '/health',
      hello: '/api/v1/hello'
    },
    timestamp: new Date().toISOString()
  });
});

app.use('/health', healthRouter);
app.use('/api/v1/hello', helloRouter);

app.use((req: Request, res: Response) => {
  res.status(404).send('Not Found');
});

app.use((err: any, req: Request, res: Response) => {
  console.error('Server Error:', err.message);
  res.status(500).send('Internal Server Error');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Eyeable server running on port ${PORT}`);
  console.log(`🌐 http://localhost:${PORT}`);
  console.log(`🩺 Health endpoint: http://localhost:${PORT}/health`);
  console.log(`👋 Hello endpoints: http://localhost:${PORT}/api/v1/hello`);
});