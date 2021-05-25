
import {useDispatch, useSelector} from 'react-redux';
import {useContext} from 'react';
import {fetchProducts, buyProducts, rateProduct, addCategory, addProduct} from '../store/shop/actions';
import {fetchCart, addToCart, deleteFromCart, deleteAll} from '../store/cart/actions';
import {checkBonus, updateBonus} from '../store/user/actions';
import { SnackbarContext } from '../context/SnackbarContext';


export const useShop = (navigation) => {
  const dispatch = useDispatch();
  const shop = useSelector(state => state.shop);
  const cart = useSelector(state => state.cart);
  const snackbar = useContext(SnackbarContext);

  const fetchList = async () => {
    await dispatch(fetchProducts());
  };

  const getCategories = () => {
    const categories = [];
    for (let category in shop.products) {
      const categoryItem = {};
      categoryItem.name = category;
      if (Array.isArray(shop.products[category])) {
        categoryItem.items = shop.products[category].length;
      } else {
        categoryItem.items = 0;
      }
      categories.push(categoryItem);
    }
    return categories;
  };

  const getItemsByCategory = (category) => {
    if (Array.isArray(shop.products[category])) {
      return shop.products[category].map(item => item);
    } else {
      return [];
    }
  };

  const getAllItems = () => {
    const items = [];
    for (let category in shop.products) {
      if (Array.isArray(shop.products[category])) {
        shop.products[category].forEach(item => {
          items.push(item);
        });
      }
    }
    return items;
  }

  const checkPromo = async (promo) => {
    const response = await dispatch(checkBonus(promo));
    snackbar.show(response);
  };

  const changeBonusBalance = (value) => {
    dispatch(updateBonus(value));
  };

  const buyItems = async (cart, bonus = false) => {
    if (cart.items.length > 0) {
      if (bonus !== false) {
        if (bonus < cart.summary) {
          snackbar.show('Not enough money on bonus account');
          return;
        } else {
          changeBonusBalance(cart.summary);
        }
      }
      const error = await dispatch(buyProducts(cart.items));
      if (error) {
        snackbar.show(error);
      } else {
        snackbar.show('Stuff was succesfully bought');
        deleteAllCart();
        navigation.navigate('Categories');
      }
    } else {
      snackbar.show('No items in cart');
    }
  }

  const rateItem = async (item, value) => {
    const error = await dispatch(rateProduct(item, value));
    if (error) {
      snackbar.show(error);
    } else {
      snackbar.show("You've rated this item");
    }
  }

  const fetchShoppingCart = () => {
    dispatch(fetchCart());
  }

  const addToShoppingCart = (prod) => {
    dispatch(addToCart(prod));
  }

  const deleteFromShoppingCart = (prod) => {
    dispatch(deleteFromCart(prod))
  }

  const deleteAllCart = () => {
    dispatch(deleteAll());
  }

  const addCat = async (value) => {
    const response = await addCategory(value);
    snackbar.show(response);
  };

  const addProd = async (value) => {
    const response = await addProduct(value);
    snackbar.show(response);
    navigation.goBack();
  };

  return {
    fetchList, 
    getCategories, 
    getAllItems, 
    getItemsByCategory,
    fetchShoppingCart,
    addToShoppingCart,
    deleteFromShoppingCart,
    deleteAllCart,
    buyItems,
    rateItem,
    checkPromo,
    addCat,
    addProd,
    cart,
    shop
  };
};
