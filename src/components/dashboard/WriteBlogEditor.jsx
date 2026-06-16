"use client"
import { useRef } from "react";
import EditorPlaceholder from "./EditorPlaceholder";
import WriteBlogSidebar from "./WriteBlogSidebar";

export default function WriteBlogEditor(){
    const editorRef = useRef(null);
    const handlePublish = async () => {
        const content = await editorRef.current.save();
        console.log(content)
      };
    return(
        <div className="flex gap-6 mt-5">
        <main className="flex-1 min-w-0">
            <EditorPlaceholder editorRef={editorRef} />
        </main>

        <aside className="w-[360px]">
            <WriteBlogSidebar handlePublish={handlePublish}/>
        </aside>
    </div>
    )
}