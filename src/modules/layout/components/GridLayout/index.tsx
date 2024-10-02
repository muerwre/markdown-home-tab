import { DockviewReact, IDockviewPanelProps } from "dockview";
import { useGridLayoutPersistance } from "./hooks/useGridLayoutPersistance";
import { FC, createElement, useCallback, useEffect, useMemo } from "react";
import { GridLayoutComponentProps } from "../../types";
import { GridLayoutItemWrapper } from "../GridLayoutItemWrapper";
import { splitLayoutVertical } from "./utils/splitLayoutVertical";
import { splitLayoutHorizontal } from "./utils/splitLayoutHorizontal";
import styles from "./styles.module.scss";
import { useSettings } from "~/modules/settings/context/SettingsContext";

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
  const { show: showSettings } = useSettings();

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

    if (panelProps.params.locked) {
      setTimeout(() => {
        document
          .getElementById(panelProps.api.id)
          ?.querySelector("textarea")
          ?.focus();
      }, 0);
    }
  }, [locked, panelProps.api, panelProps.params]);

  useEffect(() => {
    persistLayout();
  }, [locked, persistLayout]);

  return (
    <GridLayoutItemWrapper
      splitVertical={splitVertical}
      splitHorizontal={splitHorizontal}
      showSettings={showSettings}
    >
      {createElement(component, {
        id: panelProps.api.id,
        title: panelProps.params.title,
        locked,
        startEditing: lock,
        remove,
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
    [component, persistLayout]
  );

  return (
    <DockviewReact
      components={components}
      onReady={onReady}
      className={styles.layout}
    />
  );
};
