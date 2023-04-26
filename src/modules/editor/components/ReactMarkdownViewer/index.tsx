import { FC } from "react";
import ReactMarkdown from "react-markdown";
import { useContainerPaddings } from "~/modules/theme/hooks/useContainerPaddings";
import styles from "./styles.module.scss";
import { Button } from "~/components/buttons/Button";

interface ReactMarkdownViewerProps {
  value: string;
  startEditing: () => void;
}

const ReactMarkdownViewer: FC<ReactMarkdownViewerProps> = ({
  value,
  startEditing,
}) => {
  const style = useContainerPaddings();

  return (
    <div style={style} className={styles.editor}>
      <div className={styles.edit}>
        <Button
          size="small"
          variant="outline"
          role="button"
          onClick={startEditing}
        >
          Edit
        </Button>
      </div>

      <div className={styles.content}>
        <ReactMarkdown>{value}</ReactMarkdown>
      </div>
    </div>
  );
};

export { ReactMarkdownViewer };
