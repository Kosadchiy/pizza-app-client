const defaultState = {
  items: [],
  total: 0
}

export const cartReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_CART':
      return {
        ...state,
        ...action.payload
      }
  
    default:
      break;
  }
  return state;
}