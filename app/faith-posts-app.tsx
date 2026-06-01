"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type PostType =
  | "Bible Verse"
  | "Evidence"
  | "Deliverance Prayer"
  | "Apologetics";

type Post = {
  id: number;
  type: PostType;
  title: string;
  reference: string;
  body: string;
  createdAt: string;
};

const postTypes: PostType[] = [
  "Bible Verse",
  "Evidence",
  "Deliverance Prayer",
  "Apologetics",
];

const starterPosts: Post[] = [
  {
    id: 1,
    type: "Bible Verse",
    title: "Truth That Sets Free",
    reference: "John 8:32",
    body: "And ye shall know the truth, and the truth shall make you free.",
    createdAt: "2026-06-01",
  },
  {
    id: 2,
    type: "Evidence",
    title: "Answered Prayer Journal",
    reference: "Personal testimony",
    body: "Record dates, names, context, and verifiable details when sharing evidence or testimony.",
    createdAt: "2026-06-01",
  },
  {
    id: 3,
    type: "Deliverance Prayer",
    title: "Prayer for Peace",
    reference: "Philippians 4:7",
    body: "Lord Jesus, guard my heart and mind with Your peace. Lead me away from fear and into Your truth. Amen.",
    createdAt: "2026-06-01",
  },
  {
    id: 4,
    type: "Apologetics",
    title: "Reason for the Hope",
    reference: "1 Peter 3:15",
    body: "Prepare clear, respectful answers that explain the Christian faith with truth, gentleness, and reverence.",
    createdAt: "2026-06-01",
  },
];

export default function FaithPostsApp() {
  const [posts, setPosts] = useState<Post[]>(() => {
    if (typeof window === "undefined") {
      return starterPosts;
    }

    const savedPosts = window.localStorage.getItem("faith-posts");

    if (!savedPosts) {
      return starterPosts;
    }

    try {
      return JSON.parse(savedPosts) as Post[];
    } catch {
      return starterPosts;
    }
  });
  const [selectedType, setSelectedType] = useState<PostType | "All">("All");
  const [form, setForm] = useState({
    type: "Bible Verse" as PostType,
    title: "",
    reference: "",
    body: "",
  });

  useEffect(() => {
    window.localStorage.setItem("faith-posts", JSON.stringify(posts));
  }, [posts]);

  const visiblePosts = useMemo(() => {
    if (selectedType === "All") {
      return posts;
    }

    return posts.filter((post) => post.type === selectedType);
  }, [posts, selectedType]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = form.title.trim();
    const trimmedBody = form.body.trim();

    if (!trimmedTitle || !trimmedBody) {
      return;
    }

    const post: Post = {
      id: Date.now(),
      type: form.type,
      title: trimmedTitle,
      reference: form.reference.trim(),
      body: trimmedBody,
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    setPosts((currentPosts) => [post, ...currentPosts]);
    setForm({
      type: "Bible Verse",
      title: "",
      reference: "",
      body: "",
    });
    setSelectedType("All");
  }

  function removePost(id: number) {
    setPosts((currentPosts) => currentPosts.filter((post) => post.id !== id));
  }

  return (
    <main className="min-h-screen bg-[#f7f6f2] text-stone-950">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10">
        <header className="grid gap-5 border-b border-stone-300 pb-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
              TINIG NG KATOTOHANAN
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
              Bible verses, evidences, and deliverance prayers
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
            {postTypes.map((type) => (
              <div
                className="border border-stone-300 bg-white px-3 py-4 shadow-sm"
                key={type}
              >
                <p className="text-2xl font-semibold">
                  {posts.filter((post) => post.type === type).length}
                </p>
                <p className="mt-1 text-xs font-medium uppercase text-stone-500">
                  {type}
                </p>
              </div>
            ))}
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          <form
            className="h-fit border border-stone-300 bg-white p-5 shadow-sm"
            onSubmit={handleSubmit}
          >
            <h2 className="text-xl font-semibold">Create a post</h2>

            <label className="mt-5 block text-sm font-semibold text-stone-700">
              Type
              <select
                className="mt-2 w-full border border-stone-300 bg-white px-3 py-3 text-base outline-none focus:border-emerald-700"
                value={form.type}
                onChange={(event) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    type: event.target.value as PostType,
                  }))
                }
              >
                {postTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </label>

            <label className="mt-4 block text-sm font-semibold text-stone-700">
              Title
              <input
                className="mt-2 w-full border border-stone-300 px-3 py-3 text-base outline-none focus:border-emerald-700"
                placeholder="Example: Psalm for protection"
                value={form.title}
                onChange={(event) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    title: event.target.value,
                  }))
                }
              />
            </label>

            <label className="mt-4 block text-sm font-semibold text-stone-700">
              Reference
              <input
                className="mt-2 w-full border border-stone-300 px-3 py-3 text-base outline-none focus:border-emerald-700"
                placeholder="Example: Psalm 91 or testimony source"
                value={form.reference}
                onChange={(event) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    reference: event.target.value,
                  }))
                }
              />
            </label>

            <label className="mt-4 block text-sm font-semibold text-stone-700">
              Content
              <textarea
                className="mt-2 min-h-36 w-full resize-y border border-stone-300 px-3 py-3 text-base outline-none focus:border-emerald-700"
                placeholder="Write the verse, evidence, prayer, testimony, or notes here."
                value={form.body}
                onChange={(event) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    body: event.target.value,
                  }))
                }
              />
            </label>

            <button
              className="mt-5 w-full bg-emerald-800 px-5 py-3 font-semibold text-white transition hover:bg-emerald-900"
              type="submit"
            >
              Publish Post
            </button>
          </form>

          <section>
            <div className="flex flex-wrap gap-2">
              {(["All", ...postTypes] as const).map((type) => (
                <button
                  className={`border px-4 py-2 text-sm font-semibold transition ${
                    selectedType === type
                      ? "border-emerald-800 bg-emerald-800 text-white"
                      : "border-stone-300 bg-white text-stone-700 hover:border-emerald-800"
                  }`}
                  key={type}
                  onClick={() => setSelectedType(type)}
                  type="button"
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="mt-5 grid gap-4">
              {visiblePosts.map((post) => (
                <article
                  className="border border-stone-300 bg-white p-5 shadow-sm"
                  key={post.id}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="bg-stone-100 px-3 py-1 text-xs font-bold uppercase text-emerald-800">
                      {post.type}
                    </span>
                    <span className="text-sm text-stone-500">
                      {post.createdAt}
                    </span>
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold">{post.title}</h2>
                  {post.reference ? (
                    <p className="mt-2 text-sm font-semibold text-stone-500">
                      {post.reference}
                    </p>
                  ) : null}
                  <p className="mt-4 whitespace-pre-wrap text-base leading-7 text-stone-700">
                    {post.body}
                  </p>
                  <button
                    className="mt-5 border border-stone-300 px-3 py-2 text-sm font-semibold text-stone-600 transition hover:border-red-700 hover:text-red-700"
                    onClick={() => removePost(post.id)}
                    type="button"
                  >
                    Delete
                  </button>
                </article>
              ))}
            </div>
          </section>
        </div>
        <footer className="border-t border-stone-300 pt-5 text-center text-sm font-semibold uppercase tracking-[0.16em] text-stone-500">
          TINIG NG KATOTOHANAN
        </footer>
      </section>
    </main>
  );
}
