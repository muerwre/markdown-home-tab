import { ChangeEvent, FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { RowGroup } from "~/components/containers/RowGroup";
import { SettingsRow } from "~/components/containers/SettingsRow";
import {
  SettingsValue,
  useSettings,
} from "~/modules/settings/context/SettingsContext";

const ColorSettings: FC = () => {
  const { update, settings } = useSettings();
  const { t } = useTranslation();

  const setString = useCallback(
    (field: keyof SettingsValue) => (event: ChangeEvent<HTMLInputElement>) => {
      update({ [field]: event.target.value });
    },
    [update]
  );

  return (
    <RowGroup>
      <label htmlFor="color">
        <SettingsRow title={t("Background")}>
          <input
            type="color"
            id="color"
            onChange={setString("backgroundColor")}
            value={settings.backgroundColor}
          />
        </SettingsRow>
      </label>

      <label htmlFor="color">
        <SettingsRow title={t("Text")}>
          <input
            type="color"
            id="color"
            onChange={setString("textColor")}
            value={settings.textColor}
          />
        </SettingsRow>
      </label>

      <label htmlFor="color">
        <SettingsRow title={t("Links")}>
          <input
            type="color"
            id="color"
            onChange={setString("linkColor")}
            value={settings.linkColor}
          />
        </SettingsRow>
      </label>

      <label htmlFor="color">
        <SettingsRow title={t("Inline code")}>
          <input
            type="color"
            id="color"
            onChange={setString("codeColor")}
            value={settings.codeColor}
          />
        </SettingsRow>
      </label>
    </RowGroup>
  );
};

export { ColorSettings };
