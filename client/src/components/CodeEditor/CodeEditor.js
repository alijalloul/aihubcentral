import React, { useEffect, useRef } from "react";
import {basicSetup, EditorView} from "codemirror"
import { javascript } from "@codemirror/lang-javascript";

import "./CodeEditor.css";

export const CodeEditor = (props) => {
  const editorRef = useRef(null);

  // useEffect(() => {
  //   const view = new EditorView({
  //     doc: props.code,
  //     extensions: [basicSetup, javascript()],
  //     parent: editorRef.current,
  //   });

  //   return () => {
  //     view.destroy();
  //   };
  // }, [props.code]);

  // const view = new EditorView({
  //   doc: props.code,
  //   extensions: [basicSetup, javascript()],
  //   parent: editorRef.current,
  // });

  return <div className="bg-gray-900" ref={editorRef} />;
};
