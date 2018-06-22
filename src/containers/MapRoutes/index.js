import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import './styles.css'

class MapRoutes extends React.Component {
  componentDidMount() {
    // var googleMapsClient = googleMaps.createClient({
    //   key: 'AIzaSyBqnQVMGOxQIfwH9jwGmLG8QrPcwYj5uj4'
    // });

      this.initialize();
  }

  initialize() {
    console.info('mapp=', this.map, 'location', this.props.location);
    //  var googleMapsClient = window.google.createClient({
    //   key: 'AIzaSyBqnQVMGOxQIfwH9jwGmLG8QrPcwYj5uj4'
    // });
    var map = new window.google.maps.Map(this.map, {
        center: {
            lat: this.props.location.lat,
            lng: this.props.location.long,
        },
        zoom: 10
    });
    console.log('path', this.props.path)
    var encoded_data = this.props.path;
    //'qikrIehwu@WOKEIAIBGN?RAj@@f@?RGVO`NOhOSvQSdTUxUUbVUhVCdCEfC{@rUe@`LCt@KjDC`@NPfBl@nA\dH`@nFTh@BdDVPBb@LNJLNHPLn@B\NFNAlB_@^EjAKnAArABjIx@fGr@jG`AtHhAlIrArJxAvKbBhLfBnLdBhLjBxLfB|LnBxLjB`LbBlLdBfL~@hKv@lKn@vKx@lK\|Jd@dADfO[lL]pLWrLY~L_@~LWlABtHx@xOzEjAf@vCxAlCjBjCfC`CxChFrJfBrEzA`FxG~XtEvSlElRZvAXhAtApEDNDHHDLAFSFUFMLMLUDKBO@OB_@?Q?YC[GUOg@I_@COUy@M[MKMG?OEQAOCVPoALsA@QHa@JIDSKO';

    var decode = window.google.maps.geometry.encoding.decodePath(encoded_data);

    var line = new window.google.maps.Polyline({
        path: decode,
        strokeColor: '#00008B',
        strokeOpacity: 1.0,
        strokeWeight: 4,
        zIndex: 3
    });

    line.setMap(map);
}


  render() {
    return (
      <div ref={comp => this.map = comp} className="gmap"></div>
    )
  }
}



const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class RouteMapDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.onClose();
  };

  render() {
    const { classes } = this.props;
    return (
        <Dialog
          fullScreen
          open={true}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                Shopping Route
              </Typography>
              <Button color="inherit" onClick={this.handleClose}>
                Close
              </Button>
            </Toolbar>
          </AppBar>
          <MapRoutes location={this.props.location} path={this.props.path} />
        </Dialog>
    );
  }
}

// RouteMapDialog.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(RouteMapDialog);
