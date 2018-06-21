


import {
  PRODUCT_RECOMMEND,
  PRODUCT_RECOMMEND_SUCCESS,
  PRODUCT_RECOMMEND_ERROR,
  WISHLIST_ADD
} from './constants'


export const getRecommendations = (data) => {
  return (dispatch, getState) => {
    let { wishlist } = getState();
    let data = wishlist.data || []
    dispatch({
      type: PRODUCT_RECOMMEND
    });

    fetch('https://cumulus-207900.appspot.com/external/recommend', {
      method: 'POST',
      headers: {
        'Authorization': 'jwt 1231231231',

        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
    body: JSON.stringify({data})
    }).then(res => res.json())
      .then(res => {
        console.info('found results', res);
        dispatch({
          type: PRODUCT_RECOMMEND_SUCCESS,
          payload: res
        });
      })
      .catch(function (error) {
        console.error('Request failed', error);
        dispatch({
          type: PRODUCT_RECOMMEND_SUCCESS,
          payload: [{value:'Apple', text:'Apple'}, {value:'Banana', text:'Banana'}]
        });
        // dispatch({
        //   type: PRODUCT_RECOMMEND_ERROR,
        //   payload: { error }
        // });
      });
  };
};