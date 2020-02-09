import { combineReducers } from 'redux';
import { cartReducer } from './cart/reducers';

const defaultState = {
  currency: 'EUR'
};

export const appReducer = (state = defaultState, action) => {  
  switch (action.type) {
    case 'SET_APP_CURRENCY':
      return {
        ...state,
        currency: action.payload
      }
  
    default:
      break;
  }
  
  return state;
};

export default combineReducers({
  app: appReducer,
  cart: cartReducer
});
