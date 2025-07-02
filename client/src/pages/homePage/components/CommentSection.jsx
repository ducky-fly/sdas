import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCommentsByProduct,
  createComment,
} from "../../../redux/features/API/user/createComment";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./CommentAnimation.css"; // sẽ tạo sau

const CommentSection = ({ productId, product }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comment.comments);
  const user = useSelector((state) => state.current.data);
  const [newComment, setNewComment] = useState("");
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [productName, setProductName] = useState(product?.name || "");

  const token = localStorage.getItem("COOKiNG_ACCESSTOKEN");
  const name = localStorage.getItem("COOKiNG_USERNAME");

  useEffect(() => {
    console.log(productId);

    if (productId) dispatch(getCommentsByProduct(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    console.log(comments);
  }, [comments]);
  useEffect(() => {
    const fetchProductName = async () => {
      if (!product && productId) {
        try {
          const res = await fetch(
            `http://localhost:8000/api/admin/getProduct/${productId}`
          );
          const data = await res.json();
          setProductName(data.name);
        } catch (error) {
          console.error("Lỗi khi lấy tên sản phẩm:", error);
        }
      }
    };
    fetchProductName();
  }, [product, productId]);
  const handlePostComment = () => {
    if (!token) return setShowLoginPrompt(true);

    if (newComment.trim()) {
      const payload = { productId, content: newComment };

      dispatch(createComment(payload)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          const newCommentWithUser = {
            ...res.payload,
            userId: {
              _id: user._id,
              username: user.username || name,
            },
          };

          dispatch({
            type: "comment/manualAppend",
            payload: newCommentWithUser,
          });

          // ✅ Làm mới danh sách bình luận từ server (nếu cần sync dữ liệu chuẩn hơn)
          dispatch(getCommentsByProduct(productId));
        }
      });

      setNewComment("");
    }
  };

  return (
    <div className="w-full max-w-[600px] pl-[70px] pt-[40px] flex flex-col gap-4">
      <div className="border-b border-gray-300 pb-2 mb-4">
        <h3 className="text-xl font-bold text-green-700">
          Bình luận về: {productName || "Sản phẩm"}
        </h3>
      </div>

      <TransitionGroup>
        {comments?.map((cmt) => (
          <CSSTransition key={cmt._id} timeout={300} classNames="slide-comment">
            <div className="flex items-start gap-4 border-b pb-4 bg-white">
              <div className="w-[60px] h-[60px] rounded-full bg-gray-400 flex items-center justify-center text-xl font-bold text-white">
                {cmt.userId?.username?.[0]?.toUpperCase() || "?"}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">
                  {cmt.userId?.username || "Ẩn danh"}
                </span>
                <span className="text-gray-600">{cmt.content}</span>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      fill={i <= (cmt.star || 3) ? "#facc15" : "#e5e7eb"}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.5a.75.75 0 011.04 0l2.36 2.39a.75.75 0 00.56.22h2.59a.75.75 0 01.48 1.33l-2.04 2.01a.75.75 0 00-.22.71l.48 2.61a.75.75 0 01-1.09.79l-2.33-1.23a.75.75 0 00-.7 0l-2.33 1.23a.75.75 0 01-1.09-.79l.48-2.61a.75.75 0 00-.22-.71L6.03 7.44a.75.75 0 01.48-1.33h2.59a.75.75 0 00.56-.22l2.36-2.39z"
                      />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>

      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Nhập bình luận của bạn..."
        className="border p-2 rounded resize-none"
      />
      <button
        onClick={handlePostComment}
        className="bg-green-500 text-white px-4 py-2 rounded w-max"
      >
        Gửi bình luận
      </button>

      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md text-center max-w-sm w-full">
            <h4 className="text-lg font-bold text-red-600 mb-2">
              Bạn chưa đăng nhập
            </h4>
            <p className="mb-4">
              Hãy đăng nhập mới có thể sử dụng chức năng này.
            </p>
            <button
              onClick={() => setShowLoginPrompt(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
