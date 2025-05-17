import React from "react";
import { Config } from "./config/config";
import { Route, Routes } from "react-router-dom";
import ProductFunction from "./pages/ProductFunction";
import ProductClass from "pages//ProductClass";

export default function AppHome() {
  Config();

  return (
    <>
      <Routes>
        <Route path="/" element={<ProductClass />} />
        <Route path="/function" element={<ProductFunction />} />
      </Routes>
    </>
  );
}
