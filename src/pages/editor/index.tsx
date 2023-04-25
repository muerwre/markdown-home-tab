import { FC } from "react";
import { GridLayout } from "~/modules/layout/components/GridLayout";
import { MarkdownEditorContainer } from "~/modules/editor/containers/MarkdownEditorContainer/index";

const Editor: FC = () => <GridLayout component={MarkdownEditorContainer} />;

export { Editor };
