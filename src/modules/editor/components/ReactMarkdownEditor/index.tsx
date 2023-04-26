import { ChangeEvent, FC, useCallback, useMemo } from "react";
import styles from "./styles.module.scss";
import { useTheme } from "~/modules/theme/context/ThemeContext";

interface ReactMarkdownEditorProps {
  value: string;
  onChange: (val: string) => void;
}

const ReactMarkdownEditor: FC<ReactMarkdownEditorProps> = ({
  value,
  onChange,
}) => {
  const changeHandler = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  const { paddingHorizontal, paddingVertical } = useTheme();

  const style = useMemo(
    () => ({
      padding: `${paddingVertical}px ${paddingHorizontal}px`,
    }),
    [paddingHorizontal, paddingVertical]
  );

  return (
    <textarea
      onChange={changeHandler}
      className={styles.textarea}
      style={style}
      placeholder="Start typing here..."
      value={value}
    />
  );
};

export { ReactMarkdownEditor };
