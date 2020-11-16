import React from "react";
import "./index.css";
import { useLocation } from "wouter";
import covid from "../../assets/covid.png";

export default function Home() {
  const [, pushLocation] = useLocation();
  const handleOnClick = () => {
    pushLocation("/datos-covid19-centros");
  };
  return (
    <>
      <img src={covid} className="img_home" alt="logo" />
      <h2 className="title_home">
        Datos sobre la covid-19 en los centros educativos de Catalunya
      </h2>
      <button className="button_home" onClick={() => handleOnClick()}>
        Acceder
      </button>
    </>
  );
}
