import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import SearchBar from '../SearchBar'
import WishListTable from '../WishListTable'
import RecommendationList from '../RecommendationList'
import BestProductRoutes from '../BestProductRoutes'
import UserPrefs from '../Prefs'


const styles = theme => ({
  root: {
    width: '85%',
    margin: '10'
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  body: {
    // width: '85%',
    // margin: '10'
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    minHeight: 300,
    width: '95%',
    margin: '10'
  },
});

function getSteps() {
  return ['My Wish List', 'My Preferences', 'Save Time & Money'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return (<div>
        <SearchBar />
        <WishListTable />
        <RecommendationList/>
        </div>
      )// 'Select campaign settings...';
    case 1:
      return <UserPrefs />;
    case 2:
      return <BestProductRoutes />;
    default:
      return 'Uknown stepIndex';
  }
}

class HorizontalLabelPositionBelowStepper extends React.Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1,
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { classes  } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper className={classes.body} activeStep={activeStep} alternativeLabel>
          {steps.map(label => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div className={classes.body}>
          {this.state.activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&quot;re finished
              </Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button variant="contained" color="primary" onClick={this.handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

HorizontalLabelPositionBelowStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(HorizontalLabelPositionBelowStepper);
