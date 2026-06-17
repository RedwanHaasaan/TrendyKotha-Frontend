"use client";

export default function ManageBlogsFilters({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  totalPosts,
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5">
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        <input
          type="text"
          placeholder="Search articles..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="w-full lg:max-w-md px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none"
        />

        <div className="text-sm text-gray-500">
          Total Posts:
          <span className="ml-1 font-semibold text-primary">
            {totalPosts}
          </span>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3 items-center">
        {[
          {
            label: "All Posts",
            value: "all",
          },
          {
            label: "Published",
            value: "published",
          },
          {
            label: "Drafts",
            value: "draft",
          },
          {
            label: "Featured",
            value: "featured",
          },
        ].map((filter) => (
          <button
            key={filter.value}
            onClick={() =>
              setStatusFilter(
                filter.value
              )
            }
            className={`px-4 py-2 rounded-full text-sm ${
              statusFilter ===
              filter.value
                ? "bg-primary text-white"
                : "border border-gray-200"
            }`}
          >
            {filter.label}
          </button>
        ))}

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(
              e.target.value
            )
          }
          className="ml-auto px-4 py-2 rounded-xl border border-gray-200"
        >
          <option value="newest">
            Newest First
          </option>

          <option value="oldest">
            Oldest First
          </option>

          <option value="views-desc">
            Most Viewed
          </option>

          <option value="views-asc">
            Least Viewed
          </option>
        </select>
      </div>
    </div>
  );
}