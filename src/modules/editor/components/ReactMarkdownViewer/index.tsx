import { FC } from "react";
import ReactMarkdown from "react-markdown";
import { useContainerPaddings } from "~/modules/theme/hooks/useContainerPaddings";
import styles from "./styles.module.scss";
import { Button } from "~/components/buttons/Button";
import { useTranslation } from "react-i18next";

interface ReactMarkdownViewerProps {
  value: string;
  startEditing: () => void;
}

const ReactMarkdownViewer: FC<ReactMarkdownViewerProps> = ({
  value,
  startEditing,
}) => {
  const { t } = useTranslation();
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
          {t("Edit")}
        </Button>
      </div>

      <div className={styles.content}>
        <ReactMarkdown>{value}</ReactMarkdown>
      </div>
    </div>
  );
};

export { ReactMarkdownViewer };
