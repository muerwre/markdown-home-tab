import { FC } from "react";
import styles from "./styles.module.scss";
import { useContainerPaddings } from "~/modules/theme/hooks/useContainerPaddings";

interface EmptyViewerProps {
  startEditing?: () => void;
}

const EmptyViewer: FC<EmptyViewerProps> = ({ startEditing }) => {
  const style = useContainerPaddings();

  return (
    <div className={styles.empty} style={style}>
      <div className={styles.title}>Nothing's here</div>
      <div>
        <small>
          <a href="javascript:void();" onClick={startEditing}>
            start editing
          </a>
        </small>
      </div>
    </div>
  );
};
export { EmptyViewer };
