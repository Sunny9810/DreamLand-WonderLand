// import react
import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{
        backgroundColor: " rgba(250, 235, 215, 0.37)",
        height: 560,
        clear: "both",
        paddingTop: 120,
        textAlign: "center",
      }}
    >
      {children}
    </div>
  );
}

export default Jumbotron;
