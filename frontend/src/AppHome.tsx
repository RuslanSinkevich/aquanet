import React from "react";
import { Config } from "./config/config";
import { Route, Routes } from "react-router-dom";
import WaterConnectionScheme from "modules/help/WaterConnectionScheme";

export default function AppHome() {
  Config();

  return (
    <Routes>
      <Route path="/" element={<WaterConnectionScheme />} />
    </Routes>
  );
}
