import UserService from '../services/user.service.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';

class UserController {
  getUser = async (req, res, next) => {
    try {
      const user = await UserService.getUser(req.user.id);
      res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.USERS.READ_USER.SUCCEED,
        data: user
      });
    } catch (error) {
      next(error);
    }
  }

  createUser = async (req, res, next) => {
    try {
      const user = await UserService.createUser(req.body);
      res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.USERS.CREATE_USER.SUCCEED,
        data: user
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
