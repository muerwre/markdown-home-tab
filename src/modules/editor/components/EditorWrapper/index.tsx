import { FC, PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "~/components/buttons/Button";
import styles from "./styles.module.scss";

interface EditorWrapperProps extends PropsWithChildren {
  save: () => void;
  remove: () => void;
}

const EditorWrapper: FC<EditorWrapperProps> = ({ children, save, remove }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>{children}</div>

      <div className={styles.panel}>
        <Button onClick={remove} role="button" size="small" variant="outline">
          {t("Delete")}
        </Button>

        <div className={styles.filler} />

        <Button onClick={save} role="button" size="small">
          {t("Save")}
        </Button>
      </div>
    </div>
  );
};

export { EditorWrapper };
