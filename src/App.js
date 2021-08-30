import React from "react";

import MatchMaxCards from "./Component/MatchMaxCards";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./Component/SignUP";
import { useSelector } from "react-redux";
import { selectUserNumber } from "./features/user/userSlice";

function App() {
  const user = useSelector(selectUserNumber);
  return (
    <div>
      <Router>
        {!user ? (
          <SignUp />
        ) : (
          <Switch>
            <Route path="/Home">
              <MatchMaxCards />
            </Route>
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
