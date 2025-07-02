import React from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router";

const RandomProductBoard = ({ products }) => {
  // Chọn ngẫu nhiên 4 sản phẩm
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 4);
  const navigate = useNavigate();

  return (
    <div className="w-[450px] h-[650px] bg-white border border-black rounded-xl p-4 flex flex-col justify-between">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
        Gợi ý món khác
      </h2>
      <div className="flex flex-col gap-4">
        {selected.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-4 border-b pb-4 cursor-pointer"
            onClick={() => {
              navigate(`/DetailPage/${item._id}`, {
                state: { item },
              });
            }}
          >
            <img
              src={item.url_img}
              alt={item.name}
              className="w-[120px] h-[120px] object-cover rounded-md border"
            />
            <div className="flex flex-col justify-between h-full">
              <p className="text-base font-medium text-gray-800">{item.name}</p>
              <p className="text-green-600 font-semibold">
                {item.price?.toLocaleString()} đ
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RandomProductBoard;
