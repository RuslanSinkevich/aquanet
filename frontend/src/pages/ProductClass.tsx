import React from "react";
import LayoutPage from "./layout/LayoutPage";
import ParamEditorClass from "modules/product/ParamEditorClass";
import { model, params } from "dataTest/dataTestParam";

export default function ProductFunction() {
  document.title = "Классовый компонент";

  return (
    <LayoutPage>
      <h3>Классовый компонент</h3>
      <ParamEditorClass params={params} model={model} />
    </LayoutPage>
  );
}
