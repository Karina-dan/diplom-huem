import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {theme} from '../../../theme';
import {Title, TextInput, Button, HelperText} from 'react-native-paper';
import {useShop} from '../../hooks/useShop';

export const AddCategory = () => {
  const [category, setCategory] = useState({
    value: '',
    error: '',
  });
  const {addCat} = useShop();

  const checkValidation = () => {
    setCategory({
      ...category,
      error: '',
    });
    if (!category.value) {
      setCategory({
        ...category,
        error: 'This field is required',
      });
    } else {
      addCat(category.value);
    }
  };

  return (
    <View style={styles.container}>
      <Title>Add category</Title>
      <TextInput
        mode="outlined"
        dense={true}
        autoCorrect={false}
        contextMenuHidden={true}
        style={styles.input}
        label='Category'
        onChangeText={text => setCategory({...category, value: text})}
      />
      {category.error ?
        <HelperText
          type="error"
          visible={!!category.error}
          style={styles.error}
        >
          {category.error}
        </HelperText>
        : null
      }
      <Button
        mode='contained'
        color={theme.colors.primary}
        onPress={() => checkValidation()}
      >Add category</Button>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    width: '80%',
    marginBottom: 10,
  },
  error: {
    marginBottom: 20,
  }
})