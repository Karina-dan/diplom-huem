import React from 'react';
import {View, StyleSheet} from 'react-native';
import {theme} from '../../../theme';
import {Button} from 'react-native-paper';

export const ChooseOpt = (props) => {
  return (
    <View style={styles.container}>
      <Button
        mode='contained'
        color={theme.colors.primary}
        style={styles.button}
        onPress={() => props.navigation.navigate('Add Category')}
      >Add category</Button>
      <Button
        mode='contained'
        color={theme.colors.primary}
        style={styles.button}
        onPress={() => props.navigation.navigate('Add Product')}
      >Add product</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    width: '80%',
    marginBottom: 20,
  }
})
