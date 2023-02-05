import React from "react";
import { AiFillMail, AiFillPhone } from "react-icons/ai";

export const Footer = () => {
  return (
    <div className="w-full min-h-10 bg-blue-400 text-white py-8 px-10 grid text-sm">
      {/* <div className="grid grid-cols-3">
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
      </div> */}
      <div className="grid grid-cols-2 place-items-center">
        <p>Uniformly&#8482;</p>
        <div>
          <a
            href="mailto:hussnain@gmail.com"
            className="flex items-center gap-x-2"
          >
            <span>
              <AiFillMail />
            </span>
            hussnain@gmail.com
          </a>
          <a href="tel:+923353755502" className="flex items-center gap-x-2">
            <span>
              <AiFillPhone />
            </span>
            +923353755502
          </a>
        </div>
      </div>
    </div>
  );
};
