
import {useState, useCallback} from 'react';

export const snackbarState = () => {
  const [snack, setSnack] = useState({
    visible: false,
    message: '',
  });

  const show = useCallback((text) => {
    setSnack({
      visible: true,
      message: text,
    });
  }, []);

  const hide = useCallback(() => {
    setSnack({
      visible: false,
      message: '',
    });
  }, []);

  return {
    visible: snack.visible, 
    message: snack.message, 
    show, hide
  };
};

