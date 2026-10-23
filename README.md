# test-code

쇼핑몰 흐름(로그인 → 상품 탐색 → 장바구니 → 구매)을 대상으로
단위 · 컴포넌트 · E2E · Storybook 계층별 테스트 코드를 작성한 React 프로젝트입니다.

## 테스트 전략

| 계층 | 도구 | 대상 | 위치 |
|---|---|---|---|
| 단위 | Vitest | debounce 유틸, `useConfirmModal` 훅 | `src/shared/` |
| 컴포넌트·통합 | Vitest, React Testing Library, user-event, MSW | 장바구니 테이블, 내비게이션 바, 상품 목록·필터, 결제 정보, 배송 정보 폼, 에러·404·빈 화면 | `src/pages/**/tests/` |
| E2E | Playwright (Chromium) | 로그인, 라우트 가드, 상품 필터, 상품 상세, 장바구니, 구매 | `e2e/` |
| UI 상태 | Storybook + addon-vitest, MSW addon | 페이지 구성 컴포넌트의 상태별 스토리 | `src/pages/**/*.stories.tsx` |

- **API mocking**: 하나의 MSW 핸들러(`src/mocks/handler.ts`)를 Vitest(`setupServer`)와 Storybook(`msw-storybook-addon`)이 함께 사용합니다. 테스트별 예외 응답은 `server.use()`로 덮어씁니다.
- **E2E**: Express mock 서버(`server/`)를 실제로 띄워 검증하고, 로딩 지연 · 401 · 500처럼 재현하기 어려운 상태만 `page.route()`로 가로챕니다.
- **인증 상태 재사용**: `e2e/auth.setup.ts`가 한 번 로그인해 storageState를 저장하고, 로그인이 필요한 테스트는 `test.use({ storageState })`로 재사용합니다.
- **상태 격리**: `__mocks__/zustand.ts`가 모든 zustand store를 테스트마다 초기화하고, `src/test/mockStore.ts`로 필요한 상태만 주입합니다.
- **공통 렌더 유틸**: `src/test/setup.tsx`의 customRender가 QueryClient · MemoryRouter · Toaster · userEvent를 함께 구성합니다.

## 기술 스택

- React 19, TypeScript, Vite, React Router 7, TanStack Query 5, zustand 5, react-hook-form + zod, Tailwind CSS
- Vitest: Vite 설정과 path alias를 그대로 공유합니다 (`vite.config.ts`의 `test.projects`).
- MSW: 네트워크 계층에서 요청을 가로채므로 axios · TanStack Query 코드를 수정하지 않고 테스트할 수 있습니다.
- Playwright: setup project와 storageState로 로그인 상태를 분리합니다.
- Storybook addon-vitest: 스토리를 Vitest 브라우저 모드에서 렌더 테스트로 실행합니다.
- Express: 인증 · 상품 · 구매 API mock 서버 (routes / services / repositories 분리)

## 디렉터리 구조

    e2e/                  Playwright E2E (auth.setup.ts, private/)
    server/               Express mock API
    src/
      app/                라우터, RouteGuard
      pages/<page>/       페이지별 컴포넌트 · 훅 · 테스트 · 스토리
      shared/             API 클라이언트, 공용 컴포넌트, 유틸
      store/              zustand store
      mocks/              MSW 핸들러와 응답 데이터
      test/               customRender, store mock 헬퍼
      components/ui/      shadcn/ui 컴포넌트
    __mocks__/zustand.ts  store 자동 초기화 mock

## 실행 방법

    npm ci
    # .env에 SECURITY_KEY(32바이트 문자열)를 설정합니다
    npx playwright install chromium

    npm run dev               # mock 서버(:3000) + Vite
    npx vitest --project unit-test
    npm run test:playwright   # E2E (dev 서버 자동 실행)
    npm run storybook

## 대표 테스트

### 로그인 여부에 따른 라우트 가드 — `e2e/auth.test.ts`
비로그인 사용자가 `/cart` · `/purchase`에 접근하면 `/login`으로, 로그인한 사용자가 `/login`에 접근하면 `/`로 이동하는지 실제 브라우저에서 확인합니다.
로그인 상태는 `auth.setup.ts`의 storageState를 재사용해 테스트마다 로그인 UI를 반복하지 않습니다.

### 쿠폰 종류별 결제 금액 계산 — `src/pages/purchase/components/tests/Payment.test.tsx`
장바구니 store에 상품을 주입하고 react-hook-form 컨텍스트로 감싼 뒤, 쿠폰 없음 · 금액 할인 · 비율 할인일 때 총 결제 금액을 검증합니다.
쿠폰 목록은 MSW로 비동기 조회하므로 `findByText`로 기다립니다.

### 장바구니 수량 변경과 비우기 — `src/pages/cart/components/test/ProductInfoTable.test.tsx`
수량 변경 시 행 합계 재계산, 999개 초과 시 경고 toast, 삭제 후 빈 화면 표시, "홈으로 가기" 클릭 시 라우트 전환까지 하나의 흐름으로 확인합니다.
