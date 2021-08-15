import React, { useState } from "react";

export interface ModalWindow {
  isModalVisible: boolean;
  showModal: () => void;
  hideModal: () => void;
  mode: "new" | "edit";
  setMode: React.Dispatch<React.SetStateAction<"new" | "edit">>;
}

const useModalWindow = (): ModalWindow => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mode, setMode] = useState<ModalWindow["mode"]>("new");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  return {
    isModalVisible,
    showModal,
    hideModal,
    mode,
    setMode,
  };
};

export default useModalWindow;
