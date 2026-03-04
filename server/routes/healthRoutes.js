// 서버 상태 확인용 라우트
export const registerHealthRoutes = (app) => {
  app.get('/health', (_, res) => {
    res.send({ ok: true });
  });
};
