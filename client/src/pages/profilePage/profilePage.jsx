import React, { useState } from "react";
import useViewport from "../../hooks/useViewport";
import BackSvg from "./svgs/backSvg";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import ThemeWhiteSvg from "./svgs/themeWhiteSvg";
import ThemeBlackSvg from "./svgs/themeBlackSvg";
import { changeTheme } from "../../redux/features/counter/isDark";
import axios from "axios";
import HomeSvg from "./svgs/homeSvg";
import UserIconSvg from "./svgs/userIconSvg";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.isDark.isDark);
  const data = useSelector((state) => state.current.response);

  const { width } = useViewport();
  const toggleTheme = () => {
    dispatch(changeTheme());
  };
  const isMobile = width <= 1024;
  const name = localStorage.getItem("COOKiNG_USERNAME");
  const handleBackClick = () => {
    console.log(data);

    if (data?.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };
  const handleLogoutClick = async () => {
    try {
      const token = localStorage.getItem("COOKiNG_ACCESSTOKEN");
      const email = localStorage.getItem("COOKiNG_EMAIL");

      console.log(token);

      const response = await axios.post(
        "http://localhost:8000/api/users/logout",
        {
          email,
          token,
        },
        { withCredentials: true }
      );
      console.log(response.data);

      if (response.data.success) {
        localStorage.removeItem("COOKiNG_ACCESSTOKEN");
        localStorage.removeItem("COOKiNG_USERNAME");
        localStorage.removeItem("COOKiNG_EMAIL");
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Có lỗi xảy ra, vui lòng thử lại sau.");
      }
    }
  };
  if (isMobile) {
    return (
      <div className=" w-screen h-screen flex justify-center items-center">
        <div className=" w-[400px] h-full ">
          <div className=" w-full h-[20%] bg-[#81EF59] bg-opacity-[40%] flex flex-row items-center pl-[15px] gap-[10px]">
            <div className=" w-[70px] h-[70px] bg-gray-400 rounded-[100%]"></div>
            <p className=" text-[30px]">{name}</p>
          </div>
          <div className=" h-[70%] overflow-y-auto"></div>
          <div className=" w-full h-[10%] bg-[gray] flex justify-center items-center">
            <div className=" w-[140px] h-[60px] flex flex-row gap-[20px]">
              <Link to="/">
                <button className=" w-[60px] h-[60px] border rounded-full bg-white flex justify-center items-center">
                  <HomeSvg />
                </button>
              </Link>
              <Link to="/ProfilePage">
                <button className=" w-[60px] h-[60px] border rounded-full bg-white flex justify-center items-center">
                  <UserIconSvg />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-[100vw] h-[100vh] flex justify-center items-center relative">
        <div
          className=" absolute top-[32px] left-[32px] cursor-pointer"
          onClick={handleBackClick}
        >
          <BackSvg />
        </div>
        <div className=" relative w-[1000px] h-[600px] border border-black pl-[100px] pt-[50px] flex flex-col gap-[10px]">
          <div className=" w-[800px] h-[150px] bg-[#81EF59] bg-opacity-40 flex flex-row pl-[38px] py-[50px] items-center gap-[15px]">
            <div className=" w-[100px] h-[100px] bg-gray-400 rounded-[100%]"></div>
            <p className=" text-[30px]">{name}</p>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative w-[90px] h-[35px] rounded-full cursor-pointer transition-all duration-300 ${
              isDark ? "bg-black" : "bg-[#89CBF4]"
            }`}
          >
            <div
              className={`absolute w-[28px] h-[28px] top-[3px] bg-white rounded-full flex justify-center items-center transition-all duration-300 ${
                isDark ? "left-[59px]" : "left-[3px]"
              }`}
            >
              {isDark ? <ThemeBlackSvg /> : <ThemeWhiteSvg />}
            </div>
          </button>
          <button className=" absolute w-[350px] h-[50px] bg-[#D9D9D9] bottom-[50px] left-[325px] flex justify-center items-center">
            <p className=" text-[20px]" onClick={handleLogoutClick}>
              Đăng xuất
            </p>
          </button>
        </div>
      </div>
    );
  }
};

export default ProfilePage;
