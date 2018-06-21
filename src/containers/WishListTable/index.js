import { Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, Theme, WithStyles, withStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import DeleteIcon from '@material-ui/icons/Delete';
import * as React from 'react';
import { connect } from 'react-redux';
// import * as TodoActions from '../actions/todo';



class WishListTable extends React.Component{

    constructor(props, context) {
        super(props, context);
    }

    onRowClick(todo: Todo) {
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
                                    <TableCell >
                                        <IconButton
                                            aria-label="Delete"
                                            color="red"
                                            // onClick={() => this.props.actions.deleteTodo(item.value)}
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

const styles = (theme: Theme) => createStyles({
    paper: {
        maxWidth: 1000,
        minWidth: '100%',
        display: 'inline-block'
    },
    table: {
        maxWidth: '100%',
    },
});

function mapStateToProps(state) {
    let { wishlist={} } = state;

    return {
      wishList: wishlist.data || []
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
     
    };
  }
  
  export default (withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(WishListTable)));
