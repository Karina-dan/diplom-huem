import React from 'react';
import {StyleSheet, View} from 'react-native';
import {theme} from '../../theme';
import {Title, Paragraph} from 'react-native-paper';

export const About = () => {
  return (
    <View style={styles.container}>
      <Title>About application</Title>
      <Paragraph>Some text</Paragraph> 
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center'
  }
})