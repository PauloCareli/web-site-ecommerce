import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_RESET,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_RESET,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_RESET,
} from "../constants/orderConstants";

interface OrderCreateState {
    loading: boolean;
    success?: boolean;
    order?: any;
    error?: string;
}

export const orderCreateReducer = (state: OrderCreateState = { loading: false }, action: any): OrderCreateState => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true };
        case ORDER_CREATE_SUCCESS:
            return { loading: false, success: true, order: action.payload };
        case ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_CREATE_RESET:
            return { loading: false, success: false };
        default:
            return state;
    }
};

interface OrderDetailsState {
    loading: boolean;
    orderItems: Array<any>;
    shippingAddress: any;
    order?: any;
    error?: string;
}

export const orderDetailsReducer = (
    state: OrderDetailsState = { loading: true, orderItems: [], shippingAddress: {} },
    action: any
): OrderDetailsState => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return { ...state, loading: true };
        case ORDER_DETAILS_SUCCESS:
            return { loading: false, order: action.payload };
        case ORDER_DETAILS_FAIL:
            return { loading: false, order: { reviews: [] }, error: action.payload };
        default:
            return state;
    }
};

interface OrderPayState {
    loading: boolean;
    success?: boolean;
    order?: any;
    error?: string;
}

export const orderPayReducer = (state: OrderPayState = { loading: false }, action: any): OrderPayState => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return { loading: true };
        case ORDER_PAY_SUCCESS:
            return { loading: false, order: action.payload };
        case ORDER_PAY_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_PAY_RESET:
            return { loading: false, success: false };
        default:
            return state;
    }
};

interface OrderListMyState {
    loading: boolean;
    orders: Array<any>;
    error?: string;
}

export const orderListMyReducer = (
    state: OrderListMyState = { loading: true, orders: [] },
    action: any
): OrderListMyState => {
    switch (action.type) {
        case ORDER_LIST_MY_REQUEST:
            return { loading: true };
        case ORDER_LIST_MY_SUCCESS:
            return { loading: false, orders: action.payload };
        case ORDER_LIST_MY_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_LIST_MY_RESET:
            return { loading: false, orders: [] };
        default:
            return state;
    }
};

interface OrderListState {
    loading: boolean;
    orders: Array<any>;
    error?: string;
}

export const orderListReducer = (
    state: OrderListState = { loading: true, orders: [] },
    action: any
): OrderListState => {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return { loading: true };
        case ORDER_LIST_SUCCESS:
            return { loading: false, orders: action.payload };
        case ORDER_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

interface OrderDeliverState {
    loading: boolean;
    success?: boolean;
    error?: string;
}

export const orderDeliverReducer = (state: OrderDeliverState = { loading: false }, action: any): OrderDeliverState => {
    switch (action.type) {
        case ORDER_DELIVER_REQUEST:
            return { loading: true };
        case ORDER_DELIVER_SUCCESS:
            return { loading: false, success: true };
        case ORDER_DELIVER_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_DELIVER_RESET:
            return { loading: false, success: false };
        default:
            return state;
    }
};
