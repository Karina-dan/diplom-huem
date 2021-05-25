import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { ChooseOpt } from './Manage/ChooseOpt';
import { AddCategory } from './Manage/AddCategory';
import { AddProduct } from './Manage/AddProduct';

const Stack = createStackNavigator();

export const Manage = () => {
  return (
    <Stack.Navigator headerMode='none' initialRouteName='Options'>
      <Stack.Screen name='Options' component={ChooseOpt}/>
      <Stack.Screen name='Add Category' component={AddCategory}/>
      <Stack.Screen name='Add Product' component={AddProduct}/>
    </Stack.Navigator>
  )
};
