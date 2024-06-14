import { HttpError } from '../errors/http.error.js';

const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpErrors.HttpError) {
    res.status(err.status).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
};

export default errorHandler;
