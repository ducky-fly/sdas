import React from "react";
import logo from "./components/assets/logo.png";
import { Link } from "react-router";
import useViewport from "../../hooks/useViewport";

const RegisterPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const { width } = useViewport();
  const isMobile = width <= 1024;

  const getEmail = (e) => {
    setEmail(e.target.value);
  };

  const getPassword = (e) => {
    setPassword(e.target.value);
  };

  const getConfirm = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleRegister = () => {
    if (!email || !password || !confirmPassword) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      alert("Đăng ký thành công!");
    } catch (error) {
      alert("Đăng ký thất bại.");
    }
  };
  if (isMobile) {
    return (
      <div className="w-[100vw] h-[100vh] bg-[#121212] flex justify-center items-center">
        <div className="w-[390px] h-[844px] bg-white p-8 flex flex-col justify-center items-center gap-[50px]">
          <img src={logo} alt="Logo" className="w-[170px] h-[140px]" />

          <div className="w-[300px]">
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={getEmail}
                className="w-full h-[45px] border px-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Nhập tên tài khoản"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={getPassword}
                className="w-full h-[45px] border px-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Nhập mật khẩu"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                value={confirmPassword}
                onChange={getConfirm}
                className="w-full h-[45px] border px-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Nhập lại mật khẩu"
              />
            </div>

            <button
              onClick={handleRegister}
              className="w-full h-[45px] bg-[#0ABD63] text-white rounded hover:bg-[#185e3a] transition duration-200"
            >
              Đăng ký
            </button>

            <div className="flex flex-row justify-center gap-1 mt-4">
              Bạn đã có tài khoản?
              <p className="font-bold">
                <Link to="/">Đăng nhập</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }else{
    return (
      <div className="w-[100vw] h-[100vh] bg-[#121212] flex justify-center items-center">
        <div className="w-full h-full bg-white p-8 flex flex-col justify-center items-center gap-[50px]">
          <img src={logo} alt="Logo" className="w-[250px] h[200px]" />

          <div className="w-[400px]">
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={getEmail}
                className="w-full h-[50px] border px-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Nhập tên tài khoản"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={getPassword}
                className="w-full h-[50px] border px-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Nhập mật khẩu"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                value={confirmPassword}
                onChange={getConfirm}
                className="w-full h-[50px] border px-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Nhập lại mật khẩu"
              />
            </div>

            <button
              onClick={handleRegister}
              className="w-full h-[50px] bg-[#0ABD63] text-white rounded hover:bg-[#185e3a] transition duration-200"
            >
              Đăng ký
            </button>

            <div className="flex flex-row justify-center gap-1 mt-4">
              Bạn đã có tài khoản?
              <p className="font-bold">
                <Link to="/">Đăng nhập</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default RegisterPage;
