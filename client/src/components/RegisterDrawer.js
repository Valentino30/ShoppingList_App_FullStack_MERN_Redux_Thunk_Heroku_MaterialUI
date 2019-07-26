import React, { Component } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Container } from '@material-ui/core';
import { registerUser, logoutUser } from '../actions/authActions';
import { connect } from 'react-redux'
import { clearErrors } from '../actions/errorActions';

class RegisterDrawer extends Component {

    state = {
        bottom: false,
        email: '',
        password: '',
        msg: null
    }

    componentDidUpdate(prevProps, nextProps) {

        const { error } = this.props
        if(error !== prevProps.error) {
            if(error.id === 'REGISTER_FAIL') {
                this.setState({...this.state, msg: error.msg.message})
            } else {
                this.setState({ ...this.state, msg: null })
            }
        }
    }

    toggleDrawer = () => () => {
        this.props.clearErrors()
        this.setState({ 
            bottom: !this.state.bottom,
            email: '',
            password: '',
            msg: null
        });
    };

    handleEmailChange = () => event => {
        this.setState({ ...this.state, email: event.target.value });
    };
    
    handlePasswordChange = () => event => {
        this.setState({ ...this.state, password: event.target.value });
    };
    
    handleSubmit = () => () => {

        const { email, password } = this.state
        
        const newUser = {
            email,
            password
        }

        this.props.registerUser(newUser)
    };
    
    render() {
        return (
            <div>
                <Button 
                    onClick={this.toggleDrawer()} 
                    variant="contained" 
                    color="primary">Register
                </Button>
                <SwipeableDrawer
                    anchor="bottom"
                    open={this.state.bottom}
                    onClose={this.toggleDrawer()}
                    onOpen={this.toggleDrawer()}
                    >
                    <form noValidate autoComplete="off">
                        <Container>
                            <TextField
                                id="outlined-email-input"
                                label="Email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                onChange={this.handleEmailChange()}
                                error={
                                    this.state.msg === 'User already registered, login instead' ||
                                    this.state.msg === 'Please enter email' ? 
                                    true : false
                                }
                                helperText={
                                    this.state.msg === 'User already registered, login instead' ||
                                    this.state.msg === 'Please enter email' ? 
                                    this.state.msg : ''
                                }
                            />
                            <TextField
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                onChange={this.handlePasswordChange()}
                                error={this.state.msg === 'Please enter password' ? true : false}
                                helperText={this.state.msg === 'Please enter password' ? this.state.msg : ''}
                            />
                            
                            <Button
                                color="primary"
                                variant="contained"
                                margin="normal"
                                fullWidth
                                onClick={this.handleSubmit()}
                                >  
                                Register
                            </Button>
                        </Container>
                    </form>
                </SwipeableDrawer>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    registerUser: payload => dispatch(registerUser(payload)),
    clearErrors: () => dispatch(clearErrors()),
    logoutUser: () => dispatch(logoutUser()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterDrawer)