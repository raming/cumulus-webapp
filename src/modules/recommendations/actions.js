


import {
  PRODUCT_RECOMMEND,
  PRODUCT_RECOMMEND_SUCCESS,
  PRODUCT_RECOMMEND_ERROR,
  PRODUCT_RECOMMEND_REMOVE,
} from './constants'


export const removeRecommendation = (data) => {
  return dispatch => {
    dispatch({
      type: PRODUCT_RECOMMEND_REMOVE,
      payload: data
    });
  }
}


export const getRecommendations = (data) => {
  return (dispatch, getState) => {
    let { wishlist } = getState();
    let data = (wishlist.data || []).map(item => item.text);
    dispatch({
      type: PRODUCT_RECOMMEND
    });

    fetch('https://cumulus-207900.appspot.com/external/recommend', {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
    body: JSON.stringify({data})
    }).then(res => res.json())
      .then(res => {
        console.info('found results', res);
        dispatch({
          type: PRODUCT_RECOMMEND_SUCCESS,
          payload: (res.data || []).map(item=>{return {value:item, text:item}})
        });
      })
      .catch(function (error) {
        console.error('Request failed', error);
        dispatch({
          type: PRODUCT_RECOMMEND_ERROR,
          payload: { error }
        });
      });
  };
};