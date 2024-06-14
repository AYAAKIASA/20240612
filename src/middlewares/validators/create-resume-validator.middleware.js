import Joi from 'joi';
import { MESSAGES } from '../../constants/message.constant.js';
import { MIN_RESUME_LENGTH } from '../../constants/resume.constant.js';

// 스키마 정의
const schema = Joi.object({
  title: Joi.string().required().messages({
    'any.required': MESSAGES.RESUMES.COMMON.TITLE.REQUIRED,
  }),
  content: Joi.string().min(MIN_RESUME_LENGTH).required().messages({
    'any.required': MESSAGES.RESUMES.COMMON.CONTENT.REQUIRED,
    'string.min': MESSAGES.RESUMES.COMMON.CONTENT.MIN_LENGTH,
  }),
});

// 사용자 인증 미들웨어
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer 토큰을 가정

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = verifyToken(token); // 토큰 검증 함수
    req.user = decoded.user; // 사용자 정보 추가
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

// createResumeValidator 미들웨어
export const createResumeValidator = async (req, res, next) => {
  try {
    await authenticateUser(req, res, next); // 사용자 인증

    // 스키마 검증
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
