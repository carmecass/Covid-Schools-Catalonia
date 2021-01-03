import React, { useState, useEffect } from "react";
import "./index.css";
import api from "../../api/index";
import RegionMap from "components/RegionMap";
import Layout from "components/Layout";

export default function GeneralCards() {
  const [infoCard, setInfoCard] = useState({});
  const [error, setError] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const results = await api.getCovidAllSchools();
        setInfoCard(results);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    })();
  }, []);

  return (
    <>
      <Layout />
      {error ? (
        <p className="p_error">
          No se ha podido mostrar los datos. Inténtelo más tarde
        </p>
      ) : null}
      {infoCard ? (
        <div className="main">
          <h2>Situación centros educativos en Catalunya</h2>
          <p className="update">
            Última actualitzación {infoCard.generationDate}
          </p>
          <div className="card">
            <div className="centers">
              <h4>Centros confinados</h4>
              <pre>
                <span className="big_number">{infoCard.confinedSchools}</span>{" "}
                de 5.131
                <span className="info_percentage">
                  {infoCard.percentConfinedSchools}
                </span>
              </pre>
            </div>
            <div className="centers">
              <h4>Grupos confinados</h4>
              <pre>
                <span className="big_number">{infoCard.grup_confin}</span> de
                72.000
                <span className="info_percentage">
                  {infoCard.percentConfinedGrups}
                </span>
              </pre>
            </div>
          </div>
          <h2 className="second_h2">
            Situación del alumnado, docentes/PAS/PAES y personal externo
          </h2>
          <div className="card">
            <div className="centers">
              <h4>Personas confinadas</h4>
              <p className="total">{infoCard.totalConfined}</p>
              <p className="line_text">
                <span>de los cuales</span>
              </p>
              <p className="little_title">Alumnado</p>
              <pre className="little_word">
                <span className="little_number">{infoCard.alumn_confin}</span>{" "}
                de 1,44M**
                <span className="info_percentage1">
                  {infoCard.percentConfinedStudents}
                </span>
              </pre>
              <p className="little_title">Docentes, PAS y PAES</p>
              <pre className="little_word">
                <span className="little_number">{infoCard.docent_confin}</span>{" "}
                de 164.000**
                <span className="info_percentage1">
                  {infoCard.percentConfinedTeachers}
                </span>
              </pre>
              <p className="little_title">Personal externo</p>
              <pre className="little_word">
                <span className="little_number">{infoCard.altres_confin}</span>
              </pre>
            </div>
            <div className="centers">
              <h4>Positivos últimos 10 días</h4>
              <p className="total">{infoCard.totalPositives}</p>
              <p className="line_text">
                <span>de los cuales</span>
              </p>
              <p className="little_title">Alumnado</p>
              <pre className="little_word">
                <span className="little_number">
                  {infoCard.alumn_positiu_vig11}
                </span>{" "}
                de 1,44M**
                <span className="info_percentage1">
                  {infoCard.percentPositivesStudents}
                </span>
              </pre>
              <p className="little_title">Docentes, PAS y PAES</p>
              <pre className="little_word">
                <span className="little_number">
                  {infoCard.personal_positiu_vig11}
                </span>
                {"  "}
                de 164.000**
                <span className="info_percentage1">
                  {infoCard.percentPositivesTeachers}
                </span>
              </pre>
              <p className="little_title">Personal externo</p>
              <pre className="little_word">
                <span className="little_number">
                  {infoCard.altres_positiu_vig11}
                </span>
              </pre>
            </div>
            <div className="centers">
              <h4>Positivos acumulados</h4>
              <p className="total">{infoCard.totalPositivesAcum}</p>
              <p className="line_text">
                <span>de los cuales</span>
              </p>
              <p className="little_title">Alumnado</p>
              <pre className="little_word">
                <span className="little_number">
                  {infoCard.alumn_positiu_acum}
                </span>{" "}
                de 1,44M**
                <span className="info_percentage1">
                  {infoCard.percentPositivesStudentsAcum}
                </span>
              </pre>
              <p className="little_title">Docentes, PAS y PAES</p>
              <pre className="little_word">
                <span className="little_number">
                  {infoCard.personal_positiu_acum}
                </span>{" "}
                de 164.000**
                <span className="info_percentage1">
                  {infoCard.percentPositivesTeachersAcum}
                </span>
              </pre>
              <p className="little_title">Personal externo</p>
              <pre className="little_word">
                <span className="little_number">
                  {infoCard.altres_positiu_acum}
                </span>
              </pre>
            </div>
          </div>
          <p className="note">**valores aproximados</p>
        </div>
      ) : null}
      {infoCard ? <RegionMap infoCard={infoCard} /> : null}
    </>
  );
}
