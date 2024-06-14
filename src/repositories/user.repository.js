import prisma from '../prismaClient.js';
import { HttpError } from '../errors/http.error.js'; 

class UserRepository {
  getUserById = async (userId) => {
    try {
      return await prisma.user.findUnique({ where: { id: userId } });
    } catch (error) {
      console.error(`Failed to retrieve user by ID ${userId}:`, error);
      throw new HttpError.InternalServerError('Database query failed');
    }
  }

  createUser = async (userData) => {
    try {
      return await prisma.user.create({ data: userData });
    } catch (error) {
      console.error(`Failed to create user with data ${JSON.stringify(userData)}:`, error);
      if (error.code === 'P2002') {
        throw new HttpError.Conflict('User already exists');
      }
      throw new HttpError.InternalServerError('Database query failed');
    }
  }
}

export default new UserRepository();
