// auth.util.js

const secretKey = 'your_secret_key_here'; // 실제 프로젝트에서는 환경 변수 등을 사용하여 비밀 키를 관리해야 합니다.

const verifyToken = (token) => {
  // 예시로 간단하게 토큰 검증 로직을 작성합니다.
  // 실제 프로젝트에서는 JWT 라이브러리 등을 사용하여 구현할 수 있습니다.
  if (!token) {
    throw new Error('No token provided');
  }

  // 여기서 토큰을 검증하고 사용자 정보를 반환합니다.
  // 예시로 사용자 정보를 객체 형태로 반환하도록 구현합니다.
  const user = {
    id: 1,
    username: 'example_user',
    role: 'user',
  };

  return { user };
};

export { verifyToken, secretKey };
