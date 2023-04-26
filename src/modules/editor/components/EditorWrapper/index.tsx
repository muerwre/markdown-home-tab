import { FC, PropsWithChildren } from "react";
import styles from "./styles.module.scss";
import { Button } from "~/components/buttons/Button";
import { useContainerPaddings } from "~/modules/theme/hooks/useContainerPaddings";

interface EditorWrapperProps extends PropsWithChildren {
  onSave: () => void;
}

const EditorWrapper: FC<EditorWrapperProps> = ({ children, onSave }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>{children}</div>

      <div className={styles.panel}>
        <div className={styles.filler} />
        <Button onClick={onSave} role="button" size="small">
          Save
        </Button>
      </div>
    </div>
  );
};

export { EditorWrapper };
