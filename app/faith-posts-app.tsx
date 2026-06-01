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

type UploadedFile = {
  id: number;
  name: string;
  size: number;
  type: string;
  tab: PostType;
  relativePath: string;
  url: string;
};

type VerseEntry = {
  book: string;
  reference: string;
  text: string;
};

const postTypes: PostType[] = [
  "Bible Verse",
  "Evidence",
  "Deliverance Prayer",
  "Apologetics",
];

const adminCredentials = {
  username: "admin",
  password: "admin123",
};

const verseLibrary: VerseEntry[] = [
  {
    book: "John",
    reference: "John 3:16",
    text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
  },
  {
    book: "John",
    reference: "John 8:32",
    text: "And ye shall know the truth, and the truth shall make you free.",
  },
  {
    book: "Romans",
    reference: "Romans 10:9",
    text: "That if thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved.",
  },
  {
    book: "Ephesians",
    reference: "Ephesians 6:12",
    text: "For we wrestle not against flesh and blood, but against principalities, against powers, against the rulers of the darkness of this world.",
  },
  {
    book: "Philippians",
    reference: "Philippians 4:7",
    text: "And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.",
  },
  {
    book: "2 Timothy",
    reference: "2 Timothy 3:16",
    text: "All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness.",
  },
  {
    book: "Hebrews",
    reference: "Hebrews 4:12",
    text: "For the word of God is quick, and powerful, and sharper than any twoedged sword.",
  },
  {
    book: "James",
    reference: "James 4:7",
    text: "Submit yourselves therefore to God. Resist the devil, and he will flee from you.",
  },
  {
    book: "1 Peter",
    reference: "1 Peter 3:15",
    text: "Be ready always to give an answer to every man that asketh you a reason of the hope that is in you.",
  },
  {
    book: "1 John",
    reference: "1 John 4:4",
    text: "Greater is he that is in you, than he that is in the world.",
  },
  {
    book: "Psalm",
    reference: "Psalm 23:1",
    text: "The LORD is my shepherd; I shall not want.",
  },
  {
    book: "Psalm",
    reference: "Psalm 91:2",
    text: "I will say of the LORD, He is my refuge and my fortress: my God; in him will I trust.",
  },
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

function loadSavedPosts() {
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
}

export default function FaithPostsApp() {
  const [posts, setPosts] = useState<Post[]>(loadSavedPosts);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [selectedType, setSelectedType] = useState<PostType | "All">("All");
  const [selectedFileTab, setSelectedFileTab] =
    useState<PostType>("Bible Verse");
  const [uploadTargetTab, setUploadTargetTab] =
    useState<PostType>("Bible Verse");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedFileId, setSelectedFileId] = useState<number | null>(null);
  const [selectedVerseBook, setSelectedVerseBook] = useState("John");
  const [selectedVerseReference, setSelectedVerseReference] =
    useState("John 3:16");
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

  const visibleFiles = uploadedFiles.filter(
    (file) => file.tab === selectedFileTab,
  );
  const selectedFile =
    uploadedFiles.find((file) => file.id === selectedFileId) ?? null;
  const verseBooks = Array.from(new Set(verseLibrary.map((verse) => verse.book)));
  const versesBySelectedBook = verseLibrary.filter(
    (verse) => verse.book === selectedVerseBook,
  );
  const selectedVerse =
    verseLibrary.find((verse) => verse.reference === selectedVerseReference) ??
    verseLibrary[0];

  function applyVerseToForm(verse: VerseEntry) {
    setForm({
      type: "Bible Verse",
      title: verse.reference,
      reference: verse.reference,
      body: verse.text,
    });
    setSelectedType("Bible Verse");
  }

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      loginForm.username === adminCredentials.username &&
      loginForm.password === adminCredentials.password
    ) {
      setIsAdmin(true);
      setLoginError("");
      setLoginForm({
        username: "",
        password: "",
      });
      return;
    }

    setLoginError("Invalid username or password.");
  }

  if (!isAdmin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#f8faf7_0%,#eef4f1_48%,#f7f4ee_100%)] px-5 text-stone-950">
        <section className="w-full max-w-md rounded-lg border border-white/70 bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.10)] backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
            TINIG NG KATOTOHANAN
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight">
            Admin Login
          </h1>

          <form className="mt-6" onSubmit={handleLogin}>
            <label className="block text-sm font-semibold text-stone-700">
              Username
              <input
                className="mt-2 w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-3 text-base outline-none transition focus:border-emerald-700 focus:bg-white"
                value={loginForm.username}
                onChange={(event) =>
                  setLoginForm((currentForm) => ({
                    ...currentForm,
                    username: event.target.value,
                  }))
                }
              />
            </label>

            <label className="mt-4 block text-sm font-semibold text-stone-700">
              Password
              <input
                className="mt-2 w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-3 text-base outline-none transition focus:border-emerald-700 focus:bg-white"
                type="password"
                value={loginForm.password}
                onChange={(event) =>
                  setLoginForm((currentForm) => ({
                    ...currentForm,
                    password: event.target.value,
                  }))
                }
              />
            </label>

            {loginError ? (
              <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
                {loginError}
              </p>
            ) : null}

            <button
              className="mt-5 w-full rounded-lg bg-emerald-800 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-900"
              type="submit"
            >
              Sign In
            </button>
          </form>
        </section>
      </main>
    );
  }

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

  function handleFiles(files: FileList | null) {
    if (!files?.length) {
      return;
    }

    const nextFiles = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type || "Unknown file",
      tab: uploadTargetTab,
      relativePath:
        (file as File & { webkitRelativePath?: string }).webkitRelativePath ||
        file.name,
      url: URL.createObjectURL(file),
    }));

    setUploadedFiles((currentFiles) => [...nextFiles, ...currentFiles]);
    setSelectedFileTab(uploadTargetTab);
    setSelectedFileId(nextFiles[0]?.id ?? null);
  }

  function moveFile(fileId: number, tab: PostType) {
    setUploadedFiles((currentFiles) =>
      currentFiles.map((file) =>
        file.id === fileId
          ? {
              ...file,
              tab,
            }
          : file,
      ),
    );
  }

  function removeFile(fileId: number) {
    setUploadedFiles((currentFiles) => {
      const fileToRemove = currentFiles.find((file) => file.id === fileId);

      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.url);
      }

      if (selectedFileId === fileId) {
        setSelectedFileId(null);
      }

      return currentFiles.filter((file) => file.id !== fileId);
    });
  }

  function renderFilePreview(file: UploadedFile) {
    if (file.type.startsWith("image/")) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt={file.name}
          className="max-h-[520px] w-full object-contain"
          src={file.url}
        />
      );
    }

    if (file.type === "application/pdf") {
      return (
        <iframe
          className="h-[520px] w-full border-0"
          src={file.url}
          title={file.name}
        />
      );
    }

    if (file.type.startsWith("video/")) {
      return (
        <video className="max-h-[520px] w-full bg-black" controls src={file.url}>
          <track kind="captions" />
        </video>
      );
    }

    if (file.type.startsWith("audio/")) {
      return <audio className="w-full" controls src={file.url} />;
    }

    if (
      file.type.startsWith("text/") ||
      file.name.endsWith(".md") ||
      file.name.endsWith(".json") ||
      file.name.endsWith(".csv")
    ) {
      return (
        <iframe
          className="h-[420px] w-full border border-stone-200 bg-white"
          src={file.url}
          title={file.name}
        />
      );
    }

    return (
      <div className="border border-stone-200 bg-stone-50 p-6 text-center text-stone-600">
        This file type cannot be previewed in the browser. Download it to view.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8faf7_0%,#eef4f1_48%,#f7f4ee_100%)] text-stone-950">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10">
        <header className="grid gap-6 rounded-lg border border-white/70 bg-white/85 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
                TINIG NG KATOTOHANAN
              </p>
              <button
                className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-semibold text-stone-600 shadow-sm transition hover:border-red-700 hover:text-red-700"
                onClick={() => setIsAdmin(false)}
                type="button"
              >
                Logout
              </button>
            </div>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight text-stone-950 sm:text-5xl">
              Bible verses, evidences, apologetics, and deliverance prayers
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
              Organize scripture, notes, prayers, and supporting files in one
              clean workspace.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
            {postTypes.map((type) => (
              <div
                className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-4 shadow-sm"
                key={type}
              >
                <p className="text-2xl font-semibold text-emerald-900">
                  {posts.filter((post) => post.type === type).length}
                </p>
                <p className="mt-1 text-xs font-medium uppercase text-stone-500">
                  {type}
                </p>
              </div>
            ))}
          </div>
        </header>

        <section className="grid gap-4 rounded-lg border border-stone-200 bg-white p-5 shadow-sm lg:grid-cols-[220px_260px_1fr_auto] lg:items-end">
          <label className="block text-sm font-semibold text-stone-700">
            Book
            <select
              className="mt-2 w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-3 text-base outline-none transition focus:border-emerald-700 focus:bg-white"
              value={selectedVerseBook}
              onChange={(event) => {
                const nextBook = event.target.value;
                const firstVerse = verseLibrary.find(
                  (verse) => verse.book === nextBook,
                );

                setSelectedVerseBook(nextBook);
                setSelectedVerseReference(firstVerse?.reference ?? "");
              }}
            >
              {verseBooks.map((book) => (
                <option key={book}>{book}</option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-semibold text-stone-700">
            Verse
            <select
              className="mt-2 w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-3 text-base outline-none transition focus:border-emerald-700 focus:bg-white"
              value={selectedVerseReference}
              onChange={(event) => setSelectedVerseReference(event.target.value)}
            >
              {versesBySelectedBook.map((verse) => (
                <option key={verse.reference}>{verse.reference}</option>
              ))}
            </select>
          </label>

          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
            <p className="text-sm font-semibold text-amber-900">
              {selectedVerse.reference}
            </p>
            <p className="mt-1 text-sm leading-6 text-stone-700">
              {selectedVerse.text}
            </p>
          </div>

          <button
            className="rounded-lg bg-emerald-800 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-900"
            onClick={() => applyVerseToForm(selectedVerse)}
            type="button"
          >
            Use Verse
          </button>
        </section>

        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          <form
            className="h-fit rounded-lg border border-stone-200 bg-white p-5 shadow-sm"
            onSubmit={handleSubmit}
          >
            <h2 className="text-xl font-semibold">Create a post</h2>

            <label className="mt-5 block text-sm font-semibold text-stone-700">
              Type
              <select
                className="mt-2 w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-3 text-base outline-none transition focus:border-emerald-700 focus:bg-white"
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
                className="mt-2 w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-3 text-base outline-none transition focus:border-emerald-700 focus:bg-white"
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
                className="mt-2 w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-3 text-base outline-none transition focus:border-emerald-700 focus:bg-white"
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
                className="mt-2 min-h-36 w-full resize-y rounded-lg border border-stone-200 bg-stone-50 px-3 py-3 text-base outline-none transition focus:border-emerald-700 focus:bg-white"
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
              className="mt-5 w-full rounded-lg bg-emerald-800 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-900"
              type="submit"
            >
              Publish Post
            </button>
          </form>

          <section>
            <div className="flex flex-wrap gap-2">
              {(["All", ...postTypes] as const).map((type) => (
                <button
                  className={`rounded-lg border px-4 py-2 text-sm font-semibold shadow-sm transition ${
                    selectedType === type
                      ? "border-emerald-800 bg-emerald-800 text-white"
                      : "border-stone-200 bg-white text-stone-700 hover:border-emerald-800"
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
                  className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm"
                  key={post.id}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase text-emerald-800">
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
                    className="mt-5 rounded-lg border border-stone-200 px-3 py-2 text-sm font-semibold text-stone-600 transition hover:border-red-700 hover:text-red-700"
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

        <section className="border-t border-stone-200 pt-8">
          <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
            <div className="h-fit rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-semibold">Upload files</h2>

              <label className="mt-5 block text-sm font-semibold text-stone-700">
                Save uploads under
                <select
                  className="mt-2 w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-3 text-base outline-none transition focus:border-emerald-700 focus:bg-white"
                  value={uploadTargetTab}
                  onChange={(event) =>
                    setUploadTargetTab(event.target.value as PostType)
                  }
                >
                  {postTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </label>

              <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-stone-300 bg-stone-50 px-4 py-8 text-center transition hover:border-emerald-800 hover:bg-emerald-50">
                <span className="font-semibold text-stone-800">
                  Upload files
                </span>
                <span className="mt-1 text-sm text-stone-500">
                  Select one or more files
                </span>
                <input
                  className="sr-only"
                  multiple
                  onChange={(event) => handleFiles(event.target.files)}
                  type="file"
                />
              </label>

              <label className="mt-3 flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-stone-300 bg-stone-50 px-4 py-8 text-center transition hover:border-emerald-800 hover:bg-emerald-50">
                <span className="font-semibold text-stone-800">
                  Upload folder
                </span>
                <span className="mt-1 text-sm text-stone-500">
                  Keeps folder paths in the file list
                </span>
                <input
                  className="sr-only"
                  multiple
                  onChange={(event) => handleFiles(event.target.files)}
                  type="file"
                  {...{ directory: "", webkitdirectory: "" }}
                />
              </label>

              <p className="mt-4 text-sm leading-6 text-stone-500">
                Files stay in this browser session. For shared hosted storage,
                connect Vercel Blob or another database-backed file store.
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-2">
                {postTypes.map((type) => (
                  <button
                    className={`rounded-lg border px-4 py-2 text-sm font-semibold shadow-sm transition ${
                      selectedFileTab === type
                        ? "border-emerald-800 bg-emerald-800 text-white"
                        : "border-stone-200 bg-white text-stone-700 hover:border-emerald-800"
                    }`}
                    key={type}
                    onClick={() => setSelectedFileTab(type)}
                    type="button"
                  >
                    {type} (
                    {uploadedFiles.filter((file) => file.tab === type).length})
                  </button>
                ))}
              </div>

              {selectedFile ? (
                <div className="mt-5 rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">
                        {selectedFile.name}
                      </h2>
                      <p className="mt-1 text-sm text-stone-500">
                        {selectedFile.relativePath}
                      </p>
                    </div>
                    <a
                      className="rounded-lg border border-stone-200 px-3 py-2 text-sm font-semibold text-stone-700 transition hover:border-emerald-800 hover:text-emerald-800"
                      download={selectedFile.name}
                      href={selectedFile.url}
                    >
                      Download
                    </a>
                  </div>
                  {renderFilePreview(selectedFile)}
                </div>
              ) : null}

              <div className="mt-5 grid gap-3">
                {visibleFiles.length ? (
                  visibleFiles.map((file) => (
                    <article
                      className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm"
                      key={file.id}
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="font-semibold">{file.name}</h3>
                          <p className="mt-1 text-sm text-stone-500">
                            {file.relativePath}
                          </p>
                          <p className="mt-1 text-sm text-stone-500">
                            {(file.size / 1024).toFixed(1)} KB - {file.type}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <button
                            className="rounded-lg border border-emerald-800 px-3 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-800 hover:text-white"
                            onClick={() => setSelectedFileId(file.id)}
                            type="button"
                          >
                            View
                          </button>
                          <a
                            className="rounded-lg border border-stone-200 px-3 py-2 text-sm font-semibold text-stone-700 transition hover:border-emerald-800 hover:text-emerald-800"
                            download={file.name}
                            href={file.url}
                          >
                            Download
                          </a>
                          <button
                            className="rounded-lg border border-stone-200 px-3 py-2 text-sm font-semibold text-stone-700 transition hover:border-red-700 hover:text-red-700"
                            onClick={() => removeFile(file.id)}
                            type="button"
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      <label className="mt-4 block text-sm font-semibold text-stone-700">
                        Move to tab
                        <select
                          className="mt-2 w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-sm outline-none transition focus:border-emerald-700 focus:bg-white sm:w-64"
                          value={file.tab}
                          onChange={(event) =>
                            moveFile(file.id, event.target.value as PostType)
                          }
                        >
                          {postTypes.map((type) => (
                            <option key={type}>{type}</option>
                          ))}
                        </select>
                      </label>
                    </article>
                  ))
                ) : (
                  <div className="rounded-lg border border-stone-200 bg-white p-6 text-stone-500 shadow-sm">
                    No files in this tab yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-stone-200 pt-5 text-center text-sm font-semibold uppercase tracking-[0.16em] text-stone-500">
          TINIG NG KATOTOHANAN
        </footer>
      </section>
    </main>
  );
}
