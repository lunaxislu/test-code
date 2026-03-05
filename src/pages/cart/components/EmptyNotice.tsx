import type { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

import { pageRoutes } from "@/shared/config/routes";
import { Button } from "@base-ui/react";

const EmptyNotice = () => {
  const navigate = useNavigate();

  const handleClickBack = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(pageRoutes.main);
  };

  return (
    <section className="flex h-[360px] flex-col items-center justify-center gap-2">
      <p className="text-6xl font-light">텅~</p>
      <Button
        onClick={handleClickBack}
        className="text-sm underline underline-offset-4"
      >
        홈으로 가기
      </Button>
    </section>
  );
};

export default EmptyNotice;
