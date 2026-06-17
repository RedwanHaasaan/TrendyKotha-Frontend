"use client";

import { useEffect, useState } from "react";

import { getMyPosts } from "@/services/postService";

import ManageBlogsFilters from "./ManageBlogsFilters";
import ManageBlogsTable from "./ManageBlogsTable";

export default function ManageBlogsClient() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("all");
  const [sortBy, setSortBy] =
    useState("newest");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data =
          await getMyPosts();

        if (data.success) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = [...posts]
    .filter((post) => {
      const matchesSearch =
        post.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        statusFilter === "all"
          ? true
          : statusFilter ===
            "featured"
          ? post.isFeatured
          : post.status ===
            statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return (
            new Date(a.createdAt) -
            new Date(b.createdAt)
          );

        case "views-desc":
          return b.views - a.views;

        case "views-asc":
          return a.views - b.views;

        default:
          return (
            new Date(b.createdAt) -
            new Date(a.createdAt)
          );
      }
    });

  return (
    <div className="p-2 space-y-5">
      <ManageBlogsFilters
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={
          setStatusFilter
        }
        sortBy={sortBy}
        setSortBy={setSortBy}
        totalPosts={
          filteredPosts.length
        }
      />

      <ManageBlogsTable
        posts={filteredPosts}
        loading={loading}
      />
    </div>
  );
}