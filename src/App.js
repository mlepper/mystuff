import React, { useEffect, useState } from "react";
import Splash from "./pages/splash";
import NotFound from "./pages/notFound";
import Login from "./pages/login";
import Home from "./pages/home";
import { Router } from "@reach/router";
import Protected from "./utility/protected";
import { useFirebase } from "./utility/firebase/";

const App = () => {
  const [initialized, setInitialized] = useState(false);
  const firebase = useFirebase();
  useEffect(() => {
    firebase.auth.onAuthStateChanged(() => {
      setInitialized(true);
    });
  }, []);

  // don't render app until we've heard from firebase whether we have an authenticated user or not
  if (!initialized) {
    return null;
  }

  return (
    <Router>
      <Splash path="/" />
      <Login path="login" />
      <Protected path="/home" component={Home} />
      <NotFound default />
    </Router>
  );
};
export default App;
