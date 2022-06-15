import React from "react";
import UniversityCard from "../components/home/UniversityCard";

export default function Home() {
  const data = [
    {
      title: "NUST",
      img: "https://media.istockphoto.com/photos/law-quadrangle-university-of-michigan-ann-arbor-aerial-view-picture-id1319991057?b=1&k=20&m=1319991057&s=170667a&w=0&h=MXEuQhq56vOInXq7NqZcBynvLxynnBIN8bwgm4dWE-U=",
      description:
        "NUST is one of the leadings universities in Pakistan. Students enjoy a calm campus life.",
    },
    {
      title: "CUST",
      img: "https://media.istockphoto.com/photos/university-sign-in-fall-picture-id182240679?k=20&m=182240679&s=612x612&w=0&h=UE3uLcSegnrQ9OpqvoEU5IGieBy8tpuPToRoriPIi0g=",
      description:
        "CUST is one of the leadings universities in Pakistan. Students enjoy a calm campus life.",
    },
    {
      title: "FAST",
      img: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dW5pdmVyc2l0eSUyMGNhbXB1c3xlbnwwfHwwfHw%3D&w=1000&q=80",
      description:
        "FAST is one of the leadings universities in Pakistan. Students enjoy a calm campus life.",
    },
    {
      title: "COMSATS",
      img: "https://images.unsplash.com/20/cambridge.JPG?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dW5pdmVyc2l0eXxlbnwwfHwwfHw%3D&w=1000&q=80",
      description:
        "COMSATS is one of the leadings universities in Pakistan. Students enjoy a calm campus life.",
    },
  ];

  return (
    <div>
      <div className="w-full border-b border-slate-900">
        <p className="text-3xl text-center">
          Here is the latest data from universities in Australia
        </p>
      </div>
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
    </div>
  );
}
