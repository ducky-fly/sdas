import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import useViewport from "../../hooks/useViewport";
import LogoWeb from "../Svgs/logoWeb";
import UserSvg from "../Svgs/userSvg";
import TimKiemSvg from "../Svgs/timKiemSvg";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { dataAdmin } from "../../redux/features/API/admin/getAllProduct";

const Layout = () => {
  const navigate = useNavigate();

  const { width } = useViewport();
  const isMobile = width <= 1024;
  const token = localStorage.getItem("COOKiNG_ACCESSTOKEN");
  const data = useSelector((state) => state.admin.data);

  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleClickUser = () => {
    if (token) {
      navigate("/ProfilePage");
    } else {
      navigate("/LoginPage");
    }
  };
  const removeVietnameseTones = (str) => {
    return str
      .normalize("NFD") // chuẩn hóa chuỗi
      .replace(/[\u0300-\u036f]/g, "") // xóa dấu
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };

  useEffect(() => {
    console.log(data);
  }, [data]);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".search-box")) {
        setShowResults(false);
        setSearchValue("");
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

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
        <div className=" w-[100%] h-[12%] bg-[#0ABD63] flex flex-row ">
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
              <div className="relative search-box flex flex-row gap-[10px] items-center">
                {/* input + nút tìm kiếm ở đây */}
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchValue(value);

                    if (value.trim() !== "") {
                      const filtered = data?.products?.filter((p) =>
                        removeVietnameseTones(p.name.toLowerCase()).includes(
                          removeVietnameseTones(value.toLowerCase())
                        )
                      );
                      setSearchResults(filtered);
                      setShowResults(true);
                    } else {
                      setShowResults(false);
                    }
                  }}
                  onFocus={() => {
                    if (searchValue && searchResults.length > 0) {
                      setShowResults(true);
                    }
                  }}
                  placeholder="Tìm kiếm sản phẩm"
                  className="w-[500px] h-[50px] p-[20px] bg-white border-none text-[20px]"
                />
                {showResults && (
                  <div className="absolute top-[50px] w-[500px] max-h-[400px] bg-white shadow-lg rounded overflow-auto animate-slideDown z-50">
                    {searchResults.length === 0 ? (
                      <div className="p-4 text-gray-500">
                        Không tìm thấy sản phẩm
                      </div>
                    ) : (
                      searchResults.map((item) => (
                        <div
                          key={item._id}
                          className="flex items-center p-3 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setShowResults(false);
                            setSearchValue("");
                            navigate(`/DetailPage/${item._id}`);
                          }}
                        >
                          <img
                            src={item.url_img}
                            alt={item.name}
                            className="w-[60px] h-[60px] object-cover rounded mr-4"
                          />
                          <div>
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-gray-500">
                              {item.price.toLocaleString()}₫
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

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
        <div className=" h-[88%]">
          <Outlet />
        </div>
      </div>
    );
  }
};

export default Layout;
