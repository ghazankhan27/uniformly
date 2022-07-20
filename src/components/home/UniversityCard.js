import React from "react";

export default function UniversityCard({ title, img, description }) {
  return (
    <div className="uni-card-animate hover:cursor-pointer transition-all hover:scale-105 bg-blue-600 px-16 flex flex-col items-center rounded-lg shadow-slate-400 shadow-md text-orange-100">
      <p className="text-3xl font-bold my-4">{title}</p>
      <img
        alt="the university"
        className="uni-card-image border-t-2 border-b-2 py-2 border-white"
        src={img}
      ></img>
      <p className="text-xl my-4">{description}</p>
    </div>
  );
}
