import React, {useContext} from 'react';
import {theme} from '../../theme';
import {Snackbar} from 'react-native-paper';
import {SnackbarContext} from '../context/SnackbarContext';

export const CustomSnackbar = () => {

  const snackbar = useContext(SnackbarContext);
  
  return (
    <Snackbar
      visible={snackbar.visible}
      onDismiss={() => snackbar.hide()}
      duration={3000}
      theme={{
        ...theme,
        colors: {
          onSurface: theme.colors.primary,
        },
      }}
      action={{
        label: 'OK',
        onPress: () => snackbar.hide(),
      }}
    >
      {snackbar.message}
    </Snackbar>
  )
}
