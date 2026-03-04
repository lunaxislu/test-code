import dotenv from 'dotenv';

// 환경변수 로드 (.env)
dotenv.config();

// 서버 포트: 환경변수 우선, 없으면 강의 기본값 3000 사용
export const PORT = Number(process.env.PORT ?? 3000);
// AES-256-CBC 암복호화에 사용할 32바이트 보안 키
export const SECURITY_KEY = process.env.SECURITY_KEY ?? '';
// AES CBC 모드 IV 길이(고정 16)
export const IV_LENGTH = 16;
