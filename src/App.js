import React from "react";
import "./App.css";
import { Route, Switch } from "wouter";
import Home from "./components/Home";
import GeneralCards from "./components/GeneralCards";
import SchoolCards from "./components/SchoolCards";

function App() {
  return (
    <div className="App-header">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/datos-covid19-centros" component={GeneralCards} />
        <Route
          path="/datos-covid19-centros/centro/:id"
          component={SchoolCards}
        ></Route>
      </Switch>
    </div>
  );
}

export default App;
