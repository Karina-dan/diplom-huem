
import {FETCH_CART, DELETE_FROM_CART, ADD_TO_CART, DELETE_ALL} from '../types';

const initialState = {
  items: [],
  quantity: 0,
  summary: 0
};

export const cartReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_CART: 
      return {
        ...state,
        items: payload.items,
        quantity: payload.quantity,
        summary: payload.summary
      }
    case ADD_TO_CART:
      return {
        ...state,
        items: payload.items,
        quantity: payload.quantity,
        summary: payload.summary
      }
    case DELETE_FROM_CART:
      return {
        ...state,
        items: payload.items,
        quantity: payload.quantity,
        summary: payload.summary
      }
    case DELETE_ALL:
      return {
        items: [],
        quantity: 0,
        summary: 0
      }
    default: return state;
  }
};