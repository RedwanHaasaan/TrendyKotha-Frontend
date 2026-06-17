"use client"
import Editor from '../Editor/Editor';

export default function EditorPlaceholder({editorRef,title,setTitle}) {
    return (
        <div className="bg-white rounded-lg p-5 shadow-sm">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a title..."
                className="w-full text-xl font-medium py-2 px-3 rounded-md mb-3 border border-gray-200 transition-all duration-300 outline-none focus:outline-none"
            />

            <div className="min-h-[450px] border border-gray-200 rounded-md py-4">
                <Editor editorRef={editorRef}/>
            </div>
        </div>
    );
}
