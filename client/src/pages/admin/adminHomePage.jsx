import React, { useEffect, useState } from "react";
import ThreeGach from "./svgs/threeGach";
import AddSvg from "./svgs/addSvg";
import { Link, useNavigate } from "react-router";
import { dataAdmin } from "../../redux/features/API/admin/getAllProduct";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  resetDeleteStatus,
} from "../../redux/features/API/admin/deleteProduct";

const AdminHomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.admin.data);
  const statusDelete = useSelector((state) => state.deleteProduct.status);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleClickProduct = (product) => {
    if (selectedProduct?._id === product._id) {
      // Nếu đang chọn chính sản phẩm này thì bỏ chọn
      setSelectedProduct(null);
    } else {
      setSelectedProduct(product);
    }
  };

  const handlClickDelete = async () => {
    if (selectedProduct) {
      const confirmed = window.confirm("Bạn có chắc chắn muốn xoá sản phẩm?");
      if (!confirmed) return;
      console.log("ID cần xoá:", selectedProduct._id);

      dispatch(deleteProduct(selectedProduct?._id));
      setSelectedProduct(null);
    }
  };
  useEffect(() => {
    console.log(data);
  }, [data]);
  useEffect(() => {
    if (statusDelete === "succeeded") {
      dispatch(dataAdmin()); // gọi lại để cập nhật danh sách
      dispatch(resetDeleteStatus());
    }
  });
  useEffect(() => {
    console.log(statusDelete);
  }, [statusDelete]);

  return (
    <div className=" w-[100vw] h-[100%] flex flex-col">
      <div className=" w-[90%] flex flex-col items-center pl-[90px] pt-[70px]">
        <div className=" w-full h-[40px] flex flex-row justify-between ">
          <div className=" w-[200px] h-full bg-[#0ABD63] flex flex-row justify-center items-center text-white rounded">
            <ThreeGach />
            Danh sách sản phẩm
          </div>
          <div className="h-full flex flex-row gap-[10px]">
            <button
              className="w-[120px] h-[40px] border border-[#333] flex justify-center items-center text-[#818181]"
              onClick={() => {
                if (selectedProduct) {
                  navigate(`AdminUpdatePage/${selectedProduct._id}`, {
                    state: { product: selectedProduct },
                  });
                } else {
                  alert("Vui lòng chọn sản phẩm để chỉnh sửa.");
                }
              }}
            >
              <p>Chỉnh sửa</p>
            </button>
            <button
              className=" w-[120px] h-[40px] border border-[#FF0000] flex justify-center items-center text-[#FF0000] "
              onClick={handlClickDelete}
            >
              <p>Xóa</p>
            </button>
            <Link to="AdminPostPage">
              <button className=" w-[120px] h-[40px] border border-[#2CCE75] flex justify-center items-center ">
                <AddSvg />
              </button>
            </Link>
          </div>
        </div>
        {/* {render} */}
        <div className="pl-[50px] grid grid-cols-4 gap-[50px] mt-8 w-full">
          {data?.products?.map((product) => {
            const ratings = product.ratings || [];
            const totalStars = ratings.reduce((sum, r) => sum + r.star, 0);
            const avgStar =
              ratings.length > 0 ? totalStars / ratings.length : 0;

            return (
              <div
                key={product._id}
                onClick={() => {
                  handleClickProduct(product);
                }}
                className={`bg-white rounded-xl shadow-md p-4 flex flex-col items-center transition hover:scale-105 duration-200 cursor-pointer ${
                  selectedProduct?._id === product._id
                    ? "ring-4 ring-green-400"
                    : ""
                }`}
              >
                <img
                  src={product.url_img}
                  alt={product.name}
                  className="w-[250px] h-[250px] object-cover rounded-lg"
                />
                <h3 className="text-lg font-semibold text-center ">
                  {product.name}
                </h3>
                <p className="text-[#2CCE75] font-medium mb-1">
                  {product.price.toLocaleString()}đ
                </p>

                {/* Hiển thị đánh giá sao trung bình */}
                <div className="flex gap-1">
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
};

export default AdminHomePage;
