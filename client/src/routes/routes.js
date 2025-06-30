import { Routes, Route } from "react-router";
import LoginPage from "../pages/loginPage/LoginPage";
import RegisterPage from "../pages/loginPage/RegisterPage";
import HomePage from "../pages/homePage/HomePage";
import Layout from "../components/Layout/Layout";
import AdminHomePage from "../pages/admin/adminHomePage";
import ProfilePage from "../pages/profilePage/profilePage";
export default function MainRoute() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="admin">
          <Route index element={<AdminHomePage />} />
        </Route>
      </Route>

      <Route path="/ProfilePage" element={<ProfilePage />}></Route>
      <Route path="/LoginPage" element={<LoginPage />} />
      <Route path="/RegisterPage" element={<RegisterPage />} />
    </Routes>
  );
}
