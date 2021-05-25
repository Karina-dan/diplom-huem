import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {rootReducer} from './rootReducer';

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);
