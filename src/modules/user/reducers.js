
import {
  USER_REGISTER,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
  USER_PREFS_UPDATE,
  USER_LOCATION_UPDATE
} from './constants'


const initialState = {
  info: {},
  location: {},
  prefs: {timeSavingRatio: 50, distancelimit:10 },
};


export const user = (state = initialState, action) => {
  let { type, payload = {} } = action
  switch (type) {
    case USER_LOCATION_UPDATE:
      return {
        ...state,
        location: {...payload}
      }
    case USER_PREFS_UPDATE:
      return {
        ...state,
        prefs: {...payload}
      }
    case USER_REGISTER:
      return {
        ...state,
        fetching: true
      };

    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        data: payload,
        fetching: false
      };
      case USER_REGISTER_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.payload.error
      };

    default:
      return state;
  }
};