const DashboardHeader = ({ title, description }) => {
    return (
        <>
            {/* Header */}
            <div className="bg-linear-to-r from-[#f8f3eb] to-[#f0e4d4] border-b border-[#e5ddd0] p-6 md:p-8">
                <h1 className="text-3xl md:text-4xl font-bold text-[#4d3b2a] font-serif">
                    {title}
                </h1>
                <p className="text-[#5b4a3a] mt-2">
                    {description}
                </p>
            </div>
        </>
    )
}
export default DashboardHeader;