import React from "react";
import LandingPage from "./Components/LandingPage";
import Main from "./Components/Main";
import "./App.css";
import store from "./flux/store";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/login" component={LandingPage} />
            <Route path="/" component={Main} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
