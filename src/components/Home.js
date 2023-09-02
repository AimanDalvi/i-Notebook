import React from "react";
import Notes from "./Notes";

export const Home = (props) => {
  return (
    <div>
      <Notes ShowAlert={props.ShowAlert}  />
    </div>
  );
};

export default Home;
