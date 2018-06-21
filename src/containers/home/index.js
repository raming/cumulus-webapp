import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SearchBar from '../SearchBar'
import WishListTable from '../WishListTable'
import RecommendationList from '../RecommendationList'
import UserPrefs from '../Prefs'
const Home = props => (
  <div>
    <UserPrefs />
    <WishListTable />
    <SearchBar />
    <RecommendationList />
  </div>
);

const mapStateToProps = state => ({
  count: 0,//state.counter.count,
  isIncrementing: 0,//state.counter.isIncrementing,
  isDecrementing: 0,//state.counter.isDecrementing
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {

      changePage: () => push('/about-us')
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
