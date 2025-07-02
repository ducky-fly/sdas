import "./App.css";
import React, { useEffect, useState } from "react";
import { current } from "./redux/features/API/current";
import MainRoute from "./routes/routes";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { dataAdmin } from "./redux/features/API/admin/getAllProduct";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.current.status);
  const data = useSelector((state) => state.current.data);

  useEffect(() => {
    dispatch(current());
    dispatch(dataAdmin());
  }, []);
  useEffect(() => {
    console.log(status);
    console.log(data);

    if (status === "successed" && data?.role === "admin") {
      dispatch(dataAdmin());
      navigate("/admin");
    }

    if (status === "successed" && data?.role === "user") {
      dispatch(dataAdmin());
      navigate("/");
    }
  }, [status, data]);
  return (
    <div className="App">
      <MainRoute />
    </div>
  );
}

export default App;
