import React from "react";
import Login from "./Login/Login";
import Productlist from "./Login/Productlist"; 
import About from "./Login/About";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Productlist" element={<Productlist />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
