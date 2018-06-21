import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import AttachMoney from '@material-ui/icons/AttachMoney';
import AccessTime from '@material-ui/icons/AccessTime';
import Store from '@material-ui/icons/Store';
import DirectionsCar from '@material-ui/icons/DirectionsCar';

import { updateUserPrefs } from '../../modules/user/actions'
const styles = {
  container: {
    padding: 10

  },

  selection: {
    width: 400,
    textAlign: 'center'
  },

  select: {
    width: 300,
    display: 'inline-block',

  },
  icon: {
    display: 'inline-block',
    margin: '0 10px',
    marginTop: -20
  },
  locationRadiusLabel: {
    marginTop: -10
  }
};

class UserPrefs extends React.Component {
  state = { timeVsCost: 50, locationRadius:10 };

  handleTimeVsCostChange = (event, timeVsCost) => {
    let { locationRadius } = this.props;
    this.props.updateUserPrefs({ timeVsCost, locationRadius })
  };
  handleLLocationRadiusChange = (event, locationRadius) => {
    let { timeVsCost } = this.props;
    this.setState({ locationRadius, timeVsCost })
  };
  render() {
    const { classes } = this.props;
    const { locationRadius, timeVsCost } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.selection}>
          <AttachMoney className={classes.icon} />
          <div className={classes.select} >
            <Slider min={1} max={100} value={timeVsCost} aria-labelledby="label"
              onChange={(event, timeVsCost) => {
                let { locationRadius } = this.props;
                this.props.updateUserPrefs({ timeVsCost, locationRadius })
              }} />
          </div>
          <AccessTime className={classes.icon} />
        </div>


        <div className={classes.selection}>
          <Store className={classes.icon} />
          <div className={classes.select} >
            <Slider step={1} min={1} max={20} value={locationRadius} aria-labelledby="label"
              onChange={(event, locationRadius) => {
                let { timeVsCost } = this.props;
                this.props.updateUserPrefs({ timeVsCost, locationRadius })
              }} />
          </div>
          <DirectionsCar className={classes.icon} />
          <Typography className={classes.locationRadiusLabel}>{locationRadius} KM</Typography>
        </div>

      </div>
    );
  }
}

UserPrefs.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => {
  let { user } = state;
  console.info('...., user', user)
  return {
    ...user.prefs
  }
};
const mapDispatchToProps = {
  updateUserPrefs
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(UserPrefs));