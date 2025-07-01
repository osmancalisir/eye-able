import { Request, Response } from 'express';

export const healthCheck = async (req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    message: 'API is running'
  });
};