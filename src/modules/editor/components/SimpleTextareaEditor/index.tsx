import { ChangeEvent, FC, useCallback, useMemo, KeyboardEvent } from "react";
import styles from "./styles.module.scss";
import { useTheme } from "~/modules/theme/context/ThemeContext";

interface ReactMarkdownEditorProps {
  value: string;
  onChange: (val: string) => void;
  save: VoidFunction;
}

const SimpleTextareaEditor: FC<ReactMarkdownEditorProps> = ({
  save,
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

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter" && event.ctrlKey) {
        save();
      }

      if (event.key === "Escape") {
        save();
      }
    },
    [save]
  );

  return (
    <textarea
      onKeyDown={onKeyDown}
      onChange={changeHandler}
      className={styles.textarea}
      style={style}
      placeholder="Start typing here..."
      value={value}
      rows={1}
    />
  );
};

export { SimpleTextareaEditor };
