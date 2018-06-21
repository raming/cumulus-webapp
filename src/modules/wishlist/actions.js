


import {
  PRODUCT_RECOMMEND,
  PRODUCT_RECOMMEND_SUCCESS,
  PRODUCT_RECOMMEND_ERROR,
  WISHLIST_ADD
} from './constants'

export const addToWhishList = (data) => {
  return dispatch => {
    dispatch({
      type: WISHLIST_ADD,
      payload: data
    });
  }
}

export const registerUser = (data) => {
  return dispatch => {
    dispatch({
      type: PRODUCT_RECOMMEND
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
          type: PRODUCT_RECOMMEND_SUCCESS,
          payload: res
        });
      })
      .catch(function (error) {
        console.log('Request failed', error);
        dispatch({
          type: PRODUCT_RECOMMEND_ERROR,
          payload: { error }
        });
      });
  };
};