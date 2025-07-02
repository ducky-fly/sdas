import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation, useParams } from "react-router";
import BackSvg from "../profilePage/svgs/backSvg";
import RatingStars from "./components/RatingStars";
import RandomProductBoard from "./components/RandomProductBoard ";
import { dataAdmin } from "../../redux/features/API/admin/getAllProduct";
import CommentSection from "./components/CommentSection";
const DetailPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const location = useLocation();
  const productFromState = location.state?.product;

  const allProducts = useSelector((state) => state.admin.data?.products);
  const product = productFromState || allProducts?.find((p) => p._id === id);
  const data = useSelector((state) => state.current.data);
  const statusPut = useSelector((state) => state.putProduct.status);
  const error = useSelector((state) => state.putProduct.error);

  const userId = useSelector((state) => state.current.data?._id);

  // Tìm xem user đã đánh giá bao nhiêu sao
  const initialUserStar =
    product?.ratings?.find((r) => r.userId === userId)?.star || 0;

  const handleBackClick = () => {
    if (data?.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
      dispatch(dataAdmin());
    }
  };

  useEffect(() => {
    if (!product) {
      console.warn("Không có dữ liệu sản phẩm truyền qua router.");
    } else {
      console.log("Dữ liệu được truyền:", product);
    }
  }, [product]);

  return (
    <div className="relative w-[100vw] h-[100%] flex flex-col">
      <button
        className="absolute top-[32px] left-[40px] cursor-pointer"
        onClick={handleBackClick}
      >
        <BackSvg />
      </button>

      <div className="w-full flex flex-row pl-[70px] pt-[100px] gap-[15px]">
        {/* Ảnh sản phẩm */}
        <div className="flex flex-row gap-[25px] relative justify-center items-center">
          <div className="flex flex-col gap-[9px] relative w-[300px] h-[300px] border border-black bg-[#C4C4C4]">
            {product?.url_img && (
              <img
                src={product.url_img}
                alt="Ảnh sản phẩm"
                className="w-full h-full object-cover rounded-lg"
              />
            )}
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="flex flex-col justify-center gap-[45px]">
          <div className="flex flex-row gap-[15px] items-center">
            <label className="font-semibold text-lg">Tên món ăn:</label>
            <p className="text-gray-800 text-lg">{product?.name}</p>
          </div>

          <div className="flex flex-row gap-[15px] items-center">
            <label className="font-semibold text-lg">Giá tiền chi tiêu :</label>
            <p className="text-green-600 text-lg">
              {product?.price?.toLocaleString()} đ
            </p>
          </div>
          <div className="flex flex-row gap-[15px] items-center">
            <label className="font-semibold text-lg">Đánh giá:</label>
            <RatingStars
              songId={product?._id}
              initialUserStar={initialUserStar}
            />
          </div>
        </div>
      </div>

      {/* Mô tả sản phẩm */}
      <div className="w-full max-w-[600px] pl-[70px] pt-[40px] flex flex-col gap-2">
        <label className="font-semibold text-lg text-gray-800">
          Mô tả sản phẩm:
        </label>
        <p className="text-gray-700 text-base whitespace-pre-wrap">
          {product?.description || "Không có mô tả."}
        </p>
      </div>
      {/* Bình luận */}
      <CommentSection productId={product._id} product={product} />

      {/* {Ramdom mon an } */}
      <div className=" absolute right-[40px] top-[80px]">
        <RandomProductBoard products={allProducts || []} />
      </div>
    </div>
  );
};

export default DetailPage;
