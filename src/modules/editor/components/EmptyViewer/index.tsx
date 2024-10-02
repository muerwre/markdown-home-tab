import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "~/components/buttons/Button";
import { useContainerPaddings } from "~/modules/theme/hooks/useContainerPaddings";
import styles from "./styles.module.scss";

interface EmptyViewerProps {
  startEditing?: () => void;
}

const EmptyViewer: FC<EmptyViewerProps> = ({ startEditing }) => {
  const style = useContainerPaddings();
  const { t } = useTranslation();

  return (
    <div className={styles.empty} style={style} onDoubleClick={startEditing}>
      <div className={styles.title}>{t(`Nothing's here yet`)}</div>
      <div>
        <Button
          onClick={startEditing}
          role="button"
          variant="outline"
          size="small"
        >
          {t("Edit")}
        </Button>
      </div>
    </div>
  );
};
export { EmptyViewer };
