import { ChangeEvent, FC, useCallback } from "react";
import { useSettings } from "../../context/SettingsContext";

const SettingsContainer: FC = () => {
  const { update, settings } = useSettings();

  const updateBackgroundColor = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      update({ backgroundColor: event.target.value });
    },
    [update]
  );
  const updateTextColor = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      update({ textColor: event.target.value });
    },
    [update]
  );

  const updateLinkColor = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      update({ linkColor: event.target.value });
    },
    [update]
  );

  return (
    <div>
      <label htmlFor="color">
        Background
        <input
          type="color"
          id="color"
          onChange={updateBackgroundColor}
          value={settings.backgroundColor}
        />
      </label>

      <label htmlFor="color">
        Text
        <input
          type="color"
          id="color"
          onChange={updateTextColor}
          value={settings.textColor}
        />
      </label>

      <label htmlFor="color">
        Link
        <input
          type="color"
          id="color"
          onChange={updateLinkColor}
          value={settings.linkColor}
        />
      </label>
    </div>
  );
};

export { SettingsContainer };
