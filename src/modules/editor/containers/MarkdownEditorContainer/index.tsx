import { FC } from "react";
import styles from "./styles.module.scss";
import { usePersistedValue } from "./hooks/usePersistedValue";
import { RemirrorEditor } from "../../components/RemirrorEditor";

interface MarkdownEditorContainerProps {
  id: string;
  locked: boolean;
}

export const MarkdownEditorContainer: FC<MarkdownEditorContainerProps> = ({
  id,
  locked,
}) => {
  const [value, setValue] = usePersistedValue(id, "MarkdownEditorContainer");

  return (
    <div className={styles.editor}>
      <RemirrorEditor value={value} onChange={setValue} locked={locked} />
    </div>
  );
};
