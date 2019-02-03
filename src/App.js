import React from "react";
import Splash from "./pages/splash";
import NotFound from "./pages/notFound";

import { Router } from "@reach/router";

const App = function() {
  return (
    <Router>
      <Splash path="/" />
      <NotFound default />
    </Router>
  );
};
export default App;
