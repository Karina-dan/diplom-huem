import React, {useState, useContext} from 'react';
import {Title, Paragraph, Button, DataTable, Badge} from 'react-native-paper';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import {theme} from '../../theme';
import altImage from '../assets/images/no-image.png';
import discountImage from '../assets/images/discount.png';
import Icon from 'react-native-vector-icons/Entypo';
import {MAX_RATE} from '../consts';
import { useShop } from '../hooks/useShop';
import { SnackbarContext } from '../context/SnackbarContext';

export const Product = ({route}) => {
  const prod = route.params.prod;
  const {addToShoppingCart} = useShop();
  const snackbar = useContext(SnackbarContext);

  const [opt, setOpt] = useState('description');

  const addToCartHandler = () => {
    addToShoppingCart(prod);
    snackbar.show('Item was added to your cart');
  };

  const renderOpt = () => {
    switch (opt) {
      case 'description': 
        return <Paragraph style={styles.desc}>{prod.desc}</Paragraph>;
      case 'characteristics':
        return (
          <DataTable>
            {renderCharacteristics()}
          </DataTable>
        )
      case 'reviews': 
        return (
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>User's email</DataTable.Title>
              <DataTable.Title>Mark</DataTable.Title>
            </DataTable.Header>
            {renderReviews()}
          </DataTable>
        )
      default: return <Title>Error</Title>
    }
  }

  const renderReviews = () => {
    if (prod.rating.reviews) {
      return prod.rating.reviews.map((review, index) => (
        <DataTable.Row key={index}>
          <DataTable.Cell>{review.user}</DataTable.Cell>
          <DataTable.Cell>{review.mark}</DataTable.Cell>
        </DataTable.Row>
      ));
    } else {
      return <Title>No reviews found</Title>
    }
  }

  const renderCharacteristics = () => {
    return Object.keys(prod.stats).map((stat, index) => {
      return (
        <DataTable.Row key={index}>
          <DataTable.Cell>{stat}</DataTable.Cell>
          <DataTable.Cell>{prod.stats[stat]}</DataTable.Cell>
        </DataTable.Row>
      )
    })
  }

  const renderRating = () => {
    const rating = [];
    for (let i = 0; i < MAX_RATE; i++) {
      if (Math.round(prod.rating.average) > i) {
        rating.push(<Icon key={i} name='star' color='#fcdf4c' size={20} />);
      } else {
        rating.push(<Icon key={i} name='star' color={theme.colors.primary} size={20} />);
      }
    }
    return rating;
  }

  return ( 
    <View style={styles.container}>
      <Image source={prod.img ? { uri: prod.img } : altImage} style={styles.img}/>
      {
        prod.discount > 0
        ? <Image source={discountImage} style={styles.discImage}/>
        : null
      }
      <View style={styles.wrapper}>
        <View style={styles.vendorModelContainer}>
          <Title style={{...styles.headerText, ...styles.specText}}>{prod.vendor} | </Title>
          <Title style={styles.headerText}>{prod.model}</Title>
        </View>
        <View style={styles.withPriceContainer}>
            <View style={{flex: 0.7}}>
              {
                  prod.garancy > 0
                  ? <Paragraph style={styles.guarantee}>Guarantee {prod.garancy} monthes</Paragraph>
                  : <Paragraph style={styles.guarantee}>No Guarantee</Paragraph>
              }
              <View style={styles.stars}>
                <Paragraph style={styles.starsText}>Rating: </Paragraph>{renderRating()}
              </View>
            </View>
            <View style={{flex: 0.3}}>
              <Title style={styles.price}>{prod.discountPrice}$</Title>
              {
                prod.discount
                ? <Badge style={styles.discount}>-{prod.discount}%</Badge>
                : null
              }
            </View>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            style={styles.optButton}
            mode={opt === 'description' ? 'contained' : 'outlined'}
            onPress={() => setOpt('description')}
            labelStyle={{fontSize: 12}}
          >Description</Button>
          <Button
            style={styles.optButton}
            mode={opt === 'characteristics' ? 'contained' : 'outlined'}
            onPress={() => setOpt('characteristics')}
            labelStyle={{fontSize: 12}}
          >Characteristics</Button>
          <Button
            style={styles.optButton}
            mode={opt === 'reviews' ? 'contained' : 'outlined'}
            onPress={() => setOpt('reviews')}
            labelStyle={{fontSize: 12}}
          >Reviews</Button>
        </View>
        <ScrollView style={styles.scroll}>
          {renderOpt()}
        </ScrollView>
      </View>
      <Button
          disabled={prod.quantity === 0}
          mode='contained' 
          icon='cart'  
          color={theme.colors.error} 
          style={styles.buyButton}
          contentStyle={{height: 35}}
          labelStyle={{fontSize: 16, fontWeight: 'bold'}}
          onPress={() => addToCartHandler()}
        >Add to cart</Button>
    </View>
  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  wrapper: {
    padding: 10,
  },
  img: {
    width: '100%',
    height: '40%',
    resizeMode: 'contain'
  },
  vendorModelContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 25,
  },
  specText: {
    fontWeight: 'bold'
  },
  discImage: {
    position: 'absolute',
    width: 90,
    height: 90,
    resizeMode: 'stretch'
  },
  guarantee: {
    fontSize: 20
  },
  stars: {
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 5,
  },
  starsText: {
    fontSize: 20
  },
  buyButton: {
    position: 'absolute',
    width: '100%',
    bottom: '0%',
  },
  desc: {
    fontSize: 16,
    padding: 5
  },
  buttonsContainer: {
    flexDirection: 'row'
  },
  optButton: {
    width: '33.3%'
  },
  scroll: {
    height: '28%'
  },
  price: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  discount: {
    position: 'absolute',
    fontSize: 15,
    top: '-30%',
    right: '20%'
  },
  withPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})