import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import TextInput from './components/TextInput';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { loadUser } from './actions/authActions';
import store from './store';
import ItemsList from './components/ItemsList';

class App extends Component {

  componentDidMount () {
    store.dispatch(loadUser())
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container >
          <NavBar {...this.props}/>
          <TextInput {...this.props}/>
          <ItemsList {...this.props}/>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
