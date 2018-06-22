import { Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, Theme, WithStyles, withStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

import AttachMoney from '@material-ui/icons/AttachMoney';
import AccessTime from '@material-ui/icons/AccessTime';
import DirectionsCar from '@material-ui/icons/DirectionsCar';
import * as React from 'react';
import { connect } from 'react-redux';
import RouteMapDialog from '../MapRoutes'
import { getProductBestRoutes } from '../../modules/productbestroutes/actions'
class ProductRoute extends React.Component {
    constructor(props) {
        super();
        this.state = {
            prodRoutePoints: '',
            openRouteDialog: false
        }
    }
    render() {
        let { distance, duration, total, classes, items, route } = this.props;
        return (
            <Paper className={classes.paper} onClick={() => {
                this.setState({
                    prodRoutePoints: route.points,
                    openRouteDialog: true
                });
            }}>
                <Table className={classes.table}>
                    <TableBody>
                        <TableRow hover >
                            <TableCell className={classes.prodRowHeader} >
                                <AccessTime />{Math.round(duration/60 * 100) / 100}min
                            </TableCell>
                        
                            <TableCell className={classes.prodRowHeader} >
                                <DirectionsCar /> {Math.round(distance/1000 * 100) / 100}KM
                            </TableCell>
                            <TableCell className={classes.prodRowHeader} >
                                <AttachMoney />   {total}
                            </TableCell>
                        </TableRow>
                    </TableBody>

                </Table>
                
                <Table className={classes.table}>
                    <TableBody>
                        {items.map(item => {
                            return (
                                <TableRow
                                    key={item.product_id}
                                    hover      >
                                    <TableCell >
                                        {item.product_type}
                                    </TableCell>
                                    <TableCell width={45}  >
                                        ${item.price}
                                
                                    </TableCell>
                            
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

                {this.state.openRouteDialog ?
                    <RouteMapDialog location={this.props.userLocation} path={this.state.prodRoutePoints} onClose={() => {
                        this.setState({
                            prodRoutePoints: '',
                            openRouteDialog: false
                        });
                    }} />
                    : null
                }
            </Paper>
        )
    }
}

class BestProductRoutes extends React.Component{

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this.props.getProductBestRoutes();
    }

    onRowClick(todo) {
        if (todo.completed) {
            this.props.actions.uncompleteTodo(todo.id);
        } else {
            this.props.actions.completeTodo(todo.id);
        }
    }

    render() {
        const { classes } = this.props;
        if (!this.props.productbestroutes || !this.props.productbestroutes.length) {
            return null;
        }
        return (
            <Paper className={classes.paper}>
                <h3>What about...?</h3>
                <Table className={classes.table}>

                    <TableBody>
                        {this.props.productbestroutes.map(item => {
                            return (
                                <TableRow
                                    key={item.value}
                                    hover      >
                                    <TableCell >
                                       <ProductRoute classes={classes} {...item} />
                                    </TableCell>
                                    
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}
//<Checkbox checked={item.completed} />
// <TableHead hide>
// <TableRow>
//     <TableCell>Completed</TableCell>
//     <TableCell>Text</TableCell>
//     <TableCell>Delete</TableCell>
// </TableRow>
// </TableHead>

const styles = (theme) => createStyles({
    paper: {
        maxWidth: 1000,
        // width: '95%',
        display: 'block',
        padding: 10,
        margin: 'auto',
        // boxShadow: 'initial'
    },
    table: {
        maxWidth: '100%',
    },
    prodRowHeader: {
        textAlign: 'center'
    }
});

function mapStateToProps(state) {
    let { productbestroutes={}, user } = state;

    return {
        userLocation: user.location,
        productbestroutes: productbestroutes.data || []
    };
  }
  
const mapDispatchToProps = {
    getProductBestRoutes
}


  
  export default (withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(BestProductRoutes)));
