import React from "react";
import UniversityCard from "./UniversityCard";

export default function UniversityGrid({ data }) {
  return (
    <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 md:gap-10 gap-8">
      {data.map((uni, index) => (
        <UniversityCard
          key={index}
          title={uni.title}
          img={uni.img}
          description={uni.description}
        ></UniversityCard>
      ))}
    </div>
  );
}
