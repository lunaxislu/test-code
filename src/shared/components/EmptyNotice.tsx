import type { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

const EmptyNotice = () => {
  const navigate = useNavigate();

  const handleClickBack = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: 400,
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <p style={{ fontSize: "50px", fontWeight: 300 }}>텅~</p>
      <a href="#" onClick={handleClickBack} style={{ cursor: "pointer" }}>
        홈으로 가기
      </a>
    </div>
  );
};

export default EmptyNotice;
