import React from "react";
import logo from "./components/assets/logo.png";
import { Link } from "react-router";
import useViewport from "../../hooks/useViewport";

const LoginPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { width } = useViewport();
  const isMobile = width <= 1024;

  const getEmail = (e) => {
    setEmail(e.target.value);
  };

  const getPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    if (email === "admin@gmail.com" && password === "123456") {
      alert("Đăng nhập thành công!");
    } else {
      alert("Email hoặc mật khẩu không đúng.");
    }
  };
  if (isMobile) {
    return (
      <div className="w-[100vw] h-[100vh] bg-[#121212] flex justify-center items-center">
        <div className=" w-[390px] h-[844px] bg-white p-8 flex flex-col justify-center items-center gap-[50px]">
          <img src={logo} alt="Logo" className=" w-[170px] h[140px]"></img>
          <div className=" w-[300px]">
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={getEmail}
                className="w-full h-[45px] border px-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Nhập tên tài khoản"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                value={password}
                onChange={getPassword}
                className="w-full h-[45px] border px-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Nhập mật khẩu"
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full h-[45px] bg-[#0ABD63] text-white rounded hover:bg-[#185e3a] transition duration-200"
            >
              Đăng nhập
            </button>
            <div className="flex flex-row justify-center gap-1">
              Bạn chưa có tài khoản?
              <p className=" font-bold">
                <Link to="/RegisterPage">Đăng ký</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }else{
    return (
      <div className="w-[100vw] h-[100vh] bg-[#121212] flex justify-center items-center">
        <div className=" w-full h-full bg-white p-8 flex flex-col justify-center items-center gap-[50px]">
          <img src={logo} alt="Logo" className=" w-[250px] h[200px]"></img>
          <div className=" w-[400px]">
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={getEmail}
                className="w-full h-[50px] border px-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Nhập tên tài khoản"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                value={password}
                onChange={getPassword}
                className="w-full h-[50px] border px-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Nhập mật khẩu"
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full h-[50px] bg-[#0ABD63] text-white rounded hover:bg-[#185e3a] transition duration-200"
            >
              Đăng nhập
            </button>
            <div className="flex flex-row justify-center gap-1">
              Bạn chưa có tài khoản?
              <p className=" font-bold">
                <Link to="/RegisterPage">Đăng ký</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default LoginPage;
