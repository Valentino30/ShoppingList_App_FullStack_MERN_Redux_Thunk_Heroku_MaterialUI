import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {connect} from 'react-redux'
import { toggleItem, deleteItem, getItems, unloadItems } from '../actions/itemsActions';

class ItemsList extends Component {

    componentDidUpdate(prevProps) {        
        if (this.props.auth !== prevProps.auth) {
            if(this.props.auth.isAuthenticated) {
                this.props.getItems()
            } else {
                this.props.unloadItems()
            }
        }
    }

    componentDidMount() {
        this.props.getItems()
    }

    handleToggle = item => () => {
        this.props.toggleItem(item)
    }
    
    handleDelte = id => () => {
        this.props.deleteItem(id)
    }

    render() {        
        return (
            <List style={{width: '100%'}}>
                {this.props.item.items.map(item => {
                    const labelId = `checkbox-list-label-${item}`;
    
                    return (
                        <ListItem 
                            key={item._id} 
                            role={undefined} 
                            dense 
                            button>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={item.isChecked}
                                    tabIndex={-1}
                                    inputProps={{ 'aria-labelledby': labelId }}
                                    onClick={this.handleToggle(item)}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={item.itemName} />
                            <IconButton 
                                aria-label="Delete"
                                onClick={this.handleDelte(item._id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    );
                })}
            </List>
        );
    }
}

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    toggleItem: payload => dispatch(toggleItem(payload)),
    deleteItem: payload => dispatch(deleteItem(payload)),
    getItems: () => dispatch(getItems()),
    unloadItems: () => dispatch(unloadItems())
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList)