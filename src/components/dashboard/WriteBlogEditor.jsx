"use client";
import { useRef, useState } from "react";
import EditorPlaceholder from "./EditorPlaceholder";
import WriteBlogSidebar from "./WriteBlogSidebar";

export default function WriteBlogEditor() {
  const editorRef = useRef(null);
  const fileRef = useRef(null);
  //states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Programming");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [cover, setCover] = useState(null);

  //functions
  const handlePublish = async () => {
    const content = await editorRef.current.save();
    console.log(content);
    console.log(title);
    console.log(tags);
    console.log(cover);
  };

  const addTagFromInput = () => {
    const raw = tagInput.trim();
    if (!raw) return;
    const parts = raw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const next = Array.from(new Set([...tags, ...parts]));
    setTags(next);
    setTagInput("");
  };

  const removeTag = (t) => {
    setTags(tags.filter((x) => x !== t));
  };

  const onFileChange = (e) => {
    const f = e.target.files && e.target.files[0];
    if (f) setCover({ file: f, url: URL.createObjectURL(f) });
  };
  return (
    <div className="flex gap-6 mt-5">
      <main className="flex-1 min-w-0">
        <EditorPlaceholder
          editorRef={editorRef}
          title={title}
          setTitle={setTitle}
        />
      </main>

      <aside className="w-[360px]">
        <WriteBlogSidebar 
            handlePublish={handlePublish}
            category={category} 
            setCategory={setCategory}
            tags={tags}
            removeTag={removeTag}
            tagInput={tagInput}
            setTagInput={setTagInput}
            addTagFromInput={addTagFromInput}
            fileRef={fileRef}
            cover={cover}
            onFileChange={onFileChange}
        />
      </aside>
    </div>
  );
}
