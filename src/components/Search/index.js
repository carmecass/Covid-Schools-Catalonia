import React, { useEffect, useState } from "react";
import api from "../../api/index";
import "./index.css";
import { useLocation } from "wouter";

export default function Search() {
  const [searchNameSchool, setSearchNameSchool] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allSchools, setAllSchools] = useState([]);
  const [, pushLocation] = useLocation();

  useEffect(() => {
    (async () => {
      const data = await api.getSchools();
      setAllSchools(data);
    })();
  }, []);

  const resultsAllSchools = !searchNameSchool
    ? allSchools
    : allSchools
        .map(item => ({
          name: item.name,
          codeSchool: item.codcentre,
          address: item.address,
          city: item.city,
          regionName: item.regionName,
          codeRegion: item.codeRegion,
          lat: item.lat,
          long: item.long
        }))
        .filter(school => school.name.toLowerCase().includes(searchNameSchool));

  const handleOnchange = e => {
    e.preventDefault();
    const lowerCase = e.target.value.toLowerCase();
    setSearchNameSchool(lowerCase);
    setShowSuggestions(true);
    if (e.target.value === "" || null) {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = item => {
    setSearchNameSchool(item.name);
    localStorage.setItem("covidSchool", JSON.stringify(item));
    pushLocation(`/datos-covid19-centros/centro/${item.codeSchool}`);
    setShowSuggestions(false);
    setSearchNameSchool("");
  };

  return (
    <>
      <section className="section">
        <div className="search">
          <input
            className="select"
            type="text"
            placeholder="Busca tu centro educativo... "
            value={searchNameSchool}
            onChange={handleOnchange}
          ></input>
          <div className="svg_search">
            <svg
              height="25"
              viewBox="0 0 21 21"
              width="25"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                fill="none"
                fillRule="evenodd"
                stroke=" #0099ff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="8.5" cy="8.5" r="5" />
                <path d="m17.571 17.5-5.571-5.5" />
              </g>
            </svg>
          </div>
        </div>
        <ul>
          {showSuggestions &&
            resultsAllSchools.map((item, i) => (
              <li
                key={i}
                title={item.name}
                onClick={() => handleSuggestionClick(item)}
              >
                <p className="school_name">{item.name}</p>
                <p className="school_address">
                  {item.address} - {item.city}
                </p>
              </li>
            ))}
        </ul>
      </section>
    </>
  );
}
