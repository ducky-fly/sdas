import React from "react";
import { Outlet } from "react-router";
import useViewport from "../../hooks/useViewport";

const Layout = () => {
  const { width } = useViewport();
  const isMobile = width <= 1024;
  if (isMobile) {
    return (
      <div className=" w-[390px] h-[844px]">
        <Outlet />
        <div className=" w-full h-[80px] bg-black"></div>
      </div>
    );
  } else {
    return (
      <div className=" w-screen h-screen flex justify-center items-center">
        <Outlet />
        <div></div>
      </div>
    );
  }
};

export default Layout;
