import React from 'react';
import Authorizer from './Components/Authorizer';
import Main from './Components/Main';
import './App.css';
import store from './flux/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
          <Switch>
            <Route exact path="/" component={Authorizer}/>
            <Route exact path="/callback" component={Main}/>
            <Authorizer></Authorizer>
          </Switch>
          </header>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
