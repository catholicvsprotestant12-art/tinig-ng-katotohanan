"use client";

import Image from "next/image";
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
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
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
          src={`${file.url}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
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
      <button
        aria-expanded={isAdminPanelOpen}
        aria-label="Admin settings"
        className="fixed right-4 top-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-emerald-900/10 bg-emerald-800 text-white shadow-lg transition hover:bg-emerald-900 focus:outline-none focus:ring-4 focus:ring-emerald-800/20 sm:right-8 sm:top-8"
        onClick={() =>
          setIsAdminPanelOpen((isCurrentPanelOpen) => !isCurrentPanelOpen)
        }
        title="Admin settings"
        type="button"
      >
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .92l-.03.08A2 2 0 0 1 12.1 22h-.2a2 2 0 0 1-1.87-1.6l-.03-.08a1.7 1.7 0 0 0-1-.92 1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.92-1l-.08-.03A2 2 0 0 1 2 12.1v-.2a2 2 0 0 1 1.6-1.87l.08-.03a1.7 1.7 0 0 0 .92-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.92l.03-.08A2 2 0 0 1 11.9 2h.2a2 2 0 0 1 1.87 1.6l.03.08a1.7 1.7 0 0 0 1 .92 1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.18.4.5.73.92 1l.08.03A2 2 0 0 1 22 11.9v.2a2 2 0 0 1-1.6 1.87l-.08.03a1.7 1.7 0 0 0-.92 1Z" />
        </svg>
      </button>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10">
        <header className="grid gap-6 rounded-lg border border-white/70 bg-white/85 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <Image
                alt="Tinig ng Katotohanan"
                className="h-24 w-auto sm:h-28"
                height={700}
                priority
                src="/tinig-logo.svg"
                width={900}
              />
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                Public Portal
              </span>
            </div>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight text-stone-950 sm:text-5xl">
              Bible verses, evidences, apologetics, and deliverance prayers
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
              Read published posts and view uploaded resources organized by
              topic.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3 text-center sm:grid-cols-4 lg:grid-cols-2">
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
          </div>
        </header>

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

          <div className="mt-5 grid gap-4 md:grid-cols-2">
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
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-stone-200 pt-8">
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
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-lg border border-stone-200 bg-white p-6 text-stone-500 shadow-sm">
                No public files in this tab yet.
              </div>
            )}
          </div>
        </section>

        <footer className="flex justify-center border-t border-stone-200 pt-5">
          <Image
            alt="Tinig ng Katotohanan"
            className="h-20 w-auto"
            height={700}
            src="/tinig-logo.svg"
            width={900}
          />
        </footer>
      </section>

      {isAdminPanelOpen ? (
        <div className="fixed right-4 top-20 z-50 w-[calc(100vw-2rem)] max-w-2xl sm:right-8 sm:top-24">
          <aside className="max-h-[calc(100vh-2rem)] overflow-y-auto rounded-lg border border-stone-200 bg-white p-5 shadow-2xl sm:max-h-[calc(100vh-4rem)]">
            <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
                  Admin Management
                </p>
              </div>
              <button
                className="rounded-lg border border-stone-200 px-3 py-2 text-sm font-semibold text-stone-600 transition hover:border-emerald-800 hover:text-emerald-800"
                onClick={() => setIsAdminPanelOpen(false)}
                type="button"
              >
                Close
              </button>
            </div>

            {!isAdmin ? (
              <form className="mt-5" onSubmit={handleLogin}>
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
            ) : (
              <div className="mt-5 grid gap-6">
                <div className="flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                  <p className="text-sm font-semibold text-emerald-900">
                    Signed in as admin
                  </p>
                  <button
                    className="rounded-lg border border-emerald-300 bg-white px-3 py-2 text-sm font-semibold text-emerald-800 transition hover:border-red-700 hover:text-red-700"
                    onClick={() => setIsAdmin(false)}
                    type="button"
                  >
                    Logout
                  </button>
                </div>

                <section className="rounded-lg border border-stone-200 p-4">
                  <h3 className="text-lg font-semibold">Verse helper</h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
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
                          setSelectedVerseReference(
                            firstVerse?.reference ?? "",
                          );
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
                        onChange={(event) =>
                          setSelectedVerseReference(event.target.value)
                        }
                      >
                        {versesBySelectedBook.map((verse) => (
                          <option key={verse.reference}>
                            {verse.reference}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
                    <p className="text-sm font-semibold text-amber-900">
                      {selectedVerse.reference}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-stone-700">
                      {selectedVerse.text}
                    </p>
                  </div>
                  <button
                    className="mt-3 rounded-lg bg-emerald-800 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-900"
                    onClick={() => applyVerseToForm(selectedVerse)}
                    type="button"
                  >
                    Use Verse
                  </button>
                </section>

                <form
                  className="rounded-lg border border-stone-200 p-4"
                  onSubmit={handleSubmit}
                >
                  <h3 className="text-lg font-semibold">Create a post</h3>

                  <label className="mt-4 block text-sm font-semibold text-stone-700">
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

                <section className="rounded-lg border border-stone-200 p-4">
                  <h3 className="text-lg font-semibold">Upload files</h3>
                  <label className="mt-4 block text-sm font-semibold text-stone-700">
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

                  <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-stone-300 bg-stone-50 px-4 py-6 text-center transition hover:border-emerald-800 hover:bg-emerald-50">
                    <span className="font-semibold text-stone-800">
                      Upload files
                    </span>
                    <input
                      className="sr-only"
                      multiple
                      onChange={(event) => handleFiles(event.target.files)}
                      type="file"
                    />
                  </label>

                  <label className="mt-3 flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-stone-300 bg-stone-50 px-4 py-6 text-center transition hover:border-emerald-800 hover:bg-emerald-50">
                    <span className="font-semibold text-stone-800">
                      Upload folder
                    </span>
                    <input
                      className="sr-only"
                      multiple
                      onChange={(event) => handleFiles(event.target.files)}
                      type="file"
                      {...{ directory: "", webkitdirectory: "" }}
                    />
                  </label>
                </section>

                <section className="rounded-lg border border-stone-200 p-4">
                  <h3 className="text-lg font-semibold">Manage content</h3>
                  <div className="mt-4 grid gap-3">
                    {posts.map((post) => (
                      <article
                        className="rounded-lg border border-stone-200 p-3"
                        key={post.id}
                      >
                        <p className="text-sm font-semibold">{post.title}</p>
                        <p className="text-xs text-stone-500">{post.type}</p>
                        <button
                          className="mt-2 rounded-lg border border-stone-200 px-3 py-2 text-sm font-semibold text-stone-700 transition hover:border-red-700 hover:text-red-700"
                          onClick={() => removePost(post.id)}
                          type="button"
                        >
                          Delete Post
                        </button>
                      </article>
                    ))}
                  </div>

                  <div className="mt-5">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <h4 className="text-base font-semibold">
                        File controls
                      </h4>
                      <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-600">
                        {uploadedFiles.length} files
                      </span>
                    </div>

                    <div className="grid gap-3">
                      {uploadedFiles.length ? (
                        uploadedFiles.map((file) => (
                          <article
                            className="rounded-lg border border-stone-200 p-3"
                            key={file.id}
                          >
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                              <div>
                                <p className="text-sm font-semibold">
                                  {file.name}
                                </p>
                                <p className="text-xs text-stone-500">
                                  {file.relativePath}
                                </p>
                                <p className="mt-1 text-xs text-stone-500">
                                  {file.tab} - {(file.size / 1024).toFixed(1)}{" "}
                                  KB
                                </p>
                              </div>

                              <div className="flex flex-wrap gap-2">
                                <button
                                  className="rounded-lg border border-emerald-800 px-3 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-800 hover:text-white"
                                  onClick={() => {
                                    setSelectedFileId(file.id);
                                    setSelectedFileTab(file.tab);
                                    setIsAdminPanelOpen(false);
                                  }}
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
                              </div>
                            </div>

                            <label className="mt-3 block text-sm font-semibold text-stone-700">
                              Move to tab
                              <select
                                className="mt-2 w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-sm outline-none transition focus:border-emerald-700 focus:bg-white"
                                value={file.tab}
                                onChange={(event) =>
                                  moveFile(
                                    file.id,
                                    event.target.value as PostType,
                                  )
                                }
                              >
                                {postTypes.map((type) => (
                                  <option key={type}>{type}</option>
                                ))}
                              </select>
                            </label>

                            <button
                              className="mt-3 w-full rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 transition hover:border-red-700 hover:bg-red-100"
                              onClick={() => removeFile(file.id)}
                              type="button"
                            >
                              Delete Unwanted File
                            </button>
                          </article>
                        ))
                      ) : (
                        <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 text-sm text-stone-500">
                          No uploaded files to manage.
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              </div>
            )}
          </aside>
        </div>
      ) : null}
    </main>
  );
}
