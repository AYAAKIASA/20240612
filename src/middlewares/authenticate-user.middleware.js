// authenticate-user.middleware.js

import { verifyToken } from '../utils/auth.util.js'; // 예시: 토큰 검증을 위한 유틸리티 함수 import

const authenticateUser = (req, res, next) => {
  // 여기서 토큰을 검증하고, 유효하다면 사용자 정보를 req.user에 추가
  const token = req.headers.authorization?.split(' ')[1]; // Bearer 토큰을 가정

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // 토큰 검증 후 사용자 정보를 req.user에 추가
  try {
    const decoded = verifyToken(token); // verifyToken 함수는 토큰 검증 로직을 가정한 함수입니다.
    req.user = decoded.user; // 사용자 정보를 req.user에 추가
    next(); // 다음 미들웨어로 이동
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

export { authenticateUser };
