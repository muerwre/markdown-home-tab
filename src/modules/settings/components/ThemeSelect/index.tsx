import { ChangeEvent, FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { CustomTheme } from "~/modules/theme/types/theme";
import { ColorSettings } from "../../context/SettingsContext";

interface ThemeSelectProps {
  themes: CustomTheme[];
  value?: CustomTheme;
  onChange: (val: ColorSettings) => void;
}

const ThemeSelect: FC<ThemeSelectProps> = ({ themes, value, onChange }) => {
  const { t } = useTranslation();

  const onChangeTrigger = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const themeTitle = event.target.value;

      if (!themeTitle) {
        return;
      }

      const theme = themes.find((it) => it.title === themeTitle);

      if (!theme) {
        return;
      }

      onChange(theme.colors);
    },
    [themes, onChange]
  );

  return (
    <select onChange={onChangeTrigger} value={value?.title}>
      {!value && <option selected>{t("Custom theme")}</option>}

      {themes.map((theme) => (
        <option key={theme.title} value={theme.title}>
          {theme.title}
        </option>
      ))}
    </select>
  );
};
export { ThemeSelect };
