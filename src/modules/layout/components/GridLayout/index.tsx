import { DockviewReact, IDockviewPanelProps } from "dockview";
import { useGridLayoutPersistance } from "./hooks/useGridLayoutPersistance";
import { FC, createElement, useCallback, useMemo } from "react";
import { GridLayoutComponentProps } from "../../types";
import { GridLayoutItemWrapper } from "../GridLayoutItemWrapper";
import { splitLayoutVertical } from "./utils/splitLayoutVertical";
import { splitLayoutHorizontal } from "./utils/splitLayoutHorizontal";
import styles from "./styles.module.scss";

export interface GridLayoutProps {
  component: FC<GridLayoutComponentProps>;
}

interface DefaultLayoutProps {
  panelProps: IDockviewPanelProps<{ title: string }>;
  component: FC<GridLayoutComponentProps>;
}
const DefaultLayout = ({ component, panelProps }: DefaultLayoutProps) => {
  const splitVertical = useCallback(() => {
    splitLayoutVertical(panelProps.api.id, panelProps.containerApi);
  }, [panelProps.api.id, panelProps.containerApi]);

  const splitHorizontal = useCallback(() => {
    splitLayoutHorizontal(panelProps.api.id, panelProps.containerApi);
  }, [panelProps.api.id, panelProps.containerApi]);

  const remove = useCallback(() => {
    panelProps.api.close();
  }, [panelProps.api]);

  return (
    <GridLayoutItemWrapper
      splitVertical={splitVertical}
      splitHorizontal={splitHorizontal}
      remove={remove}
    >
      {createElement(component, {
        id: panelProps.api.id,
        title: panelProps.params.title,
      })}
    </GridLayoutItemWrapper>
  );
};

export const GridLayout: FC<GridLayoutProps> = ({ component }) => {
  const { onReady } = useGridLayoutPersistance();

  const components = useMemo(
    () => ({
      default: (props: IDockviewPanelProps<{ title: string }>) => (
        <DefaultLayout panelProps={props} component={component} />
      ),
    }),
    [component]
  );

  return (
    <DockviewReact
      components={components}
      onReady={onReady}
      className={styles.layout}
    />
  );
};
