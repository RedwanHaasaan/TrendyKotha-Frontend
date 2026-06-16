import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import Quote from "@cychann/editorjs-quote";

import List from "@editorjs/list";
import NestedList from "@editorjs/nested-list";

import Checklist from "@editorjs/checklist";
import NestedChecklist from "@calumk/editorjs-nested-checklist";

import Table from "@editorjs/table";

import CodeFlask from "@calumk/editorjs-codeflask";

import Marker from "@editorjs/marker";
import Underline from "@editorjs/underline";

import ImageTool from "@editorjs/image";
import LinkTool from "@editorjs/link";

export const EDITOR_TOOLS = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },

  header: {
    class: Header,
    inlineToolbar: true,
    shortcut: "CMD+SHIFT+H",
    config: {
      levels: [1, 2, 3, 4, 5, 6],
      defaultLevel: 2,
    },
  },

  quote: {
    class: Quote,
    inlineToolbar: true,
  },

  list: {
    class: List,
    inlineToolbar: true,
  },

  nestedList: {
    class: NestedList,
    inlineToolbar: true,
  },

  checklist: {
    class: Checklist,
    inlineToolbar: true,
  },

  nestedChecklist: {
    class: NestedChecklist,
    inlineToolbar: true,
  },

  table: {
    class: Table,
    inlineToolbar: true,
  },

  codeFlask: {
    class: CodeFlask,
  },

  marker: {
    class: Marker,
    shortcut: "CMD+SHIFT+M",
  },

  underline: {
    class: Underline,
    inlineToolbar: true,
  },

  linkTool: {
    class: LinkTool,
    config: {
      endpoint: "/api/editor/link",
    },
  },

  image: {
    class: ImageTool,
    config: {
      endpoints: {
        byFile: "/api/editor/upload-image",
        byUrl: "/api/editor/fetch-image",
      },
    },
  },
};