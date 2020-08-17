import React from 'react';
// import store from './redux/store';
import routes from './routes';
import { withRouter } from 'react-router-dom'; 

// CSS 
import './reset.css';
import './App.css';

// Other Components
import Nav from './components/Nav';

const App = (props) => {

  return (
    <div className="App">
      {props.location.pathname !== '/' ?
      <Nav/> : null
      }
      {routes}
    </div>
  );
}

export default withRouter(App);
