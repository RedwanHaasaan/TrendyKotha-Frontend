"use client"
import { useState } from 'react';

export default function EditorPlaceholder() {
    const [title, setTitle] = useState('');

    return (
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a title..."
                style={{ width: '100%', fontSize: 24, fontWeight: 600, padding: '8px 12px', border: '1px solid #e6e6e6', borderRadius: 6, marginBottom: 12 }}
            />

            <div style={{ minHeight: 420, border: '1px dashed #e2e2e2', borderRadius: 6, padding: 16 }}>
                <p style={{ color: '#777' }}>EditorJS will be integrated here. This is a placeholder area for the rich text editor.</p>
            </div>
        </div>
    );
}
