import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, Image} from 'react-native';
import {Title, Button, Paragraph} from 'react-native-paper';
import {theme} from '../../theme';
import {useSelector} from 'react-redux';
import {useShop} from '../hooks/useShop';
import {Rate} from '../components/Rate';
import noImage from '../assets/images/no-image.png';
import {MAX_RATE} from '../consts';
import Icon from 'react-native-vector-icons/Entypo';

export const Purchases = () => {
  const user = useSelector(state => state.user);
  const [rating, setRating] = useState(false);
  const [itemState, setItem] = useState({});
  const {rateItem} = useShop();

  const renderRating = (value) => {
    const rating = [];
    for (let i = 0; i < MAX_RATE; i++) {
      if (value > i) {
        rating.push(<Icon key={i} name='star' color='#fcdf4c' size={20} />);
      } else {
        rating.push(<Icon key={i} name='star' color={theme.colors.primary} size={20} />);
      }
    }
    return rating;
  }

  const clickHandler = (id, item) => {
    setRating(true);
    setItem({id, item});
  };

  const rateItemState = (value) => {
    setRating(false);
    rateItem(itemState, value);
  };

  const renderItems = () => {
    return Object.keys(user.history).map(item => {
      return (
          <View style={styles.card} key={item}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={user.history[item].item.img ? {uri: user.history[item].item.img} : noImage}
              />
            </View>
            <View style={styles.content}>
              <Title style={{color: theme.colors.text}}>{user.history[item].item.vendor} | {user.history[item].item.model}</Title>
              <Paragraph>{user.history[item].item.category} | {user.history[item].item.discountPrice}$</Paragraph>
              <Paragraph>
                {new Date(user.history[item].time).toLocaleDateString()} |
                {new Date(user.history[item].time).toLocaleTimeString()}
              </Paragraph>
              {
                user.history[item].rate
                ? <View style={{flexDirection: 'row'}}>
                  {renderRating(user.history[item].rate)}
                </View>
                : <Button
                    mode='contained'
                    onPress={() => clickHandler(item, user.history[item].item)}
                  >Rate</Button>
              }
            </View>
          </View>
      )
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>Your purchases</Title>
      </View>
      <ScrollView style={styles.items}>
        {
          user.history
          ? renderItems()
          : <Title>You have no any purchases yet</Title>
        }
      </ScrollView>
      <Rate
        visible={rating} 
        setVisible={setRating} 
        rateItemState={rateItemState}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 10
  },
  header: {
    flex: 0.1,
  },
  items: {
    flex: 0.9,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  card: {
    margin: 5,
    backgroundColor: theme.colors.accent,
    flexDirection: 'row',
    flex: 1,
    minHeight: 130,
    alignItems: 'center'
  },
  imageContainer: {
    flex: 0.35,
    padding: 2
  },
  content: {
    flex: 0.65,
    padding: 3
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  }

})