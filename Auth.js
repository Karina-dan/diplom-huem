import React, {useState} from 'react';
import {StyleSheet, View, KeyboardAvoidingView} from 'react-native';
import {Switch, Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
import {theme} from '../../theme';
import {Login} from '../components/Login';
import {Signup} from '../components/Signup';
import {useNavigation} from '@react-navigation/native';

export const Auth = ({route}) => {
  const navigation = useNavigation();
  const [form, setForm] = useState(route.params.switch);

  return (
      <KeyboardAvoidingView behavior='height' style={styles.container}>
        <Icon name='login' color={theme.colors.primary} size={60} style={{marginBottom: 20}}/>
        <View style={styles.switcher}>
          <Title
            style={form ? styles.textDisable : null}
          >Log In</Title>
          <Switch
            value={form}
            onValueChange={() => setForm(!form)}
          />
          <Title
            style={!form ? styles.textDisable : null}
          >Sign Up</Title>
        </View>
        {
          form
          ? <Signup nav={navigation}/>
          : <Login nav={navigation}/>
        }
      </KeyboardAvoidingView>
  ) 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switcher: {
    position: 'absolute',
    bottom: '5%',
    right: '5%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textDisable: {
    color: theme.colors.disabled,
  },
});
