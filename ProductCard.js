
import React, {useContext} from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';
import {Card, Title, Paragraph, Button, Divider, Badge} from 'react-native-paper';
import {theme} from '../../theme';
import altImage from '../assets/images/no-image.png';
import discountImage from '../assets/images/discount.png';
import {MAX_RATE} from '../consts';
import Icon from 'react-native-vector-icons/Entypo';
import {useShop} from '../hooks/useShop';
import {SnackbarContext} from '../context/SnackbarContext';

export const ProductCard = ({prod, navigation}) => {

  const {addToShoppingCart} = useShop();
  const snackbar = useContext(SnackbarContext);

  const addToCartHandler = () => {
    addToShoppingCart(prod);
    snackbar.show('Item was added to your cart');
  };

  const renderRating = () => {
    const rating = [];
    for (let i = 0; i < MAX_RATE; i++) {
      if (Math.round(prod.rating.average) > i) {
        rating.push(<Icon key={i} name='star' color='#fcdf4c' size={15} />);
      } else {
        rating.push(<Icon key={i} name='star' color={theme.colors.primary} size={15} />);
      }
    }
    return rating;
  }

  return (
      <Card style={styles.cardContainer}>
        <Card.Cover 
          source={prod.img ? { uri: prod.img } : altImage}
        />
        {
          prod.discount > 0
          ? <Image source={discountImage} style={styles.image}/>
          : null
        }
        <Card.Content>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Title style={styles.vendorText}><Text style={styles.specText}>{prod.vendor}</Text> | {prod.model}</Title>    
            <Paragraph>{prod.quantity} items</Paragraph>
          </View>
          
          {
            prod.garancy > 0
            ? <Paragraph style={styles.guarantee}>Guarantee {prod.garancy} monthes</Paragraph>
            : <Paragraph style={styles.guarantee}>No Guarantee</Paragraph>
          }
          <View style={{...styles.row, ...styles.rate}}>
            {renderRating()}
            {prod.rating.reviews
              ? <Paragraph>| {prod.rating.reviews.length} reviews</Paragraph>
              : <Paragraph>| 0 reviews</Paragraph>
            }
          </View>
          <Paragraph>{prod.desc.substring(0,80)}...</Paragraph>
        </Card.Content>
        <Divider style={styles.divider}/>
        <Card.Actions style={styles.cardBottom}>
          <View>
            <Title style={styles.price}>{prod.discountPrice.toFixed(2)}$</Title>
            {
              prod.discount
              ? <Badge style={styles.discount}>-{prod.discount}%</Badge>
              : null
            }
          </View>
          <View style={styles.row}>
            <Button
              style={styles.button}
              mode="contained"
              color={theme.colors.primary}
              onPress={() => navigation.navigate('Product', {prod})}
            >More
            </Button>
            <Button
              disabled={prod.quantity === 0}
              style={styles.button}
              mode="contained"
              color={theme.colors.error}
              onPress={() => addToCartHandler()}
            >Add to cart
            </Button>
          </View>
        </Card.Actions>
      </Card>
  )
};


const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: theme.colors.accent
  },
  button: {
    marginRight: 10
  },
  specText: {
    fontWeight: 'bold'
  },
  image: {
    position: 'absolute',
    width: 90,
    height: 90,
    resizeMode: 'stretch'
  },
  price: {
    fontWeight: 'bold',
    fontSize: 20
  },
  divider: {
    marginTop: 10,
    marginBottom: 10,
    height: 3,
    backgroundColor: theme.colors.primary
  },
  cardBottom: {
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
  },
  between: {
    marginTop: 5,
    justifyContent: 'space-between'
  },
  rate: {
    marginBottom: 5,
    alignItems: 'center'
  },
  discount: {
    position: 'absolute',
    fontSize: 15,
    top: '-40%',
    right: '-10%'
  },
  vendorText: {
    marginTop: 10
  },
  guarantee: {
    marginBottom: 5,
  }
})