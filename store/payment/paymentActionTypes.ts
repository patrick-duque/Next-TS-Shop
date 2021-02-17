export const CHANGE_PAYMENT_METHOD = 'CHANGE_PAYMENT_METHOD';

export interface ChangePaymentMethod {
	type: typeof CHANGE_PAYMENT_METHOD;
	payload: string;
}

export type PaymentDispatchType = ChangePaymentMethod;
