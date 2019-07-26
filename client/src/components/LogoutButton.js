import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { logoutUser } from '../actions/authActions';
import { connect } from 'react-redux'

class LogoutButton extends Component {

    logoutUser = () => () => {
        this.props.logoutUser()
    }

    render() {
        return (
            <div>
                <Button
                    onClick={this.logoutUser()}
                    variant="contained"
                    color="primary">Logout
                </Button>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton)