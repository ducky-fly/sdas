import React, { useEffect, useRef, useState } from "react";
import BackSvg from "../profilePage/svgs/backSvg";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation, useParams } from "react-router";

import ChinhSuaSvg from "./svgs/chinhSuaSvg";
import {
  putProduct,
  resetUpdateStatus,
} from "../../redux/features/API/admin/updateProduct";
import { dataAdmin } from "../../redux/features/API/admin/getAllProduct";

const AdminUpdatePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const product = location.state?.product;

  const data = useSelector((state) => state.current.data);
  const statusPut = useSelector((state) => state.putProduct.status);
  const error = useSelector((state) => state.putProduct.error);

  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [tenSanPham, setTenSanPham] = useState("");
  const [moTa, setMoTa] = useState("");
  const [giaTien, setGiaTien] = useState("");
  const [fileAnh, setFileAnh] = useState(null);

  const handleBackClick = () => {
    console.log(data);
    if (data?.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", tenSanPham);
    formData.append("price", giaTien);
    formData.append("description", moTa);

    if (fileAnh) {
      // Có ảnh mới thì gửi ảnh mới
      formData.append("image", fileAnh);
    } else if (product?.url_img) {
      // Không thay ảnh => gửi lại ảnh cũ từ URL
      try {
        const response = await fetch(product.url_img);
        const blob = await response.blob();
        const fileName = product.url_img.split("/").pop(); // lấy tên file cũ
        const file = new File([blob], fileName, { type: blob.type });
        formData.append("image", file);
      } catch (err) {
        console.error("Lỗi khi tải lại ảnh cũ:", err);
        alert("Không thể sử dụng ảnh cũ. Vui lòng chọn ảnh mới.");
        return;
      }
    } else {
      alert("Vui lòng chọn ảnh để đăng sản phẩm!");
      return;
    }

    dispatch(putProduct({ id, formData }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreviewImage(imageURL);
      setFileAnh(file); // Lưu file để gửi lên server
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    console.log(statusPut);
  }, [statusPut]);
  useEffect(() => {
    if (statusPut === "failed") {
      console.log(error);
    }
  }, [statusPut, error]);
  useEffect(() => {
    if (product) {
      setTenSanPham(product.name || "");
      setGiaTien(product.price || "");
      setMoTa(product.description || "");
      setPreviewImage(product.url_img || null);
    }
  }, [product]);
  useEffect(() => {
    if (!product) {
      // fallback nếu không có state
      // có thể fetch lại dữ liệu từ id nếu muốn
    } else {
      console.log("Dữ liệu được truyền:", product);
    }
  }, [product]);

  return (
    <div className=" relative w-[100vw] h-[100%] flex flex-col">
      <button
        className=" absolute top-[32px] left-[40px] cursor-pointer"
        onClick={handleBackClick}
      >
        <BackSvg />
      </button>
      <div className=" w-[100%] flex flex-row pl-[70px] pt-[100px] gap-[15px]">
        <div className=" flex flex-row gap-[25px] relative justify-center items-center">
          <div className="flex flex-col gap-[9px] relative w-[300px] h-[300px] border border-black bg-[#C4C4C4]">
            {/* Ảnh */}
            {(previewImage || product?.url_img) && (
              <img
                src={previewImage || product.url_img}
                alt="Ảnh sản phẩm"
                className="w-full h-full object-cover rounded-lg"
              />
            )}

            {/* Nút overlay */}
            <button
              onClick={handleButtonClick}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                          bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg hover:bg-opacity-70"
            >
              Thay ảnh
            </button>

            {/* Input file hidden */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
        <div className="flex flex-col justify-between gap-[15px]">
          <div className=" flex flex-row gap-[15px] items-center">
            <label className="font-semibold">Tên sản phẩm</label>
            <input
              type="text"
              value={tenSanPham}
              onChange={(e) => setTenSanPham(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            />
            <ChinhSuaSvg />
          </div>

          <div className=" flex flex-row gap-[15px] items-center">
            <label className="font-semibold">Giá tiền</label>
            <input
              type="text"
              value={giaTien}
              onChange={(e) => setGiaTien(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            />
            <ChinhSuaSvg />
          </div>

          <button
            onClick={handleSubmit}
            className="w-[150px] h-[60px] bg-[#2CCE75] text-white font-bold shadow-xl rounded-xl"
          >
            Lưu
          </button>
        </div>
      </div>
      <div className="w-full max-w-[600px] pl-[70px] pt-[40px] flex flex-col gap-2">
        <label className="font-semibold text-lg text-gray-800">
          Mô tả sản phẩm
        </label>
        <textarea
          value={moTa}
          onChange={(e) => setMoTa(e.target.value)}
          className="p-4 min-h-[120px] border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
          placeholder="Hãy nhập mô tả chi tiết cho sản phẩm của bạn..."
        />
      </div>
      {statusPut === "loading" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-16 h-16 border-4 border-white border-dashed rounded-full animate-spin"></div>
        </div>
      )}

      {statusPut === "succeeded" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-8 rounded-lg shadow-md text-center space-y-4">
            <p className="text-lg font-semibold text-green-600">
              Upload thành công!
            </p>
            <button
              onClick={() => {
                // Reset lại form
                setTenSanPham("");
                setGiaTien("");
                setMoTa("");
                setFileAnh(null);
                setPreviewImage(null);
                dispatch(resetUpdateStatus()); // Gọi action reset
                dispatch(dataAdmin());
                navigate(-1);
              }}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUpdatePage;
