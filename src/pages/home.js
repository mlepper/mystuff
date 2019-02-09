import React from "react";

const Home = ({ user = {} }) => {
  return (
    <>
      <h1>Hello, {user.email}</h1>
      <button
        onClick={() => {
          window.firebase.auth().signOut();
        }}
      >
        Log Out
      </button>
    </>
  );
};

export default Home;
