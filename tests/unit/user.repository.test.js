import UserRepository from '../../src/repositories/user.repository';
import prisma from '../../src/prismaClient';

jest.mock('../../src/prismaClient', () => ({
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
}));

describe('UserRepository Unit Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getUserById 메서드', async () => {
    const mockUser = { id: 1, name: 'Test User', email: 'test@example.com', password: 'password123' };
    const userId = 1;

    prisma.user.findUnique.mockResolvedValue(mockUser);

    const result = await UserRepository.getUserById(userId);

    expect(result).toEqual(mockUser);

    expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: userId } });
  });

  test('createUser 메서드', async () => {
    const userData = { email: 'test@example.com', password: 'password123', name: 'New User' };
    const mockCreatedUser = { id: 2, ...userData };

    prisma.user.create.mockResolvedValue(mockCreatedUser);

    const result = await UserRepository.createUser(userData);

    expect(result).toEqual(mockCreatedUser);

    expect(prisma.user.create).toHaveBeenCalledTimes(1);
    expect(prisma.user.create).toHaveBeenCalledWith({ data: userData });
  });
});
