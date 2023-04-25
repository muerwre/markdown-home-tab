import { FC } from "react";
import ReactMarkdown from "react-markdown";
import { useContainerPaddings } from "~/modules/theme/hooks/useContainerPaddings";
import styles from "./styles.module.scss";

interface ReactMarkdownViewerProps {
  value: string;
}

const ReactMarkdownViewer: FC<ReactMarkdownViewerProps> = ({ value }) => {
  const style = useContainerPaddings();

  return (
    <div style={style} className={styles.editor}>
      <ReactMarkdown>{value}</ReactMarkdown>
    </div>
  );
};

export { ReactMarkdownViewer };
