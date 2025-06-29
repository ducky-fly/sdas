import { Routes, Route } from "react-router";
import LoginPage from "../pages/loginPage/LoginPage";
import RegisterPage from "../pages/loginPage/RegisterPage";
import HomePage from "../pages/homePage/HomePage";
import Layout from "../components/Layout/Layout";
export default function MainRoute() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
      </Route>

      <Route path="LoginPage" element={<LoginPage />} />
      <Route path="RegisterPage" element={<RegisterPage />} />
    </Routes>
  );
}
