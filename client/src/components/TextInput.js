import React from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux'
import { addItem } from '../actions/itemsActions';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

function TextInput(props) {
    const [values, setValues] = React.useState({
        newItem: '',
        error: false,
        errorMessage: ''
    });

    const handleClickAway = () => {
        setValues({
            ...values,
            error: false, 
            errorMessage:''
        });
    };

    const handleChange = event => {
        setValues({ 
            ...values,
            error: false,
            errorMessage: '',
            newItem: event.target.value
        });
    };    
    
    const handleKeyDown = event => {
        if(event.key === 'Enter' && props.auth.isAuthenticated === true) {          
            props.addItem(event.target.value)
            values.newItem = ''
        }
        
        if (event.key === 'Enter' && props.auth.isAuthenticated === false) {
            setValues({ 
                ...values,
                error: true,
                errorMessage: 'Register or login to start adding items' 
            })
        }
    };    
    
    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <TextField
                id="outlined-search"
                label="Add Item"
                type="search"
                margin="normal"
                variant="outlined"
                fullWidth
                value={values.newItem}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                error={values.error}
                helperText={props.auth.isAuthenticated === true ? '' : values.errorMessage}
            />
        </ClickAwayListener>
    );
}

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    addItem: payload => dispatch(addItem(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(TextInput)