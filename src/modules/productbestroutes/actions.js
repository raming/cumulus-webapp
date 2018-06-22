


import {
  PRODUCT_ROUTES,
  PRODUCT_ROUTES_SUCCESS,
  PRODUCT_ROUTES_ERROR,
} from './constants'

export const getProductBestRoutes = () => {
  return (dispatch, getState) => {
    let { wishlist, user } = getState();
    let items = (wishlist.data || []).map(item => item.text);
    let data = {
      items,
      distancelimit: user.prefs.distancelimit,
      timeSavingRatio: user.prefs.timeSavingRatio/100,
      lat: user.location.lat,
      long: user.location.long,
      // "lat": 43.657648,
      // "long": -79.381728,
    }
    // "lat": 43.657648,
    // "long": -79.381728,
    // "items": ["Apple"],
    // "distancelimit": 10,
    // "timeSavingRatio": 1
    dispatch({
      type: PRODUCT_ROUTES
    });

    fetch('https://cumulus-207900.appspot.com/external/routes', {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(data)
    }).then(res => res.json())
      .then(res => {
        console.info('found results', res);

        let mockdata = {
          "data": [
            {
              "route": {
                "points": "s{miGheocNe@Nd@jDJ~@Jv@d@`EN`A@DpFcBfAYjD|WFl@@d@DhBz@xGB`@Cf@?XTbBnCpTfCnSPbAdAnIdBrNd@fDR~A?h@G\\Sn@qAvDOf@C\\bAvI`Fva@vHlo@D`ACrCG|FObQ[~^CdBUHw@TuBj@oGfBoHrB}DfAYHLjAGZCNZ~Bb@xE@VCVGFOL]JqCv@pCw@\\KNMFGBWKaBs@eG?MFY@MMkAlCu@~C{@bBe@y@gHMsA?m@Hs@@c@AUkCwSoBmOmEu]GeAEmB@qBNuB\\iEHmAAcAuG_j@}ByRmBsPoAaKCe@?oA_AiIgBwOsAkKeAiIgAiIyBmPm@eFOwAA_@qAgKW{BrDkAtBq@f@StBu@tGwB"
              },
              "distance": 10424,
              "duration": 2506,
              "total": 10.55,
              "items": [
                {
                  "product_id": 1000000000,
                  "product_type": "Apple",
                  "price": 10.55,
                  "store_id": 1000,
                  "city": "Toronto",
                  "state": "Ontario",
                  "lat": 43.655389,
                  "long": -79.435621,
                  "distance_in_km": 4.337028730345155,
                  "option": 1
                }
              ]
            },
            {
              "route": {
                "points": "s{miGheocN``@}LhSqGrKgD~@WpBm@JBZGlFgBbBi@\\K~@vBzG~OFPPf@Dn@Nx@Xx@fBxEzAxD~@jCtAlFP\\Jn@b@xCh@tDz@vH^zCb@pEz@xI`AvK|AhPXpEDjB?xBKlFMhGGpDBxBJtDhArWJtE@jE?jGDvBLrCRpBVrBfFdYtEfW|@~EzC|PrExVXlBPjBLhBFpCA~BK|BKrASlB[jB_AvDuAlEuAfEoP~g@aAlDiA`F_AhFg@`Dg@tDc@`EYhD_@lFY|GSjJAjFHfGLvDRxCl@|Gf@lEh@tDfA|FvAbG`BzFzB|GtBnG@PHf@vAnExA`EHp@?^Gf@Sp@}@pB[x@aBpDe@|@q@z@{@|@Y\\iBtCe@d@}@j@WLc@NsC|@eBl@eAn@y@r@}@hAeM`PuAdB{@dAw@l@q@^u@Vo@RUNmBnAkBpAaCvBaBpAuDnCs@h@OTs@fAc@|@W^KO_CkCGGYk@Sm@eXjI}^`Lwe@xN{CbAyIbC]{C{AqKqCoSaAaH^?FAJEh@e@FCVGWFGBQLWVKDg@@jGdd@p@jFNlAnF}AhBe@r@W~GwBxg@uO`^sK|KkDhDeAFTZt@PT~BjCJNV_@b@}@NUr@gAxAeAzDuCjBcBpBaBbCaBdAq@tAc@j@Wn@c@x@w@rKgNhEoFt@{@|@q@pAk@rC}@~Ai@n@]p@g@XY\\g@z@wAZc@`BgBh@}@fA_Cn@sAj@cAn@w@jBiBTyABsACi@Om@Wg@yAcByAeBWa@KGECu@sB}@iCeBmFoAcE_AeDkAcFeAsFm@yDi@oEm@uGWwEMuDG_E?eFPkJb@sJX_E`@mEj@cFVmB^_Cz@}ExAwG~AqFbU_s@p@uCb@mCRoBLmBFqCAkBGoCOmBu@cFIk@Km@{Fa[gEmU]qBsGa^y@aFg@_DMuASaDK{E?iHOqIM}DaAeSG}EDeFRiN?iBCqAGaBQaCe@}EyAwO{AmPq@gHC{@[}DMqA_@iESeC[_Cg@wCYaACK_AyDa@kDWuC}EyRSSS}@]yAWaA[q@a@i@MKi@Ye@Ma@K]JcCv@eH|BqAh@UNqBl@_AVmWfIeSnGkT~G"
              },
              "distance": 29550,
              "duration": 3060,
              "total": 8.55,
              "items": [
                {
                  "product_id": 1000000000,
                  "product_type": "Apple",
                  "price": 8.55,
                  "store_id": 1001,
                  "city": "Toronto",
                  "state": "Ontario",
                  "lat": 43.668054,
                  "long": -79.484581,
                  "distance_in_km": 8.3427593344916,
                  "option": 2
                }
              ]
            }
          ]
        }
        dispatch({
          type: PRODUCT_ROUTES_SUCCESS,
          payload: mockdata || {data:[]}
        });
      })
      .catch(function (error) {
        dispatch({
          type: PRODUCT_ROUTES_ERROR,
          payload: { error }
        });
      });
  };
};