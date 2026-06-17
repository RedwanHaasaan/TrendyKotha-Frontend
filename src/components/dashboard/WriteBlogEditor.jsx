"use client";
import { useRef, useState } from "react";
import EditorPlaceholder from "./EditorPlaceholder";
import WriteBlogSidebar from "./WriteBlogSidebar";
import { uploadEditorImage } from "@/helper/uploadEditorImage";
import { createPost } from "@/services/postService";
import toast from "react-hot-toast";

export default function WriteBlogEditor() {
  const editorRef = useRef(null);
  const fileRef = useRef(null);
  //states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Programming");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [cover, setCover] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isFeatured,setIsFeatured] = useState(false)
  //functions
  const handlePublish = async () => {
    const content = await editorRef.current.save();
    const blogData = {
      title,
      status:"published",
      category,
      tags,
      coverImage: cover.url,
      isFeatured,
      content,
    };
    const result = await createPost(blogData);
    toast.success(`${result.message}`)
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

  const onFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setCover({ file, url: URL.createObjectURL(file) });
      const result = await uploadEditorImage(file);

      setCover({
        url: result.file.url,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
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
          uploading={uploading}
          isFeatured={isFeatured}
          setIsFeatured={setIsFeatured}
        />
      </aside>
    </div>
  );
}
