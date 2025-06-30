import React from "react";
import useViewport from "../../hooks/useViewport";

const HomePage = () => {
  const { width } = useViewport();
  const isMobile = width <= 1024;
  if (!isMobile) {
    return (
      <div>
        <div className=" w-[300px] h-[80px] bg-black"></div>
      </div>
    );
  } else {
    <div></div>;
  }
};

export default HomePage;
