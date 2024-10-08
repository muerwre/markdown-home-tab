import { FC, Suspense, useCallback } from "react";
import { EditorWrapper } from "../../components/EditorWrapper";
import { EmptyViewer } from "../../components/EmptyViewer";
import { MarkdownViewer } from "../../components/MarkdownViewer";
import { SimpleTextareaEditor } from "../../components/SimpleTextareaEditor";
import styles from "./styles.module.scss";
import { useStorage } from "../../../../modules/storage/StorageContext";
import { HyperEditor } from "../../components/HyperEditor";

interface MarkdownEditorContainerProps {
  id: string;
  locked: boolean;
  startEditing: VoidCallback;
  remove: VoidCallback;
}

const enableCoolEditor = true;

export const MarkdownEditorContainer: FC<MarkdownEditorContainerProps> = ({
  id,
  locked,
  startEditing,
  remove,
}) => {
  const { panels, setPanel, hydrated } = useStorage();

  const value = panels[id] ?? "";
  const empty = !value.trim();

  const onChange = useCallback(
    (val: string) => setPanel(id, val),
    [id, setPanel]
  );

  const viewer = empty ? (
    <EmptyViewer startEditing={startEditing} />
  ) : (
    <MarkdownViewer value={value} startEditing={startEditing} />
  );

  const editor = (
    <EditorWrapper save={startEditing} remove={remove}>
      {enableCoolEditor ? (
        <HyperEditor value={value} onChange={onChange} />
      ) : (
        <SimpleTextareaEditor
          value={value}
          onChange={onChange}
          save={startEditing}
        />
      )}
    </EditorWrapper>
  );

  return (
    <div className={styles.editor} id={id}>
      {hydrated && <Suspense>{locked ? viewer : editor}</Suspense>}
    </div>
  );
};
