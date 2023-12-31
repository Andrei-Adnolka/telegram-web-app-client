import { useEffect } from "react";

const telegram = window.Telegram.WebApp;

export const useTelegram = () => {
  const onClose = () => {
    telegram.close();
  };

  const onToggleButton = () => {
    if (telegram.MainButton.isVisible) {
      telegram.MainButton.hide();
    } else {
      telegram.MainButton.show();
    }
  };

  return {
    onClose,
    onToggleButton,
    telegram,
    user: telegram?.initDataUnsafe?.user,
    userInfo: telegram?.initDataUnsafe,
    queryId: telegram?.initDataUnsafe?.query_id,
  };
};

export const useChangeMainButtonName = (text) => {
  useEffect(() => {
    telegram?.MainButton?.setParams?.({ text });
  }, []);
};
