import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../../pages/Home";
import About from "../../pages/About";
import CarListing from "../../pages/CarListing";
import CarDetails from "../../pages/CarDetails";
import Blog from "../../pages/Blog";
import BlogDetails from "../../pages/BlogDetails";
import NotFound from "../../pages/NotFound";
import Contact from "../../pages/Contact";
import Check from "../../components/UI/Check";
import LoginForm from "../components/User/LoginForm"
import Registration from "../components/User/Registration"
import CarsForm from "../Admin/CarsForm";
import Reservation from "../Admin/Reservation";
import Admin from "../Admin/Admin";
import AdminBlogs from "../Admin/AdminBlogs";
import AdminContact from "../Admin/AdminContact";


const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/cars" element={<CarListing />} />
      <Route path="/cars/:slug" element={<CarDetails />} />
      <Route path="/blogs" element={<Blog />} />
      <Route path="/blogs/:slug" element={<BlogDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/check" element={<Check />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/registration" element={<Registration  />} />
      <Route path="/adminres" element={<Admin  />} />
      <Route path="/adminblog" element={<AdminBlogs />} />
      <Route path="/adminContact" element={<AdminContact />} />
 
      <Route path="/admin/reservation" element={<Reservation  />} /> */
    </Routes>
  );
};

export default Routers;
