import { ColorSettings } from "~/modules/settings/context/SettingsContext";

export interface CustomTheme {
  title: string;
  url?: string;
  colors: ColorSettings;
}
