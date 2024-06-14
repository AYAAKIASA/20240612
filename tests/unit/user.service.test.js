import UserService from '../../src/services/user.service';
import UserRepository from '../../src/repositories/user.repository';
import { NotFound, Conflict } from '../../src/errors/http.error';

jest.mock('../../src/repositories/user.repository', () => ({
  getUserById: jest.fn(),
  createUser: jest.fn(),
}));

jest.mock('../../src/errors/http.error', () => ({
  NotFound: jest.fn(message => ({ statusCode: 404, message })),
  Conflict: jest.fn(message => ({ statusCode: 409, message })),
}));

describe('UserService Unit Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getUser 메서드 - 존재하는 사용자 조회', async () => {
    const mockUser = { id: 1, email: 'test@example.com', name: 'Test User', password: 'password123', role: 'APPLICANT', createdAt: new Date(), updatedAt: new Date() };
    const userId = 1;

    UserRepository.getUserById.mockResolvedValue(mockUser);

    const result = await UserService.getUser(userId);

    expect(result).toEqual(mockUser);

    expect(UserRepository.getUserById).toHaveBeenCalledTimes(1);
    expect(UserRepository.getUserById).toHaveBeenCalledWith(userId);
  });

  test('getUser 메서드 - 존재하지 않는 사용자 조회', async () => {
    const userId = 999;

    UserRepository.getUserById.mockResolvedValue(null);

    await expect(UserService.getUser(userId)).rejects.toThrow(NotFound);

    expect(UserRepository.getUserById).toHaveBeenCalledTimes(1);
    expect(UserRepository.getUserById).toHaveBeenCalledWith(userId);
  });

  test('createUser 메서드 - 새로운 사용자 생성', async () => {
    const userData = { id: 2, email: 'newuser@example.com', name: 'New User', password: 'newpassword123', role: 'APPLICANT', createdAt: new Date(), updatedAt: new Date() };

    UserRepository.getUserById.mockResolvedValue(null);
    UserRepository.createUser.mockResolvedValue(userData);

    const result = await UserService.createUser(userData);

    expect(result).toEqual(userData);

    expect(UserRepository.getUserById).toHaveBeenCalledTimes(1);
    expect(UserRepository.getUserById).toHaveBeenCalledWith(userData.id);
    expect(UserRepository.createUser).toHaveBeenCalledTimes(1);
    expect(UserRepository.createUser).toHaveBeenCalledWith(userData);
  });

  test('createUser 메서드 - 이미 존재하는 사용자 생성 시도', async () => {
    const userData = { id: 1, email: 'existinguser@example.com', name: 'Existing User', password: 'existingpassword123', role: 'APPLICANT', createdAt: new Date(), updatedAt: new Date() };

    UserRepository.getUserById.mockResolvedValue(userData);

    await expect(UserService.createUser(userData)).rejects.toThrow(Conflict);

    expect(UserRepository.getUserById).toHaveBeenCalledTimes(1);
    expect(UserRepository.getUserById).toHaveBeenCalledWith(userData.id);

    expect(UserRepository.createUser).not.toHaveBeenCalled();
  });

});
