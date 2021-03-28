import * as actionTypes from './addressActionTypes';

export const addAddress = (address: actionTypes.AddressType) => {
	localStorage.setItem('address', JSON.stringify(address));
	return { type: actionTypes.ADD_ADDRESS, payload: address };
};
