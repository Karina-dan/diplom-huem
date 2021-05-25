import AsyncStorage from '@react-native-community/async-storage';
import { FETCH_CART, ADD_TO_CART, DELETE_FROM_CART, DELETE_ALL } from '../types';

export const fetchCart = () => {
  return async dispatch => {
      const userJSON = await AsyncStorage.getItem('user');
      const user = JSON.parse(userJSON);
      if (user) {
        if (!user.cart) {
          user.cart = {
            items: [],
            quantity: 0,
            summary: 0
          };
          dispatch({
            type: FETCH_CART,
            payload: {
              items: [],
              quantity: 0,
              summary: 0
            }
          });
        } else {
          dispatch({
            type: FETCH_CART,
            payload: user.cart
          });
        }
      } else {
        const cartJSON = await AsyncStorage.getItem('cart');
        let cart = JSON.parse(cartJSON);
        if (!cart) {
          dispatch({
            type: FETCH_CART,
            payload: {
              items: [],
              quantity: 0,
              summary: 0
            }
          });
        } else {
          dispatch({
            type: FETCH_CART,
            payload: cart
          });
        }
      }
  }
};

export const addToCart = (prod) => {
  return async dispatch => {
    const userJSON = await AsyncStorage.getItem('user');
    const user = JSON.parse(userJSON);
    if (user) {
      if (!user.cart) {
        user.cart = {
          items: [{item: prod, quantity: 1}],
          quantity: 1,
          summary: prod.discountPrice
        }
        dispatch({
          type: ADD_TO_CART,
          payload: {
            items: [{item: prod, quantity: 1}],
            quantity: 1,
            summary: prod.discountPrice
          }
        });
      } else {
        const foundIndex = user.cart.items.findIndex(
          ({item}) => item.id === prod.id
        );
        if (foundIndex === -1) {
          user.cart = {
            items: [...user.cart.items, {item: prod, quantity: 1}],
            quantity: user.cart.quantity + 1,
            summary: user.cart.summary + prod.discountPrice
          };
        } else {
          user.cart.items[foundIndex].quantity++;
          user.cart = {
            items: user.cart.items,
            quantity: user.cart.quantity + 1,
            summary: user.cart.summary + prod.discountPrice
          };
        }
        dispatch({
          type: ADD_TO_CART,
          payload: user.cart
        });
      }
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } else {
      const cartJSON = await AsyncStorage.getItem('cart');
      let cart = JSON.parse(cartJSON);
      if (!cart) {
        cart = {
          items: [{item: prod, quantity: 1}],
          quantity: 1,
          summary: prod.discountPrice
        };
        dispatch({
          type: ADD_TO_CART,
          payload: {
            items: [{item: prod, quantity: 1}],
            quantity: 1,
            summary: prod.discountPrice
          }
        });
      } else {
        const foundIndex = cart.items.findIndex(
          ({item}) => item.id === prod.id
        );
        if (foundIndex === -1) {
          cart = {
            items: [...cart.items, {item: prod, quantity: 1}],
            quantity: cart.quantity + 1,
            summary: cart.summary + prod.discountPrice
          };
        } else {
          cart.items[foundIndex].quantity++;
          cart = {
            items: cart.items,
            quantity: cart.quantity + 1,
            summary: cart.summary + prod.discountPrice
          };
        }
        dispatch({
          type: ADD_TO_CART,
          payload: cart
        });
      }
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
    }
  }
}

export const deleteFromCart = (prod) => {
  return async dispatch => {
    const userJSON = await AsyncStorage.getItem('user');
    const user = JSON.parse(userJSON);
    if (user) {
      const filteredCart = user.cart.items.filter(
        ({item}) => item.id !== prod.item.id
      );
      user.cart = {
        items: filteredCart,
        quantity: user.cart.quantity - prod.quantity,
        summary: user.cart.summary - (prod.item.discountPrice * prod.quantity)
      }
      dispatch({
        type: DELETE_FROM_CART,
        payload: user.cart
      });
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } else {
      const cartJSON = await AsyncStorage.getItem('cart');
      let cart = JSON.parse(cartJSON);
      const filteredCart = cart.items.filter(
        ({item}) => item.id !== prod.item.id
      );
      cart = {
        items: filteredCart,
        quantity: cart.quantity - prod.quantity,
        summary: cart.summary - (prod.item.discountPrice * prod.quantity)
      };
      dispatch({
        type: DELETE_FROM_CART,
        payload: cart
      });
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
    }
  }
}


export const deleteAll = () => {
  return async dispatch => {
    const userJSON = await AsyncStorage.getItem('user');
    const user = JSON.parse(userJSON);
    if (user) {
      user.cart = null;
      dispatch({
        type: DELETE_ALL
      })
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } else {
      dispatch({
        type: DELETE_ALL
      })
      await AsyncStorage.removeItem('cart');
    }
  }
}