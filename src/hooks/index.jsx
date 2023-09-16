const telegram = window.Telegram.WebApp;

export const useTelegram = () => {
  const onClose = () => {
    telegram.close();
  };

  const onToggleButton = () => {
    if (telegram.mainButton.isVisible) {
      telegram.mainButton.hide();
    } else {
      telegram.mainButton.show();
    }
  };

  return {
    onClose,
    onToggleButton,
    telegram,
    user: telegram?.initDataUnsafe?.user,
  };
};
