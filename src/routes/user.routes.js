import express from 'express';
import UserController from '../controllers/user.controller.js';
import { validateCreateUser } from '../middlewares/user.middleware.js';
import { HttpError } from '../errors/http.error.js';

const router = express.Router();

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await UserController.getUser(req.params.userId);
    res.json({ data: user });
  } catch (error) {
    next(error);
  }
});

router.post('/', validateCreateUser, async (req, res, next) => {
  try {
    const user = await UserController.createUser(req.body);
    res.status(201).json({ data: user });
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
