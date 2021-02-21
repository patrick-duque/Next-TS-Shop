// PAY ORDER
export const PAY_ORDER_START = 'PAY_ORDER_START';
export const PAY_ORDER_SUCCESS = 'PAY_ORDER_SUCCESS';
export const PAY_ORDER_FAILED = 'PAY_ORDER_FAILED';

export const PAY_ORDER_RESET = 'PAY_ORDER_RESET';

interface PayOrderStart {
	type: typeof PAY_ORDER_START;
}

interface PayOrderSuccess {
	type: typeof PAY_ORDER_SUCCESS;
	payload: boolean;
}

interface PayOrderFailed {
	type: typeof PAY_ORDER_FAILED;
	payload: string;
}

interface PayOrderReset {
	type: typeof PAY_ORDER_RESET;
}

export type PayOrderDispatchType = PayOrderStart | PayOrderSuccess | PayOrderFailed | PayOrderReset;
export type PayDispatchType = PayOrderDispatchType;
