import { FC, useCallback } from "react";

import {
  FloatingToolbar,
  Remirror,
  useRemirror,
  EditorComponent,
  HeadingLevelButtonGroup,
  FormattingButtonGroup,
} from "@remirror/react";
import jsx from "refractor/lang/jsx.js";
import typescript from "refractor/lang/typescript.js";
import { Extension, ExtensionPriority, RemirrorEventListener } from "remirror";
import {
  BlockquoteExtension,
  UnderlineExtension,
  BoldExtension,
  BulletListExtension,
  CodeBlockExtension,
  CodeExtension,
  HardBreakExtension,
  HeadingExtension,
  ItalicExtension,
  LinkExtension,
  ListItemExtension,
  MarkdownExtension,
  OrderedListExtension,
  StrikeExtension,
  TableExtension,
  TrailingNodeExtension,
  GapCursorExtension,
} from "remirror/extensions";
import styles from "./styles.module.scss";

interface RemirrorEditorProps {
  locked: boolean;
  value?: string;
  onChange?: (val: string) => void;
}

const RemirrorEditor: FC<RemirrorEditorProps> = ({
  value,
  locked,
  onChange,
}) => {
  const { manager, state, setState } = useRemirror({
    extensions,
    builtin: {
      exitMarksOnArrowPress: false,
    },
    content: value,
    stringHandler: "markdown",
  });

  const onStateChange = useCallback<RemirrorEventListener<Extension>>(
    ({ state, helpers }) => {
      if (helpers && onChange) {
        onChange(helpers.getMarkdown(state));
      }

      setState(state);
    },
    [onChange, setState]
  );

  return (
    <Remirror
      placeholder="Start typing..."
      manager={manager}
      classNames={[styles.editor]}
      editable={!locked}
      onChange={onStateChange}
      state={state}
    >
      <EditorComponent />
      {!locked && (
        <FloatingToolbar>
          <FormattingButtonGroup />
          <HeadingLevelButtonGroup />
        </FloatingToolbar>
      )}
    </Remirror>
  );
};

const extensions = (): Extension[] => [
  new LinkExtension({ autoLink: true }),
  new BoldExtension(),
  new UnderlineExtension(),
  new StrikeExtension(),
  new ItalicExtension(),
  new HeadingExtension(),
  new BlockquoteExtension(),
  new BulletListExtension({ enableSpine: false }),
  new OrderedListExtension(),
  new ListItemExtension({
    priority: ExtensionPriority.High,
    // enableCollapsible: true,
  }),
  new CodeExtension(),
  new CodeBlockExtension({ supportedLanguages: [jsx, typescript] }),
  new TrailingNodeExtension(),
  new TableExtension(),
  new MarkdownExtension({ copyAsMarkdown: true }),
  new GapCursorExtension(),
  new HardBreakExtension(),
];

export { RemirrorEditor };
