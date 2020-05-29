import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import NewContact from "./contacts/pages/New-Contact";
import Contacts from "./shared/components/Forms/Contacts";
const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Contacts />
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
