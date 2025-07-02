import React, { useEffect, useRef, useState } from "react";
import BackSvg from "../profilePage/svgs/backSvg";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import {
  resetUploadStatus,
  uploadProduct,
} from "../../redux/features/API/admin/uploaadProduct";
import ChinhSuaSvg from "./svgs/chinhSuaSvg";
import { dataAdmin } from "../../redux/features/API/admin/getAllProduct";

const AdminPostPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.current.data);
  const statusPost = useSelector((state) => state.postAudio.status);
  const error = useSelector((state) => state.postAudio.error);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", tenSanPham);
    formData.append("price", giaTien);
    formData.append("description", moTa);
    if (fileAnh) formData.append("image", fileAnh);

    if (!tenSanPham || !giaTien || !moTa || !fileAnh) {
      alert("Vui lòng điền đầy đủ thông tin sản phẩm!");
      return;
    }
    dispatch(uploadProduct(formData));
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
    console.log(statusPost);
  }, [statusPost]);
  useEffect(() => {
    if (statusPost === "failed") {
      console.log(error);
    }
  }, [statusPost, error]);
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
            {fileAnh && (
              <img
                src={previewImage || "https://via.placeholder.com/300"}
                alt="Ảnh bài hát"
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
      {statusPost === "loading" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-16 h-16 border-4 border-white border-dashed rounded-full animate-spin"></div>
        </div>
      )}

      {statusPost === "succeeded" && (
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
                dispatch(resetUploadStatus()); // Gọi action reset
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

export default AdminPostPage;
