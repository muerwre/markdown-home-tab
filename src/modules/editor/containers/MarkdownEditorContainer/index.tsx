import { FC } from "react";
import { ReactMarkdownEditor } from "../../components/ReactMarkdownEditor";
import { ReactMarkdownViewer } from "../../components/ReactMarkdownViewer";
import { usePersistedValue } from "./hooks/usePersistedValue";
import styles from "./styles.module.scss";

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
      {/*
      locked ? (
        <ReactMarkdownViewer value={value} />
      ) : (
        <ReactMarkdownEditor value={value} onChange={setValue} />
      )
      */}
      {locked ? (
        <ReactMarkdownViewer value={value} />
      ) : (
        <ReactMarkdownEditor value={value} onChange={setValue} />
        // <RemirrorEditor value={value} onChange={setValue} locked={locked} />
      )}
    </div>
  );
};
