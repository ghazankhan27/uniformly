import React from "react";
import HomeContainer from "./components/HomeContainer";
import { UniversitiesTable } from "../../components/UniversitiesTable";
import styles from "./home.module.css";

export default function Home() {
  return (
    <HomeContainer>
      <div className="img-div flex justify-center items-center relative">
        <div className={`${styles["bg-image"]}`} />
        <div className="text-2xl absolute -bottom-6 bg-blue-500 text-white px-36 h-20 flex items-center shadow-md shadow-slate-400">
          <p>Top Universities</p>
        </div>
      </div>
      <UniversitiesTable />
    </HomeContainer>
  );
}
