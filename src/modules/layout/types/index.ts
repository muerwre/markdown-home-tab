export interface GridLayoutComponentProps {
  id: string;
  title: string;
  locked: boolean;
  startEditing: () => void;
  remove: () => void;
}
