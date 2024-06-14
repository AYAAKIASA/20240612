import express from 'express';
import { errorHandler } from './middlewares/error-handler.middleware.js';
import { HTTP_STATUS } from './constants/http-status.constant.js';
import { usersRouter } from './routers/users.router.js';
import { authRouter } from './routers/auth.router.js';
import { resumesRouter } from './routers/resumes.router.js'; 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health-check', (req, res) => {
  return res.status(HTTP_STATUS.OK).send(`I'm healthy.`);
});

app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/resumes', resumesRouter); 

app.use(errorHandler);

export default app;
