import DashboardHeader from "@/components/dashboard/DashboardHeader";
import EditorPlaceholder from "@/components/dashboard/EditorPlaceholder";
import WriteBlogSidebar from "@/components/dashboard/WriteBlogSidebar";

export default function WriteBlogPage() {
    return (
        <div className="write-blog-page" style={{ padding: 20 }}>
            <DashboardHeader
                title="Write Blog"
                description="Share your story with the world"
            />

            <div style={{ display: 'flex', gap: 24, marginTop: 20 }}>
                {/* Left: Editor area (will host EditorJS) */}
                <main style={{ flex: 1, minWidth: 0 }}>
                    <EditorPlaceholder />
                </main>

                {/* Right: Sidebar for settings, tags, thumbnail, publish */}
                <aside style={{ width: 360 }}>
                    <WriteBlogSidebar />
                </aside>
            </div>
        </div>
    );
}