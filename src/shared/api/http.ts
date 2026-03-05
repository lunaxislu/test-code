import axios from "axios";

export const http = axios.create({
  // 강의: 환경변수 값을 그대로 사용
  // 내 프로젝트: .env 누락 시 프론트가 자기 자신(/users)으로 붙는 실수를 막기 위해 로컬 기본값을 둠
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000",
  withCredentials: true,
});
