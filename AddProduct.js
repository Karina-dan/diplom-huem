import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {theme} from '../../../theme';
import {Title, TextInput, Divider, Button, Paragraph} from 'react-native-paper';
import {Picker} from '@react-native-community/picker';
import {useShop} from '../../hooks/useShop';
import { ScrollView } from 'react-native-gesture-handler';
import { useValidator } from '../../hooks/useValidator';

export const AddProduct = ({navigation}) => {
  const {getCategories, addProd} = useShop(navigation);

  const {error, validateProduct} = useValidator(
    () => addProd(product)
  );
  const categories = getCategories();

  const [product, setProduct] = useState({
      category: categories[0].name,
      vendor: '',
      model: '',
      desc: '',
      price: 0,
      discount: 0,
      guarantee: 0,
      quantity: 0,
      stats: {},
  });

  const [stats, setStats] = useState({
    key: '',
    value: '',
    error: ''
  });

  const checkProduct = () => {
    validateProduct(product);
  };

  const checkStats = () => {
    if (!stats.key || !stats.value) {
      setStats({...stats, error: 'Fields are required'})
    } else {
      setProduct({
        ...product,
        stats: {
          ...product.stats,
          [stats.key]: stats.value,
        }
      })
      setStats({key: '', value: '', error: ''});
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
      <Title>Category</Title>
      <Picker
        selectedValue={product.category}
        style={{height: 50, width: '100%', color: theme.colors.text}}
        onValueChange={itemValue =>
          setProduct({
            ...product,
            category: itemValue,
          })
        }
      >
        {categories.map((cat, index) => {
          return <Picker.Item key={index} label={cat.name} value={cat.name} />
        })}
      </Picker>
      <Title style={error.vendor ? styles.error : null}>Vendor</Title>
      <TextInput
        mode="outlined"
        dense={true}
        autoCorrect={false}
        contextMenuHidden={true}
        style={styles.input}
        label='Vendor'
        onChangeText={text => setProduct({
          ...product,
          vendor: text,
        })}
      />
      <Title style={error.model ? styles.error : null}>Model</Title>
      <TextInput
        mode="outlined"
        dense={true}
        autoCorrect={false}
        contextMenuHidden={true}
        style={styles.input}
        label='Model'
        onChangeText={text => setProduct({
          ...product,
          model: text,
        })}
      />
      <Title style={error.desc ? styles.error : null}>Description</Title>
      <TextInput
        mode="outlined"
        dense={true}
        autoCorrect={false}
        contextMenuHidden={true}
        multiline={true}
        numberOfLines={5}
        style={styles.input}
        label='Description'
        onChangeText={text => setProduct({
          ...product,
          desc: text,
        })}
      />
      <View style={styles.row}>
          <View style={{width: '50%', alignItems: 'flex-start'}}>
            <Title style={error.price ? styles.error : null}>Price</Title>
            <TextInput
              mode="outlined"
              dense={true}
              autoCorrect={false}
              contextMenuHidden={true}
              style={styles.input}
              keyboardType='numeric'
              label='Price'
              onChangeText={text => setProduct({
                ...product,
                price: parseInt(text),
              })}
            />
          </View>
          <View style={{width: '50%', alignItems: 'flex-start'}}>
            <Title style={error.discount ? styles.error : null}>Discount</Title>
            <TextInput
              mode="outlined"
              dense={true}
              autoCorrect={false}
              keyboardType='numeric'
              contextMenuHidden={true}
              style={styles.input}
              label='Discount'
              onChangeText={text => setProduct({
                ...product,
                discount: parseInt(text),
              })}
            />
          </View>
      </View>
      <View style={styles.row}>
          <View style={{width: '50%', alignItems: 'flex-start'}}>
            <Title style={error.guarantee ? styles.error : null}>Guarantee</Title>
            <TextInput
              mode="outlined"
              dense={true}
              autoCorrect={false}
              keyboardType='numeric'
              contextMenuHidden={true}
              style={styles.input}
              label='Guarantee'
              onChangeText={text => setProduct({
                ...product,
                guarantee: parseInt(text),
              })}
            />
          </View>
          <View style={{width: '50%', alignItems: 'flex-start'}}>
            <Title style={error.quantity ? styles.error : null}>Quantity</Title>
            <TextInput
              mode="outlined"
              dense={true}
              autoCorrect={false}
              keyboardType='numeric'
              contextMenuHidden={true}
              style={styles.input}
              label='Quantity'
              onChangeText={text => setProduct({
                ...product,
                quantity: parseInt(text),
              })}
            />
          </View>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Title style={error.stats ? styles.error : null}>Stats</Title>
        <Button
          mode='contained'
          color={theme.colors.accent}
          style={{marginLeft: 10, marginRight: 10}}
          onPress={() => checkStats()}
        >Add stat</Button>
        {
          stats.error
            ? <Paragraph style={{color: theme.colors.error}}>{stats.error}</Paragraph>
            : null
        }
      </View>
      <View style={styles.row}>
          <View style={{width: '50%', alignItems: 'flex-start'}}>
            <TextInput
              mode="outlined"
              dense={true}
              autoCorrect={false}
              contextMenuHidden={true}
              style={styles.input}
              label='Key'
              value={stats.key}
              onChangeText={text => setStats({
                ...stats,
                key: text
              })}
            />
          </View>
          <View style={{width: '50%', alignItems: 'flex-start'}}>
            <TextInput
              mode="outlined"
              dense={true}
              autoCorrect={false}
              contextMenuHidden={true}
              style={styles.input}
              label='Value'
              value={stats.value}
              onChangeText={text => setStats({
                ...stats,
                value: text
              })}
            />
          </View>
      </View>
      <Button
        mode='contained'
        color={theme.colors.primary}
        onPress={() => checkProduct()}
      >
        Apply
      </Button>
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 15,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 10
  },
  halfInput: {
    width: '50%',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  divider: {
    height: 3,
    backgroundColor: theme.colors.primary
  },
  error: {
    color: theme.colors.error,
    fontWeight: 'bold',
  },
})