import React, { useState, useEffect } from "react";
import "./index.css";

export default function TableRegionSchools({ infoRegionSchools, initialPage }) {
  const [schoolsPerPage, setSchoolsPerPage] = useState([]);
  const [arrayButtonsLength, setArrayButtonsLength] = useState([]);
  let [pageNumber, setPageNumber] = useState(1);
  const [numButtons, setNumButtons] = useState([]);

  useEffect(() => {
    pageNumber = initialPage;
  }, [infoRegionSchools]);

  useEffect(() => {
    let rowsPerPage = 5;
    let start = rowsPerPage * (pageNumber - 1);
    let end = start + rowsPerPage;
    let paginationSchools = infoRegionSchools.slice(start, end);
    setPageNumber(pageNumber);
    setSchoolsPerPage(paginationSchools);

    const totalPages = Math.ceil(infoRegionSchools.length / rowsPerPage);
    let arrayButtons = [];
    for (let i = 0; i < totalPages; i++) {
      arrayButtons.push(i + 1);
    }
    setArrayButtonsLength(arrayButtons.length);
    let showButtons = arrayButtons.slice(0, 10);
    if (pageNumber > 10) {
      showButtons = arrayButtons.slice(pageNumber - 10, pageNumber);
    }
    setNumButtons(showButtons);
  }, [infoRegionSchools, pageNumber]);

  const handleInitialPage = () => {
    setPageNumber(1);
  };

  const handleOnClick = item => {
    setPageNumber(item);
  };

  const handleForwardPage = () => {
    if (pageNumber < arrayButtonsLength) {
      setPageNumber(pageNumber + 1);
    }
  };
  const handleBackPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };
  const handleLastPage = () => {
    setPageNumber(arrayButtonsLength);
  };
  return (
    <>
      {schoolsPerPage &&
        schoolsPerPage.map((school, i) => (
          <tbody key={i}>
            <tr>
              <th className="school_name">
                <span>{school.name}</span>
                <span className="little_span">{school.address}</span>
              </th>
              <th>
                <span>{school.city}</span>
                <span className="little_span">{school.region}</span>
              </th>
              <th>
                <p className="state">{school.estat}</p>
              </th>
              <th
                className="school_info"
                style={{
                  paddingRight: 60,
                  textAlign: "right"
                }}
              >
                {school.grup_confin}
              </th>
              <th
                className="school_info"
                style={{
                  paddingRight: 70,
                  textAlign: "right"
                }}
              >
                {school.person_confin}
              </th>
              <th
                className="school_info1"
                style={{
                  paddingRight: 90,
                  textAlign: "right"
                }}
              >
                {school.positius}
              </th>
            </tr>
          </tbody>
        ))}
      {numButtons && (
        <tfoot>
          <tr>
            <td colSpan="6" className="buttons_table">
              <button
                className="button_arrow"
                onClick={() => handleInitialPage()}
              >
                &#171;
              </button>
              <button className="button_arrow" onClick={() => handleBackPage()}>
                &#60;
              </button>
              {numButtons.map((item, i) => (
                <button
                  key={i}
                  className="button_numbers"
                  id={item}
                  onClick={() => handleOnClick(item)}
                  style={{
                    background: pageNumber === item ? "#0099ff30" : "white",
                    border:
                      pageNumber === item
                        ? "2px solid #0099ff70"
                        : "2px solid #0099ff30"
                  }}
                >
                  {item}
                </button>
              ))}
              <button
                className="button_arrow"
                onClick={() => handleForwardPage()}
              >
                &#62;
              </button>
              <button className="button_arrow" onClick={() => handleLastPage()}>
                &#187;
              </button>
            </td>
          </tr>
        </tfoot>
      )}
    </>
  );
}
