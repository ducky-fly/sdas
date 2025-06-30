import React from "react";
import useViewport from "../../hooks/useViewport";
import BackSvg from "./svgs/backSvg";
import { Link, useNavigate } from "react-router";

const ProfilePage = () => {
  const navigate = useNavigate();

  const { width } = useViewport();
  const isMobile = width <= 1024;
  const name = localStorage.getItem("COOKiNG_USERNAME");

  const handleBackClick = () => {
    navigate("/");
  };
  if (isMobile) {
    return <div></div>;
  } else {
    return (
      <div className="w-[100vw] h-[100vh] flex justify-center items-center relative">
        <div
          className=" absolute top-[32px] left-[32px] cursor-pointer"
          onClick={handleBackClick}
        >
          <BackSvg />
        </div>
        <div className="w-[1000px] h-[600px] border border-black pl-[100px] pt-[50px]">
          <div className=" w-[800px] h-[150px] bg-[#81EF59] flex flex-row pl-[38px] py-[50px] items-center gap-[15px]">
            <div className=" w-[100px] h-[100px] bg-gray-400 rounded-[100%]"></div>
            <p className=" text-[30px]">{name}</p>
          </div>
        </div>
      </div>
    );
  }
};

export default ProfilePage;
