import React, { useEffect, useState } from "react";
import useViewport from "../../hooks/useViewport";
import ThreeGach from "../admin/svgs/threeGach";
import AddSvg from "../admin/svgs/addSvg";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { dataAdmin } from "../../redux/features/API/admin/getAllProduct";

const HomePage = () => {
  const { width } = useViewport();
  const isMobile = width <= 1024;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [sortOption, setSortOption] = useState("default");
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [sortedProducts, setSortedProducts] = useState([]);

  const data = useSelector((state) => state.admin.data);
  const statusDelete = useSelector((state) => state.deleteProduct.status);

  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    console.log(data);
  }, [data]);
  useEffect(() => {
    console.log(statusDelete);
  }, [statusDelete]);
  useEffect(() => {
    if (data?.products) {
      let sorted = [...data.products];

      if (sortOption === "asc") {
        sorted.sort((a, b) => a.price - b.price);
      } else if (sortOption === "desc") {
        sorted.sort((a, b) => b.price - a.price);
      }
      // Nếu mặc định thì giữ nguyên thứ tự ban đầu
      setSortedProducts(sorted);
    }
  }, [data, sortOption]);

  if (!isMobile) {
    return (
      <div className=" w-[100vw] h-[100%] flex flex-col">
        <div className=" w-[90%] flex flex-col items-center pl-[90px] pt-[70px]">
          <div className=" w-full h-[40px] flex flex-row justify-between ">
            <div className=" w-[200px] h-full bg-[#0ABD63] flex flex-row justify-center items-center text-white rounded">
              <ThreeGach />
              Danh sách sản phẩm
            </div>
            <div className="relative w-[120px] h-[40px]">
              <div
                onClick={() => setShowFilterOptions((prev) => !prev)}
                className="w-full h-full flex justify-center items-center bg-[#0ABD63] rounded text-white cursor-pointer"
              >
                Lọc
              </div>

              {showFilterOptions && (
                <div className="absolute top-full mt-2 left-0 bg-white border rounded shadow-md z-50">
                  <div
                    onClick={() => {
                      setSortOption("default");
                      setShowFilterOptions(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Mặc định
                  </div>
                  <div
                    onClick={() => {
                      setSortOption("asc");
                      setShowFilterOptions(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Giá tăng dần
                  </div>
                  <div
                    onClick={() => {
                      setSortOption("desc");
                      setShowFilterOptions(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Giá giảm dần
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* {render} */}
          <div className="pl-[50px] grid grid-cols-4 gap-[50px] mt-8 w-full">
            {sortedProducts?.map((product) => {
              const ratings = product.ratings || [];
              const totalStars = ratings.reduce((sum, r) => sum + r.star, 0);
              const avgStar =
                ratings.length > 0 ? totalStars / ratings.length : 0;

              return (
                <div
                  key={product._id}
                  onClick={() => {
                    navigate(`DetailPage/${product._id}`, {
                      state: { product },
                    });
                  }}
                  className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center transition hover:scale-105 duration-200 cursor-pointer"
                >
                  <img
                    src={product.url_img}
                    alt={product.name}
                    className="w-[250px] h-[250px] object-cover rounded-lg"
                  />
                  <h3 className="text-lg font-semibold text-center">
                    {product.name}
                  </h3>
                  <p className="text-[#2CCE75] font-medium mb-1">
                    {product.price.toLocaleString()}đ
                  </p>

                  {/* Hiển thị đánh giá sao trung bình */}
                  <div className="flex gap-1" onClick={{}}>
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill={i < Math.round(avgStar) ? "#facc15" : "#e5e7eb"}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.75.75 0 011.04 0l2.358 2.39a.75.75 0 00.564.22h2.586a.75.75 0 01.48 1.332l-2.04 2.005a.75.75 0 00-.216.705l.482 2.61a.75.75 0 01-1.092.792l-2.332-1.226a.75.75 0 00-.698 0l-2.332 1.226a.75.75 0 01-1.092-.792l.482-2.61a.75.75 0 00-.216-.705l-2.04-2.005a.75.75 0 01.48-1.332h2.586a.75.75 0 00.564-.22l2.358-2.39z"
                        />
                      </svg>
                    ))}
                  </div>

                  {/* Có thể thêm số lượt đánh giá nếu muốn */}
                  <p className="text-sm text-gray-500">
                    ({ratings.length} lượt đánh giá)
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    <div></div>;
  }
};

export default HomePage;
