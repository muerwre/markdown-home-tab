import { useMemo } from "react";
import { CustomTheme } from "../types/theme";
import { defaultDarkTheme, defaultLightTheme } from "./theme";
import { useTranslation } from "react-i18next";

export const useBuiltinThemes = () => {
  const { t } = useTranslation();

  return useMemo<CustomTheme[]>(
    () => [
      {
        title: t("Dark theme"),
        colors: defaultDarkTheme,
      },
      {
        title: t("Light theme"),
        colors: defaultLightTheme,
      },
      {
        title: t("Blueberry boar"),
        colors: {
          backgroundColor: "#201d26",
          textColor: "#eeeeee",
          linkColor: "#40bfbf",
          codeColor: "#d24276",
          h1Color: "#f1b8b8",
          h2Color: "#e2c79e",
          h3Color: "#a6d6c2",
          h4Color: "#a4b8cb",
          h5Color: "#c0a1da",
        },
      },
      {
        title: "Cattpucin Macchiato",
        url: "https://github.com/catppuccin/catppuccin",
        colors: {
          backgroundColor: "#24273a",
          textColor: "#cad3f5",
          linkColor: "#ee99a0",
          codeColor: "#f5a97f",
        },
      },
      {
        title: "Cattpucin Mocha",
        url: "https://github.com/catppuccin/catppuccin",
        colors: {
          backgroundColor: "#1e1e2e",
          textColor: "#cdd6f4",
          linkColor: "#74c7ec",
          codeColor: "#f38ba8",
        },
      },
      {
        title: "Cattpucin Frappe",
        url: "https://github.com/catppuccin/catppuccin",
        colors: {
          backgroundColor: "#303446",
          textColor: "#c6d0f5",
          linkColor: "#a6d189",
          codeColor: "#ef9f76",
        },
      },
      {
        title: "Cattpucin Latte",
        url: "https://github.com/catppuccin/catppuccin",
        colors: {
          backgroundColor: "#eff1f5",
          textColor: "#4c4f69",
          linkColor: "#1e66f5",
          codeColor: "#e64553",
        },
      },
      {
        title: "Dracula",
        url: "https://draculatheme.com/",
        colors: {
          backgroundColor: "#282a36",
          textColor: "#f8f8f2",
          linkColor: "#ff79c6",
          codeColor: "#6272a4",
        },
      },
      {
        title: "Tokyo Night",
        url: "https://github.com/enkia/tokyo-night-vscode-theme",
        colors: {
          backgroundColor: "#1a1b26",
          textColor: "#a9b1d6",
          linkColor: "#7aa2f7",
          codeColor: "#f7768e",
        },
      },
      {
        title: "Tokyo Night Storm",
        url: "https://github.com/enkia/tokyo-night-vscode-theme",
        colors: {
          backgroundColor: "#24283b",
          textColor: "#a9b1d6",
          linkColor: "#7aa2f7",
          codeColor: "#f7768e",
        },
      },
      {
        title: "Tokyo Night Light",
        url: "https://github.com/enkia/tokyo-night-vscode-theme",
        colors: {
          backgroundColor: "#d5d6db",
          textColor: "#343b58",
          linkColor: "#34548a",
          codeColor: "#8c4351",
        },
      },
      {
        title: "Solarized",
        url: "https://ethanschoonover.com/solarized/",
        colors: {
          backgroundColor: "#073642",
          textColor: "#eee8d5",
          linkColor: "#8a8a8a",
          codeColor: "#b58900",
        },
      },
      {
        title: "Horizon Dark",
        url: "https://horizontheme.netlify.app/",
        colors: {
          backgroundColor: "#232530",
          textColor: "#FAC29A",
          linkColor: "#21BFC2",
          codeColor: "#E95379",
        },
      },
      {
        title: "Horizon Bright",
        url: "https://horizontheme.netlify.app/",
        colors: {
          backgroundColor: "#FDF0ED",
          textColor: "#2E303E",
          linkColor: "#1EAEAE",
          codeColor: "#E84A72",
        },
      },
    ],
    []
  );
};
