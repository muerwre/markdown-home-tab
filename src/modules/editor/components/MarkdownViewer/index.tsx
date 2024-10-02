import { FC, useCallback, MouseEvent } from "react";
import ReactMarkdown from "react-markdown";
import { useContainerPaddings } from "~/modules/theme/hooks/useContainerPaddings";
import styles from "./styles.module.scss";
import { Button } from "~/components/buttons/Button";
import { useTranslation } from "react-i18next";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface Props {
  value: string;
  startEditing: () => void;
}

const MarkdownViewer: FC<Props> = ({ value, startEditing }) => {
  const { t } = useTranslation();
  const style = useContainerPaddings();

  const onDoubleClick = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      startEditing();
    },
    [startEditing]
  );

  return (
    <div style={style} className={styles.editor} onDoubleClick={onDoubleClick}>
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
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {value}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export { MarkdownViewer };
