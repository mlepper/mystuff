import React, { useState, useEffect } from "react";
import Splash from "./pages/splash";
import NotFound from "./pages/notFound";
import Login from "./pages/login";
import Home from "./pages/home";

import { Router, navigate } from "@reach/router";

const App = function() {
  const [authUser, setAuthUser] = useState(null);
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    window.firebase.auth().onAuthStateChanged(user => {
      setAuthUser(user);
      setInitialized(true);
      navigate("/");
    });
  }, []);

  if (!initialized) {
    return null;
  }

  const isAuthenticated = !!authUser;
  let routes;
  if (!isAuthenticated) {
    routes = (
      <Router>
        <Splash path="/" />
        <Login path="/login" />
        <NotFound default />
      </Router>
    );
  } else {
    routes = (
      <Router>
        <Home path="/" user={authUser} />
        <NotFound default />
      </Router>
    );
  }
  return routes;
};
export default App;
