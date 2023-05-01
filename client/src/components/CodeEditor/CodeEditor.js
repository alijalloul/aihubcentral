import React, { useEffect, useRef } from "react";
import {basicSetup} from "codemirror"
import { EditorView } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";

import "./CodeEditor.css";

export const CodeEditor = ({ code }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    const view = new EditorView({
      doc: code,
      extensions: [basicSetup, javascript()],
      parent: editorRef.current,
    });

    return () => {
      view.destroy();
    };
  }, [code]);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.editor.setValue(code);
    }
  }, [code]);

  return <div className=" bg-gray-900" ref={editorRef} />;
};