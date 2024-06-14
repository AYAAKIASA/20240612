import UserController from '../../src/controllers/user.controller';

const mockUserService = {
  createUser: jest.fn(),
  getUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
};

const mockRequest = {
  body: {},
  params: {},
  query: {},
};

const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

let userController;

describe('UserController Unit Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    userController = new UserController(mockUserService);
  });

  test('createUser 메서드', async () => {
    mockRequest.body = { email: 'test@example.com', password: 'password123', name: 'Test User' };
    const mockResult = { id: 1, email: 'test@example.com', password: 'password123', name: 'Test User', role: 'APPLICANT', createdAt: new Date(), updatedAt: new Date() };
    mockUserService.createUser.mockResolvedValue(mockResult);

    await userController.createUser(mockRequest, mockResponse);

    expect(mockUserService.createUser).toHaveBeenCalledWith(mockRequest.body);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
  });

  test('getUser 메서드', async () => {
    mockRequest.params = { id: 1 };
    const mockResult = { id: 1, email: 'test@example.com', password: 'password123', name: 'Test User', role: 'APPLICANT', createdAt: new Date(), updatedAt: new Date() };
    mockUserService.getUser.mockResolvedValue(mockResult);

    await userController.getUser(mockRequest, mockResponse);

    expect(mockUserService.getUser).toHaveBeenCalledWith(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
  });

  test('updateUser 메서드', async () => {
    mockRequest.params = { id: 1 };
    mockRequest.body = { email: 'updated@example.com', name: 'Updated User' };
    const mockResult = { id: 1, email: 'updated@example.com', password: 'password123', name: 'Updated User', role: 'APPLICANT', createdAt: new Date(), updatedAt: new Date() };
    mockUserService.updateUser.mockResolvedValue(mockResult);

    await userController.updateUser(mockRequest, mockResponse);

    expect(mockUserService.updateUser).toHaveBeenCalledWith(1, mockRequest.body);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
  });

  test('deleteUser 메서드', async () => {
    mockRequest.params = { id: 1 };
    mockUserService.deleteUser.mockResolvedValue(null);

    await userController.deleteUser(mockRequest, mockResponse);

    expect(mockUserService.deleteUser).toHaveBeenCalledWith(1);
    expect(mockResponse.status).toHaveBeenCalledWith(204);
    expect(mockResponse.json).not.toHaveBeenCalled();
  });
});
