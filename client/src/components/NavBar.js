import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import RegisterDrawer from './RegisterDrawer';
import LoginDrawer from './LoginDrawer';
import { connect } from 'react-redux'
import LogoutButton from './LogoutButton';

function HideOnScroll(props) {
    const { children } = props;
    
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.node.isRequired
};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


function NavBar(props) {
    
    const classes = useStyles();

    const authLinks = (
        <Fragment>
            <LogoutButton />
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <RegisterDrawer />
            <LoginDrawer />
        </Fragment>
    )

    return (
        <React.Fragment>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar >
                    <Toolbar className={classes.root}>
                        <Typography variant="h6" className={classes.title}>
                            Shopping List
                        </Typography>
                        {props.auth.isAuthenticated === true ? authLinks : guestLinks }
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
        </React.Fragment>
    );
}

const mapStateToProps = state => ({
    ...state
})

export default connect(mapStateToProps )(NavBar)

