import express from 'express';
import { requireAccessToken } from '../middlewares/require-access-token.middleware.js';
import UserController from '../controllers/user.controller.js';
import { HttpError } from '../errors/http.error.js';

const usersRouter = express.Router();

usersRouter.get('/me', requireAccessToken, async (req, res, next) => {
  try {
    const user = await UserController.getUser(req.user.id);
    res.json({ data: user });
  } catch (error) {
    next(error);
  }
});


usersRouter.use((err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { usersRouter };
