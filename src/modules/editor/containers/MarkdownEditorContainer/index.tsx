import { FC, Suspense, lazy } from "react";
import { ReactMarkdownEditor } from "../../components/ReactMarkdownEditor";
import { ReactMarkdownViewer } from "../../components/ReactMarkdownViewer";
import { usePersistedValue } from "./hooks/usePersistedValue";
import styles from "./styles.module.scss";
import { useSettings } from "~/modules/settings/context/SettingsContext";
import { EmptyViewer } from "../../components/EmptyViewer";

interface MarkdownEditorContainerProps {
  id: string;
  locked: boolean;
  startEditing: () => void;
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
}) => {
  const {
    settings: { richEditorEnabled },
  } = useSettings();

  const [value, setValue] = usePersistedValue(id, "MarkdownEditorContainer");

  const empty = !value.trim();

  const viewer = empty ? (
    <EmptyViewer startEditing={startEditing} />
  ) : (
    <ReactMarkdownViewer value={value} />
  );

  const editor = richEditorEnabled ? (
    <RichEditor value={value} onChange={setValue} locked={locked} />
  ) : (
    <ReactMarkdownEditor value={value} onChange={setValue} />
  );
  return (
    <div className={styles.editor}>
      <Suspense>{locked ? viewer : editor}</Suspense>
    </div>
  );
};
