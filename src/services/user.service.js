import UserRepository from '../repositories/user.repository.js';
import { HttpError, BadRequest, Unauthorized, Forbidden, NotFound, Conflict, InternalServerError } from '../errors/http.error.js';

class UserService {
  getUserById = async (userId) => {
    const user = await UserRepository.getUserById(userId);
    if (!user) {
      throw new HttpError.NotFound('User not found');
    }
    return user;
  }

  createUser = async (userData) => {
    if (!userData.email || !userData.password || !userData.name) {
      throw new HttpError.BadRequest('Email, password, and name are required');
    }

    const existingUser = await UserRepository.getUserByEmail(userData.email);
    if (existingUser) {
      throw new HttpError.Conflict('User with this email already exists');
    }

    let createdUser;
    try {
      await prisma.$transaction(async (prismaClient) => {
        createdUser = await prismaClient.user.create({ data: userData });
      });
    } catch (error) {
      console.error(`Failed to create user with data ${JSON.stringify(userData)}:`, error);
      throw new HttpError.InternalServerError('Failed to create user');
    }

    return createdUser;
  }
}

export default new UserService();
