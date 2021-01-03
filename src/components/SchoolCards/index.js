import React, { useEffect, useState } from "react";
import api from "../../api/index";
import "./index.css";
import Map from "../Map/index";
import { useLocation } from "wouter";
import Layout from "../Layout/index";
import RegionSchools from "../RegionSchools";

export default function SchoolCards(props) {
  const [infoCard, setInfoCard] = useState("");
  const [, pushLocation] = useLocation();
  const [localStore, setLocalStore] = useState({});
  const [error, setError] = useState(false);

  const {
    params: { id }
  } = props;

  useEffect(() => {
    let retrievedObject = localStorage.getItem("covidSchool") || "";
    let objectLocalStore = JSON.parse(retrievedObject);
    setLocalStore(objectLocalStore);
  }, [id]);

  useEffect(() => {
    (async () => {
      try {
        const results = await api.getCovidSchool(localStore.codeSchool);
        setInfoCard(results);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    })();
  }, [localStore.codeSchool]);

  const handleClick = () => {
    pushLocation("/datos-covid19-centros");
  };

  return (
    <>
      <Layout />
      {/* {error || infoCard.estat === undefined ? (
        <p className="p_error">
          No se ha podido mostrar los datos. Inténtelo más tarde
        </p>
      ) : null} */}
      {localStore && (
        <div className="schoolmain">
          <div className="headers">
            <div className="address">
              <h3>{localStore.name}</h3>
              <p className="street">{localStore.address}</p>
              <p className="city">
                {localStore.city} - {localStore.regionName}
              </p>
            </div>
            <div className="update_date">
              <button
                className="button_school"
                onClick={() => {
                  handleClick();
                }}
              >
                <svg
                  className="svg_arrow"
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 21 21"
                >
                  <g
                    fill="none"
                    fillRule="evenodd"
                    stroke="#0099ff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transform="translate(3 6)"
                  >
                    <polyline
                      points="1.67 1.669 7.327 1.671 7.328 7.328"
                      transform="scale(-1 1) rotate(45 0 -6.364)"
                    />
                    <line x1="13.5" x2=".5" y1="4.5" y2="4.5" />
                  </g>
                </svg>
                <p>Inicio</p>
              </button>
              <p className="update">Última actualitzación del centro</p>
              <p className="update">{infoCard.datageneracio}</p>
            </div>
          </div>
          {infoCard && (
            <>
              <div className="container">
                <div className="container_info">
                  <div className="card">
                    <div className="centers_school">
                      <h5>Estado del centro</h5>
                      <p id="Confined" className="big_number">
                        {infoCard.estat}
                      </p>
                    </div>
                    <div className="centers_school">
                      <h5>Grupos confinados</h5>
                      <p className="big_number">{infoCard.grup_confin}</p>
                    </div>
                  </div>
                  <div className="detail">
                    <div className="centers_school1">
                      <h5>Personas confinadas</h5>
                      <p className="total_school">
                        {infoCard.totalSchollConfined}
                      </p>
                      <p className="line_text">
                        <span>de los cuales</span>
                      </p>
                      <div className="school_confined">
                        <div>
                          <p className="little_title">Alumnado</p>
                          <pre className="little_word_school">
                            <span className="little_number">
                              {infoCard.alumn_confin}
                            </span>
                          </pre>
                        </div>
                        <div>
                          <p className="little_title">Docentes, PAS y PAES</p>
                          <pre className="little_word_school">
                            <span className="little_number">
                              {infoCard.docent_confin}
                            </span>
                          </pre>
                        </div>
                        <div>
                          <p className="little_title">Personal externo</p>
                          <pre className="little_word_school">
                            <span className="little_number">
                              {infoCard.altres_confin}
                            </span>
                          </pre>
                        </div>
                      </div>
                    </div>
                    <div className="centers_school1">
                      <h5>Positivos últimos 10 días</h5>
                      <p className="total_school">
                        {infoCard.totalSchollPositives}
                      </p>
                      <p className="line_text">
                        <span>de los cuales</span>
                      </p>
                      <div className="school_confined">
                        <div>
                          <p className="little_title">Alumnado</p>
                          <pre className="little_word_school">
                            <span className="little_number">
                              {infoCard.alumn_positiu_vig11}
                            </span>
                          </pre>
                        </div>
                        <div>
                          <p className="little_title">Docentes, PAS i PAES</p>
                          <pre className="little_word_school">
                            <span className="little_number">
                              {infoCard.personal_positiu_vig11}
                            </span>
                          </pre>
                        </div>
                        <div>
                          <p className="little_title">Personal externo</p>
                          <pre className="little_word_school">
                            <span className="little_number">
                              {infoCard.altres_positiu_vig11}
                            </span>
                          </pre>
                        </div>
                      </div>
                    </div>
                    <div className="centers_school1">
                      <h5>Positivos acumulados</h5>
                      <p className="total_school">
                        {infoCard.totalSchollPositivesAcum}
                      </p>
                      <p className="line_text">
                        <span>de los cuales</span>
                      </p>
                      <div className="school_confined">
                        <div>
                          <p className="little_title">Alumnado</p>
                          <pre className="little_word_school">
                            <span className="little_number">
                              {infoCard.alumn_positiu_acum}
                            </span>
                          </pre>
                        </div>
                        <div>
                          <p className="little_title">Docentes, PAS i PAES</p>
                          <pre className="little_word_school">
                            <span className="little_number">
                              {infoCard.personal_positiu_acum}
                            </span>
                          </pre>
                        </div>
                        <div>
                          <p className="little_title">Personal externo</p>
                          <pre className="little_word">
                            <span className="little_number">
                              {infoCard.altres_positiu_acum}
                            </span>
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Map localstore={localStore} />
              </div>
              <RegionSchools school={localStore} />
            </>
          )}
        </div>
      )}
    </>
  );
}
