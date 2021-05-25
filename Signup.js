import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button, TextInput, HelperText} from 'react-native-paper';
import { useAuth } from '../hooks/useAuth';
import { useValidator } from '../hooks/useValidator';

export const Signup = ({nav}) => {
  const {auth, loading} = useAuth(nav);
  const {error, validateSignup} = useValidator(
    () => auth(user.email, user.password, true) // true - new user flag
  ); // callback with confirmation function

  const [user, setUser] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const signupHandler = () => {
    validateSignup(user.email, user.password, user.confirmPassword);
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
      {error.confirmPassword &&
        <HelperText
          style={styles.error}
          type="error"
          visible={!!error.confirmPassword}
        >
          {error.confirmPassword}
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
        label='Confirm password'
        placeholder='confirm password'
        onChangeText={text => setUser({...user, confirmPassword: text})}
      />
      <Button
        mode='contained'
        onPress={() => signupHandler()}
        disabled={loading}
        loading={loading}
      >Sign Up</Button>
    </>
  )
};

const styles = StyleSheet.create({
  input: {
    width: '80%',
    marginBottom: 20,
  },
  error: {
    fontSize: 15
  }
});
