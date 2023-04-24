import { FC } from "react";
import {
  Editor,
  rootCtx,
  defaultValueCtx,
  editorViewOptionsCtx,
} from "@milkdown/core";
import { Milkdown, useEditor } from "@milkdown/react";
import { commonmark } from "@milkdown/preset-commonmark";
import { listener, listenerCtx } from "@milkdown/plugin-listener";
import { clipboard } from "@milkdown/plugin-clipboard";

import styles from "./styles.module.scss";

interface MarkdownEditorProps {
  value?: string;
  onChange?: (val: string) => void;
}

export const MarkdownEditor: FC<MarkdownEditorProps> = ({
  value = "",
  onChange,
}) => {
  useEditor((root) =>
    Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root);
        ctx.set(defaultValueCtx, value);
        ctx.get(listenerCtx).markdownUpdated((_, markdown) => {
          onChange?.(markdown);
        });

        ctx.update(editorViewOptionsCtx, (prev) => ({
          ...prev,
          attributes: {
            class: styles.editor,
            spellcheck: "false",
          },
        }));
      })
      .use(commonmark)
      .use(listener)
      .use(clipboard)
  );

  return <Milkdown />;
};
