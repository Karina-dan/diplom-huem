import {combineReducers} from 'redux';
import {userReducer} from './user/reducer';
import {shopReducer} from './shop/reducer';
import {cartReducer} from './cart/reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  shop: shopReducer,
  cart: cartReducer
});
