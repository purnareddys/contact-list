import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import User from "./user/pages/User";
import NewContact from "./contacts/pages/New-Contact";
import CreateContact from "./shared/components/Forms/CreateContact";
const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            <CreateContact />
          </Route>
          <Route path="/contacts/new" exact>
            <NewContact />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
};
export default App;
