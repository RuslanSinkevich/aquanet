import * as React from "react";
import ReactDOM from "react-dom/client";
import AppHome from "./AppHome";
import { BrowserRouter } from "react-router-dom";
import { App, ConfigProvider } from "antd";
import locale from "antd/es/locale/ru_RU";
import "bootstrap/dist/js/bootstrap.bundle";
import "./index.scss";
import { getThemeConfig } from "utils/ConfigProviderTheme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  /**StrictMode позволяет находить распространенные ошибки в компонентах на ранних этапах разработки. */
  //<React.StrictMode>
  <App>
    <ConfigProvider theme={getThemeConfig()} locale={locale}>
        <BrowserRouter>
          <AppHome />
        </BrowserRouter>
    </ConfigProvider>
  </App>
  //</React.StrictMode>
);
