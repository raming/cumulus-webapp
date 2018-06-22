import { Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, Theme, WithStyles, withStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/AddCircle';
import * as React from 'react';
import { connect } from 'react-redux';
// import * as TodoActions from '../actions/todo';
import { addToWhishList } from '../../modules/wishlist/actions'
import { getRecommendations, removeRecommendation } from '../../modules/recommendations/actions'


class RecommendationList extends React.Component{

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
                                    <TableCell width={45}  >
                                        
                                        <IconButton
                                            aria-label="Add"
                                            color="secondary"
                                            variant="raised"
                                            onClick={(event) => {
                                                console.info('selected Product productName', item, this.props.addToWhishList);
                                                this.props.addToWhishList(item);
                                                this.props.removeRecommendation(item);
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
});

function mapStateToProps(state) {
    let { recommendations={} } = state;

    return {
      recommendations: recommendations.data || []
    };
  }
  
const mapDispatchToProps = {
    addToWhishList,
    removeRecommendation,
    getRecommendations
}


  
  export default (withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(RecommendationList)));
