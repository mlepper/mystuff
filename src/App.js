import React, { useEffect, useState } from "react";
import Splash from "./pages/splash";
import NotFound from "./pages/notFound";
import Login from "./pages/login/";
import Home from "./pages/home";
import Settings from "./pages/settings";
import Stuff from "./pages/stuff";
import AddStuff from "./pages/addStuff";
import Profile from "./pages/profile";
import { Router } from "@reach/router";
import Protected from "./utility/protected";
import { useFirebase } from "./utility/firebase/";

import "./css/custom.css";

const App = () => {
  const [initialized, setInitialized] = useState(false);
  const firebase = useFirebase();
  useEffect(() => {
    firebase.auth.onAuthStateChanged(user => {
      /* eslint-disable-next-line*/
      console.log(user);
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
      <Protected path="/settings" component={Settings} />
      <Protected path="/profile" component={Profile} />
      <Protected path="/stuff" component={Stuff} />
      <Protected path="/stuff/add" component={AddStuff} />
      <NotFound default />
    </Router>
  );
};
export default App;
