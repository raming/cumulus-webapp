import React from 'react';
import { Route, Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { RouteComponentProps, Router } from 'react-router';
import { createBrowserHistory } from 'history';

import { AppBar, Badge, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, Theme, Toolbar, Typography, WithStyles, withStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import TodoIcon from '@material-ui/icons/FormatListNumbered';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';


import SearchBar from '../SearchBar'
import withRoot from '../withRoot';
import Home from '../home';
import About from '../about';

const history = createBrowserHistory();
function mapStateToProps(state) {
  return {
      todoList: state.todoList || []
  };
}
class App extends React.Component {
  state = {
    mobileOpen: false,
  };

  routes = (
    <div className={this.props.classes.content}>
      <Route exact={true} path="/" component={Home} />
      <Route exact={true} path="/about" component={About} />
    
    </div>
  );

  componentDidMount() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        console.info(position.coords.latitude, position.coords.longitude);
      });
    } else {
      /* geolocation IS NOT available */
    }
}

  render() {

    let drawer = (
      <div>
        <div className={this.props.classes.drawerHeader} />
        <Divider />
        <List>
          <ListItem button onClick={() => history.push('/')}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={() => history.push('/todo')}>
            <ListItemIcon>
              {this.renderTodoIcon()}
            </ListItemIcon>
            <ListItemText primary="Todo" />
          </ListItem>
        </List>
        <div style={{ height: 10000 }} />
      </div>
    );

    return (
      <Router history={history}>
        <div className={this.props.classes.root}>
          <div className={this.props.classes.appFrame}>
            <AppBar className={this.props.classes.appBar}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={this.handleDrawerToggle}
                  className={this.props.classes.navIconHide}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="title" color="inherit" noWrap>
                  Shop with Cloud-Spirit
                </Typography>
              </Toolbar>
            </AppBar>
            <Hidden mdUp>
              <Drawer
                variant="temporary"
                anchor={'left'}
                open={this.state.mobileOpen}
                classes={{
                  paper: this.props.classes.drawerPaper,
                }}
                onClose={this.handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
              <Drawer
                variant="permanent"
                open
                classes={{
                  paper: this.props.classes.drawerPaper,
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            {this.routes}
          </div>
        </div>
      </Router>
    );
  }

  renderTodoIcon() {
    let uncompletedTodos = this.props.todoList.filter(t => t.completed === false);

    if (uncompletedTodos.length > 0) {
      return (
        <Badge color="secondary" badgeContent={uncompletedTodos.length}>
          <TodoIcon />
        </Badge>
      );
    } else {
      return (
        <TodoIcon />
      );
    }
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
}



const drawerWidth = 240;
const styles = (theme) => createStyles({
    root: {
        width: '100%',
        height: '100vh',
        zIndex: 1,
        overflow: 'hidden',
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        position: 'absolute',
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    drawerHeader: theme.mixins.toolbar,
    drawerPaper: {
        width: 250,
        backgroundColor: theme.palette.background.default,
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            position: 'relative',
            height: '100%',
        },
    },
    content: {
        backgroundColor: theme.palette.background.default,
        width: '100%',
        height: 'calc(100% - 56px)',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            marginTop: 64,
        },
    },
});

export default (withRoot(withStyles(styles)(connect(mapStateToProps)(App))));

const Appa = () => (
  <div>
    <header>
      <Link to="/">Home</Link>
      <Link to="/about-us">About</Link>
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
    </main>
  </div>
);

// export default App;
