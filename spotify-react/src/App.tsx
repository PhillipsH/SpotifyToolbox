import React from 'react';
import Authorizer from './Components/Authorizer';
import Main from './Components/Main';
import './App.css';
import store from './flux/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    // <div className="App">

    // </div>
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/" component={Main}/>
            <Route exact path="/login" component={Authorizer}/>
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
