import { FC, Suspense, lazy } from "react";
import { SimpleTextareaEditor } from "../../components/SimpleTextareaEditor";
import { MarkdownViewer } from "../../components/MarkdownViewer";
import { usePersistedValue } from "./hooks/usePersistedValue";
import styles from "./styles.module.scss";
import { useSettings } from "~/modules/settings/context/SettingsContext";
import { EmptyViewer } from "../../components/EmptyViewer";
import { EditorWrapper } from "../../components/EditorWrapper";

interface MarkdownEditorContainerProps {
  id: string;
  locked: boolean;
  startEditing: VoidCallback;
  remove: VoidCallback;
}

const RichEditor = lazy(() =>
  import("../../components/RemirrorEditor").then((module) => ({
    default: module.RemirrorEditor,
  }))
);

export const MarkdownEditorContainer: FC<MarkdownEditorContainerProps> = ({
  id,
  locked,
  startEditing,
  remove,
}) => {
  const {
    settings: { richEditorEnabled },
  } = useSettings();

  const { value, setValue, hydrated } = usePersistedValue(
    id,
    "MarkdownEditorContainer"
  );

  const empty = !value.trim();

  const viewer = empty ? (
    <EmptyViewer startEditing={startEditing} />
  ) : (
    <MarkdownViewer value={value} startEditing={startEditing} />
  );

  const editor = (
    <EditorWrapper save={startEditing} remove={remove}>
      {richEditorEnabled ? (
        <RichEditor value={value} onChange={setValue} locked={locked} />
      ) : (
        <SimpleTextareaEditor
          value={value}
          onChange={setValue}
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
