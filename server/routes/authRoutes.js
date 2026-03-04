import { usersJSON } from '../repositories/responseRepository.js';
import { decrypt, encrypt } from '../services/tokenService.js';

// 인증(로그인/프로필 조회) 라우트 등록
export const registerAuthRoutes = (app) => {
  // 로그인: 계정 검증 -> access_token 발급 -> 쿠키/응답 반환
  app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = usersJSON.users.find((item) => item.email === email && item.password === password);

    if (!user) {
      return res.status(401).send({
        errorCode: 401000,
        message: '정보가 일치하지 않습니다.',
      });
    }

    const accessToken = encrypt(String(user.id));

    // access_token 쿠키는 httpOnly로 설정해 JS 접근을 차단한다.
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.send({ ...user, access_token: accessToken });
  });

  // 유저 조회: Authorization 토큰 복호화 후 user.id로 사용자 검색
  // 강의 기준: 누락/변조/미존재 모두 404 + "not found"
  app.get('/user', (req, res) => {
    const accessToken = req.headers.authorization;

    if (!accessToken || typeof accessToken !== 'string') {
      return res.status(404).send('not found');
    }

    try {
      const decrypted = decrypt(accessToken);
      const user = usersJSON.users.find(({ id }) => String(id) === decrypted);

      if (!user) {
        return res.status(404).send('not found');
      }

      return res.send(user);
    } catch (error) {
      return res.status(404).send('not found');
    }
  });
};
