import { usersJSON } from '../repositories/responseRepository.js';
import { decrypt, encrypt } from '../services/tokenService.js';

// 인증(로그인/프로필 조회) 라우트 등록
export const registerAuthRoutes = (app) => {
  // 로그인 페이지의 "사용 가능한 유저 리스트" 조회
  app.get('/users', (_, res) => {
    return res.send(usersJSON.users);
  });

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
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    const safeUser = { id: user.id, name: user.name, email: user.email };

    return res.send(safeUser);
  });

  // 강의: Authorization 헤더 토큰 기반으로 사용자 조회
  // 내 프로젝트: httpOnly 쿠키(access_token) 기반으로 사용자 조회
  // 강의 기준 유지: 누락/변조/미존재 모두 404 + "not found"
  app.get('/user', (req, res) => {
    const accessToken = req.cookies?.access_token;

    if (!accessToken || typeof accessToken !== 'string') {
      return res.status(404).send('not found');
    }

    try {
      const decrypted = decrypt(accessToken);
      const user = usersJSON.users.find(({ id }) => String(id) === decrypted);

      if (!user) {
        return res.status(404).send('not found');
      }

      const safeUser = { id: user.id, name: user.name, email: user.email };

      return res.send(safeUser);
    } catch (error) {
      return res.status(404).send('not found');
    }
  });
};
