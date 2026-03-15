import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleClickBackButton = () => {
    navigate(-1);
  };

  return (
    <div>
      <h1>읔!</h1>
      <p>예상치 못한 에러가 발생했습니다.</p>
      <Button onClick={handleClickBackButton}>뒤로 이동</Button>
    </div>
  );
};

export default ErrorPage;
