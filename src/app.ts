
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser'

const app: Application = express();

// parser
app.use(express.json());
app.use(cookieParser())
app.use(cors());

// application routes

app.use('/api/v1', router);

const test =async (req:Request,res:Response) =>{
  const a = 10;
  res.send(a)
}

app.get('/',test)

app.get('/', (req: Request, res: Response) => {
  res.send('hello world');
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;

