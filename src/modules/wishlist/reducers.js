
import {
  WISHLIST_ADD,
  WISHLIST_REMOVE
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
          data: [...state.data.filter(item => item.value != payload.value), payload]
        }
      }
    case WISHLIST_REMOVE:
      if (payload) {
        return {
          ...state,
          data: [...state.data.filter(item => item.value != payload.value)]
        }
      }
  }
  return state;
};