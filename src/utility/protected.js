import React from "react";
import { useFirebase } from "./firebase";
import { Redirect } from "@reach/router";

const Protected = ({ component: Component, ...rest }) => {
  const firebase = useFirebase();
  const isAuthenticated = !!firebase.auth.currentUser;

  if (isAuthenticated) {
    return <Component {...rest} />;
  } else {
    let path = rest.path;
    if (path.substring(0, 1) === "/") {
      path = path.substring(1);
    }
    const from = encodeURIComponent(path);
    return <Redirect to={`login?referrer=${from}`} noThrow />;
  }
};

export default Protected;
