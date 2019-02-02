import React from 'react';
import Splash from "./pages/splash";

import { Router } from "@reach/router";

const  App = function() {
  return (
    <Router>
      <Splash path="/"></Splash>
    </Router>
  );

}
export default App;
