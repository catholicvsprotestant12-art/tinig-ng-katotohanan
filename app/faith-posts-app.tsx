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
    id: 6,
    type: "Apologetics",
    title: "Ang Indulhensya",
    reference: "Apologetics Bisaya",
    excerpt:
      "Usa ka Bisaya nga apologetics article mahitungod sa indulhensya, kastigo temporal, purgaturyo, ug panaghiusa sa mga santos.",
    body: [
      "Panudlo sa Sta. Iglesya.- Ang Sta,. Iglesya nagtudlo nga ang indulhensya mao ang pagkuha sa kastigo temporal gumikan sa sala nga napasaylo na. Niini, angay nga bantayan nga ang indulhensya way kalabutan sa pagpasaylo sa sala kay kini adto man himoon sa kompisalan kondili mahitungod kini sa pagtangtang sa kastigo temporal nga possible pa nga mahibilin agad sa kahugot sa paghiunulsol nga gihimo sa makasasala.",
      "Bisan kon ang sala napasaylo na apan gipangayo sa hustisiya sa Dios nga kinahanglan nga bayran sa hingpit ang kadaut nga miresulta gumikan sa sala. Kining kastigo temporal dili kini nato hunahunaon nga pagpanimalos nga gipahamtang sa Dios tungod sa atong paglapas sa iyang mga sugo kondili mao kini ang resulta nga nagsukad sa kinaiya sa sala.",
      "Ang kastigo temporal mahimong atong antosan dinhi sa kalibotan ug kon dili nato hingpit nga kabayran niining kinabuhia adto nato kini antosan sa purgaturyo. Ang Indulhensya mapuslanon alang sa mga buhi ug sa mga kalag sa purgaturyo nga nag-antos pa sa kastigo temporal tungod sa ilang mga sala nga nahimo sa dinhi pa sila sa kalibotan. Alang sa mga buhi ang Sta. Iglesya makahatag og indulhensya pinaagi og \"absolution\" apan alang sa mga kalag sa purgaturyo sa Sta. Iglesya makapadangat niini ngadto kanila pinaagi og \"supplication\" kun pagpangaliyupo.",
      "Pagsupak:",
      "Wala na kinahanglana ang pagdawat og indulhensya kondili ang paghinulsol nga nagsukad sa atong gugma sa Dios, \"ang gugma mopasaylo sa tanang kalapasan\" (Prob. 10:12), \"Labaw sa tanan, paghigugmaay kamo sa kinasingkasing gayod, kay ang gugma nagtabon sa daghang mga sala\" (1 Ped. 4:8). Wala na kinahanglan ang pagpamayad sa atong bahin kay gihimo na ni Cristo ang hingpit nga pamayad, \"Kay naluwas kita tungod sa kamatayon ni Cristo, sa ato pa, napasaylo na ang atong mga sala\" (Efeso 1:7). \"Gipapas niya ang tanan tang mga utang lakip ang mga kasabotan bahin niini ug giwagtang niya ang tanan pinaagi sa paglansang niini didto sa krus\" (Col. 2:14). Didto sa krus si Jesus miingon, \"Natapos na\" (Jn. 19:30) busa wala na kinahanglana ang pag-antos sa atong bahin kay si Cristo nag-antos na man alang kanato.",
      "Tubag:",
      "Ang salang mortal dunay nalambigit nga duha ka matang sa silot ug kini mao kastigo eterno ug kastigo temporal. Ang usa ka tawo nga nagbuhat og salang mortal ug unya namatay nga wala maghinulsol silotan sa kastigo nga walay kataposan nga mao ang impyerno, \"Apan ipahamtang sa Dios ang iyang kasuko ug kapungot sa mga tawo nga naghunahuna sa ilang kaugalingon ug nagsalikway sa kamatuoran aron pagbuhat sa daotan\" (Rom. 2:8).",
      "Ang makapalikay nato niining maong kastigo mao ang atong paghimo ug maayo nga pagkompisal ngadto sa pari kay sila gitugyanan man ni Cristo sa gahom sa pagpasaylog mga sala, \"Kon pasayloon ninyo ang mga sala sa mga tawo, gipasaylo kini; kon ang ilang mga sala dili ninyo pasayloon, dili usab kini pasayloon\" (Jn. 20:23). Apan ang pagpasaylo sa sala dili sama sa pagwagtang sa kastigo temporal gumikan sa sala.",
      "Mahimo nga ang makasasala gipasaylo na sa Dios apan duna gihapon siyay mahiagoman nga kastigo temporal gumikan sa iyang mga sala. Si Miriam nga nakasala gipasaylo sa Dios apan ang Dios miingon kang Moises, \"Pagawasa siya sa kampo sulod sa pito ka adlaw ug pagkatapos niana mahimo na nga pasudlon siya\" (Num. 12:14).",
      "Ang Dios mipasaylo sa sala sa katawhan apan siya miingon, \"Gipasaylo ko sila sumala sa imong gihangyo. Apan sa pagkatinuod, samtang buhi ako, ug ang tibuok kalibotan mapuno sa himaya sa Ginoo, walay mabuhi niining mga tawhana nga makasulod niadtong yutaa\" (Num. 14:20-21).",
      "Bisan si Moises ug Aaron nahiagom usab sa kastigo temporal. Ang Dios miingon kanila, \"Kay wala man ako tuohi ninyo, aron balaanon ako sa mga tawo sa Israel, dili kamo maoy mangulo sa mga tawo ngadto sa yuta nga akong ihatag kanila\" (Num. 20:12). Si David bisan sa iyang paghinulsol apan nahiagom gihapon sa kastigo temporal. Si Natan miingon ngadto kaniya, \"Gipasaylo sa Ginoo ang imong sala ug dili ka niya patyon. Apan kay pinaagi niining buhata imo mang gipasipad-an ang Ginoo, mamatay ang bata nga matawo kanimo\" (2 Sam. 12:13-14).",
      "Kining maong kastigo kon dili nato kabayran niining kinabuhia adto kini antosan sa purgaturyo, \"Niadtong adlawa ang buhat sa tagsatagsa sulayan pinaagi sa kalayo... kon ang iyang buhat dili hingpit siya mahiagom sa kastigo apan siya maluwas apan moagi una og kalayo\" (1 Cor. 3:13-15).",
      "Si Jesus nagtudlo kanato sa paghimog pamayad samtang buhi pa kita, \"pakighusay kaniya samtang may panahon pa ug wala pa kamo moabot didto; kay kon kamo moabot na sa hukmanan, itugyan ka niya sa huwes... ug timan-i: bilanggoon ka didto hangtod kabayran mo sa hingpit ang imong multa\" (Mat. 5:26).",
      "Ang pagtulon-an sa indulhensya gipasukad sa tulo ka hinungdanong panudlo:",
      "1) Gahom sa mga yawi. Ang makababag sa atong hingpit nga pag-ambit sa Iglesya dinhi sa yuta ug sa pagsulod ngadto sa langit mao ang sala ug ang silot temporal gumikan sa sala. Ang mga punoan sa Sta. Iglesya gihatagan sa Dios dili lamang sa gahom sa pagpasaylog mga sala kondili sa pagkuha usab sa kastigo temporal gumikan sa sala human kini mapasaylo sa kompisalan. Si Jesus miingon ngadto ni Pedro, \"Ihatag ko kanimo ang mga yawi sa Gingharian sa langit; ang imong gapuson dinhi sa yuta gapuson usab didto sa langit; ug ang imong hubaran dinhi sa yuta, mahinubaran usab didto sa langit\" (Mat. 16:19). Ngadto sa mga apostoles si Jesus miingon, \"ang inyong idili dinhi sa yuta idili usab didto sa langit; ug ang inyong itugot dinhi sa yuta, itugot usab didto sa langit\" (Mat. 18:18). Tungod niini nga gahom, ang Sto. Papa ug mga ka-Obispohan makahatag og indulhensya.",
      "2) Tigomanan sa grasya. Pinaagi sa kamatayon ni Cristo iyang nadaog alang kanato ang walay kinutuban nga bahandi sa grasya nga sobra kaayo nga ibayad sa atong mga utang \"kay kon daghan ang nangamatay tungod sa pagpakasala sa usa ka tawo, labi pang dako ang grasya ug ang gasa sa Dios nga mabatonan sa daghang mga tawo pinaagi sa usa ka tawo nga mao si Jesu-Cristo\" (Rom. 5:15). Nadugang niini mao ang mga merito sa mga santos tungod sa ilang giantos nga sobra kaayo nga ibayad sa ilang mga kasal-anan, \"Kay pinaagi sa akong mga giantos nakatabang ako paghingpit sa wala pa matapos nga mga pag-antos ni Cristo alang sa iyang lawas nga mao ang iglesia\" (Col. 1:24). Ang buluhaton sa pagpadangat niining maong grasya sa matag usa kanato gitugyan ni Jesus ngadto sa iyang Iglesya, \"Isipa kami nga mga sulugoon ni Cristo nga gitugyanan sa mga tinagong kamatuoran sa Dios\" (1 Cor. 4:1).",
      "3) Panaghiusa sa mga santos. Ang tanang sakop sa Iglesya dunay kalambigitan sa usag-usa tungod kay nahiusa man ang tanan diha sa usa ka lawas ug tungod niini ang mga lig-on nga bahin makatabang sa huyang nga bahin. \"Daghan ug mga bahin ang atong lawas, ug ang matag bahin niini may kaugalingong bulohaton. Kita usab, bisan daghan, usa lamang ka lawas nga nahiusa kang Cristo, ug nalambigit kita sa usag-usa ingon nga nagkalainlaing bahin sa usa ka lawas\" (Rom. 12:4-5). \"Busa walay pagkabahinbahin sa lawas, kondili ang tanang bahin may samang pagtagad sa usag-usa. Kon ang usa ka bahin sa lawas mag-antos, ang ubang bahin mag-antos usab; kon daygon ang usa ka bahin, ang tanang bahin makaambit sa kalipay\" (1 Cor. 12:25-26). Kini nagtudlo kanato nga diha sa mga sakop sa Sta. Iglesya dunay panag-ambitay sa mga maayong gasa sa grasya.",
      "Ang Sta. Iglesya nag-ila sa duha ka matang sa indulhensya: indulhensya partial nga mopapas sa bahin lamang sa kastigo temporal ug ang indulhensya plenarya nga mopapas sa tibuok bayranan sa kastigon temporal.",
      "Ang mga kondisyon sa pagdawat sa indulhensya plenarya mao kining mosunod: 1) kinahanglan nga anaa sa kahimtang sa grasya. Si Jesus miingon, \"Kon wala ako, wala kamoy mahimo\" (Jn. 15:5). Makab-ot kini nato pinaagi sa pagkompisal ug sa pagkalawat. 2) kinahanglan nga ang modawat sa indulhensya andam nga mopailwaom sa autoridad (Sto. Papa o Obispo) nga naghatag, \"Ug kon dili siya mamati sa iglesya, isipa siya nga usa ka langyaw o kobrador sa buhis\" (Mat. 18:17). 3) kinahanglan ang tuyo sa pagdawat busa ato kining pangayoon, \"pangayo kamo, ug kamo hatagan\" (Mat. 7:7). 4) ang pagbuhat sa tulomanon nga gitudlo sa Sta. Iglesya sama pananglit sa pagbasa sa Kasulatan, paghimo sa mga acto sa debosyon sama sa pag-rosaryo ug pag-estasyon sa krus, sa pag-apil sa prosesyon, sa pagduaw sa mga \"pilgrim center,\" ug sa mga acto sa pagpasakit ug paghigugma sa isigkatawo.",
      "Ang Sta. Iglesya dunay gahom sa paghimo og mga lagda o tulomanon alang sa mga sakop, \"Sa ilang pag-agi sa mga kalungsoran ilang gitugyan ngadto sa mga magtutuo ang mga lagda nga gikauyonan sa mga apostoles ug sa mga pangulo sa iglesia sa Jerusalem, ug gipahimangnoan sila sa pagtuman niini\" (Buh. 16:4).",
      "Ang pagtulon-an sa indulhensya dili masupak sa mga teksto nga gigamit sa atong mga kaatbang. Ang giingon sa Panultihon nga \"ang gugma mopasaylo sa tanang kalapasan\" nagpasabot kini nga ang dunay tinuod nga paghigugma sa iyang isigkatawo makamao gyod nga mopasaylo ug dili magdumot. Ang kompleto nga pasahe mao kini, \"Makasamok ang pagdumot, apan ang gugma mopasaylo sa tanang kalapasan\" (Prob. 10:12).",
      "Ang giingon nga \"ang gugma nagtabon sa daghang mga sala\" (1 Ped. 4:8) labot gihapon kini sa atong relasyon ngadto sa atong isigkatawo nga kinahanglan andam sa kita sa paghikalimot sa mga kasaypanan nga nabuhat nganhi kanato sa atong isigkatawo.",
      "Tinuod nga pinaagi sa dugo ni Cristo midangat kanato ang kapasayloan sa atong mga sala apan kinahanglan usab nga kita mohimo sa atong bahin sama sa pagtuo ug paghinulsol, ug sa pagdawat sa mga kastigo temporal gumikan sa atong mga sala ingon nga gasa gikan sa Dios aron kita mahingpit. \"Kon kastigohon kita, makasubo kini kanato inay makalipay. Apan sa kaulahian kadtong nakadawat sa maong pagpanton makaani sa kinabuhing matarong ug ganting malinawon\" (Heb. 12:11).",
      "Ang gipasabot ni San Pablo diha sa Col. 2:14 mao kadtong mga balaod sa Daang Tugon nga gipahunong na ug ang wala magtuman niadto dili na isipon nga sad-an kay si San Pablo mipadayon sa pag-ingon, \"Busa ayaw ninyo itugot nga may magsaway kaninyo sa inyong kan-on o imnon, o bahin sa mga adlaw nga balaan, o sa pangilin sa bag-ong bulan... Kining tanan mga landong lamang sa mga butang nga umaabot, apan ang katumanan mao si Cristo\" (Col. 2:16-17).",
      "Ang pag-ingon ni Jesus nga \"natapos na\" mahitungod kini sa iyang misyon sa pagpanubos kanato apan kita usab gitawag aron sa pag-ambit sa mga pag-antos ni Cristo, \"Kay gihatagan kamo sa pribilihiyo, dili lamang sa pagtuo kang Cristo, kondili sa pagpasakit usab tungod kaniya\" (Fil 1:29).",
    ].join("\n\n"),
    createdAt: "Oct 14, 2014",
    readTime: "8 min read",
  },
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

function getPostParagraphs(body: string) {
  return body
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export default function FaithPostsApp() {
  const [selectedType, setSelectedType] = useState<PostType | "All">("All");
  const [selectedPostId, setSelectedPostId] = useState(posts[0].id);

  const visiblePosts = useMemo(() => {
    if (selectedType === "All") {
      return posts;
    }

    return posts.filter((post) => post.type === selectedType);
  }, [selectedType]);

  const selectedPost =
    visiblePosts.find((post) => post.id === selectedPostId) ??
    visiblePosts[0] ??
    posts[0];
  const selectedPostParagraphs = getPostParagraphs(selectedPost.body);

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

        <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
          <div className="grid gap-5 lg:grid-cols-[320px_1fr] lg:items-start">
            <div>
              <label
                className="text-xs font-bold uppercase text-stone-500"
                htmlFor="post-category"
              >
                Category
              </label>
              <select
                className="mt-2 w-full rounded-lg border border-stone-300 bg-white px-3 py-3 text-base font-semibold text-stone-800 shadow-sm outline-none transition focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/20"
                id="post-category"
                onChange={(event) =>
                  setSelectedType(event.target.value as PostType | "All")
                }
                value={selectedType}
              >
                {(["All", ...postTypes] as const).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <h2 className="text-xl font-semibold">Posts</h2>
              <p className="mt-1 text-sm text-stone-500">
                {visiblePosts.length} post
                {visiblePosts.length === 1 ? "" : "s"} in this list
              </p>
              <ul className="mt-4 grid gap-2 md:grid-cols-2">
                {visiblePosts.map((post) => {
                  const isSelected = post.id === selectedPost.id;

                  return (
                    <li key={post.id}>
                      <button
                        aria-current={isSelected ? "true" : undefined}
                        className={`w-full rounded-lg border px-4 py-3 text-left shadow-sm transition ${
                          isSelected
                            ? "border-emerald-800 bg-emerald-800 text-white"
                            : "border-stone-200 bg-stone-50 text-stone-800 hover:border-emerald-800"
                        }`}
                        onClick={() => setSelectedPostId(post.id)}
                        type="button"
                      >
                        <span className="block text-base font-semibold">
                          {post.title}
                        </span>
                        <span
                          className={`mt-1 block text-xs font-medium uppercase ${
                            isSelected ? "text-emerald-50" : "text-stone-500"
                          }`}
                        >
                          {post.type} - {post.readTime}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        <article className="rounded-lg border border-stone-200 bg-white p-6 text-center shadow-sm">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase text-emerald-800">
              Selected
            </span>
            <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-bold uppercase text-stone-600">
              {selectedPost.type}
            </span>
            <span className="text-sm text-stone-500">
              {selectedPost.createdAt} - {selectedPost.readTime}
            </span>
          </div>

          <h2 className="mx-auto mt-4 max-w-4xl text-3xl font-semibold leading-tight sm:text-4xl">
              {selectedPost.title}
          </h2>
          <p className="mt-2 text-sm font-semibold text-stone-500">
            {selectedPost.reference}
          </p>
          <div className="mx-auto mt-5 flex max-w-4xl flex-col gap-5 text-center text-lg leading-8 text-stone-700">
            {selectedPostParagraphs.map((paragraph, index) => (
              <p key={`${selectedPost.id}-${index}`}>{paragraph}</p>
            ))}
          </div>
        </article>

        <section>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">All Posts</h2>
              <p className="mt-1 text-sm text-stone-500">
                Choose a category above, then open a post from the list.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {visiblePosts.map((post) => (
              <article
                className="rounded-lg border border-stone-200 bg-white p-5 text-center shadow-sm"
                key={post.id}
              >
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase text-emerald-800">
                    {post.type}
                  </span>
                  <span className="text-sm text-stone-500">
                    {post.createdAt} - {post.readTime}
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-semibold">{post.title}</h3>
                <p className="mt-2 text-sm font-semibold text-stone-500">
                  {post.reference}
                </p>
                <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-stone-700">
                  {post.excerpt}
                </p>
                <button
                  className="mt-5 rounded-lg border border-emerald-800 px-4 py-2 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-800 hover:text-white"
                  onClick={() => setSelectedPostId(post.id)}
                  type="button"
                >
                  View post
                </button>
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
