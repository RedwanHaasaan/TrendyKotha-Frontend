"use client";
import Image from "next/image";

export default function WriteBlogSidebar({
  handlePublish,
  category,
  setCategory,
  tags,
  removeTag,
  tagInput,
  setTagInput,
  addTagFromInput,
  fileRef,
  cover,
  onFileChange,
  uploading,
  isFeatured,
  setIsFeatured,
}) {
  return (
    <div className="bg-white rounded-lg p-[18px] shadow-sm">
      <h3 className="m-0 mb-3 bg-primary text-white p-2 text-center text-xl font-bold">
        Blog Settings
      </h3>

      <div className="mb-3">
        <label className="block text-xs text-gray-500 mb-1.5">CATEGORY</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full py-2 px-2.5 rounded-md border border-gray-200"
        >
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
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => removeTag(t)}
              className="bg-[#f3e9df] border-none py-1.5 px-2.5 rounded-full cursor-pointer"
            >
              {t} ✕
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            placeholder="Add tags separated by commas"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTagFromInput();
              }
            }}
            className="flex-1 py-2 px-2.5 rounded-md border border-gray-200"
          />
          <button
            onClick={addTagFromInput}
            className="py-2 px-3 rounded-md bg-primary text-white cursor-pointer uppercase"
          >
            Add
          </button>
        </div>
      </div>

      <div className="mb-3.5">
        <label className="block text-xs text-gray-500 mb-1.5">
          FEATURED COVER (Required)
        </label>

        <div
          className="border border-dashed border-gray-300 rounded-lg p-3.5 text-center cursor-pointer"
          onClick={() => fileRef.current && fileRef.current.click()}
        >
          {uploading ? (
            <div className="text-gray-400 lg:min-h-26 flex justify-center items-center">
              Uploading...
            </div>
          ) : cover ? (
            <Image
              src={cover.url}
              alt="cover"
              width={800}
              height={450}
              className="w-full h-48 object-cover rounded-md"
            />
          ) : (
            <div className="text-gray-400 lg:min-h-26 flex justify-center items-center">
              Click to upload or drag an image here
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="hidden"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <div className="mb-4">
          <div className="flex items-center justify-between border border-gray-200 rounded-lg p-3 bg-white">
            <div>
              <h4 className="text-sm font-medium text-gray-800">
                Featured Post
              </h4>

              <p className="text-xs text-gray-500">
                Display this article on the homepage
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsFeatured(!isFeatured)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                isFeatured ? "bg-primary" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isFeatured ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
        <button
          onClick={handlePublish}
          className="bg-primary text-white py-2.5 px-3 rounded-lg border-none cursor-pointer"
        >
          Publish to Archives
        </button>
      </div>
    </div>
  );
}
