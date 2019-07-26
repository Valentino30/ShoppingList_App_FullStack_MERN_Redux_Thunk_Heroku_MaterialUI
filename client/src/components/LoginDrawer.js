import React, { Component } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Container } from '@material-ui/core';
import { logoutUser, loginUser } from '../actions/authActions';
import { connect } from 'react-redux'
import { clearErrors } from '../actions/errorActions';

class LoginDrawer extends Component {

    state = {
        bottom: false,
        email: '',
        password: '',
        msg: null
    }

    componentDidUpdate(prevProps) {

        const { error } = this.props
        if (error !== prevProps.error) {
            if (error.id === 'LOGIN_FAIL') {
                this.setState({ ...this.state, msg: error.msg.message })
            } else {
                this.setState({ ...this.state, msg: null })
            }
        }
    }

    toggleDrawer = () => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        this.props.clearErrors()
        this.setState({
            ...this.state,
            bottom: !this.state.bottom,
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

        const user = {
            email,
            password
        }

        this.props.loginUser(user)
    };

    render() {
        return (
            <div>
                <Button
                    onClick={this.toggleDrawer()}
                    variant="contained"
                    color="primary">Login
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
                                    this.state.msg === 'Please insert email' ||
                                    this.state.msg === 'User not found, change email or register new user' ? 
                                    true : false}
                                helperText={
                                    this.state.msg === 'Please insert email' ||
                                    this.state.msg === 'User not found, change email or register new user' ? 
                                    this.state.msg : ''}
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
                                error={ 
                                    this.state.msg === 'Please insert password' ||
                                    this.state.msg === 'Incorrect password, try again' ? 
                                    true : false
                                }
                                helperText={
                                    this.state.msg === 'Please insert password' ||
                                    this.state.msg === 'Incorrect password, try again' ? 
                                    this.state.msg : ''
                                }
                            />
                            <Button
                                color="primary"
                                variant="contained"
                                margin="normal"
                                fullWidth
                                onClick={this.handleSubmit()}
                            >
                                Login
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
    loginUser: payload => dispatch(loginUser(payload)),
    clearErrors: () => dispatch(clearErrors()),
    logoutUser: () => dispatch(logoutUser()),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginDrawer)