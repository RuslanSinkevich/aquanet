import React from "react";
import { Config } from "./config/config";
import { Route, Routes } from "react-router-dom";
import PageWaterConnection from "pages/PageWaterConnection";

export default function AppHome() {
  Config();

  return (
    <>
      <Routes>
        <Route path="/" element={<PageWaterConnection />} />
      </Routes>
    </>
  );
}
