import { ChangeEvent, FC, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { RowGroup } from "~/components/containers/RowGroup";
import { SettingsRow } from "~/components/containers/SettingsRow";
import {
  ColorSettings,
  SettingsValue,
  useSettings,
} from "~/modules/settings/context/SettingsContext";
import { useBuiltinThemes } from "~/modules/theme/constants/themes";
import { fillThemeHeadings } from "~/modules/theme/utils/fillThemeHeadings";
import { ThemeSelect } from "../../components/ThemeSelect";

const ColorSettings: FC = () => {
  const { update, settings } = useSettings();
  const { t } = useTranslation();

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
        Object.entries(fillThemeHeadings(it.colors)).every(
          ([key, value]) =>
            (settings as unknown as Record<string, string>)[key] === value
        )
      ),
    [themes, settings]
  );

  const setThemeColors = useCallback(
    (val: ColorSettings) => {
      update(fillThemeHeadings(val));
    },
    [update]
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
      <label>
        <SettingsRow title={t("Color theme")} subTitle={themeSubtitle}>
          <ThemeSelect
            value={currentTheme}
            onChange={setThemeColors}
            themes={themes}
          />
        </SettingsRow>
      </label>

      <label>
        <SettingsRow title={t("Background")}>
          <input
            type="color"
            onChange={setString("backgroundColor")}
            value={settings.backgroundColor}
          />
        </SettingsRow>
      </label>

      <label>
        <SettingsRow title={t("Text")}>
          <input
            type="color"
            onChange={setString("textColor")}
            value={settings.textColor}
          />
        </SettingsRow>
      </label>

      <label>
        <SettingsRow title={t("Links")}>
          <input
            type="color"
            onChange={setString("linkColor")}
            value={settings.linkColor}
          />
        </SettingsRow>
      </label>

      <label>
        <SettingsRow title={t("Inline code")}>
          <input
            type="color"
            onChange={setString("codeColor")}
            value={settings.codeColor}
          />
        </SettingsRow>
      </label>

      <label>
        <SettingsRow title={t("Heading 1")}>
          <input
            type="color"
            onChange={setString("h1Color")}
            value={settings.h1Color || settings.textColor}
          />
        </SettingsRow>
      </label>

      <label>
        <SettingsRow title={t("Heading 2")}>
          <input
            type="color"
            onChange={setString("h2Color")}
            value={settings.h2Color || settings.textColor}
          />
        </SettingsRow>
      </label>

      <label>
        <SettingsRow title={t("Heading 3")}>
          <input
            type="color"
            onChange={setString("h3Color")}
            value={settings.h3Color || settings.textColor}
          />
        </SettingsRow>
      </label>

      <label>
        <SettingsRow title={t("Heading 4")}>
          <input
            type="color"
            onChange={setString("h4Color")}
            value={settings.h4Color || settings.textColor}
          />
        </SettingsRow>
      </label>

      <label>
        <SettingsRow title={t("Heading 5")}>
          <input
            type="color"
            onChange={setString("h5Color")}
            value={settings.h5Color || settings.textColor}
          />
        </SettingsRow>
      </label>
    </RowGroup>
  );
};

export { ColorSettings };
