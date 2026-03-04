import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-6">
      <Outlet />
    </main>
  );
};

export default AppLayout;
