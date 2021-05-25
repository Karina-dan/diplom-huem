import React, {useState} from 'react';
import {View, KeyboardAvoidingView, StyleSheet, TextInput} from 'react-native';
import {Portal, Modal, Button} from 'react-native-paper';
import {theme} from '../../theme';
import {useShop} from '../hooks/useShop';

export const Promo = ({visible, setVisible}) => {
  const {checkPromo} = useShop();
  const [promo, setPromo] = useState('');

  const applyHandler = () => {
    checkPromo(promo);
    setVisible(false);
  };

  return (
    <Portal>
      <Modal 
        visible={visible} 
        onDismiss={() => setVisible(false)}
        contentContainerStyle={styles.modal} 
      >
        <KeyboardAvoidingView behavior='height' style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder='Promo code'
            onChangeText={text => setPromo(text)}
            keyboardType='numeric'
          />
          <View style={styles.buttonsContainer}>
            <Button 
              mode='contained' 
              style={{backgroundColor: theme.colors.background}}
              onPress={() => setVisible(false)}
            >Cancel</Button>
            <Button 
              mode='contained' 
              style={{backgroundColor: theme.colors.error}}
              onPress={() => applyHandler()}
            >Apply</Button>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </Portal>
  )
};

const styles = StyleSheet.create({
  modal: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    width: '80%',
    height: '45%',
    backgroundColor: theme.colors.primary,
    padding: 10,
    justifyContent: 'space-around',
    minHeight: 150
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  input: {
    width: '100%',
    backgroundColor: theme.colors.accent,

  }
})