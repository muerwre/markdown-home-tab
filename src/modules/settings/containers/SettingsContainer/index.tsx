import { FC } from "react";

const SettingsContainer: FC = () => (
  <div>
    <label htmlFor="color">
      <input type="color" id="color" />
      Sample color switch
    </label>
  </div>
);

export { SettingsContainer };
