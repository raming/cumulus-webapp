


import {
  USER_REGISTER,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
  USER_PREFS_UPDATE,
  USER_LOCATION_UPDATE
} from './constants'

export const updateUserLocation = (location) => {
  return dispatch => {
    dispatch({
      type: USER_LOCATION_UPDATE,
      payload: location
    });
  }
}

export const updateUserPrefs = (prefs) => {
  return dispatch => {
    dispatch({
      type: USER_PREFS_UPDATE,
      payload: prefs
    });
  }
}
export const registerUser = (data) => {
  return dispatch => {
    dispatch({
      type: USER_REGISTER
    });
    fetch('https://httpbin.org/post', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(res => {
        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: res
        });
      })
      .catch(function (error) {
        console.log('Request failed', error);
        dispatch({
          type: USER_REGISTER_ERROR,
          payload: { error }
        });
      });
  };
};