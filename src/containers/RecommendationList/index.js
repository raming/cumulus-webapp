import { Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, Theme, WithStyles, withStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';
import { connect } from 'react-redux';
// import * as TodoActions from '../actions/todo';
import { addToWhishList } from '../../modules/wishlist/actions'
import { getRecommendations } from '../../modules/recommendations/actions'


class RecommendationList extends React.Component{

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
        if (!this.props.recommendations || !this.props.recommendations.length) {
            return null;
        }
        return (
            <Paper className={classes.paper}>
                <h3>What about...?</h3>
                <Table className={classes.table}>

                    <TableBody>
                        {this.props.recommendations.map(item => {
                            return (
                                <TableRow
                                    key={item.value}
                                    hover      >
                                    <TableCell >
                                        {item.text}
                                        </TableCell>
                                    <TableCell  >
                                        
                                        <IconButton
                                            aria-label="Add"
                                            color="default"
                                            onClick={() => {
                                                console.info('selected Product productName', item);
                                                this.props.addToWhishList(item);
                                                this.props.getRecommendations();
                                      
                                            }}
                                        >
                                            <AddIcon />
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
        width: '95%',
        display: 'inline-block',
        margin: 'auto',
        padding: '0px 10px',
        boxShadow: 'initial'
    },
    table: {
        maxWidth: '100%',
    },
});

function mapStateToProps(state) {
    let { recommendations={} } = state;

    return {
      recommendations: recommendations.data || []
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
        addToWhishList,
        getRecommendations
    };
  }
  
  export default (withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(RecommendationList)));
