import React from "react";
import { withFirebase } from "../utility/firebase/";

const Home = ({ user = {}, firebase }) => {
  return (
    <>
      <h1>Hello, {user.email}</h1>
      <button
        onClick={() => {
          firebase.auth.signOut();
        }}
      >
        Log Out
      </button>
    </>
  );
};

export default withFirebase(Home);
