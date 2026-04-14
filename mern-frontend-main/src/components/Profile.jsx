import React from "react";

export default function Profile({ score }) {
  return (
    <div style={{backgroundColor:"teal"}}>
      <h2>Profile</h2>
      <p>Name:John</p>
      <p>Score:{score}</p>
    </div>
  );
}
