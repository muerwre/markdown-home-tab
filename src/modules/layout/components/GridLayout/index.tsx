import { DockviewReact, IDockviewPanelProps } from "dockview";
import { useGridLayoutPersistance } from "./hooks/useGridLayoutPersistance";
import { FC, createElement, useMemo } from "react";
import { GridLayoutComponentProps } from "../../types";

export interface GridLayoutProps {
  component: FC<GridLayoutComponentProps>;
}

export const GridLayout: FC<GridLayoutProps> = ({ component }) => {
  const { onReady } = useGridLayoutPersistance();

  const components = useMemo(
    () => ({
      default: (props: IDockviewPanelProps<{ title: string }>) => {
        return createElement(component, {
          id: props.api.id,
          title: props.params.title,
        });
      },
    }),
    [component]
  );

  return (
    <DockviewReact
      components={components}
      onReady={onReady}
      className="dockview-theme-abyss"
    />
  );
};
