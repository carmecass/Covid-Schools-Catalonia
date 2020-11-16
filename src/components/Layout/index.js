import React from "react";
import covid from "../../assets/covid.png";
import Search from "../Search";

export default function Layout() {
  return (
    <>
      <div className="App-header">
        <img src={covid} className="App-logo" alt="logo" />
        <Search />
      </div>
    </>
  );
}
