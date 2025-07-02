import { useState } from "react";
import { Star } from "lucide-react"; // hoặc dùng svg thường nếu không cài lucide-react
import { useDispatch, useSelector } from "react-redux";
import { rateSong } from "../../../redux/features/API/user/rateSong";

const RatingStars = ({ songId, initialUserStar = 0, disabled = false }) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(initialUserStar);
  const [hovered, setHovered] = useState(null);

  const handleClick = (value) => {
    if (disabled) return;

    setSelected(value);
    dispatch(rateSong({ songId, star: value }));
  };

  return (
    <div className="flex gap-1 cursor-pointer">
      {[1, 2, 3, 4, 5].map((val) => (
        <svg
          key={val}
          onClick={() => handleClick(val)}
          onMouseEnter={() => setHovered(val)}
          onMouseLeave={() => setHovered(null)}
          xmlns="http://www.w3.org/2000/svg"
          fill={
            hovered >= val || (!hovered && selected >= val)
              ? "#facc15"
              : "#e5e7eb"
          }
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 hover:scale-110 transition"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.5a.75.75 0 011.04 0l2.36 2.39a.75.75 0 00.56.22h2.59a.75.75 0 01.48 1.33l-2.04 2.01a.75.75 0 00-.22.71l.48 2.61a.75.75 0 01-1.09.79l-2.33-1.23a.75.75 0 00-.7 0l-2.33 1.23a.75.75 0 01-1.09-.79l.48-2.61a.75.75 0 00-.22-.71l-2.04-2.01a.75.75 0 01.48-1.33h2.59a.75.75 0 00.56-.22l2.36-2.39z"
          />
        </svg>
      ))}
    </div>
  );
};

export default RatingStars;
