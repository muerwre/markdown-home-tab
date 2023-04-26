import { FC } from "react";
import styles from "./styles.module.scss";
import { useContainerPaddings } from "~/modules/theme/hooks/useContainerPaddings";
import { Button } from "~/components/buttons/Button";

interface EmptyViewerProps {
  startEditing?: () => void;
}

const EmptyViewer: FC<EmptyViewerProps> = ({ startEditing }) => {
  const style = useContainerPaddings();

  return (
    <div className={styles.empty} style={style}>
      <div className={styles.title}>Nothing's here</div>
      <div>
        <Button
          onClick={startEditing}
          role="button"
          variant="outline"
          size="small"
        >
          Edit it
        </Button>
      </div>
    </div>
  );
};
export { EmptyViewer };
