import React from "react";
import Splash from "./pages/splash";
import NotFound from "./pages/notFound";
import Login from "./pages/login";
import Home from "./pages/home";
import { Router } from "@reach/router";
import Protected from "./utility/protected";

const App = () => {
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
