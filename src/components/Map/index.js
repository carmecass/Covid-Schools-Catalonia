import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "./index.css";
require("dotenv").config();

const { REACT_APP_MAP_URL } = process.env;

export default function Map(props) {
  const {
    localstore: { lat, long }
  } = props;

  let map = useRef(null);

  useEffect(() => {
    if (map.current) map.current.remove();

    map.current = L.map("map").setView([lat, long], 40);
    L.tileLayer(REACT_APP_MAP_URL, {
      id: "mapbox/streets-v11"
    }).addTo(map.current);
    L.marker([lat, long]).addTo(map.current);
  }, [lat, long]);

  return (
    <>
      <div id="map" className="normalscreen"></div>
    </>
  );
}
