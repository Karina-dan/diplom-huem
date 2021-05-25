import React from 'react';
import {RadioButton, Title, IconButton} from 'react-native-paper';
import {StyleSheet, ScrollView, View} from 'react-native';
import {SORTS} from '../consts';
import {theme} from '../../theme';

export const Sorter = ({sort, setSort}) => {

  const renderSorts = () => {
    return SORTS.map((sort, index) => (
      <View key={index} style={styles.item}>
        <RadioButton value={sort} />
        <Title style={{marginRight: 15}}>{sort}</Title>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <IconButton 
        icon='sort' 
        size={25} 
        onPress={() => setSort({...sort, reverse: !sort.reverse})}
        color={sort.reverse ? theme.colors.accent : theme.colors.text}
        style={styles.buttonReverse}
      />
      <Title style={styles.title}>Sort by</Title>
      <RadioButton.Group
        onValueChange={value => setSort({...sort, type: value})}
        value={sort.type}
      >
        <ScrollView horizontal contentContainerStyle={styles.container}>
          {renderSorts()}
        </ScrollView>
      </RadioButton.Group>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    marginRight: 15,
  },
  item: {
    flexDirection: 'row',
    marginRight: 10,
    borderWidth: 2,
    borderColor: theme.colors.accent,
    borderRadius: 20,
  },
  buttonReverse: {
    marginLeft: 0,
    paddingLeft: 0
  }
})