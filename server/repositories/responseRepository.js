import fs from 'fs';
import path from 'path';

// 응답 목업 JSON 파일 경로
const RESPONSE_DIR = path.resolve('./server/response');

// 파일명을 받아 JSON으로 파싱한다.
const readJson = (name) =>
  JSON.parse(fs.readFileSync(path.join(RESPONSE_DIR, name), 'utf-8'));

// 강의: index에서 직접 import assert로 로드
// 내 프로젝트: 데이터 접근 책임을 repository로 분리
export const productsJSON = readJson('products.json');
export const usersJSON = readJson('users.json');
export const categoriesJSON = readJson('categories.json');
