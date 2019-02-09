import React from "react";
import { useFirebase } from "../utility/firebase/";

const Home = ({ user = {} }) => {
  const firebase = useFirebase();

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

export default Home;
