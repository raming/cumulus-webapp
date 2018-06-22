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
  distancelimitLabel: {
    marginTop: -10
  }
};

class UserPrefs extends React.Component {
  state = { timeSavingRatio: 50, distancelimit:10 };

  handletimeSavingRatioChange = (event, timeSavingRatio) => {
    let { distancelimit } = this.props;
    this.props.updateUserPrefs({ timeSavingRatio, distancelimit })
  };
  handleLLocationRadiusChange = (event, distancelimit) => {
    let { timeSavingRatio } = this.props;
    this.setState({ distancelimit, timeSavingRatio })
  };
  render() {
    const { classes } = this.props;
    const { distancelimit, timeSavingRatio } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.selection}>
          <AttachMoney className={classes.icon} />
          <div className={classes.select} >
            <Slider min={1} max={100} value={timeSavingRatio} aria-labelledby="label"
              onChange={(event, timeSavingRatio) => {
                let { distancelimit } = this.props;
                this.props.updateUserPrefs({ timeSavingRatio, distancelimit })
              }} />
          </div>
          <AccessTime className={classes.icon} />
        </div>


        <div className={classes.selection}>
          <Store className={classes.icon} />
          <div className={classes.select} >
            <Slider step={1} min={1} max={20} value={distancelimit} aria-labelledby="label"
              onChange={(event, distancelimit) => {
                let { timeSavingRatio } = this.props;
                this.props.updateUserPrefs({ timeSavingRatio, distancelimit })
              }} />
          </div>
          <DirectionsCar className={classes.icon} />
          <Typography className={classes.distancelimitLabel}>{distancelimit} KM</Typography>
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