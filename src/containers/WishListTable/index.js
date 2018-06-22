import { Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, Theme, WithStyles, withStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import DeleteIcon from '@material-ui/icons/RemoveCircle';
import * as React from 'react';
import { connect } from 'react-redux';
// import * as TodoActions from '../actions/todo';
import { removeToWhishList } from '../../modules/wishlist/actions'
import { getRecommendations, removeRecommendation } from '../../modules/recommendations/actions'



class WishListTable extends React.Component{

    constructor(props, context) {
        super(props, context);
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

        return (
            <Paper className={classes.paper}>
                <Table className={classes.table}>

                    <TableBody>
                        {this.props.wishList.map(item => {
                            return (
                                <TableRow
                                    key={item.value}
                                    hover
                                    
                                >
                                <TableCell >
                                {item.text}
                                </TableCell>
                                    <TableCell  width={48}  >
                                        <IconButton
                                        className={classes.trash}
                                            aria-label="Delete"
                                            color="primary"
                                            onClick={() => {
                                                this.props.removeToWhishList(item);
                                                this.props.getRecommendations();
                                            } }
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                        
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
        minWidth: '100%',
        display: 'inline-block'
    },
    table: {
        maxWidth: '100%',
    },
    trash: {
    //   backgroundColor:'red'  
    }
});

function mapStateToProps(state) {
    let { wishlist={} } = state;

    return {
      wishList: wishlist.data || []
    };
  }
  
  const mapDispatchToProps ={
    getRecommendations, removeToWhishList
  }
  
  export default (withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(WishListTable)));
