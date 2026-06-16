import DashboardHeader from "@/components/dashboard/DashboardHeader";
import WriteBlogEditor from "@/components/dashboard/WriteBlogEditor";

export default function WriteBlogPage() {
    return (
        <div className="write-blog-page">
            <DashboardHeader
                title="Write Your Thoughts"
                description="Fill in the fields below to craft your blog post"
            />
            <WriteBlogEditor/>
        </div>
    );
}