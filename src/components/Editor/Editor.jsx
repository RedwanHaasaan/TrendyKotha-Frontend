"use client";

import { useEffect} from "react";
import { EDITOR_TOOLS } from "./EditorTools";

export default function Editor({editorRef}) {


  useEffect(() => {
    let editor;

    const initEditor = async () => {
      const EditorJS = (await import("@editorjs/editorjs")).default;

      editor = new EditorJS({
        holder: "editorjs",
        placeholder: "Let's write an awesome story!",
        tools: EDITOR_TOOLS,
      });
      await editor.isReady;
      editorRef.current = editor;
    };

    initEditor();

    return () => {
      if (editorRef.current?.destroy) {
        editor?.current.destroy();
        editorRef.current = null;
      }
    };
  }, [editorRef]);


  return <div id="editorjs" className="px-10" />;
}