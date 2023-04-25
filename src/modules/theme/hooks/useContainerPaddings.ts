import { useMemo } from "react";
import { useTheme } from "~/modules/theme/context/ThemeContext";
export const useContainerPaddings = () => {
  const { paddingHorizontal, paddingVertical } = useTheme();

  return useMemo(
    () => ({
      padding: `${paddingVertical}px ${paddingHorizontal}px`,
    }),
    [paddingHorizontal, paddingVertical]
  );
};
