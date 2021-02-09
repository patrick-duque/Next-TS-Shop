import * as actionTypes from './cartActionTypes';
import Product from '../../models/product';

export interface CartItem {
  quantity: number;
  product: Product;
}

export interface CartState {
  items: CartItem[];
  loading: boolean;
}

const initialState: CartState = {
  items: [],
  loading: false
};

const cartReducer = (state: CartState = initialState, action: actionTypes.CartDispatchType): CartState => {
  const newState = { ...state };

  switch (action.type) {
    case actionTypes.CART_ADD_ITEM:
      const product = newState.items.find(item => item.product._id === action.payload.product._id);
      if (product) {
        product.quantity += action.payload.quantity;
        newState.items = newState.items.map(item => (item.product._id === product.product._id ? product : item));
      } else {
        newState.items.push(action.payload);
      }
      break;
    case actionTypes.CART_REMOVE_ITEM:
      newState.items = newState.items.filter(p => p.product._id !== action.payload);
      break;
  }

  return newState;
};

export default cartReducer;
