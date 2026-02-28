import { useState } from "react";

// 1. useConfirmModal을 props 없이 호출하면 기본 값이 반환된다.
// 2. useConfirmModal에 props가 있으면 해당 props값으로 초기화된다.
// 3. toggleIsModalOpened로 값을 변경하면 isModalOpened값이 변경된다.
const useConfirmModal = (initialValue = false) => {
  const [isModalOpened, setIsModalOpened] = useState(initialValue);

  const toggleIsModalOpened = () => {
    setIsModalOpened((prev) => !prev);
  };

  return {
    isModalOpened,
    toggleIsModalOpened,
  };
};

export default useConfirmModal;
