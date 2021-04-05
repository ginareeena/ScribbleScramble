import React from "react";

const SaveScribs = (props) => {
  let scribs = props.scribs;

  return (
    <div>
      <img
        src={scribs}
        height="100"
        width="300"
        alt="final canvas drawing"
      ></img>
    </div>
  );
};

export default SaveScribs;
