import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import { PORT } from './config.js';
import { registerAuthRoutes } from './routes/authRoutes.js';
import { registerHealthRoutes } from './routes/healthRoutes.js';
import { registerProductRoutes } from './routes/productRoutes.js';

// 강의: server/index.js 단일 파일에 모든 로직이 존재
// 내 프로젝트: 관심사 분리를 위해 index는 "앱 조립(bootstrap)"만 담당
const app = express();

// 공통 미들웨어: 쿠키 파싱, JSON 바디 파싱, CORS 허용
app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

// 라우트 등록 순서: health -> products -> auth
registerHealthRoutes(app);
registerProductRoutes(app);
registerAuthRoutes(app);

// 서버 시작
app.listen(PORT, () => {
  console.log(`server started: http://localhost:${PORT}`);
});
