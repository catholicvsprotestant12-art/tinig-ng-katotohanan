"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

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
  excerpt: string;
  body: string;
  createdAt: string;
  readTime: string;
};

const postTypes: PostType[] = [
  "Bible Verse",
  "Evidence",
  "Deliverance Prayer",
  "Apologetics",
];

const posts: Post[] = [
  {
    id: 5,
    type: "Apologetics",
    title: "Adlawng nga Igpapahulay",
    reference: "Apologetics Bisaya",
    excerpt:
      "Usa ka Bisaya nga apologetics article mahitungod sa Sabado, Domingo, ug ang kristohanong pagsabot sa adlaw sa pahulay.",
    body: [
      "Panudlo sa Sta. Iglesya.- Ang Sta. Iglesya nagtudlo nga ang Dios nga nagbuhat sa tawo nagbuot nga kinahanglan nga ang tawo mogahin og usa ka adlaw sa semana sa pagpahulay gikan sa iyang inadlaw-adlaw nga pagtrabaho aron sa pagsimba sa Dios, sa pagpamalandong sa iyang pulong ug sa pagtagad sa mga butang nga may labot sa iyang espirituhanong kinabuhi. Ang Domingo ang gitudlo nga igpapahulay sa Sta. Iglesya tungod kay mao kini ang adlaw sa pagkabanhaw ni Jesus ug ang adlaw sa pagkunsad sa Espiritu Santo ngadto sa mga Apostoles.",
      "Pagsupak:",
      "Supak 1. Ang Sabado mao gayud ang igpapahulay nga gisugo sa Dios, dili Domingo. Ang ikapitong adlaw ang gibalaan sa Dios ug mipahulay siya niining adlawa (Gen. 2:3).",
      "Supak 2. Ang Dios nagsugo sa iyang katawhan sa pagbalaan sa ikapitong (Exo. 20:8-9) ug sa kalendaryo ang unang adlaw sa semana mao ang Domingo busa ang ikapito mao ang Sabado.",
      "Supak 3. Sa pag-anhi ni Jesus wala niya usba ang balaod sa Igpapahulay kay matud ni Jesus, \"Ayaw ninyo hunahunaa nga mianhi ako aron pagsalikway sa Balaod ni Moises ug sa mga propeta. Wala ako moanhi aron pagsalikway niini, kondili aron paghatag niini sa hustong kahulogan\" (Mat. 5:17).",
      "Supak 4. Gilig-on ni Jesus ang Sabado nga Igpapahulay kay, \"ingon sa naandan miadto siya sa sinagoga sa Adlaw nga Igpapahulay\" (Luc. 4:16). Busa si Cristo Sabadista diay.",
      "Supak 5. Bisan sa pagbalik ni Jesus duna gihapoy magbantay sa adlawng Sabado, \"Busa pag-ampo kamo sa Dios nga dili unta kamo pakagiwon sa panahon sa tingtugnaw o sa Adlaw nga Igpapahulay\" (Mat. 24:20).",
      "Supak 6. Bisan didto sa bag-ong langit ug bag-ong yuta magpadayon ang pagbalaan sa Adlawng Igpapahulay (Isa. 66:23).",
      "Supak 7. Gitagna nga usa ka tawo sa kadautan mag-usab sa panahon ug sa balaod (Dan. 7:25). Ang katumanan niini mao ang Sto. Papa: \"Ang papa sa Iglesya Katolika mao ang nagbalhin gikan sa Sabado ngadto sa Domingo nga Igpapahulay\" (Baltimore Catechism).",
      "Tubag:",
      "Ang adlaw sa paglalang sa tanang butang (Gen. 2:3) wala magpasabot nga sulod sa 24 oras kondili yugto sa panahon, \"ayaw ninyo hikalimti nga sa Ginoo ang usa ka adlaw ingon sa 1,000 ka tuig ug ang 1,000 ka tuig ingon lamang sa usa ka adlaw\" (2 Ped. 3:8). Dili sab literal nga ang Dios mipahulay tungod kay ang Dios dili man kapuyan, \"Wala ka ba diay mahibalo ni makadungog nga ang Ginoong Dios nga walay kataposan maoy nagbuhat sa tibuok kalibotan? Dili siya maluya ni kapuyan, ug dili matukib ang iyang kahibalo\" (Isa. 40:28).",
      "Ang giingon nga mipahulay ang Dios pagasabton nga natapos na niya ang buhat sa paglalang o dili ba nga wala na siya mamuhat og bag-ong mga binuhat. Ang unang kalendaryo nga mao ang Egyptian Calendar nahimo sa tuig 4241 BC busa sa wala pay kalendaryo wala nganli ang mga adlaw. Ang pagbahin sa semana ngadto sa pito ka adlaw nasunod sa mga Judio sa mga taga-Babilonia.",
      "Ang balaod sa Ginoo nga aduna kitay igpapahulay ug ang gipasabot niini sumala sa mga Judio mao kini: \"Ang ikapito ka adlaw nagpasabot sa usa ka adlaw nga mosunod human sa unom ka nagsunodsunod nga adlaw. Walay piho sa adlaw sa semana nga gipasabot\" (Jewish Encyc. Vol. X p. 604).",
      "Sa mga Israelitas si Moises ang mipaila kon unsang adlawa ang gipahitukma nila sa balaod, \"ug gisugo mo sila sa pagtamod sa Adlawng Igpapahulay. Pinaagi sa imong alagad nga si Moises, gihatagan mo sila sa imong mga balaod\" (Neh. 9:14). Ang Sabado usa ka halandumong adlaw alang sa mga Israelitas, tungod kay niining adlawa nahigawas sila gikan sa Ehipto busa gipabalaan nila kini isip handumanan (Deut. 5:15).",
      "Apan gitagna nga pahunongon ang Sabado, \"Ug hunongon ko ang tanan niyang kalipay, ang iyang mga pangilin, mga bag-ong subang sa bulan, mga Adlawng Igpapahulay, ug ang tanang gitagal niya nga mga pangilin\" (Oseas 2:11). Gumikan kini sa mga abuso nga gihimo sa iyang katawhan. Namaligya sila ug nagdaogdaog ug nanikas sa Adlawng Igpapahulay (Amos 8:5).",
      "Laing hinungdan nga kini pahunongon na mao nga ang balaod sa mga Judio mahitungod sa Sabado nga Igpapahulay higpit kaayo. Ang kan-on sa adlawng Sabado lutuon daan sa nag-una nga adlaw (Exo. 16:23). Ang motrabaho sa maong adlaw silotan sa kamatayon (Exo. 31:15). Bisan gani ang paghaling og kalayo diha sa sulod sa balay gidili usab (Exo. 35:3).",
      "Kining maong tagna sa pagpahunong sa Sabado nga Igpapahulay natuman kini sa pag-abot ni Jesus. Ang atong Ginoo wala magbantay sa balaod sa Igpapahulay sa mga Judio. Iyang giayo ang usa ka bakol ug gipapas-an sa iyang banig atol sa adlawng Sabado (Jn. 5:9), usa ka buhat nga gidili sa balaod sa Adlawng Igpapahulay (Jer. 17:21).",
      "Kay wala si Jesus magbantay sa Sabado, buot siyang patyon sa mga Judio (Jn. 5:18). Kon ang usa ka balaod nagpadayon pa nga gipatuman ang molapas niini makasala apan ang mga apostoles nangutlog uhay atol sa Adlawng Igpapahulay ug matod ni Jesus wala sila makasala busa wala nay bili ang maong balaod (Mat. 12:1-5).",
      "Giklaro kini ni San Pablo sa iyang pag-ingon: \"Busa ayaw ninyo itugot nga may magsaway kaninyo sa inyong kan-on o imnon, o bahin sa mga adlaw nga balaan, o sa pangilin sa bag-ong bulan, o bahin sa Adlawng Igpapahulay. Kining tanan mga landong lamang sa mga butang umaabot, apan ang katumanan mao si Cristo\" (Col. 2:16-17).",
      "Wala bungkaga ni Jesus ang kasugoan tungod kay nagpabilin gihapon nga dunay igpapahulay apan Domingo na ang giilis sa gipahunong nga Sabado. \"Kay kon si Josue nakahatag pa kanilag pahulay, dili na unta ang Dios maghisgot pa ug laing adlaw. Busa duna pay adlaw sa pahulay alang sa katawhan sa Dios\" (Heb. 4:8-9).",
      "Alang sa unang mga kristyanos mas makahuloganon ang adlawng Domingo kay sa Sabado tungod kay mao kini ang adlaw sa pagkabanhaw ni Jesus, ang adlaw sa iyang hingpit nga kadaogan batok sa sala ug sa kamatayon ug adlaw usab sa atong paglingkawas gikan sa kaulipnan sa sala (1 Cor. 15:14). Ang adlawng Domingo usab ang adlaw sa pagkunsad sa Espiritu Santo ngadto mga Apostoles atol sa Pentecostes (Buh. 2:1-4).",
      "Sa kasinugdanan ang mga apostoles moapil gihapon sa panagtigom sa ilang karaan nga tinuhoan apan sa hinayhinay naghimo na sila og linain nga panagtigom atol sa adlawng Domingo. \"Pagka-Domingo sa gabii nagtigom kami aron pag-ambit sa balaang panihapon\" (Buh. 20:7). Si San Pablo nagsulat: \"Sa unang adlaw sa matag semana, ang usag-usa kaninyo kinahanglan maagahin ug kuwarta sumala sa inyong kinitaan, ug tigomon kini\" (1 Cor. 16:2).",
      "Dugang mga tubag: Dili pruyba nga si Jesus sabadista komo misulod sa sinagoga sa adlawng Sabado. Kada adlaw siya mosulod sa templo aron sa pagpanudlo (Mat. 26:55) apan dili sabton nga tanang adlaw iyang igpapahulay. Ang gihisgotan ni Jesus sa Mat. 24:20 kabahin sa pagkagun-ob sa Jerusalem ug ang iyang gipahimangnoan mao ang mga Judio nga nagtamod sa Sabado.",
      "Dili nato sabton nga didto sa bag-ong langit duna pay pagkwenta sa mga adlaw, \"Didto wala nay gabii ug dili na sila magkinahanglan ug mga suga o kahayag sa adlaw, kay ang Ginoong Dios mao may ilang kahayag\" (Pin. 22:5). Ang pahulay nga gihisgotan didto sa bag-ong langit ug bag-ong yuta mao ang kapahulayan gikan sa sala ug sa mga katalagman (Pin. 21:4).",
      "Ang katumanan nianang gitagna sa Dan. 7:25 nga mag-usab sa panahon ug balaod mao si Hari Antioco Epifanes sa Syria sa 168 BC nga mibuntog sa mga Judio, ug miusab sa ilang panahon ug kasugoan sa pagsimba (1 Mac. 1:41-43). Ang Sto. Papa igo lamang nag-implementar sa kabubut-on sa Ginoo sa pagbalhin sa igpapahulay gikan sa Sabado ngadto sa Domingo.",
    ].join("\n\n"),
    createdAt: "Oct 15, 2014",
    readTime: "9 min read",
  },
  {
    id: 1,
    type: "Bible Verse",
    title: "Truth That Sets Free",
    reference: "John 8:32",
    excerpt:
      "A short reflection on truth, freedom, and the courage to let Scripture examine the heart.",
    body: "And ye shall know the truth, and the truth shall make you free. Truth is not only something to defend. It is something to receive, obey, and walk in daily. When Christ speaks truth into a life, fear loses its authority and the soul learns to stand.",
    createdAt: "Jun 1, 2026",
    readTime: "2 min read",
  },
  {
    id: 2,
    type: "Evidence",
    title: "Answered Prayer Journal",
    reference: "Personal testimony",
    excerpt:
      "How to record testimonies with dates, context, and details that help others understand God's faithfulness.",
    body: "A clear testimony honors both faith and truth. Write down the date, the need, the people involved, what was prayed, what changed, and what can be verified. Over time, these records become reminders that God has been present in ordinary days as well as urgent moments.",
    createdAt: "Jun 1, 2026",
    readTime: "3 min read",
  },
  {
    id: 3,
    type: "Deliverance Prayer",
    title: "Prayer for Peace",
    reference: "Philippians 4:7",
    excerpt:
      "A simple prayer for a guarded heart and a steady mind in the peace of Christ.",
    body: "Lord Jesus, guard my heart and mind with Your peace. Lead me away from fear and into Your truth. Teach me to reject every lie that weakens faith, and help me rest in Your authority, mercy, and love. Amen.",
    createdAt: "Jun 1, 2026",
    readTime: "1 min read",
  },
  {
    id: 4,
    type: "Apologetics",
    title: "Reason for the Hope",
    reference: "1 Peter 3:15",
    excerpt:
      "Christian defense should be clear, truthful, and gentle enough to honor the person listening.",
    body: "Apologetics is not winning an argument for its own sake. It is giving a faithful answer with clarity and reverence. A good defense of the faith listens carefully, answers honestly, and points beyond the speaker to Christ.",
    createdAt: "Jun 1, 2026",
    readTime: "3 min read",
  },
];

export default function FaithPostsApp() {
  const [selectedType, setSelectedType] = useState<PostType | "All">("All");

  const visiblePosts = useMemo(() => {
    if (selectedType === "All") {
      return posts;
    }

    return posts.filter((post) => post.type === selectedType);
  }, [selectedType]);

  const featuredPost = visiblePosts[0] ?? posts[0];
  const secondaryPosts = visiblePosts.filter((post) => post.id !== featuredPost.id);

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8faf7_0%,#eef4f1_48%,#f7f4ee_100%)] text-stone-950">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10">
        <header className="rounded-lg border border-white/70 bg-white/85 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Image
                alt="Tinig ng Katotohanan"
                className="h-28 w-auto sm:h-32"
                height={700}
                priority
                src="/tinig-logo.svg"
                width={900}
              />
              <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight text-stone-950 sm:text-5xl">
                Faith blog for truth, testimony, prayer, and apologetics
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
                Read reflections rooted in Scripture, evidence, deliverance
                prayer, and thoughtful Christian defense.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center sm:grid-cols-4 lg:w-[420px]">
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

        <nav className="flex flex-wrap gap-2" aria-label="Blog categories">
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
        </nav>

        <article className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase text-emerald-800">
              Featured
            </span>
            <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-bold uppercase text-stone-600">
              {featuredPost.type}
            </span>
            <span className="text-sm text-stone-500">
              {featuredPost.createdAt} · {featuredPost.readTime}
            </span>
          </div>

          <h2 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight sm:text-4xl">
            {featuredPost.title}
          </h2>
          <p className="mt-2 text-sm font-semibold text-stone-500">
            {featuredPost.reference}
          </p>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-stone-700">
            {featuredPost.body}
          </p>
        </article>

        <section>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Latest Posts</h2>
              <p className="mt-1 text-sm text-stone-500">
                {visiblePosts.length} post{visiblePosts.length === 1 ? "" : "s"}{" "}
                in this view
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {secondaryPosts.map((post) => (
              <article
                className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm"
                key={post.id}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase text-emerald-800">
                    {post.type}
                  </span>
                  <span className="text-sm text-stone-500">
                    {post.createdAt} · {post.readTime}
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-semibold">{post.title}</h3>
                <p className="mt-2 text-sm font-semibold text-stone-500">
                  {post.reference}
                </p>
                <p className="mt-4 text-base leading-7 text-stone-700">
                  {post.excerpt}
                </p>
              </article>
            ))}
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
    </main>
  );
}
