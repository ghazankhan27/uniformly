import React from "react";
import HomeContainer from "./components/HomeContainer";
import { UniversitiesTable } from "../../components/UniversitiesTable";

export default function Home() {
  const data = [
    {
      title: "California Institute of Technology - Caltech",
      url: "https://www.mastersportal.com/universities/11712/california-institute-of-technology-caltech.html",
      location: "Pasadena, CA, United States",
      ranking: 1,
    },
    {
      title: "Harvard University",
      url: "https://www.mastersportal.com/universities/11731/harvard-university.html",
      location: "Cambridge, MA, United States",
      ranking: 2,
    },
    {
      title: "Stanford University",
      url: "https://www.mastersportal.com/universities/11778/stanford-university.html",
      location: "Stanford, CA, United States",
      ranking: 3,
    },
    {
      title: "Massachusetts Institute of Technology (MIT)",
      url: "https://www.mastersportal.com/universities/11740/massachusetts-institute-of-technology.html",
      location: "Cambridge, MA, United States",
      ranking: 4,
    },
  ];

  return (
    <HomeContainer>
      <div className="img-div flex justify-center items-center relative">
        <div className="text-2xl absolute -bottom-6 bg-blue-500 text-white px-36 h-20 flex items-center shadow-md shadow-slate-400">
          <p>Top Universities</p>
        </div>
      </div>
      <UniversitiesTable data={data} />
    </HomeContainer>
  );
}
