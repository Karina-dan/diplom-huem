import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import {theme} from '../../theme';
import {useSelector} from 'react-redux';
import {Categories} from '../components/Categories';
import {createStackNavigator} from '@react-navigation/stack';
import { ProductList } from '../components/ProductList';
import {Product} from '../components/Product';

const ProductsNavigation = createStackNavigator();

export const Home = () => {
  const shop = useSelector(state => state.shop);

  return (
    <>
      {
        shop.loading
        ? <View style={styles.container}> 
            <ActivityIndicator size='large' color={theme.colors.primary} />
          </View>
        :
          <ProductsNavigation.Navigator initialRouteName='Categories' headerMode='none'>
            <ProductsNavigation.Screen
              name='Categories' 
              component={Categories} 
            />
            <ProductsNavigation.Screen 
              name='ProductList' 
              component={ProductList} 
            />
            <ProductsNavigation.Screen
              name='Product'
              component={Product} 
            />
          </ProductsNavigation.Navigator>
      }
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
