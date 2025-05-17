import React from "react";
import LayoutPage from "./layout/LayoutPage";
import ParamEditorFunction from "modules/product/ParamEditorFunction";
import { model, params } from "dataTest/dataTestParam";

export default function ProductFunction() {
  document.title = "Функциональный компонент";
  
  return (
    <LayoutPage>
      <h3>Функциональный компонент</h3>
      <ParamEditorFunction params={params} model={model} />
    </LayoutPage>
  );
}
