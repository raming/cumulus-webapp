import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import products from './products';
import { user } from './user/reducers';
import { wishlist } from './wishlist/reducers';
import { recommendations } from './recommendations/reducers';
import { productbestroutes } from './productbestroutes/reducers';
export default combineReducers({
  router: routerReducer,
  user,
  wishlist,
  recommendations,
  productbestroutes
});
