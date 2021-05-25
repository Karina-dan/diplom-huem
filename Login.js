import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button, TextInput, HelperText} from 'react-native-paper';
import { useAuth } from '../hooks/useAuth';
import { useValidator } from '../hooks/useValidator';

export const Login = ({nav}) => {
  const {auth, loading} = useAuth(nav);
  const {error, validateLogin} = useValidator(
    () => auth(user.email, user.password),
  ); // callback with confirmation function

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const loginHandler = () => {
    validateLogin(user.email, user.password);
  };

  return (
    <>
      {error.email &&
        <HelperText
          style={styles.error}
          type="error"
          visible={!!error.email}
        >
          {error.email}
        </HelperText>
      }
      <TextInput
        mode="outlined"
        dense={true}
        autoCorrect={false}
        contextMenuHidden={true}
        textContentType='emailAddress'
        style={styles.input}
        label='Email'
        placeholder='example@mail.com'
        onChangeText={text => setUser({...user, email: text})}
      />
      {error.password &&
        <HelperText
          style={styles.error}
          type="error"
          visible={!!error.password}
        >
          {error.password}
        </HelperText>
      }
      <TextInput
        mode="outlined"
        dense={true}
        autoCorrect={false}
        contextMenuHidden={true}
        textContentType='password'
        secureTextEntry={true}
        style={styles.input}
        label='Password'
        placeholder='min. 6 characters'
        onChangeText={text => setUser({...user, password: text})}
      />
      <Button
        mode="contained"
        onPress={loginHandler}
        disabled={loading}
        loading={loading}
      >Log In</Button>
    </>
  )
};

const styles = StyleSheet.create({
  input: {
    width: '80%',
    marginBottom: 20,
  },
});
