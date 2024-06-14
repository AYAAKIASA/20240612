import app from './app.js';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
