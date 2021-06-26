import express, { Request, Response } from 'express';
import next from 'next';
import { join } from 'path';

const dev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3000;

const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();

const main = async (): Promise<void> => {
  await app.prepare();
  const server = express();

  // service-worker
  server.get('/service-worker.js', (req: Request, res: Response) => {
    const filePath = join(__dirname, '../../.next/service-worker.js');
    return res.sendFile(filePath);
  });

  // nextjs routing
  server.get('*', (req, res) => void handle(req, res));

  server.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`);
  });
};

main();
