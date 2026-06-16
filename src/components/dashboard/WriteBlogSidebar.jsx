"use client"
import Image from 'next/image';
import { useState, useRef } from 'react';

export default function WriteBlogSidebar({handlePublish}) {
    const [category, setCategory] = useState('Essays');
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState([]);
    const [cover, setCover] = useState(null);
    const fileRef = useRef(null);


    function addTagFromInput() {
        const raw = tagInput.trim();
        if (!raw) return;
        const parts = raw.split(',').map(t => t.trim()).filter(Boolean);
        const next = Array.from(new Set([...tags, ...parts]));
        setTags(next);
        setTagInput('');
    }

    function removeTag(t) {
        setTags(tags.filter(x => x !== t));
    }

    function onFileChange(e) {
        const f = e.target.files && e.target.files[0];
        if (f) setCover({ file: f, url: URL.createObjectURL(f) });
    }

    return (
        <div className="bg-white rounded-lg p-[18px] shadow-sm">
            <h3 className="m-0 mb-3">Blog Settings</h3>

            <div className="mb-3">
                <label className="block text-xs text-gray-500 mb-1.5">CATEGORY</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full py-2 px-2.5 rounded-md border border-gray-200">
                    <option>News</option>
                    <option>Tutorial</option>
                    <option>Opinion</option>
                    <option>Review</option>
                    <option>Programming</option>
                    <option>AI</option>
                    <option>Cybersecurity</option>
                    <option>Startups</option>
                </select>
            </div>

            <div className="mb-3">
                <label className="block text-xs text-gray-500 mb-1.5">TAGS</label>
                <div className="flex gap-2 mb-2 flex-wrap">
                    {tags.map(t => (
                        <button key={t} onClick={() => removeTag(t)} className="bg-[#f3e9df] border-none py-1.5 px-2.5 rounded-full cursor-pointer">{t} ✕</button>
                    ))}
                </div>

                <div className="flex gap-2">
                    <input
                        placeholder="Add tags separated by commas"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTagFromInput(); } }}
                        className="flex-1 py-2 px-2.5 rounded-md border border-gray-200"
                    />
                    <button onClick={addTagFromInput} className="py-2 px-3 rounded-md bg-primary text-white cursor-pointer">Add</button>
                </div>
            </div>

            <div className="mb-3.5">
                <label className="block text-xs text-gray-500 mb-1.5">FEATURED COVER</label>

                <div className="border border-dashed border-gray-300 rounded-lg p-3.5 text-center cursor-pointer" onClick={() => fileRef.current && fileRef.current.click()}>
                    {cover ? (
                        <Image src={cover.url} alt="cover" width={100} height={100} className="max-w-full rounded-md" />
                    ) : (
                        <div className="text-gray-400">Click to upload or drag an image here</div>
                    )}
                    <input ref={fileRef} type="file" accept="image/*" onChange={onFileChange} className="hidden" />
                </div>
            </div>

            <div className="flex flex-col gap-2.5">
                <button onClick={handlePublish} className="bg-[#5d3911] text-white py-2.5 px-3 rounded-lg border-none cursor-pointer">Publish to Archives</button>
                <button className="bg-[#f6f3ee] text-gray-700 py-2.5 px-3 rounded-lg border border-gray-200 cursor-pointer">Save as Draft</button>
            </div>
        </div>
    );
}
