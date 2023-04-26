import { FC, PropsWithChildren } from "react";
import styles from "./styles.module.scss";
import { Button } from "~/components/buttons/Button";

interface EditorWrapperProps extends PropsWithChildren {
  save: () => void;
  remove: () => void;
}

const EditorWrapper: FC<EditorWrapperProps> = ({ children, save, remove }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>{children}</div>

      <div className={styles.panel}>
        <Button onClick={remove} role="button" size="small" variant="outline">
          Delete
        </Button>

        <div className={styles.filler} />

        <Button onClick={save} role="button" size="small">
          Save
        </Button>
      </div>
    </div>
  );
};

export { EditorWrapper };
