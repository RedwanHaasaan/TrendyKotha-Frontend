import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ManageBlogClient from "@/components/dashboard/ManageBlogClient";

export default function ManageBlog(){
    return(
        <div className="min-h-screen bg-[#fdfbf8]">
            <DashboardHeader
                title="Manage Your Blogs"
                description="Track, update, and organize your content efficiently with complete control over your blog posts."
            />
        <ManageBlogClient/>
        </div>
    )
}