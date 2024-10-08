import { useEffect, useRef } from "react";

import ReactCodeMirror from "react-codemirror";

import "codemirror/lib/codemirror.css";
import "hypermd/mode/hypermd.css";
import "./theme.scss";

import "codemirror/lib/codemirror";

import "codemirror/mode/javascript/javascript";
import "codemirror/mode/xml/xml";
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/gfm/gfm";

import "hypermd/core";
import "hypermd/mode/hypermd";

import "hypermd/addon/fold-link";
import "hypermd/addon/hide-token";
import "hypermd/addon/cursor-debounce";
import "hypermd/addon/fold";
import "hypermd/addon/read-link";
import "hypermd/addon/click";
import "hypermd/addon/hover";
import "hypermd/addon/paste";
import "hypermd/addon/insert-file";
import "hypermd/addon/mode-loader";
import "hypermd/addon/table-align";

import styles from "./styles.module.scss";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

const options: CodeMirror.EditorConfiguration = {
  mode: "hypermd",
  // mode: "gfm",
  theme: "hypermd-default",

  hmdFold: {
    image: true,
    link: true,
    math: true,
  },
  hmdHideToken: true,
  hmdCursorDebounce: true,
  hmdPaste: true,
  hmdClick: true,
  hmdHover: true,
  hmdTableAlign: true,
};

export const HyperEditor = ({ value, onChange }: Props) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  // useEffect(() => {
  //   if (!ref.current) {
  //     return;
  //   }

  //   const result = fromTextArea(ref.current);

  //   return () => switchToNormal(result);
  // }, []);

  return (
    <ReactCodeMirror
      value={value}
      onChange={onChange}
      // ref={ref}
      className={styles.wrapper}
      options={options}
    />
  );
};
