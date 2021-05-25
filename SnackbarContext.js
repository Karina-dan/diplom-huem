import {createContext} from 'react';

export const SnackbarContext = createContext({
  visible: false,
  message: '',
  show: (text) => {},
  hide: () => {},
});
