import { MilkdownProvider } from "@milkdown/react";
import { FC } from "react";
import { MarkdownEditor } from "../../components/MarkdownEditor";
import styles from "./styles.module.scss";
import { usePersistedValue } from "./hooks/usePersistedValue";

interface MarkdownEditorContainerProps {
  id: string;
}

export const MarkdownEditorContainer: FC<MarkdownEditorContainerProps> = ({
  id,
}) => {
  const [value, setValue] = usePersistedValue(id, "MarkdownEditorContainer");

  return (
    <div className={styles.editor}>
      <MilkdownProvider>
        <MarkdownEditor value={value} onChange={setValue} />
      </MilkdownProvider>
    </div>
  );
};
