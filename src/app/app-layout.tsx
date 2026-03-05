import { Outlet } from "react-router-dom";
import NavigationBar from "@/pages/common/components/NavigationBar";

const AppLayout = () => {
  return (
    <div>
      <NavigationBar />
      <main className="mx-auto w-full max-w-3xl px-4 pt-20 pb-6">
        {/* 강의(MUI): AppBar fixed + pt:7 보정 */}
        {/* 내 프로젝트(Tailwind): fixed header 높이(h-14) 기준 pt-20으로 동일 의도 반영 */}
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
