import { DockviewReact, IDockviewPanelProps } from "dockview";
import { useGridLayoutPersistance } from "./hooks/useGridLayoutPersistance";
import { FC, createElement, useCallback, useEffect, useMemo } from "react";
import { GridLayoutComponentProps } from "../../types";
import { GridLayoutItemWrapper } from "../GridLayoutItemWrapper";
import { splitLayoutVertical } from "./utils/splitLayoutVertical";
import { splitLayoutHorizontal } from "./utils/splitLayoutHorizontal";
import styles from "./styles.module.scss";

export interface GridLayoutProps {
  component: FC<GridLayoutComponentProps>;
}

interface DefaultLayoutProps {
  panelProps: IDockviewPanelProps<{ title: string; locked?: boolean }>;
  component: FC<GridLayoutComponentProps>;
  persistLayout: () => void;
}

const DefaultLayout = ({
  component,
  panelProps,
  persistLayout,
}: DefaultLayoutProps) => {
  const splitVertical = useCallback(() => {
    splitLayoutVertical(panelProps.api.id, panelProps.containerApi);
  }, [panelProps.api.id, panelProps.containerApi]);

  const splitHorizontal = useCallback(() => {
    splitLayoutHorizontal(panelProps.api.id, panelProps.containerApi);
  }, [panelProps.api.id, panelProps.containerApi]);

  const remove = useCallback(() => {
    panelProps.api.close();
  }, [panelProps.api]);

  const locked = Boolean(panelProps.params.locked);

  const lock = useCallback(() => {
    panelProps.api.updateParameters({
      ...panelProps.params,
      locked: !locked,
    });
  }, [locked, panelProps.api, panelProps.params]);

  useEffect(() => {
    persistLayout();
  }, [locked, persistLayout]);

  return (
    <GridLayoutItemWrapper
      splitVertical={splitVertical}
      splitHorizontal={splitHorizontal}
      remove={remove}
      locked={locked}
      lock={lock}
    >
      {createElement(component, {
        id: panelProps.api.id,
        title: panelProps.params.title,
        locked,
      })}
    </GridLayoutItemWrapper>
  );
};

export const GridLayout: FC<GridLayoutProps> = ({ component }) => {
  const { onReady, persistLayout } = useGridLayoutPersistance();

  const components = useMemo(
    () => ({
      default: (props: IDockviewPanelProps<{ title: string }>) => (
        <DefaultLayout
          panelProps={props}
          component={component}
          persistLayout={persistLayout}
        />
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
