import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Button, IconButton, Title, Paragraph, Divider} from 'react-native-paper';
import {theme} from '../../theme';
import {useShop} from '../hooks/useShop';
import { useAuth } from '../hooks/useAuth';

export const ShoppingCart = ({navigation}) => {
  const {deleteFromShoppingCart, deleteAllCart, cart, buyItems, shop} = useShop(navigation);
  const {user} = useAuth();

  const deleteAllHandler = () => {
    deleteAllCart();
    navigation.goBack();
  }
  const renderItems = () => {
    return cart.items.map((item, index) => {
      return (
        <React.Fragment key={index}>
          <View style={styles.tableRow} key={index}>
            <View style={{...styles.item, ...styles.tableHead, flexDirection: 'column'}}>
              <Title>
                {item.item.vendor}
              </Title>
              <Paragraph>
                {item.item.model}
              </Paragraph>
              <Paragraph>
                {item.item.category}
              </Paragraph>
            </View>
            <Title style={{...styles.price, ...styles.tableHead}}>{item.item.discountPrice}$</Title>
            <Title style={{...styles.quantity, ...styles.tableHead}}>{item.quantity}</Title>
            <View style={{...styles.delete}}>
              <IconButton icon='close' onPress={() => deleteFromShoppingCart(item)}/>
            </View>
          </View>
          <Divider style={styles.divider} />
        </React.Fragment>
      )
    })
  };

  return (
    <View style={styles.container}>
      <View style={styles.itemsContainer}>
        <View style={styles.tableRow}>
          <Title style={{...styles.item, ...styles.tableHead}}>Item</Title>
          <Title style={{...styles.price, ...styles.tableHead}}>Price</Title>
          <Title style={{...styles.quantity, ...styles.tableHead}}>Quantity</Title>
          <Title style={{...styles.delete, ...styles.tableHead}}>Delete</Title>
        </View>
        <ScrollView>
          {renderItems()}
        </ScrollView>
      </View>
      <View style={styles.deleteContainer}>
        <Button 
          mode='outlined'
          onPress={() => deleteAllHandler()}
        >Clear cart</Button>
      </View>
      <View style={styles.summaryContainer}>
        <Title>{cart.quantity} items</Title>
        <Title>{cart.summary}$</Title>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          mode='contained'
          disabled={shop.loading}
          loading={shop.loading}
          color={theme.colors.primary}
          style={styles.button}
          labelStyle={{fontWeight: 'bold', fontSize: 15}}
          onPress={() => buyItems(cart)}
        >
          Buy
        </Button>
        <Button
          disabled={!user.logged}
          loading={shop.loading}
          mode='contained'
          color={theme.colors.error}
          style={styles.button}
          labelStyle={{fontWeight: 'bold', fontSize: 15}}
          onPress={() => buyItems(cart, user.bonus)}
        >
          Buy with bonus
        </Button>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center'
  },
  itemsContainer: {
    flex: 0.7,
    padding: 10
  },
  deleteContainer: {
    flex: 0.1,
    width: '100%'
  },
  summaryContainer: {
    flex: 0.1,
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonsContainer: {
    flex: 0.1,
    flexDirection: 'row',
    width: '100%',
  },
  button: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  tableRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center'
  },
  item: {
    width: '40%',
    justifyContent: 'flex-start'
  },
  price: {
    width: '20%',
    justifyContent: 'flex-start'
  },
  quantity: {
    width: '20%',
    justifyContent: 'flex-start'
  },
  delete: {
    width: '20%',
    justifyContent: 'flex-start'
  },
  tableHead: {
    fontWeight: 'bold',
    fontSize: 15
  },
  divider: {
    height: 2,
    backgroundColor: theme.colors.accent
  },
  specText: {
    color: theme.colors.primary,
    fontWeight: 'bold'
  },
  loader: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})