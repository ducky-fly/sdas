import React from "react";
import { Outlet } from "react-router";
import useViewport from "../../hooks/useViewport";
import LogoWeb from "../Svgs/logoWeb";
import UserSvg from "../Svgs/userSvg";
import TimKiemSvg from "../Svgs/timKiemSvg";
import { useNavigate } from "react-router";

const Layout = () => {
  const navigate = useNavigate();

  const { width } = useViewport();
  const isMobile = width <= 1024;
  const token = localStorage.getItem("COOKiNG_ACCESSTOKEN");

  const handleClickUser = () => {
    if (token) {
      navigate("/ProfilePage");
    } else {
      navigate("/LoginPage");
    }
  };

  if (isMobile) {
    return (
      <div className=" w-[390px] h-[844px]">
        <Outlet />
      </div>
    );
  } else {
    return (
      <div className=" w-screen h-screen flex flex-col bg-white">
        {/* header */}
        <div className=" w-[100%] h-[90px] bg-[#0ABD63] flex flex-row ">
          {/* Logo web */}

          <div className="ml-[200px] w-[92%] flex flex-row items-center gap-[50px]">
            <div className=" flex flex-row gap-[10px]  items-center">
              <div>
                <LogoWeb />
              </div>
              <p className=" font-bold text-[white] text-[20px]">GREEN SHOP</p>
            </div>
            {/* Tiem Kiem */}

            <div className=" flex flex-row gap-[10px]  items-center">
              <input
                type="text"
                className=" w-[500px] h-[50px] p-[20px] bg-white border-none text-[20px]"
                placeholder="Tìm kiếm sản phẩm"
              />
              <div className=" w-[50px] h-[50px] flex justify-center items-center bg-[#257D0E] cursor-pointer">
                <TimKiemSvg />
              </div>
            </div>
          </div>
          <div className="w-[8%] flex justify-center items-center">
            <div className=" cursor-pointer" onClick={handleClickUser}>
              <UserSvg />
            </div>
          </div>
        </div>

        {/* noi dung */}
        <Outlet />
      </div>
    );
  }
};

export default Layout;
