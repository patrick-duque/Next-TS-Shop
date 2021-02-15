import * as actionTypes from './addressActionTypes';
import Product from '../../models/product';

export interface CartItem {
  quantity: number;
  product: Product;
}

export interface AddressState extends actionTypes.AddressType {
  loading?: boolean;
}

const initialState: AddressState = {
  loading: false,
  address: null,
  city: null,
  postalCode: null
};

const addressReducer = (state: AddressState = initialState, action: actionTypes.AddressDispatchType): AddressState => {
  const newState = { ...state };

  switch (action.type) {
    case actionTypes.ADD_ADDRESS:
      newState.loading = false;
      newState.address = action.payload.address;
      newState.city = action.payload.city;
      newState.postalCode = action.payload.postalCode;
      break;
    case actionTypes.REMOVE_ADDRESS:
      newState.address = null;
      newState.city = null;
      newState.postalCode = null;
  }

  return newState;
};

export default addressReducer;
