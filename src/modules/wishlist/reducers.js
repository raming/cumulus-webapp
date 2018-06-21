
import {
  PRODUCT_RECOMMEND,
  PRODUCT_RECOMMEND_SUCCESS,
  PRODUCT_RECOMMEND_ERROR,
  WISHLIST_ADD
} from './constants'


const initialState = {
  data: [],
  fetching: false,
};


export const wishlist = (state = initialState, action) => {
  let { type, payload = {} } = action
  switch (type) {
    case WISHLIST_ADD:
      if (payload) {
        
        return {
          ...state,
          data: [...state.data.filter(item=>item.value!=payload.value), payload]
        }
      }
  }
  return state;
};