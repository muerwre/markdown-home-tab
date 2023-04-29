import { ChangeEvent, FC, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { RowGroup } from "~/components/containers/RowGroup";
import { SettingsRow } from "~/components/containers/SettingsRow";
import {
  ColorSettings,
  SettingsValue,
  useSettings,
} from "~/modules/settings/context/SettingsContext";
import { ThemeSelect } from "../../components/ThemeSelect";
import { useBuiltinThemes } from "~/modules/theme/constants/themes";
import { useDefaultTheme } from "~/modules/theme/hooks/useDefaultTheme";

const ColorSettings: FC = () => {
  const { update, settings } = useSettings();
  const { t } = useTranslation();
  const defaultColors = useDefaultTheme();

  const setString = useCallback(
    (field: keyof SettingsValue) => (event: ChangeEvent<HTMLInputElement>) => {
      update({ [field]: event.target.value });
    },
    [update]
  );

  const themes = useBuiltinThemes();

  const currentTheme = useMemo(
    () =>
      themes.find((it) =>
        Object.entries({ ...defaultColors, ...it.colors }).every(
          ([key, value]) =>
            (settings as unknown as Record<string, string>)[key] === value
        )
      ),
    [themes, defaultColors, settings]
  );

  const setThemeColors = useCallback(
    (val: ColorSettings) => {
      update({ ...defaultColors, ...val });
    },
    [defaultColors, update]
  );

  const themeSubtitle = useMemo(() => {
    if (!currentTheme) {
      return t("User defined theme");
    }

    if (!currentTheme.url) {
      return t("Built-in theme");
    }

    return `<a href="${currentTheme.url}" target="__blank">${currentTheme.url}</a>`;
  }, [currentTheme, t]);

  return (
    <RowGroup>
      <label htmlFor="theme">
        <SettingsRow title={t("Color theme")} subTitle={themeSubtitle}>
          <ThemeSelect
            value={currentTheme}
            onChange={setThemeColors}
            themes={themes}
          />
        </SettingsRow>
      </label>

      <label htmlFor="backgroundColor">
        <SettingsRow title={t("Background")}>
          <input
            type="color"
            id="backgroundColor"
            onChange={setString("backgroundColor")}
            value={settings.backgroundColor}
          />
        </SettingsRow>
      </label>

      <label htmlFor="textColor">
        <SettingsRow title={t("Text")}>
          <input
            type="color"
            id="textColor"
            onChange={setString("textColor")}
            value={settings.textColor}
          />
        </SettingsRow>
      </label>

      <label htmlFor="linkColor">
        <SettingsRow title={t("Links")}>
          <input
            type="color"
            id="linkColor"
            onChange={setString("linkColor")}
            value={settings.linkColor}
          />
        </SettingsRow>
      </label>

      <label htmlFor="codeColor">
        <SettingsRow title={t("Inline code")}>
          <input
            type="color"
            id="codeColor"
            onChange={setString("codeColor")}
            value={settings.codeColor}
          />
        </SettingsRow>
      </label>
    </RowGroup>
  );
};

export { ColorSettings };
