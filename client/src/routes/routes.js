import { Routes, Route } from "react-router";
import LoginPage from "../pages/loginPage/LoginPage";
import RegisterPage from "../pages/loginPage/RegisterPage";
import HomePage from "../pages/homePage/HomePage";
import Layout from "../components/Layout/Layout";
import AdminHomePage from "../pages/admin/adminHomePage";
import ProfilePage from "../pages/profilePage/profilePage";
import AdminPostPage from "../pages/admin/adminPostPage";
import AdminUpdatePage from "../pages/admin/adminUpdatePage";
import DetailPage from "../pages/homePage/detailPage";

export default function MainRoute() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="DetailPage/:id" element={<DetailPage />} />
        <Route path="admin">
          <Route index element={<AdminHomePage />} />
          <Route path="AdminPostPage" element={<AdminPostPage />} />
          <Route path="AdminUpdatePage/:id" element={<AdminUpdatePage />} />
        </Route>
      </Route>

      <Route path="/ProfilePage" element={<ProfilePage />}></Route>
      <Route path="/LoginPage" element={<LoginPage />} />
      <Route path="/RegisterPage" element={<RegisterPage />} />
    </Routes>
  );
}
