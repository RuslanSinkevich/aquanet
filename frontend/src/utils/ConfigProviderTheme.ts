import { ThemeConfig } from "antd/es/config-provider/context"; // Импорт типа для темы

// Конфигурация ui antd
export const getThemeConfig = (): ThemeConfig => {
  return {
    token: {
      colorPrimary: "#446E9B",
      colorLink: "#0989f9",
      colorIcon: "#0989f9",
      borderRadius: 4,
    },
    components: {
      Input: {
        activeBorderColor: "transparent",
        hoverBorderColor: "transparent",
        activeBg: "transparent",
        hoverBg: "transparent",
        activeShadow: "0 0 0 0px",
        warningActiveShadow: "0 0 0 0px",
      },
      Table:{
        colorText: "#7c7c7c",
        headerColor: "rgba(0,0,0,0.60)",
      }
    },
  };
};
