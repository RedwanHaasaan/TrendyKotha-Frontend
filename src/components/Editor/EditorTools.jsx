import Paragraph from "@editorjs/paragraph";
import Quote from "@cychann/editorjs-quote";
import TextStyle from "@skchawala/editorjs-text-style";
import Header from "@editorjs/header";
export const EDITOR_TOOLS = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  header: {
    class: Header,
    inlineToolbar: true,
    shortcut: "CMD+SHIFT+H",
  },

  quote: {
    class: Quote,
    inlineToolbar: true,
  },

  marker: {
    class: TextStyle,
    inlineToolbar: true,
    config: {
      tag: "mark",
    },
  },
};