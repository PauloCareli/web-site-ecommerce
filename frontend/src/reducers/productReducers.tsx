import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,
} from "../constants/productConstants";

interface ProductListState {
    loading: boolean;
    products: Array<any>;
    page?: number;
    pages?: number;
    error?: string;
}

export const productListReducer = (
    state: ProductListState = { loading: true, products: [] },
    action: any
): ProductListState => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] };
        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                page: action.payload.page,
                pages: action.payload.pages,
            };
        case PRODUCT_LIST_FAIL:
            return { loading: false, products: [], error: action.payload };
        default:
            return state;
    }
};

interface ProductDetailsState {
    loading: boolean;
    product: {
        reviews: Array<any>;
    };
    error?: string;
}

export const productDetailsReducer = (
    state: ProductDetailsState = { loading: true, product: { reviews: [] } },
    action: any
): ProductDetailsState => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { ...state, loading: true };
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload };
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, product: { reviews: [] }, error: action.payload };
        default:
            return state;
    }
};

interface ProductDeleteState {
    loading: boolean;
    success?: boolean;
    error?: string;
}

export const productDeleteReducer = (
    state: ProductDeleteState = { loading: false },
    action: any
): ProductDeleteState => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading: true };
        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true };
        case PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

interface ProductCreateState {
    loading: boolean;
    success?: boolean;
    product?: any;
    error?: string;
}

export const productCreateReducer = (
    state: ProductCreateState = { loading: false },
    action: any
): ProductCreateState => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true };
        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload };
        case PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_CREATE_RESET:
            return { loading: false, success: false };
        default:
            return state;
    }
};

interface ProductUpdateState {
    loading: boolean;
    success?: boolean;
    product: any;
    error?: string;
}

export const productUpdateReducer = (
    state: ProductUpdateState = { loading: false, product: {} },
    action: any
): ProductUpdateState => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true };
        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, product: action.payload };
        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_UPDATE_RESET:
            return { loading: false, success: false, product: {} };
        default:
            return state;
    }
};

interface ProductReviewCreateState {
    loading: boolean;
    success?: boolean;
    error?: string;
}

export const productReviewCreateReducer = (
    state: ProductReviewCreateState = { loading: false },
    action: any
): ProductReviewCreateState => {
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true };
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true };
        case PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_CREATE_REVIEW_RESET:
            return { loading: false, success: false };
        default:
            return state;
    }
};

interface ProductTopRatedState {
    loading: boolean;
    products: Array<any>;
    error?: string;
}

export const productTopRatedReducer = (
    state: ProductTopRatedState = { loading: true, products: [] },
    action: any
): ProductTopRatedState => {
    switch (action.type) {
        case PRODUCT_TOP_REQUEST:
            return { loading: true, products: [] };
        case PRODUCT_TOP_SUCCESS:
            return { loading: false, products: action.payload };
        case PRODUCT_TOP_FAIL:
            return { loading: false, products: [], error: action.payload };
        default:
            return state;
    }
};
