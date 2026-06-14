"use client"
import Image from 'next/image';
import { useState, useRef } from 'react';

export default function WriteBlogSidebar() {
    const [category, setCategory] = useState('Essays');
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState(['Persian Art', 'Calligraphy']);
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
        <div style={{ background: '#fff', borderRadius: 8, padding: 18, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <h3 style={{ margin: 0, marginBottom: 12 }}>Blog Settings</h3>

            <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', fontSize: 12, color: '#666', marginBottom: 6 }}>CATEGORY</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: 6 }}>
                    <option>Essays</option>
                    <option>News</option>
                    <option>Opinion</option>
                    <option>Tutorial</option>
                </select>
            </div>

            <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', fontSize: 12, color: '#666', marginBottom: 6 }}>TAGS</label>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                    {tags.map(t => (
                        <button key={t} onClick={() => removeTag(t)} style={{ background: '#f3e9df', border: 'none', padding: '6px 10px', borderRadius: 20, cursor: 'pointer' }}>{t} ✕</button>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                    <input
                        placeholder="Add tags separated by commas"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTagFromInput(); } }}
                        style={{ flex: 1, padding: '8px 10px', borderRadius: 6, border: '1px solid #e6e6e6' }}
                    />
                    <button onClick={addTagFromInput} style={{ padding: '8px 12px', borderRadius: 6 }}>Add</button>
                </div>
            </div>

            <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 12, color: '#666', marginBottom: 6 }}>FEATURED COVER</label>

                <div style={{ border: '1px dashed #ddd', borderRadius: 8, padding: 14, textAlign: 'center' }} onClick={() => fileRef.current && fileRef.current.click()}>
                    {cover ? (
                        <Image src={cover.url} alt="cover" width={100} height={100} style={{ maxWidth: '100%', borderRadius: 6 }} />
                    ) : (
                        <div style={{ color: '#999' }}>Click to upload or drag an image here</div>
                    )}
                    <input ref={fileRef} type="file" accept="image/*" onChange={onFileChange} style={{ display: 'none' }} />
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button style={{ background: '#5d3911', color: '#fff', padding: '10px 12px', borderRadius: 8, border: 'none', cursor: 'pointer' }}>Publish to Archives</button>
                <button style={{ background: '#f6f3ee', color: '#333', padding: '10px 12px', borderRadius: 8, border: '1px solid #e6e6e6', cursor: 'pointer' }}>Save as Draft</button>
            </div>
        </div>
    );
}
