require("dotenv").config();

const { REACT_APP_URL, REACT_APP_SCHOOLS } = process.env;

const today = new Date();
let formatDateToday = today.toISOString().slice(0, 10);
const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
let formatDateYesterday = yesterday.toISOString().slice(0, 10);
const beforeYesterday = new Date(today.getTime() - 48 * 60 * 60 * 1000);
let formatDateBeforeYesterday = beforeYesterday.toISOString().slice(0, 10);
let day = new Date().getDay();

const option = {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
};
const formatterPercent = new Intl.NumberFormat("de-DE", option);

const api = {
  async getCovidAllSchools() {
    let res = {};
    let results = [];
    let response = [];
    try {
      let resp = await fetch(
        `${REACT_APP_URL}?datageneracio=${formatDateToday}&$limit=1`
      );
      response = await resp.json();
      if (response.length === 0 && (day !== 0 || day !== 6)) {
        if (day === 1) {
          res = await fetch(
            `${REACT_APP_URL}?datageneracio=${formatDateBeforeYesterday}&$limit=80000`
          );
          results = await res.json();
        } else {
          res = await fetch(
            `${REACT_APP_URL}?datageneracio=${formatDateYesterday}&$limit=80000`
          );
          results = await res.json();
        }
      } else {
        switch (day) {
          case 0:
            res = await fetch(
              `${REACT_APP_URL}?datageneracio=${formatDateBeforeYesterday}&$limit=80000`
            );
            results = await res.json();
            break;
          case 6:
            res = await fetch(
              `${REACT_APP_URL}?datageneracio=${formatDateYesterday}&$limit=80000`
            );
            results = await res.json();
            break;
          default:
            res = await fetch(
              `${REACT_APP_URL}?datageneracio=${formatDateToday}&$limit=80000`
            );
            results = await res.json();
            break;
        }
      }
      localStorage.setItem("allCovidSchools", JSON.stringify(results));

      let extractDate = results[0].datageneracio;
      extractDate = extractDate.slice(0, 10);
      extractDate = extractDate.split("-").reverse();
      let generationDate =
        extractDate[0] + "/" + extractDate[1] + "/" + extractDate[2];

      let confinedSchools = Object.values(results).filter(
        item => item.estat === "Confinat"
      ).length;

      let percentConfinedSchools = formatterPercent.format(
        confinedSchools / 5131
      );

      let resultsReduce = results.reduce(
        (a, c) => (
          Object.keys(c).forEach(k => (a[k] = (a[k] || 0) + parseInt(c[k]))), a
        ),
        {}
      );

      let percentConfinedGrups = formatterPercent.format(
        resultsReduce.grup_confin / 72000
      );

      let percentConfinedStudents = formatterPercent.format(
        resultsReduce.alumn_confin / 1440000
      );

      let percentConfinedTeachers = formatterPercent.format(
        resultsReduce.docent_confin / 164000
      );

      let percentPositivesStudents = formatterPercent.format(
        resultsReduce.alumn_positiu_vig11 / 1440000
      );

      let percentPositivesTeachers = formatterPercent.format(
        resultsReduce.personal_positiu_vig11 / 164000
      );

      let percentPositivesStudentsAcum = formatterPercent.format(
        resultsReduce.alumn_positiu_acum / 1440000
      );

      let percentPositivesTeachersAcum = formatterPercent.format(
        resultsReduce.personal_positiu_acum / 164000
      );

      let totalConfined = Intl.NumberFormat("de-DE").format(
        resultsReduce.alumn_confin +
          resultsReduce.docent_confin +
          resultsReduce.altres_confin
      );
      let totalPositives = Intl.NumberFormat("de-DE").format(
        resultsReduce.alumn_positiu_vig11 +
          resultsReduce.personal_positiu_vig11 +
          resultsReduce.altres_positiu_vig11
      );
      let totalPositivesAcum = Intl.NumberFormat("de-DE").format(
        resultsReduce.alumn_positiu_acum +
          resultsReduce.personal_positiu_acum +
          resultsReduce.altres_positiu_acum
      );

      const total = {};
      for (let i in resultsReduce) {
        total[i] = Intl.NumberFormat("de-DE").format(resultsReduce[i]);
      }

      const {
        grup_confin,
        alumn_confin,
        docent_confin,
        altres_confin,
        alumn_positiu_vig11,
        personal_positiu_vig11,
        altres_positiu_vig11,
        alumn_positiu_acum,
        personal_positiu_acum,
        altres_positiu_acum
      } = total;

      return {
        generationDate,
        grup_confin,
        alumn_confin,
        docent_confin,
        altres_confin,
        alumn_positiu_vig11,
        personal_positiu_vig11,
        altres_positiu_vig11,
        alumn_positiu_acum,
        personal_positiu_acum,
        altres_positiu_acum,
        confinedSchools,
        percentConfinedSchools,
        percentConfinedGrups,
        percentConfinedStudents,
        percentConfinedTeachers,
        percentPositivesStudents,
        percentPositivesTeachers,
        percentPositivesStudentsAcum,
        percentPositivesTeachersAcum,
        totalConfined,
        totalPositives,
        totalPositivesAcum
      };
    } catch (error) {
      throw error;
    }
  },

  async getSchools() {
    try {
      const res = await fetch(`${REACT_APP_SCHOOLS}?$limit=5200`);
      const results = await res.json();

      const schoolInfo = results.map(item => ({
        name: item.denominaci_completa,
        codcentre: item.codi_centre,
        city: item.nom_municipi,
        address: item.adre_a,
        regionName: item.nom_comarca,
        codeRegion: item.codi_comarca,
        lat: item.coordenades_geo_y,
        long: item.coordenades_geo_x
      }));

      localStorage.setItem("allInfoSchools", JSON.stringify(schoolInfo));
      return schoolInfo;
    } catch (error) {
      throw error;
    }
  },

  async getCovidSchool(query) {
    let res = {};
    let results = [];
    let response = [];
    try {
      let resp = await fetch(
        `${REACT_APP_URL}?datageneracio=${formatDateToday}&$limit=1`
      );
      response = await resp.json();

      if (response.length === 0 && (day !== 0 || day !== 6)) {
        if (day === 1) {
          res = await fetch(
            `${REACT_APP_URL}?datageneracio=${formatDateBeforeYesterday}&codcentre=${query}`
          );
          results = await res.json();
        } else {
          res = await fetch(
            `${REACT_APP_URL}?datageneracio=${formatDateYesterday}&codcentre=${query}`
          );
          results = await res.json();
        }
      } else {
        switch (day) {
          case 0:
            res = await fetch(
              `${REACT_APP_URL}?datageneracio=${formatDateBeforeYesterday}&codcentre=${query}`
            );
            results = await res.json();
            break;
          case 6:
            res = await fetch(
              `${REACT_APP_URL}?datageneracio=${formatDateYesterday}&codcentre=${query}`
            );
            results = await res.json();
            break;
          default:
            res = await fetch(
              `${REACT_APP_URL}?datageneracio=${formatDateToday}&codcentre=${query}`
            );
            results = await res.json();
            break;
        }
      }

      let total = {};
      results.forEach(item => {
        for (let i in item) {
          if (i !== "datageneracio" && i !== "estat" && i !== "codcentre") {
            total[i] = Intl.NumberFormat("de-DE").format(item[i]);
          } else {
            if (i === "datageneracio") {
              let newDate = item[i].slice(0, 10);
              newDate = newDate.split("-").reverse();
              total[i] = newDate[0] + "/" + newDate[1] + "/" + newDate[2];
            } else {
              total[i] = item[i];
            }
          }
        }
      });

      let {
        datageneracio,
        estat,
        grup_confin,
        alumn_confin,
        docent_confin,
        altres_confin,
        alumn_positiu_vig11,
        personal_positiu_vig11,
        altres_positiu_vig11,
        alumn_positiu_acum,
        personal_positiu_acum,
        altres_positiu_acum
      } = total;

      if (estat === "Confinat") {
        document.getElementById("Confined").style.color = "red";
        estat = "Confinado";
      } else if (estat === "Obert") {
        document.getElementById("Confined").style.color = "rgb(13, 196, 7)";
        estat = "Abierto";
      }

      let totalSchollConfined = Intl.NumberFormat("de-DE").format(
        parseInt(alumn_confin) +
          parseInt(docent_confin) +
          parseInt(altres_confin)
      );
      let totalSchollPositives = Intl.NumberFormat("de-DE").format(
        parseInt(alumn_positiu_vig11) +
          parseInt(personal_positiu_vig11) +
          parseInt(altres_positiu_vig11)
      );
      let totalSchollPositivesAcum = Intl.NumberFormat("de-DE").format(
        parseInt(alumn_positiu_acum) +
          parseInt(personal_positiu_acum) +
          parseInt(altres_positiu_acum)
      );

      return {
        datageneracio,
        estat,
        grup_confin,
        alumn_confin,
        docent_confin,
        altres_confin,
        alumn_positiu_vig11,
        personal_positiu_vig11,
        altres_positiu_vig11,
        alumn_positiu_acum,
        personal_positiu_acum,
        altres_positiu_acum,
        totalSchollConfined,
        totalSchollPositives,
        totalSchollPositivesAcum
      };
    } catch (error) {
      throw error;
    }
  },

  async getSchoolsByRegions(query, sortConfig) {
    const { city, name } = query;
    try {
      const resSchools = await fetch(
        `${REACT_APP_SCHOOLS}?nom_municipi=${city}&$limit=5200`
      );
      let resultsSchools = await resSchools.json();
      const schoolsInfo = resultsSchools.reduce((acc, item) => {
        if (item.denominaci_completa !== name) {
          acc.push({
            name: item.denominaci_completa,
            codcentre: item.codi_centre,
            city: item.nom_municipi,
            address: item.adre_a,
            region: item.nom_comarca
          });
          return acc;
        } else return acc;
      }, []);

      let retrievedObject = localStorage.getItem("allCovidSchools") || "";
      let results = JSON.parse(retrievedObject);
      let infoRegionSchools = schoolsInfo.map(school => {
        const covidSchool = results.find(
          ({ codcentre }) => school.codcentre === codcentre
        );
        if (covidSchool.estat === "Confinat") {
          covidSchool.estat = "Confinado";
        } else if (covidSchool.estat === "Obert") {
          covidSchool.estat = "Abierto";
        }
        return {
          ...school,
          estat: covidSchool.estat,
          grup_confin: covidSchool.grup_confin,
          person_confin:
            parseInt(covidSchool.alumn_confin) +
            parseInt(covidSchool.docent_confin) +
            parseInt(covidSchool.altres_confin),
          positius:
            parseInt(covidSchool.alumn_positiu_vig11) +
            parseInt(covidSchool.personal_positiu_vig11) +
            parseInt(covidSchool.altres_positiu_vig11)
        };
      });
      if (sortConfig !== null) {
        infoRegionSchools.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
          return 0;
        });
      }
      return infoRegionSchools;
    } catch (error) {
      throw error;
    }
  },

  async getInfoMapSchoolsRegions(query) {
    try {
      const resRegionSchool = await fetch(
        `${REACT_APP_SCHOOLS}?codi_comarca=${query}&$limit=5200`
      );
      let resultsSchoolsRegion = await resRegionSchool.json();

      let regionName = resultsSchoolsRegion[0].nom_comarca;
      let totalRegionSchools = resultsSchoolsRegion.length;

      let retrievedObject = localStorage.getItem("allCovidSchools") || "";
      let results = JSON.parse(retrievedObject);

      let totalCovidRegion = 0;

      resultsSchoolsRegion.map(school => {
        let filterResults = results.find(item => {
          return item.codcentre === school.codi_centre;
        });
        if (filterResults !== undefined && filterResults.estat === "Confinat") {
          totalCovidRegion += 1;
        }
        return school;
      });

      return { totalRegionSchools, regionName, totalCovidRegion };
    } catch (error) {
      throw error;
    }
  },

  getBackgroundRegionsMap() {
    try {
      let covidResults = [];
      let infoResults = [];

      const retrievedCovidLocalStorage =
        localStorage.getItem("allCovidSchools") || "";
      if (retrievedCovidLocalStorage.length > 0) {
        covidResults = JSON.parse(retrievedCovidLocalStorage);
      }
      const retrievedInfoLocalStorage =
        localStorage.getItem("allInfoSchools") || "";
      if (
        retrievedInfoLocalStorage !== undefined ||
        retrievedInfoLocalStorage !== null
      ) {
        infoResults = JSON.parse(retrievedInfoLocalStorage);
      }

      const tempResults = covidResults.map(x => {
        const y = infoResults.find(y => y.codcentre === x.codcentre);
        return { ...x, ...y };
      });
      const data = tempResults.reduce((a, c) => {
        const item = a.find(x => x.codeRegion === c.codeRegion);
        if (item) {
          item.totalSchoolsByRegion++;
          item.totalCovidRegion += c.estat === "Confinat" ? 1 : 0;
          item.regionPercent = formatterPercent.format(
            item.totalCovidRegion / item.totalSchoolsByRegion
          );
        } else {
          a.push({
            codeRegion: c.codeRegion,
            regionName: c.regionName,
            totalSchoolsByRegion: 1,
            totalCovidRegion: c.estat === "Confinat" ? 1 : 0
          });
        }

        return a;
      }, []);

      let centerCovid = [];
      data.map(item => {
        if (item.totalCovidRegion === 1) {
          document.getElementById(item.codeRegion).style.fill = "#edbced";
        }
        if (item.totalCovidRegion === 2) {
          document.getElementById(item.codeRegion).style.fill = "#c03fc2";
        }
        if (item.totalCovidRegion >= 3) {
          document.getElementById(item.codeRegion).style.fill = "#cd44cd";
        }
        if (item.totalCovidRegion > 0) {
          centerCovid.push(item.totalCovidRegion);
        }
        return item;
      });

      let maxCovid = Math.max(...centerCovid);

      if (maxCovid === -Infinity) {
        maxCovid = "max";
      }

      return { data, maxCovid };
    } catch (error) {
      throw error;
    }
  }
};
export default api;
