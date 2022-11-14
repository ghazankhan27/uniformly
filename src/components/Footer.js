import React from "react";
import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs";

export const Footer = () => {
  return (
    <div className="w-full min-h-10 bg-blue-400 text-white py-4 px-10">
      <div className="grid grid-cols-3">
        <div className="flex justify-center">
          <ul>
            <li>Who we are</li>
            <li>Contact</li>
            <li>Profile</li>
          </ul>
        </div>
        <div className="flex justify-center">
          <ul>
            <li>Top Universities</li>
            <li>Study With us</li>
            <li>Home</li>
          </ul>
        </div>
        <div className="flex justify-center">
          <ul className="flex flex-col gap-y-2">
            <li>
              <BsFacebook />
            </li>
            <li>
              <BsTwitter />
            </li>
            <li>
              <BsInstagram />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
