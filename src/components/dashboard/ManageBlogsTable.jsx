"use client";

import { useMemo, useState } from "react";
import { EmptyState, Pagination, Table } from "@heroui/react";
import { Icon } from "@iconify/react";
import Image from "next/image";

const ROWS_PER_PAGE = 10;

export default function ManageBlogsTable({ posts, loading }) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(posts.length / ROWS_PER_PAGE);

  const paginatedPosts = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;

    return posts.slice(start, start + ROWS_PER_PAGE);
  }, [posts, page]);

  const start = (page - 1) * ROWS_PER_PAGE + 1;

  const end = Math.min(page * ROWS_PER_PAGE, posts.length);

  if (loading) {
    return (
      <div className="bg-white border border-[#E8DFD0] rounded-3xl p-10 text-center">
        Loading blogs...
      </div>
    );
  }

  return (
    <Table className="bg-white border border-[#E8DFD0] rounded-3xl shadow-sm overflow-hidden p-0">
      <Table.ScrollContainer>
        <Table.Content aria-label="Manage Blogs" className="min-w-[1000px]">
          <Table.Header className="bg-[#F8F3EA] border-b border-[#E8DFD0]">
            <Table.Column
              isRowHeader
              className="py-5 px-6 text-[11px] font-semibold uppercase tracking-wider text-title "
            >
              Cover
            </Table.Column>

            <Table.Column className="py-5 px-6 text-[11px] font-semibold uppercase tracking-wider text-title">
              Article
            </Table.Column>

            <Table.Column className="py-5 px-6 text-[11px] font-semibold uppercase tracking-wider text-title">
              Category
            </Table.Column>

            <Table.Column className="py-5 px-6 text-[11px] font-semibold uppercase tracking-wider text-title">
              Status
            </Table.Column>

            <Table.Column className="py-5 px-6 text-[11px] font-semibold uppercase tracking-wider text-title">
              Featured
            </Table.Column>

            <Table.Column className="py-5 px-6 text-[11px] font-semibold uppercase tracking-wider text-title">
              Views
            </Table.Column>

            <Table.Column className="py-5 px-6 text-[11px] font-semibold uppercase tracking-wider text-title">
              Actions
            </Table.Column>
          </Table.Header>

          <Table.Body
            items={paginatedPosts}
            renderEmptyState={() => (
              <EmptyState className="flex h-full w-full flex-col items-center justify-center gap-4 py-16 text-center">
                <Icon
                  icon="solar:document-outline"
                  width={80}
                  className="text-gray-400"
                />

                <div>
                  <p className="font-semibold text-title text-2xl">
                    No blogs found
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Start writing your first article.
                  </p>
                </div>
              </EmptyState>
            )}
          >
            {(post) => (
              <Table.Row key={post._id}>
                <Table.Cell>
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    width={120}
                    height={70}
                    className="h-16 w-28 rounded-xl object-cover border border-gray-200"
                  />
                </Table.Cell>

                <Table.Cell>
                  <div className="space-y-1 max-w-sm">
                    <h3 className="font-semibold text-title line-clamp-1">
                      {post.title}
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Icon icon="solar:calendar-outline" width={14} />

                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </Table.Cell>

                <Table.Cell>
                  <span className="px-3 py-1 rounded-full bg-[#F8F3EA] text-primary text-xs font-medium">
                    {post.category}
                  </span>
                </Table.Cell>

                <Table.Cell>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      post.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {post.status}
                  </span>
                </Table.Cell>

                <Table.Cell>
                  <div className="flex">
                    {post.isFeatured ? (
                      <Icon
                        icon="solar:star-bold"
                        width={18}
                        className="text-yellow-500"
                      />
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </div>
                </Table.Cell>

                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <Icon
                      icon="solar:eye-outline"
                      width={16}
                      className="text-gray-400"
                    />

                    {post.views}
                  </div>
                </Table.Cell>

                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <button
                      className="
                        bg-primary
                        hover:opacity-90
                        text-white
                        p-2.5
                        rounded-xl
                        transition
                      "
                    >
                      <Icon icon="solar:pen-2-outline" width={18} />
                    </button>

                    <button
                      className="
                        border
                        border-red-200
                        hover:bg-red-50
                        text-red-600
                        p-2.5
                        rounded-xl
                        transition
                      "
                    >
                      <Icon icon="solar:trash-bin-trash-outline" width={18} />
                    </button>
                  </div>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>

      {posts.length > 0 && (
        <Table.Footer>
          <Pagination size="sm">
            <Pagination.Summary>
              {start} - {end} of {posts.length} posts
            </Pagination.Summary>

            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={page === 1}
                  onPress={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <Pagination.PreviousIcon />
                  Prev
                </Pagination.Previous>
              </Pagination.Item>

              {Array.from(
                {
                  length: totalPages,
                },
                (_, i) => i + 1,
              ).map((p) => (
                <Pagination.Item key={p}>
                  <Pagination.Link
                    isActive={page === p}
                    onPress={() => setPage(p)}
                  >
                    {p}
                  </Pagination.Link>
                </Pagination.Item>
              ))}

              <Pagination.Item>
                <Pagination.Next
                  isDisabled={page === totalPages}
                  onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </Table.Footer>
      )}
    </Table>
  );
}
