import TableRegionSchools from "components/TableRegionSchools";
import React, { useEffect, useState } from "react";
import api from "../../api";
import "./index.css";

export default function RegionSchools({
  school,
  config = { key: "name", direction: "ascending" }
}) {
  let [infoRegionSchools, setInfoRegionSchools] = useState([]);
  const [initialPage, setInitialPage] = useState("");
  const [sortConfig, setSortConfig] = useState(config);
  const [, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await api.getSchoolsByRegions(school, sortConfig);
        if (data) {
          setInfoRegionSchools(data);
          setInitialPage(1);
        }
      } catch (error) {
        setError(error);
      }
    })();
  }, [school, sortConfig]);

  const requestSort = key => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };
  const getClassNamesFor = name => {
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <>
      <h3>Otros centros del mismo municipio</h3>
      <table className="mytable">
        <thead>
          <tr className="titles">
            <th>
              <table
                style={{
                  width: 380,
                  paddingLeft: 15
                }}
              >
                <thead
                  onClick={() => requestSort("name")}
                  className={getClassNamesFor("name")}
                >
                  <tr>
                    <td
                      style={{
                        width: 40
                      }}
                    >
                      Centros
                    </td>
                    {sortConfig.key === "name" && (
                      <td rowSpan="2" className={sortConfig.direction}></td>
                    )}
                  </tr>
                </thead>
              </table>
            </th>
            <th>
              <table>
                <thead>
                  <tr>
                    <td>Municipio</td>
                  </tr>
                </thead>
              </table>
            </th>
            <th>
              <table>
                <thead
                  onClick={() => requestSort("estat")}
                  className={getClassNamesFor("estat")}
                >
                  <tr>
                    <td rowSpan="2">Estado</td>
                    {sortConfig.key === "estat" && (
                      <td rowSpan="2" className={sortConfig.direction}></td>
                    )}
                  </tr>
                </thead>
              </table>
            </th>
            <th>
              <table>
                <thead
                  onClick={() => requestSort("grup_confin")}
                  className={getClassNamesFor("grup_confin")}
                >
                  <tr>
                    <td>Grupos</td>
                    {sortConfig.key === "grup_confin" && (
                      <td rowSpan="2" className={sortConfig.direction}></td>
                    )}
                  </tr>
                  <tr>
                    <td>Confinados</td>
                  </tr>
                </thead>
              </table>
            </th>
            <th>
              <table>
                <thead
                  onClick={() => requestSort("person_confin")}
                  className={getClassNamesFor("person_confin")}
                >
                  <tr>
                    <td>Personas</td>
                    {sortConfig.key === "person_confin" && (
                      <td rowSpan="2" className={sortConfig.direction}></td>
                    )}
                  </tr>
                  <tr>
                    <td>Confinadas</td>
                  </tr>
                </thead>
              </table>
            </th>
            <th>
              <table>
                <thead
                  onClick={() => requestSort("positius")}
                  className={getClassNamesFor("positius")}
                >
                  <tr rowSpan="2">
                    <td>Positivos</td>
                    {sortConfig.key === "positius" && (
                      <td rowSpan="2" className={sortConfig.direction}></td>
                    )}
                  </tr>
                  <tr>
                    <td>últimos 10 dias</td>
                  </tr>
                </thead>
              </table>
            </th>
            {/* <div className="amagat">&#x25B2;</div> */}
          </tr>
        </thead>
        {infoRegionSchools && initialPage ? (
          <TableRegionSchools
            infoRegionSchools={infoRegionSchools}
            initialPage={initialPage}
          />
        ) : null}
      </table>
    </>
  );
}
