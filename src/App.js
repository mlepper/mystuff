import React from "react";
import Splash from "./pages/splash";
import NotFound from "./pages/notFound";
import Login from "./pages/login";

import { Router } from "@reach/router";

const App = function() {
  return (
    <Router>
      <Splash path="/" />
      <Login path="/login" />
      <NotFound default />
    </Router>
  );
};
export default App;
