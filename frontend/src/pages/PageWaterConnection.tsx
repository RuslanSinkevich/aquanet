import React from "react";
import LayoutPage from "./layout/LayoutPage";
import WaterConnectionInfo from "modules/info/WaterConnectionScheme";

export default function PageWaterConnection() {
  document.title = "Схема подключения";

  return (
    <LayoutPage>
      <WaterConnectionInfo />
    </LayoutPage>
  );
}
