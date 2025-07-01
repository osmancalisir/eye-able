import { Request, Response } from 'express';

export const helloWorld = (req: Request, res: Response) => {
  res.send('Hello world');
};

export const helloName = (req: Request, res: Response) => {
  const { name } = req.params;
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  res.send(`Hello ${name}. Today is the ${today}`);
};