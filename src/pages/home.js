import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Input from "../components/generic/input";
import { useFirebase } from "../utility/firebase";

// import { navigate } from "@reach/router";

const Home = () => {
  const firebase = useFirebase();
  const [stuff, setStuff] = useState([]);
  // const ref = firebase.itemsCurrentUser().push();
  // ref.set({
  //   description: "shirt",
  //   quantity: 27,
  //   cost: 300.0
  // });

  useEffect(() => {
    firebase.itemsCurrentUser().once("value", snapshot => {
      snapshot.forEach(childsn => {
        setStuff([...stuff, childsn.val()]);
      });
    });
  }, [stuff]);

  return (
    <>
      <Header />
      <div>
        {stuff.map(item => {
          return (
            <>
              <Input
                id={`description-${item.id}`}
                type="text"
                label="Description"
                defaultValue={item.description}
              />
              <Input
                id={`quantity-${item.id}`}
                type="text"
                label="Quantity"
                defaultValue={item.quantity}
              />
              <Input
                id={`cost-${item.id}`}
                type="text"
                label="Cost"
                defaultValue={item.cost}
              />
            </>
          );
        })}
      </div>
      <Footer />
    </>
  );
};

export default Home;
