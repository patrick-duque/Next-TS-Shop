export const ADD_ADDRESS = 'ADD_ADDRESS';
export const REMOVE_ADDRESS = 'REMOVE_ADDRESS';

export interface AddressType {
  address: string;
  city: string;
  postalCode: string;
}

export interface addAddress {
  type: typeof ADD_ADDRESS;
  payload: AddressType;
}

export interface removeAddress {
  type: typeof REMOVE_ADDRESS;
}

export type AddressDispatchType = addAddress | removeAddress;
