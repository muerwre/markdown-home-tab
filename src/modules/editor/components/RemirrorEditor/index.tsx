import { FC, useCallback } from "react";

import {
  EditorComponent,
  FloatingToolbar,
  FormattingButtonGroup,
  HeadingLevelButtonGroup,
  Remirror,
  useRemirror,
} from "@remirror/react";
import { Extension, RemirrorEventListener } from "remirror";
import { useContainerPaddings } from "~/modules/theme/hooks/useContainerPaddings";
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
    // stringHandler: "markdown",
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

  const style = useContainerPaddings();

  return (
    <div className={styles.wrapper} style={style}>
      <Remirror
        placeholder="Start typing..."
        manager={manager}
        classNames={[styles.editor]}
        editable={!locked}
        onChange={onStateChange}
        state={state}
        autoFocus
      >
        <EditorComponent />
        {!locked && (
          <FloatingToolbar>
            <FormattingButtonGroup />
            <HeadingLevelButtonGroup />
          </FloatingToolbar>
        )}
      </Remirror>
    </div>
  );
};

const extensions = (): Extension[] => [
  // new LinkExtension({ autoLink: true }),
  // new BoldExtension(),
  // new UnderlineExtension(),
  // new StrikeExtension(),
  // new ItalicExtension(),
  // new HeadingExtension(),
  // new BlockquoteExtension(),
  // new BulletListExtension({ enableSpine: false }),
  // new OrderedListExtension(),
  // new ListItemExtension({
  //   priority: ExtensionPriority.High,
  //   // enableCollapsible: true,
  // }),
  // new CodeExtension(),
  // new CodeBlockExtension({ supportedLanguages: [jsx, typescript] }),
  // new TrailingNodeExtension(),
  // new TableExtension(),
  // new MarkdownExtension({ copyAsMarkdown: true }),
  // new GapCursorExtension(),
  // new HardBreakExtension(),
];

export { RemirrorEditor };
