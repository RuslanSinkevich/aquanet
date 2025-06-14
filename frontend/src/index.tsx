import * as React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App, ConfigProvider } from "antd";
import locale from "antd/es/locale/ru_RU";
import "bootstrap/dist/js/bootstrap.bundle";
import "./index.scss";
import { getThemeConfig } from "utils/ConfigProviderTheme";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AppHome } from "./AppHome";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20 }}>
          <h1>Что-то пошло не так</h1>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>
            Перезагрузить страницу
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

root.render(
  <ErrorBoundary>
    <React.StrictMode>
      <App>
        <Provider store={store}>
          <ConfigProvider theme={getThemeConfig()} locale={locale}>
            <BrowserRouter>
              <AppHome />
            </BrowserRouter>
          </ConfigProvider>
        </Provider>
      </App>
    </React.StrictMode>
  </ErrorBoundary>
);
