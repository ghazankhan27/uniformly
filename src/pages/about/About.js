import React from "react";

export default function About() {
  return (
    <div className="px-48">
      <p className="font-bold text-xl mb-4">About us</p>
      <p>
        <span>
          <img
            className="mx-8"
            style={{
              width: "auto",
              height: 300,
              objectFit: "",
              float: "right",
            }}
            src="/images/people.jpg"
          ></img>
        </span>
        The main goal of this project is to provide a centralized platform to
        find different types of studying options like bachelor’s degree,
        Master’s degree, PHD and Diploma in Australia. Students can find their
        desired degree on the same platform and compare different universities
        easy and fast. Using web scrapping to find results from several leading
        university that provide either one of these degrees and providing all
        the results to the user on one centralized platform in a well-designed,
        user-friendly interface.
      </p>
    </div>
  );
}
