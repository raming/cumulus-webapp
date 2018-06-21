
import {
  PRODUCT_RECOMMEND,
  PRODUCT_RECOMMEND_SUCCESS,
  PRODUCT_RECOMMEND_ERROR,
} from './constants'


const initialState = {
  data: [],
  fetching: false,
};


export const recommendations = (state = initialState, action) => {
  let { type, payload = {} } = action
  switch (type) {
    case PRODUCT_RECOMMEND:
      return {
        ...state,
        fetching: true,
        error: null,
      };

    case PRODUCT_RECOMMEND_SUCCESS:
      return {
        ...state,
        data: payload,
        fetching: false,
        error: null,
      };
      case PRODUCT_RECOMMEND_ERROR:
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