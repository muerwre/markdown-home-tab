import Color from "color";
import { useEffect } from "react";
import { ColorSettings } from "~/modules/settings/context/SettingsContext";

export const useThemeColors = (settings: ColorSettings) => {
  useEffect(() => {
    const background = new Color(settings.backgroundColor);
    const isDark = background.isDark();

    const border = isDark
      ? background.mix(Color("white"), 0.1)
      : background.mix(Color("black"), 0.2);

    const code = new Color(settings.codeColor);

    document.body.style.setProperty("--color-background", background.hex());
    document.body.style.setProperty("--color-code", code.hex());
    document.body.style.setProperty(
      "--color-code-background",
      code.fade(isDark ? 0.9 : 0.7).toString()
    );
    document.body.style.setProperty("--color-text", settings.textColor);
    document.body.style.setProperty("--color-link", settings.linkColor);
    document.body.style.setProperty("--color-border", border.hex());
    document.body.style.setProperty(
      "--color-pre-background",
      isDark ? background.lighten(0.2).hex() : background.darken(0.2).hex()
    );
  }, [settings]);
};
