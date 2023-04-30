import React, { useEffect, useRef } from "react";
import {basicSetup, EditorView} from "codemirror"
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";

import "./CodeEditor.css";

export const CodeEditor = (props) => {
  const editorRef = useRef(null);

  useEffect(() => {
    const state = EditorState.create({
      doc: props.code,
      extensions: [basicSetup, javascript()],
    });

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    return () => {
      view.destroy();
    };
  }, [props.code]);

  return <div className="bg-gray-900" ref={editorRef} />;
};
