
import {
  PRODUCT_ROUTES,
  PRODUCT_ROUTES_SUCCESS,
  PRODUCT_ROUTES_ERROR,
} from './constants'


const initialState = {
  data: [],
  fetching: false,
};


export const productbestroutes = (state = initialState, action) => {
  let { type, payload = {} } = action
  switch (type) {

    case PRODUCT_ROUTES:
      return {
        ...state,
        fetching: true,
        error: null,
      };

    case PRODUCT_ROUTES_SUCCESS:
      return {
        ...state,
        data: [...payload.data],
        fetching: false,
        error: null,
      };
    case PRODUCT_ROUTES_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.payload.error
      };

    default:
      return state;
  }
  return state;
};