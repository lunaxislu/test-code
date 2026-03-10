import { couponListJSON } from '../repositories/responseRepository.js';

// 구매/쿠폰 라우트 등록
export const registerPurchaseRoutes = (app) => {
  app.get('/couponList', (_, res) => {
    return res.send(couponListJSON);
  });

  app.post('/purchase', (req, res) => {
    if (req.body?.name === 'FAIL') {
      return res.status(500).send({ message: 'purchase failed' });
    }

    return res.status(200).send();
  });
};
