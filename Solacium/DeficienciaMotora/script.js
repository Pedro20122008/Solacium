"use strict";

/* SEU LUGAR À MESA — Como me sinto, história 03.
   Cenas, decisões e lembranças. A cadeira de rodas faz parte da vida de Daniel;
   o drama está nos vínculos, no acesso, no luto e no que fica por dizer.
   Sem reflexos, cronômetros, cura milagrosa ou pontuação por aceitar apoio. */

(() => {
  const $ = (id) => document.getElementById(id);
  const SAVE_KEY = "seu-lugar-a-mesa-historia-v1";
  const PREFS_KEY = "seu-lugar-a-mesa-preferencias-v1";
  const ART = {};

  /* 1. ARTE. SVGs próprios: cenários offline e descrições em cada cena. */
  const svg = (body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice"><defs>
    <linearGradient id="sky" x2="0" y2="1"><stop stop-color="#283744"/><stop offset=".63" stop-color="#798486"/><stop offset="1" stop-color="#bb9c7d"/></linearGradient>
    <linearGradient id="wall" x2="1" y2=".4"><stop stop-color="#5c5b58"/><stop offset="1" stop-color="#908274"/></linearGradient>
    <linearGradient id="nightwall" x2="1" y2=".3"><stop stop-color="#29343d"/><stop offset="1" stop-color="#596364"/></linearGradient>
    <linearGradient id="window" x2="0" y2="1"><stop stop-color="#e8c78b"/><stop offset="1" stop-color="#a88660"/></linearGradient>
    <linearGradient id="floor" x2="0" y2="1"><stop stop-color="#6e6458"/><stop offset="1" stop-color="#23323a"/></linearGradient>
    <radialGradient id="glow"><stop stop-color="#f7d4a3" stop-opacity=".55"/><stop offset="1" stop-color="#f7d4a3" stop-opacity="0"/></radialGradient>
    <linearGradient id="light" x2="1" y2="1"><stop stop-color="#edce96" stop-opacity=".28"/><stop offset="1" stop-color="#edce96" stop-opacity="0"/></linearGradient>
    <linearGradient id="rain" x2="0" y2="1"><stop stop-color="#c5d4d4" stop-opacity="0"/><stop offset="1" stop-color="#c5d4d4" stop-opacity=".23"/></linearGradient>
  </defs><g class="scene-paint">${body}</g></svg>`;

  const wheelchair = (x, y, scale = 1) => `<g transform="translate(${x} ${y}) scale(${scale})">
    <ellipse cx="45" cy="142" rx="128" ry="17" fill="#17282d66"/>
    <g fill="none" stroke="#a3aaa2"><circle cx="0" cy="47" r="76" stroke-width="8"/><circle cx="0" cy="47" r="65" stroke-width="2"/><path d="M0-25v144M-71 47H71M-51-5l102 104M-51 99L51-5" stroke-width="1.5" opacity=".8"/></g>
    <circle cx="0" cy="47" r="10" fill="#55666a"/>
    <path d="M-28-61h12v67h99l17 88h52" fill="none" stroke="#adb8b5" stroke-width="8" stroke-linejoin="round"/>
    <path d="M-32-69h18v74h-18zM-21-4h105v15H-21z" fill="#273a46"/>
    <path d="M80 16l32 59M81 9L27 107M123 92v26" stroke="#708185" stroke-width="7" fill="none"/>
    <circle cx="125" cy="123" r="19" fill="#26343d" stroke="#8a9d9a" stroke-width="5"/>
    <path d="M-18-63q1-32 32-34 33-1 40 30L61-3H-9z" fill="#7c8784"/>
    <path d="M-7-66q-9 27-18 50l-12 22M43-66l22 43 20 2" fill="none" stroke="#6c7a7a" stroke-width="17" stroke-linecap="round"/>
    <path d="M-37 6l-14 15M83-21l13-2" stroke="#c0a388" stroke-width="10" stroke-linecap="round"/>
    <path d="M4-5h68l26 65h25" stroke="#2f4651" stroke-width="27" fill="none" stroke-linejoin="round"/>
    <path d="M106 62h32l7 13h-40z" fill="#172f3b"/>
    <ellipse cx="18" cy="-127" rx="25" ry="30" fill="#b79b84"/>
    <path d="M-7-128q-2-39 26-38 28 1 27 38l-10-19-31 4z" fill="#26333b"/>
  </g>`;
  const house = (ramp, person) => svg(`<path fill="url(#sky)" d="M0 0h1600v1000H0z"/>
    <path fill="#2e4246" d="M0 350q164-136 348-4t245-44v496H0z"/>
    <path fill="#717468" d="M533 180h1067v601H533z"/><path fill="url(#wall)" d="M620 181h980v591H620z"/>
    <path fill="#34434a" d="M487 182L719 41h881v154z"/><path fill="#536066" d="M535 161L733 58h867v14H737L572 171z"/>
    <path fill="#b2a28a" d="M610 195h990v23H610z"/><path fill="#514c49" d="M611 759h989v35H611z"/>
    <path fill="#293c44" d="M728 289h306v278H728z"/><path fill="url(#window)" d="M744 305h274v247H744z"/>
    <circle fill="url(#glow)" cx="880" cy="424" r="250"/>
    <path fill="#736550" d="M744 489h274v15H744zM872 305h11v249h-11zM744 414h274v8H744z"/>
    <path fill="#eed9b5" opacity=".2" d="M740 301q35 122 0 257h47q22-137 4-257zM971 301q-17 164 12 257h34V301z"/>
    <path fill="#31434a" d="M1142 264h238v497h-238z"/><path fill="url(#window)" d="M1157 280h208v462h-208z"/>
    <path fill="#534d43" d="M1219 285l145-6v464l-145-17z"/><path fill="#726854" d="M1238 306l103-5v396l-103-10z"/>
    <circle cx="1247" cy="516" r="5" fill="#e5c69a"/>
    <path fill="#b5aa8b" d="M1133 740h262v18h-262z"/>
    <path fill="url(#light)" d="M1156 739h210l234 261h-740z"/>
    <path fill="#56605a" d="M0 797l1600-19v222H0z"/>
    <path fill="url(#floor)" d="M0 913l1600-128v215H0z"/>
    ${ramp ? `<path fill="#9b9780" d="M1137 761h258l-423 239H666z"/><path fill="#b6ad93" d="M1137 761h258l-25 14h-257z"/><path fill="none" stroke="#b8b9a6" stroke-width="9" d="M1120 714L651 963m729-249-428 249"/><g stroke="#8e9d91" stroke-width="6"><path d="M1118 714v63M968 792v62M810 879v63M1380 714v57M1238 796v60M1097 875v62"/></g>` : `<path fill="#a09a83" d="M1114 761h306v23h-306z"/><path fill="#797c6c" d="M1093 784h345v25h-345z"/><path fill="#989581" d="M1071 808h385v26h-385z"/><path fill="#797a6c" d="M1052 834h426v30h-426z"/>`}
    <path fill="#263b42" d="M606 208h23v593h-23zM1508 209h23v595h-23z"/><path fill="#414f50" d="M594 784h47v18h-47zM1495 786h49v18h-49z"/>
    <path fill="#a9a38d" d="M1434 682h63l-11 81h-42z"/><g fill="#66735b"><path d="M1466 686q-64-100-31-112 46 35 31 112zM1469 687q-1-102 39-102 27 60-39 102zM1468 683q45-54 69-24-12 39-69 24z"/></g>
    <path fill="#e7d5a5" d="M951 449l34-2 3 46-34 2z"/><g fill="none" stroke="#887566" stroke-width="2"><path d="M959 475l9-13 10 11m-14 8h11m-8-15v17"/></g>
    <path fill="#3d5255" d="M318 642h15v270h-15z"/><path fill="#ddc4a0" d="M283 630q42-41 84 0v20h-84z"/><circle fill="url(#glow)" cx="325" cy="637" r="115" opacity=".65"/>
    <g stroke="url(#rain)" stroke-width="1.2"><path d="M120 5l-55 420M342 80l-55 420M552 35l-55 420M774 0l-55 420M1014 90l-55 420M1252 2l-55 420M1504 80l-55 420M243 403l-55 420M643 408l-55 420M1083 400l-55 420M1496 449l-55 420"/></g>
    ${person ? wheelchair(ramp ? 1080 : 957, ramp ? 820 : 843, .8) : ""}
    <path fill="#1c303a" d="M0 953q238-46 460 47H0z"/>
  `);
  ART.cover = house(false, true);
  ART.steps = house(false, true);
  ART.ramp = house(true, true);

  const chair = (x, y, scale = 1) => `<g transform="translate(${x} ${y}) scale(${scale})" stroke="#7c624a" stroke-width="12" fill="none"><path d="M0 110V-30q60-21 120 0v140M0-16h120M3 22h114M4 56h112M-9 111h140M2 119v143M118 119v143"/><path d="M7 120h108v17H7z" fill="#927359" stroke-width="3"/></g>`;
  const tableScene = (before = false) => svg(`<path fill="url(#nightwall)" d="M0 0h1600v1000H0z"/><path fill="url(#floor)" d="M0 746h1600v254H0z"/>
    <path fill="#40545a" d="M642 116h349v488H642z"/><path fill="#9a9a86" d="M659 133h315v452H659z"/>
    <path fill="#dbc39a" d="M674 147h285v420H674z"/><path fill="#526b67" d="M674 485q61-87 137-41t148-42v165H674z"/>
    <path fill="#49575a" d="M808 140h12v441h-12zM668 360h297v10H668z"/>
    <path fill="#b1a88f" opacity=".3" d="M626 112q31 191-5 493h68q-24-230-9-493z"/>
    <path fill="#405158" d="M1120 140h248v198h-248z"/><path fill="#b0ac91" d="M1135 155h218v167h-218z"/>
    <path fill="#708075" d="M1153 303v-86h22v86m60 0v-117h25v117m60 0v-69h17v69"/>
    <path fill="none" stroke="#8b7060" stroke-width="3" d="M1150 215q83-60 185 13"/>
    <path fill="#ced1b3" d="M1479 350h90v169h-90z"/><path fill="#d0aa83" d="M1498 386l18-8 35 53-20 18z"/>
    <path fill="#3d5054" d="M511 635h230v182H511z"/><path fill="#7b8071" d="M529 651h196v151H529z"/>
    ${chair(1185, 520, 1.18)}
    ${before ? `<ellipse fill="#bca387" cx="1253" cy="448" rx="30" ry="36"/><path fill="#777b72" d="M1201 508q51-41 101 0l16 144h-131z"/><path fill="#b9b7a3" d="M1221 423q32-29 58 3l8 21h-67z"/>` : ""}
    <path fill="#504f46" d="M742 642l48 325h19l-32-325zM1374 648l69 319h19l-47-319z"/>
    <path fill="#ac906c" d="M672 607l635-55 236 137-649 121-222-142z"/>
    <path fill="#c2a27b" d="M672 607l635-55 236 137-649 88z"/>
    <path fill="#c8b293" d="M745 607l526-46 196 110-543 71z"/>
    <g fill="#d8c6a7"><ellipse cx="1239" cy="607" rx="60" ry="20"/><ellipse cx="972" cy="689" rx="67" ry="22"/><ellipse cx="1393" cy="676" rx="54" ry="18"/></g>
    <g fill="none" stroke="#aaa18b" stroke-width="2"><ellipse cx="1239" cy="607" rx="47" ry="15"/><ellipse cx="972" cy="689" rx="51" ry="16"/></g>
    <path fill="#304d54" d="M1137 579h33v35q-17 10-33 0z"/><path fill="none" stroke="#304d54" stroke-width="6" d="M1170 586q25-4 18 17h-18"/>
    <path fill="#d3bb90" d="M1139 579h7v8h-7z"/>
    <path fill="#9b694e" d="M1021 609q36-24 67-6l-3 22-61 2z"/>
    <path fill="#d2b38a" d="M1024 607l60-2-11 13-47 2z"/>
    <path fill="#e5d7b6" d="M1289 655l57-10 20 33-61 10z"/><path fill="none" stroke="#807b6c" stroke-width="1.5" d="M1300 661l38-6m-34 13 38-7"/>
    <path stroke="#3e4e53" stroke-width="4" d="M1115 0v207"/><path fill="#c5b38e" d="M1030 260q83-104 169 0z"/><ellipse fill="url(#glow)" cx="1115" cy="294" rx="300" ry="270" opacity=".65"/>
    <path fill="url(#light)" d="M1067 262h97l286 465-694 86z"/>
    ${before ? "" : wheelchair(725, 826, 1.05)}
    <g stroke="#7b867c" stroke-opacity=".2"><path d="M0 839h1600M0 933h1600M513 745L386 1000M916 745l54 255M1290 745l206 255"/></g>
  `);
  ART.before = tableScene(true);
  ART.table = tableScene(false);

  ART.hospital = svg(`<path fill="#43555f" d="M0 0h1600v1000H0z"/><path fill="#758382" d="M0 700h1600v300H0z"/>
    <path fill="#314650" d="M771 110h620v454H771z"/><path fill="#8b9d9e" d="M788 128h585v417H788z"/>
    <path fill="#6b8389" d="M789 421l127-54 77 51 101-87 72 61 206-73v226H789z"/>
    <path fill="#516b76" d="M790 467h583v79H790z"/><path fill="#405764" d="M1069 126h13v420h-13z"/>
    <path fill="#c2c8b4" d="M1410 73h70v641h-70z"/>
    <path fill="#8c9f9b" d="M659 675h782v36H659zM691 708h26v189h-26zM1394 709h26v188h-26z"/>
    <path fill="#c2ccc1" d="M683 616l615-78 140 127-746 29z"/>
    <path fill="#e0dfca" d="M712 611l161-26 94 88-256 14z"/>
    <path fill="#8eaaa8" d="M865 584l431-45 132 127-464 18z"/>
    <path fill="#2a4450" d="M653 520h23v192h-23zM1435 518h23v192h-23z"/>
    <path fill="none" stroke="#b2c4be" stroke-width="7" d="M690 629h718M701 657h708"/>
    <path fill="#3b5260" d="M1158 167h196v160h-196z"/><path fill="none" stroke="#a5c6b6" stroke-width="3" d="M1177 258h37l11-32 15 67 16-52 17 17h66"/>
    <path fill="#a5b4ac" d="M1306 331h13v186h-13z"/><path fill="#a9afa1" d="M1241 510h151v87h-151z"/>
    <path fill="#d9d3b9" d="M1261 476h30v35h-30z"/><path fill="#ece0ba" d="M1270 445l10-33 8 33z"/>
    ${chair(858, 732, .7)}
    <path fill="url(#light)" d="M791 490l582 59 227 451H324z"/>
    <g stroke="#84988d" stroke-width="2" opacity=".3"><path d="M0 805h1600M0 912h1600M414 703l-215 297M825 703l-11 297M1220 703l220 297"/></g>
  `);

  ART.home = svg(`<path fill="url(#nightwall)" d="M0 0h1600v1000H0z"/><path fill="url(#floor)" d="M0 746h1600v254H0z"/>
    <path fill="#8b9385" d="M961 148h482v444H961z"/><path fill="#9ca6a0" d="M980 168h444v403H980z"/>
    <path fill="#5d797e" d="M980 448l104-82 96 62 143-89 100 74v158H980z"/>
    <path fill="#3b535f" d="M1200 167h14v404h-14zM977 365h451v12H977z"/>
    <path fill="#4c5f63" d="M471 407h230v314H471z"/><path fill="#c7c3aa" d="M489 424h195v281H489z"/>
    <g fill="none" stroke-width="5"><path stroke="#a28176" d="M517 628l43-95 77 100m-105-70 101 2"/><path stroke="#729188" d="M551 661l29-36 48 42"/><path stroke="#8b7e9a" d="M520 450l17 28 32-14 12 40"/></g>
    <path fill="#2c414b" d="M1121 668q10-52 59-52h214q58 1 60 52v169h-333z"/>
    <path fill="#66716e" d="M1135 643h301v124h-301z"/><path fill="#9d9c85" d="M1154 663l69-1-2 69-63-2z"/>
    <path fill="#374b50" d="M1112 758h347v71h-347zM1133 829h15v94h-15zM1425 829h15v94h-15z"/>
    <path fill="#927e61" d="M885 680h17v211h-17z"/><path fill="#c4b18d" d="M825 675l21-85h96l24 85z"/><circle fill="url(#glow)" cx="896" cy="660" r="200"/>
    <path fill="#53635f" d="M667 829h354v21H667zM685 850h16v107h-16zM988 850h16v107h-16z"/>
    <path fill="#b3a588" d="M655 805h377v24H655z"/>
    <path fill="#e4d2ad" d="M727 780l90-4 4 22-93 2z"/>
    <path fill="none" stroke="#ad847b" stroke-width="3" d="M745 783l18 11 15-13 20 11"/>
    ${wheelchair(1039, 815, 1.03)}
    <g transform="translate(1230 854)"><path fill="#b7977b" d="M-17-84h39v43h-39z"/><ellipse fill="#c6a78b" cy="-101" rx="20" ry="24"/><path fill="#3f3c3a" d="M-21-99q-3-34 23-33 26 4 19 42l-8-25-22 4z"/><path fill="#a58175" d="M-26-65q28-20 53 0l12 75h-78z"/><path stroke="#3d5261" stroke-width="14" d="M-13 9l-4 44M17 9l4 44"/><path stroke="#c6a78b" stroke-width="10" stroke-linecap="round" d="M-27-56l-30 36M27-56l21 32"/></g>
  `);

  ART.workshop = svg(`<path fill="#34444b" d="M0 0h1600v1000H0z"/><path fill="url(#floor)" d="M0 747h1600v253H0z"/>
    <path fill="#665f53" d="M508 163h1030v416H508z"/><path fill="#827560" d="M531 187h984v369H531z"/>
    <g fill="none" stroke="#484d46" stroke-width="8"><path d="M618 230v182M666 230v182M797 257h153M1030 246v183M1190 239v198M1379 230l-67 197"/></g>
    <g fill="#9e9b81"><path d="M606 397h24v65h-24zM654 397h24v65h-24zM1020 409h22v62h-22zM1179 425h22v50h-22z"/></g>
    <path fill="#c5b38c" d="M610 250h68v42h-68zM791 243h165v31H791zM1006 239h49v33h-49zM1170 230h39v48h-39z"/>
    <path fill="#c5b898" d="M980 299l151-5 9 197-159 9z"/><g fill="none" stroke="#778779" stroke-width="2"><path d="M999 335h113M999 353h72M1000 432l95-32 20 63h-115zM1008 430v-31h66v10"/></g>
    <path fill="#b0ad95" d="M1195 296l106 7-9 145-108-7z"/><g fill="none" stroke="#7e8a78" stroke-width="2"><path d="M1206 322l73 4m-74 17 73 5m-73 17 48 2m-51 28 62-10"/></g>
    <path fill="#4b4941" d="M583 685h31l-26 281h-28zM1438 681h28l44 285h-29z"/>
    <path fill="#a28362" d="M530 619h1001v64H530z"/><path fill="#c1a078" d="M514 603h1038v30H514z"/>
    <path fill="#b6ac8e" d="M825 585l124-9 8 29-125 8z"/>
    <path fill="#315360" d="M1054 552h37v47q-18 9-37 0z"/><path fill="none" stroke="#315360" stroke-width="7" d="M1090 559q25-2 18 23h-18"/>
    <path fill="#d6c5a0" d="M1054 551h10v9h-10z"/>
    <path fill="#d5c9a8" d="M1196 568l123-12 25 39-128 15z"/><path fill="none" stroke="#948a72" stroke-width="2" d="M1201 572l63 17 53-30"/>
    <path fill="#76858a" d="M716 575l86-6 3 13-86 8z"/>
    <path fill="#bba987" d="M1438 458h15v147h-15z"/><path fill="#cfb993" d="M1381 455l18-70h90l21 70z"/><circle fill="url(#glow)" cx="1446" cy="469" r="227"/>
    <path fill="#8b785e" d="M1339 733h28v222h-28zM1405 733h28v222h-28z"/>
    <ellipse fill="#a68b68" cx="1386" cy="731" rx="74" ry="20"/>
    <path fill="#4d5c5e" d="M557 815h354v17H557z"/>
  `);

  /* 2. ROTEIRO. Os nomes das chaves de escolha fazem parte do salvamento. */
  const MEMORIES = {
    cup: { title: "A caneca azul", text: "A caneca azul tem uma lasca na borda. Meu pai sempre dizia que o café ficava melhor nela. Era a mesma caneca desde que eu era pequeno.", ending: "Coloco a caneca azul no lugar do meu pai. O café esfria enquanto a gente conversa, como sempre aconteceu naquela mesa." },
    bread: { title: "O pão cortado torto", text: "Meu pai media madeira com precisão e cortava o pão todo torto. Dizia que assim cada um encontrava um pedaço do seu tamanho.", ending: "Corto o pão do jeito torto do meu pai. Lia escolhe o pedaço maior. Por um segundo, escuto a risada dele na minha própria voz." },
    note: { title: "O bilhete na geladeira", text: "Na geladeira havia um papel antigo: domingo, meio-dia. Não era um lembrete do almoço. Era o jeito do meu pai pedir que a gente voltasse.", ending: "Deixo o bilhete na geladeira. Embaixo de domingo, meio-dia, Lia desenha mais uma pessoa. Ela já está pensando em quem convidar." }
  };
  const SCENES = [
    {
      chapter: 1, chapterName: "O que era casa", when: "Um domingo · antes do acidente", kicker: "01 / AS COISAS PEQUENAS", title: "O barulho de uma casa.", art: "before", mood: 0, environment: "memory",
      description: "Uma cozinha antiga ao meio-dia. Há pão, uma caneca azul e um homem de cabelos grisalhos à cabeceira da mesa.",
      paragraphs: ["Meu pai sabia o tamanho de qualquer coisa só de olhar. Tábua, janela, batente. Trabalhou com madeira a vida inteira. Com palavras, era mais desajeitado.", "Quando eu chegava, não dizia que estava com saudade. Perguntava se eu tinha comido. Mesmo com o almoço pronto na mesa.", "Eu me chamo Daniel. Naquele domingo, minha filha Lia estava debaixo da mesa, tentando descobrir como uma casa podia fazer tantos barulhos conhecidos."],
      type: "choice", key: "memory", objective: "Escolha um detalhe dessa casa para guardar. Ele estará com você até o final.",
      choices: [
        { label: "A caneca azul do meu pai", detail: "Uma lasca na borda. Café forte.", value: "cup", cue: "cup", feedback: "Meu pai gira a caneca para esconder a lasca. Faz isso há tantos anos que ninguém mais comenta. Eu guardo o gesto." },
        { label: "O pão que ele corta torto", detail: "Pedaços de todos os tamanhos.", value: "bread", cue: "paper", feedback: "Lia pega o pedaço maior. Meu pai finge espanto. Ela ri com a boca cheia, e ele termina rindo também. Eu guardo esse barulho." },
        { label: "O bilhete na geladeira", detail: "Domingo, meio-dia.", value: "note", cue: "paper", feedback: "O papel está amarelado. A letra é grande, quase toda em maiúsculas. Meu pai passa por ele todos os dias. Nunca o tira dali." }
      ]
    },
    {
      chapter: 1, chapterName: "O que era casa", when: "Na porta · depois do almoço", kicker: "01 / UMA PROMESSA COMUM", title: "Domingo eu volto.", art: "steps", mood: 0, environment: "memory",
      description: "A casa vista do portão. Três degraus levam à porta; a cozinha continua acesa.",
      paragraphs: ["Na saída, meu pai encostou a mão no portão para segurar a conversa por mais alguns segundos.", { dialogue: "“Vai trazer a menina semana que vem?”" }, "Eu já procurava a chave do carro no bolso. Respondi como quem responde uma coisa que nunca vai mudar."],
      type: "choice", key: "promise", objective: "O que você diz ao se despedir?",
      choices: [
        { label: "Domingo eu volto, pai", value: "sunday", feedback: "“Então eu compro mais pão.” Foi a última frase daquele almoço. Uma frase pequena, entre milhares de outras." },
        { label: "Me liga quando sentir saudade", value: "call", feedback: "Ele fez um gesto vago, como se telefone fosse coisa complicada. Naquela noite, me ligou para perguntar se eu tinha chegado bem." }
      ]
    },
    {
      chapter: 1, chapterName: "O que era casa", when: "Depois · um quarto de hospital", kicker: "01 / A VIDA ENTRE DOIS DIAS", title: "Quando abri os olhos.", art: "hospital", mood: 1, environment: "hospital",
      description: "Um quarto de hospital, luz de fim de tarde e uma cadeira ao lado da cama. O acidente não é mostrado.",
      paragraphs: ["Houve uma colisão na estrada entre aquele almoço e este quarto. Da noite do acidente, tenho lembranças em pedaços. O teto. Uma pergunta repetida. O medo de perguntar por Lia.", "Ela não estava no carro.", "Depois vieram as conversas sobre a lesão medular, a reabilitação e os cuidados. Passei a usar cadeira de rodas. Aos 29 anos, precisei aprender muita coisa enquanto ainda tentava entender o que tinha acontecido.", "Meu pai sentou ao lado da cama e segurou um copo de água que ninguém tinha pedido."],
      type: "next", objective: "A história continua quando você quiser. Você pode pausar a qualquer momento."
    },
    {
      chapter: 1, chapterName: "O que era casa", when: "Meses depois · em casa", kicker: "01 / A PERGUNTA DE LIA", title: "Posso te abraçar?", art: "home", mood: 0, environment: "rain",
      description: "Daniel está em sua cadeira de rodas na sala. Lia segura um desenho de três pessoas perto de uma casa.",
      paragraphs: ["Quando voltei para casa, Lia ficou parada na porta da sala. Eu ensaiei uma explicação que tinha levado dias para organizar.", { dialogue: "“Pai… posso te abraçar?”" }, "Era só isso. A pergunta que ela vinha guardando. Eu tinha preparado tantas respostas que demorei a dizer a mais simples."],
      type: "choice", key: "daughter", objective: "Como você responde à sua filha?",
      choices: [
        { label: "Pode. Eu estava esperando", value: "hug", feedback: "Lia se aproxima e me abraça. Fico com o rosto no cabelo dela. Quando percebo, estou chorando. Ela segura minha mão sem pedir que eu pare." },
        { label: "Vem me mostrar seu desenho", value: "drawing", feedback: "Ela põe o desenho nas minhas mãos e se encosta em mim. Acrescentou rodas à minha figura. “Pronto”, diz. “Agora ficou parecido.” Guardo o papel com cuidado." }
      ], note: { id: "lia", title: "O desenho de Lia", text: "Três pessoas perto de uma casa. Lia acrescentou rodas ao desenho do pai e continuou desenhando o resto da família." }
    },
    {
      chapter: 1, chapterName: "O que era casa", when: "Uma visita do meu pai", kicker: "01 / APRENDER A ESTAR PERTO", title: "Deixa que eu te digo.", art: "home", mood: 0, environment: "room",
      description: "Pai e filho na sala. Daniel está diante da mesa, ao alcance dos seus objetos.",
      paragraphs: ["Meu pai passou a chegar com sacolas demais e a levantar antes de qualquer pedido. Um dia, pegou nas manoplas da cadeira para me levar até a janela sem perguntar.", "Eu pedi que parasse. Ele soltou na mesma hora, com um susto no rosto. Ficamos os dois procurando onde colocar as mãos."],
      type: "choice", key: "help", objective: "O que você precisa dizer?",
      choices: [
        { label: "Pergunta antes de me ajudar, pai", value: "ask", feedback: "“Tá bom”, ele diz. Depois de um silêncio, pergunta se eu quero chegar mais perto da janela. Dessa vez, posso responder." },
        { label: "Fica comigo um pouco. Só isso", value: "stay", feedback: "Ele puxa uma cadeira e senta na minha frente. Pela primeira vez naquela tarde, paramos de procurar uma coisa para consertar." }
      ], note: { id: "consent", title: "Uma ajuda que começa com uma pergunta", text: "Daniel escolhe quando e como receber apoio. A cadeira de rodas faz parte do espaço pessoal dele." }
    },
    {
      chapter: 2, chapterName: "Do lado de fora", when: "O primeiro almoço de volta", kicker: "02 / TRÊS DEGRAUS", title: "A casa era a mesma.", art: "steps", mood: 1, environment: "rain",
      description: "A entrada da casa tem três degraus e não oferece uma passagem acessível. Daniel e Lia aguardam junto ao portão.",
      paragraphs: ["O cheiro do almoço chegava até a rua. A cortina era a mesma. O cachorro do vizinho também. Reconheci tudo antes de perceber os três degraus.", "Eu tinha subido aqueles degraus a vida inteira. Agora, a família se juntava do outro lado deles, falando ao mesmo tempo sobre o que fazer.", "Lia segurava o desenho. Tinha vindo mostrar ao avô."],
      type: "next", objective: "Observe a entrada e quem está do outro lado da porta."
    },
    {
      chapter: 2, chapterName: "Do lado de fora", when: "Do lado do portão", kicker: "02 / O ALMOÇO MUDA DE LUGAR", title: "Eu também vim almoçar.", art: "steps", mood: 1, environment: "rain",
      description: "Há uma área plana no pátio. A família pode trazer a mesa para perto de Daniel.",
      paragraphs: ["Meu pai disse que podia preparar um prato para mim ali fora. Foi falando com pressa, tentando resolver alguma coisa antes que o silêncio aumentasse.", "Eu olhei para a porta. Lá dentro estavam o meu lugar, as histórias de domingo e uma mesa que eu conhecia de olhos fechados."],
      type: "choice", key: "lunch", objective: "Como você quer participar dessa conversa?",
      choices: [
        { label: "Quero comer junto com vocês", value: "together", feedback: "Peço que a mesa venha para o pátio, onde há espaço. Minha irmã Clara começa a trazer os pratos. Aos poucos, todo mundo vem também." },
        { label: "Pai, eu quero poder entrar em casa", value: "door", feedback: "Ele olha para os degraus. Depois para mim. “Eu sei”, responde, quase sem voz. Naquele dia, levamos a mesa para o pátio. A conversa sobre a entrada ficou conosco." }
      ], note: { id: "access", title: "O que precisa mudar na casa", text: "Os degraus e a falta de passagem impedem Daniel de entrar. A família precisa planejar acesso com ele, respeitando suas necessidades e escolhas." }
    },
    {
      chapter: 2, chapterName: "Do lado de fora", when: "Depois do almoço", kicker: "02 / UMA CONVERSA DIFÍCIL", title: "O que eu não dizia.", art: "home", mood: 1, environment: "room",
      description: "No fim da visita, pai e filho conversam sem a pressa de pôr ou tirar a mesa.",
      paragraphs: ["Meu pai ficou olhando para a xícara. Disse que sentia falta dos nossos domingos. Eu também sentia. Havia uma porção de outras coisas que eu vinha engolindo junto com essa saudade.", { dialogue: "“Eu tenho medo de falar alguma coisa errada”, ele disse." }],
      type: "choice", key: "truth", objective: "Escolha o que Daniel consegue dizer hoje.",
      choices: [
        { label: "Tenho me sentido deixado de fora", value: "outside", feedback: "Conto sobre a porta e sobre as conversas que passaram a acontecer por cima de mim. Meu pai escuta. Não responde rápido. Eu deixo que ele pense." },
        { label: "Também estou com medo, pai", value: "fear", feedback: "Digo que não tenho uma resposta pronta para todos os dias. Ele encosta a mão na mesa, perto da minha. Ficamos ali até eu decidir segurar." }
      ]
    },
    {
      chapter: 2, chapterName: "Do lado de fora", when: "Nas semanas seguintes", kicker: "02 / UMA PROMESSA NOVA", title: "Você escolhe comigo.", art: "workshop", mood: 0, environment: "memory",
      description: "A oficina do pai. Na bancada, há um desenho da entrada e da mesa; Clara e Daniel participam das decisões.",
      paragraphs: ["Meu pai começou a me telefonar com perguntas diferentes. Onde a mesa atrapalhava? Por qual entrada eu preferia chegar? O que precisava ficar ao meu alcance?", "Clara ajudou a organizar o projeto, com orientação profissional para as adaptações. Eu podia conferir as propostas antes de qualquer mudança.", { dialogue: "“Essa casa também é sua, filho. Me ajuda a abrir direito essa porta.”" }],
      type: "choice", key: "plan", objective: "Qual parte você quer discutir primeiro?",
      choices: [
        { label: "Uma entrada por onde eu possa passar", value: "entrance", feedback: "Escolhemos avaliar a entrada lateral e a passagem até a varanda. Meu pai anota cada coisa. Dessa vez, não começa cortando madeira: começa me ouvindo." },
        { label: "Meu lugar junto da mesa", value: "table", feedback: "Conversamos sobre o espaço para a cadeira e sobre o que preciso alcançar. Ele desenha uma mesa e deixa espaço para eu corrigir o desenho." }
      ], note: { id: "project", title: "Uma casa planejada comigo", text: "Entrada lateral, passagem livre e espaço junto à mesa. O projeto foi discutido com Daniel e realizado com apoio profissional." }
    },
    {
      chapter: 2, chapterName: "Do lado de fora", when: "Quase quatro meses depois", kicker: "02 / AS LIGAÇÕES DE SEMPRE", title: "Já almoçou?", art: "home", mood: 0, environment: "memory",
      description: "O celular de Daniel sobre a mesa. Na tela, uma chamada do pai. Perto dele está o desenho de Lia.",
      paragraphs: () => [state.choices.promise === "call" ? "Meu pai levou a sério aquilo de ligar quando sentisse saudade. Às vezes dizia que tinha apertado sem querer. A conversa durava vinte minutos." : "Meu pai passou a me ligar mais. Perguntava se eu tinha almoçado, se Lia estava bem, se o desenho ainda estava guardado.", "De vez em quando, eu ouvia barulho de obra ao fundo. Ele tentava disfarçar. Clara me mandava fotos das mudanças para eu conferir.", "Numa dessas ligações, ele ficou mais tempo em silêncio antes de se despedir."],
      type: "choice", key: "phone", objective: "Como você termina essa conversa?",
      choices: [
        { label: "Eu gosto quando você liga", value: "love", feedback: "Ele demora a responder. “Então eu ligo amanhã.” Fica esperando que eu desligue primeiro. Eu também espero um pouco." },
        { label: "Guarda um lugar para mim, pai", value: "place", feedback: "“Está guardado”, ele diz. Ouço alguma coisa pousar na bancada. Ele repete, mais baixo: “Está guardado.”" }
      ]
    },
    {
      chapter: 3, chapterName: "As palavras que ficaram", when: "Uma segunda-feira · 21h17", kicker: "03 / FORA DE HORA", title: "Dessa vez, era Clara.", art: "home", mood: 2, environment: "rain",
      description: "A sala está escura. O celular ilumina a mesa. Uma ligação chega depois que Lia já dormiu.",
      paragraphs: ["Clara sempre começava as ligações reclamando de alguma coisa pequena. Do trânsito. Da chuva. Da fila do mercado. Naquela noite, foi direto ao meu nome.", { dialogue: "“Daniel… o pai está no hospital.”" }, "Fiz perguntas uma em cima da outra. Ela respondeu as que podia. Depois falou que ele tinha pedido para me ver.", "Liguei para uma amiga ficar com Lia. Combinei com Clara o transporte acessível e saí."],
      type: "next", objective: "A próxima cena acontece no hospital. Continue quando quiser."
    },
    {
      chapter: 3, chapterName: "As palavras que ficaram", when: "Na entrada do hospital", kicker: "03 / UM CAMINHO ATÉ ELE", title: "Deixa a passagem livre.", art: "hospital", mood: 1, environment: "hospital",
      description: "O trajeto acessível combinado é: recepção, elevador, quarto. Clara acompanha Daniel.",
      paragraphs: ["Clara estava me esperando na entrada. Tinha conferido a passagem e combinado com a equipe a chegada ao quarto.", "Dessa vez, ninguém colocou as mãos na cadeira sem perguntar. Eu disse como preferia seguir. Ela ficou ao meu lado.", "Recepção. Elevador. Quarto. Uma coisa de cada vez."],
      type: "route", objective: "Organize o trajeto combinado: recepção → elevador → quarto. Você pode reler a descrição.",
      choices: [ { label: "Quarto", detail: "Onde meu pai está", value: "room", cue: "paper", pan: .6 }, { label: "Recepção", detail: "O começo do trajeto", value: "reception", cue: "tap", pan: -.6 }, { label: "Elevador", detail: "A ligação entre os andares", value: "lift", cue: "bell", pan: 0 } ],
      sequence: ["reception", "lift", "room"], routeHints: ["Começo pela recepção.", "Depois da recepção, vem o elevador.", "Depois do elevador, chego ao quarto."], completeText: "Recepção. Elevador. Quarto. Clara segura a porta aberta e espera que eu entre.", note: { id: "hospital", title: "O trajeto combinado", text: "Recepção, elevador, quarto. Clara acompanha Daniel e pergunta antes de oferecer ajuda." }
    },
    {
      chapter: 3, chapterName: "As palavras que ficaram", when: "Ao lado da cama", kicker: "03 / ENQUANTO AINDA HÁ VOZ", title: "Eu estou aqui, pai.", art: "hospital", mood: 1, environment: "hospital",
      description: "O pai está na cama. Há espaço para Daniel se aproximar com a cadeira; Clara fica perto da porta.",
      paragraphs: ["Meu pai parecia menor dentro daquele quarto. A mão que segurava tábuas enormes procurou a minha sobre o lençol.", { dialogue: "“A Clara te mostrou como ficou?”" }, "Eu disse que ainda não tinha visto pessoalmente. Ele apertou meus dedos com a força que tinha.", { dialogue: "“Queria ter visto você entrando.”" }],
      type: "choice", key: "bedside", objective: "O que Daniel consegue dizer neste momento?",
      choices: [
        { label: "Eu te amo, pai", value: "love", feedback: "Meu pai fecha os olhos por um instante. Quando abre, estão molhados. “Eu sei, filho.” A mão dele continua na minha." },
        { label: "Ainda temos tanta coisa para conversar", value: "unfinished", feedback: "Ele faz que sim com a cabeça. “Temos.” Ficamos de mãos dadas. Há coisas que eu ainda não consigo organizar em palavras, e ele não me apressa." }
      ]
    },
    {
      chapter: 3, chapterName: "As palavras que ficaram", when: "Terça-feira · antes de amanhecer", kicker: "03 / O DIA QUE VEIO", title: "Uma casa sem a voz dele.", art: "home", mood: 2, environment: "silence",
      description: "A sala ao amanhecer. O celular está apagado. O desenho de Lia continua sobre a mesa.",
      paragraphs: ["Meu pai morreu antes de amanhecer. Clara estava com ele.", "Eu cheguei em casa e fiquei algum tempo olhando para o telefone. Havia tantas ligações dele no histórico que, por um instante, pareceu impossível não haver mais uma.", "Lia apareceu na porta, de pijama. Eu respirei e fiz espaço perto de mim para conversar com ela.", "Foi quando precisei dizer em voz alta o que ainda não tinha conseguido escutar."],
      type: "next", objective: "Você pode ficar nesta cena ou usar Pausar. O jogo não avança sozinho.", nextLabel: "Ficar mais um pouco com Lia →"
    },
    {
      chapter: 3, chapterName: "As palavras que ficaram", when: "Naquela manhã", kicker: "03 / UMA PERGUNTA SEM RESPOSTA", title: "Quem vai cortar o pão?", art: "home", mood: 1, environment: "room",
      description: "Daniel e Lia estão juntos na sala. Ela segura o desenho que queria mostrar ao avô.",
      paragraphs: ["Expliquei com as palavras mais simples que consegui. Lia ouviu em silêncio. Fez algumas perguntas. Respondi devagar, sem fingir saber tudo.", "Depois, olhou para o desenho nas mãos.", { dialogue: "“E quem vai cortar o pão daquele jeito?”" }, "Foi uma pergunta tão pequena. Eu tinha conseguido dizer tanta coisa difícil até ali. Nessa, a minha voz acabou."],
      type: "choice", key: "grief", objective: "Como vocês ficam juntos neste momento?",
      choices: [
        { label: "Segurar a mão dela", value: "hand", feedback: "Lia aperta meus dedos. Eu conto que também vou sentir falta do pão e da voz dele. Ficamos assim pelo tempo de que precisamos." },
        { label: "Deixar que ela me veja chorar", value: "cry", feedback: "Choro com ela perto de mim. Digo que estou triste porque amava muito o vô. Lia encosta a cabeça no meu braço. O desenho fica entre nós." }
      ], note: { id: "grief", title: "O desenho que ficou entre nós", text: "Daniel e Lia podem falar da saudade, fazer perguntas e chorar. Há espaço para o que cada um consegue sentir e dizer." }
    },
    {
      chapter: 4, chapterName: "O que ele construía", when: "Duas semanas depois", kicker: "04 / A CHAVE DA OFICINA", title: "Ele deixou uma coisa.", art: "workshop", mood: 1, environment: "memory",
      description: "A oficina está quieta. Na bancada há uma caneca, um projeto e um caderno aberto. Clara guarda um envelope.",
      paragraphs: ["Eu ainda evitava o caminho da casa do meu pai. Um dia, Clara veio me buscar e deixou que eu decidisse se queria ir.", { dialogue: "“Ele deixou uma coisa para você. Eu queria te mostrar onde ele guardou.”" }, "Na oficina, faltava o barulho do rádio. O avental ainda estava pendurado no mesmo prego. Na bancada, havia um espaço limpo do tamanho dos braços dele."],
      type: "next", objective: "A oficina pode ser explorada sem pressa."
    },
    {
      chapter: 4, chapterName: "O que ele construía", when: "Sobre a bancada", kicker: "04 / OS DIAS QUE ELE NÃO CONTOU", title: "O que as mãos disseram.", art: "workshop", mood: 0, environment: "memory",
      description: "Três objetos podem ser examinados: o projeto da casa, um caderno de anotações e a caneca azul.",
      paragraphs: ["Clara se afasta um pouco para me deixar olhar. Reconheço as marcas de copo na madeira e uma queimadura antiga que eu tinha feito sem querer quando era menino.", "Entre os objetos de sempre, há coisas que eu nunca tinha visto."],
      type: "gather", objective: "Examine os três objetos. Cada um guarda uma parte dessa história.", completeText: "Eu releio as anotações. Durante meses, meu pai vinha tentando transformar em espaço tudo o que não conseguia dizer numa ligação.",
      choices: [
        { label: "O projeto da casa", detail: "Papéis com correções de várias mãos", value: "blueprint", cue: "paper", note: { id: "blueprint", title: "As correções no projeto", text: "O desenho reúne as decisões de Daniel, as conferências de Clara e a orientação profissional. Ao lado da mesa, o pai escreveu: deixar o Daniel escolher onde quer ficar." }, feedback: "As minhas observações estão copiadas no desenho. Ao lado do espaço da mesa, ele escreveu: “deixar o Daniel escolher onde quer ficar”. Reconheço um erro de ortografia que nunca consegui fazer meu pai abandonar." },
        { label: "O caderno de anotações", detail: "A letra grande do meu pai", value: "book", cue: "paper", note: { id: "book", title: "Uma linha fora da lista", text: "Entre materiais e compromissos, o pai anotou: perguntar da Lia. Na página seguinte: ligar para o Daniel sem inventar assunto." }, feedback: "Há listas de materiais, horários e contas. Entre duas medidas, leio: “perguntar da Lia”. Na página seguinte: “ligar para o Daniel sem inventar assunto”. Passo o dedo por cima da frase." },
        { label: "A caneca azul", detail: "A lasca de sempre. Um papel embaixo.", value: "cup", cue: "cup", note: { id: "smallnote", title: "O papel embaixo da caneca", text: "Um pedaço de papel com duas palavras: domingo, meio-dia. A data abaixo foi riscada e escrita de novo várias vezes." }, feedback: "Debaixo da caneca há um pedaço de papel: “domingo, meio-dia”. A data foi riscada e escrita outra vez. Ele vinha escolhendo o domingo em que queria me receber." }
      ]
    },
    {
      chapter: 4, chapterName: "O que ele construía", when: "Clara me mostra a última página", kicker: "04 / UM ESPAÇO EM BRANCO", title: "A parte de baixo da mesa.", art: "workshop", mood: 0, environment: "memory",
      description: "Um desenho da mesa mostra a passagem e o espaço para a cadeira de Daniel. Ao lado, há uma anotação sobre Lia.",
      paragraphs: ["Clara me conta das mudanças concluídas antes da internação. A entrada lateral. A circulação pela varanda. O espaço junto à mesa, conforme tínhamos combinado.", "Na última folha, meu pai desenhou uma pessoa pequena ao meu lado. Não era a silhueta certinha dos projetos. Eram duas pernas finas e um cabelo enorme.", "Embaixo, escreveu: “a menina vai querer sentar perto do pai”.", "Eu olho para Clara. Ela já estava chorando antes de me entregar a folha."],
      type: "next", objective: "O projeto fica guardado na sua caixa de lembranças.", note: { id: "drawing", title: "Perto do pai", text: "No projeto da mesa, o avô desenhou Lia ao lado de Daniel. Embaixo: a menina vai querer sentar perto do pai." }
    },
    {
      chapter: 4, chapterName: "O que ele construía", when: "Na entrada da casa", kicker: "04 / A PORTA QUE ELE ABRIU", title: "Agora existe um caminho.", art: "ramp", mood: 0, environment: "rain",
      description: "A entrada lateral foi adaptada. Um caminho acessível e livre leva até a varanda; a antiga entrada de degraus continua visível.",
      paragraphs: ["Clara abre o portão lateral. Eu tinha visto fotos, conferido o projeto e conversado sobre cada mudança. Mesmo assim, fico um tempo olhando.", "A chuva toca o corrimão. A luz da cozinha está acesa. Pela primeira vez desde o acidente, existe uma passagem até aquela porta."],
      type: "explore", correct: 1, objective: "Escolha a entrada combinada no projeto. A descrição está disponível aqui e na caixa de lembranças.",
      choices: [
        { label: "Conferir a entrada antiga", detail: "Os três degraus da frente", cue: "tap", feedback: "A entrada da frente continua com degraus. Clara mantém o portão lateral aberto, junto ao caminho acessível que planejamos." },
        { label: "Usar a entrada lateral", detail: "Caminho acessível, livre e combinado", cue: "door", feedback: "Sigo pela passagem que conferimos. Clara espera ao meu lado. Na porta, eu paro por um instante. Estou chegando à casa do meu pai." },
        { label: "Pedir que Clara acompanhe", detail: "Conferir o caminho antes de seguir", cue: "paper", feedback: "Clara descreve a passagem e pergunta como quero ser acompanhado. Posso escolher a entrada lateral quando estiver pronto." }
      ]
    },
    {
      chapter: 4, chapterName: "O que ele construía", when: "Dentro de casa", kicker: "04 / PELA PRIMEIRA VEZ", title: "Eu entrei.", art: "table", mood: 0, environment: "memory",
      description: "A mesa tem espaço para a cadeira de Daniel. Ao lado, na cabeceira, a cadeira de madeira do pai está vazia.",
      paragraphs: ["Eu entrei. A roda passou pela marca no piso onde meu pai costumava tirar os sapatos. Passei pela geladeira. Pela parede que ele sempre dizia que ia pintar.", "Cheguei à mesa. Minha cadeira coube no espaço que havíamos combinado.", "Ao lado do meu lugar estava a cadeira de madeira dele.", "Eu tinha imaginado tantas vezes voltar a essa mesa. Em todas elas, meu pai estava ali para me perguntar se eu tinha comido."],
      type: "next", objective: "Fique o tempo que quiser. A próxima cena abre o envelope que Clara guardou.", nextLabel: "Olhar para o envelope →"
    },
    {
      chapter: 5, chapterName: "Seu lugar à mesa", when: "Um envelope com meu nome", kicker: "05 / PARA LER SEM PRESSA", title: "A letra do meu pai.", art: "table", mood: 0, environment: "memory",
      description: "Clara coloca um envelope sobre a mesa. Na frente está escrito: para o Daniel. Há uma pequena mancha de café.",
      paragraphs: ["Meu nome ocupa quase toda a frente do envelope. A última letra é maior que as outras, do jeito que sempre acontecia quando ele não calculava bem o espaço.", "Clara pergunta se quero ficar sozinho. Olho de novo para o envelope. Há uma mancha de café no canto. Eu conheço aquela mancha antes de conhecer as palavras."],
      type: "choice", key: "reader", objective: "Como você quer abrir a carta?",
      choices: [
        { label: "Quero ler, e quero você aqui", value: "self", cue: "paper", feedback: "Clara puxa uma cadeira. Eu abro o envelope pela lateral, com cuidado para não rasgar meu nome. A primeira palavra é “filho”." },
        { label: "Lê comigo, Clara", value: "clara", cue: "paper", feedback: "Ela desdobra a folha. Precisa respirar antes de começar. Eu deixo minha mão perto da dela sobre a mesa. A primeira palavra é “filho”." }
      ]
    },
    {
      chapter: 5, chapterName: "Seu lugar à mesa", when: "A primeira página", kicker: "05 / O QUE ELE CONSEGUIU DIZER", title: "“Filho,”", art: "table", mood: 0, environment: "memory", letter: true,
      description: "Uma carta manuscrita. As palavras aparecem inteiras e permanecem na tela.",
      paragraphs: [
        { letter: "Eu comecei esta carta três vezes. Na primeira, só falei da obra. Na segunda, perguntei se você já tinha almoçado. Acho que você ia reconhecer as duas." },
        { letter: "Quando você ficou do lado de fora da nossa porta, eu ofereci um prato. Você tinha vindo ficar com a gente. Demorei para entender uma coisa que você estava me dizendo tão claramente." },
        { letter: "Também peguei na sua cadeira sem perguntar. Eu queria ajudar e acabei escolhendo por você. Obrigado por ter me ensinado a perguntar. Desculpe por ter precisado me ensinar num dia em que já estava cansado." }
      ],
      type: "next", objective: "A carta continua na próxima cena.", nextLabel: "Desdobrar a outra página →", note: { id: "letter1", title: "A primeira página da carta", text: "O pai reconhece as barreiras da casa e as vezes em que decidiu por Daniel. Agradece por ter aprendido a perguntar e pede desculpas." }
    },
    {
      chapter: 5, chapterName: "Seu lugar à mesa", when: "A última página", kicker: "05 / O LUGAR QUE SEMPRE FOI SEU", title: "“Eu gostei de ser seu pai.”", art: "table", mood: 0, environment: "memory", letter: true,
      description: "Na última página, a letra fica mais irregular. Uma assinatura curta termina a carta: pai.",
      paragraphs: [
        { letter: "Fiquei imaginando você entrando, reclamando do meu café, e a Lia escolhendo o maior pedaço de pão. Queria ter mais um desses almoços. Um só já ia me deixar muito feliz." },
        { letter: "Eu gostei tanto de ser seu pai, Daniel. Desde a primeira vez que você segurou meu dedo. Gostei até nos dias em que não soube mostrar. Queria ter falado isso mais vezes olhando para você." },
        { letter: "Se eu não estiver quando você chegar, tem café no armário de sempre. Chama sua irmã. A menina vai querer sentar perto de você." },
        { letter: "Domingo, para mim, era o barulho da sua chave no portão. Vou ficar com muita saudade desse barulho." },
        { signature: "Com amor,\nPai." }
      ],
      type: "next", objective: "Você pode reler este trecho quantas vezes quiser.", nextLabel: "Dobrar a carta com cuidado →", note: { id: "letter2", title: "A última página da carta", text: "Eu gostei tanto de ser seu pai, Daniel. Desde a primeira vez que você segurou meu dedo. — Com amor, pai." }
    },
    {
      chapter: 5, chapterName: "Seu lugar à mesa", when: "Do outro lado da mesa", kicker: "05 / AS COISAS QUE A GENTE GUARDA", title: "O café ainda está ali.", art: "table", mood: 0, environment: "memory",
      description: "A carta está dobrada sobre a mesa. Clara está ao lado de Daniel; a cadeira do pai permanece vazia.",
      paragraphs: () => [MEMORIES[state.choices.memory || "cup"].text, "Clara pergunta se eu quero um café. Eu faço que sim com a cabeça, porque ainda não consigo responder.", "Enquanto ela procura as xícaras, passo a mão pela madeira. Meu pai tinha lixado a borda até ficar lisa. Encontro, bem por baixo, uma marca de lápis que ele esqueceu de apagar."],
      type: "choice", key: "ritual", objective: "O que Daniel faz com essa lembrança?",
      choices: [
        { label: "Guardar um detalhe para Lia", value: "lia", feedback: "Penso na história que vou contar para minha filha sobre essa mesa. Quero que ela conheça os pequenos gestos do avô, inclusive os que eu só descobri depois." },
        { label: "Contar uma história para Clara", value: "clara", feedback: "Conto de uma vez em que o pai tentou fazer um bolo sem receita. Clara lembra da panela queimada. A gente começa a rir e chora de novo no meio. Ela não larga minha mão." }
      ]
    },
    {
      chapter: 5, chapterName: "Seu lugar à mesa", when: "No domingo seguinte · meio-dia", kicker: "05 / O BARULHO DE UMA CASA", title: "Lia escolhe o lugar.", art: "table", mood: 0, environment: "memory",
      description: "Daniel está à mesa com sua cadeira de rodas. Clara prepara café. Lia chega com o desenho e escolhe sentar ao lado do pai.",
      paragraphs: () => ["No domingo seguinte, volto com Lia. Ela passa pela entrada lateral e pergunta se pode levar o desenho para dentro. Digo que sim.", "Na cozinha, Clara já está cortando o pão. Lia puxa uma cadeira para perto da minha. “Quero ficar aqui”, avisa.", MEMORIES[state.choices.memory || "cup"].ending, "A cadeira do meu pai continua vazia. Minha filha enfia a mão pequena na minha, por baixo da mesa.", { dialogue: "“Pai… domingo que vem a gente volta?”" }],
      type: "choice", key: "future", objective: "Responda à sua filha.",
      choices: [
        { label: "Volta, filha. Domingo a gente volta", value: "return", feedback: "Ela aperta meu dedo e começa a contar uma história comprida sobre a escola. Eu fico ouvindo. O café vai esfriando sobre a mesa." },
        { label: "Volta. E você pode convidar alguém", value: "invite", feedback: "Lia começa a fazer uma lista de pessoas. Clara procura mais xícaras. Eu olho para o espaço junto de nós e digo que vamos dando um jeito, juntos." }
      ], nextLabel: "Guardar esta história →"
    }
  ];

  /* 3. SOM. Web Audio sintetiza ambientes discretos, sem arquivos externos.
     Nenhuma tarefa exige som. Pan -1 = esquerda, 0 = centro, 1 = direita. */
  class Soundscape {
    constructor() { this.piano = null; this.context = null; this.master = null; this.bed = null; this.sources = []; this.cues = new Set(); this.scene = null; this.ducked = false; }
    ready() {
      try {
        if (!this.context) {
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          if (!AudioContextClass) return false;
          this.context = new AudioContextClass();
          this.master = this.context.createGain();
          this.master.connect(this.context.destination);
          this.volume();
        }
        if (this.context.state === "suspended") this.context.resume().catch(() => {});
        return true;
      } catch { return false; }
    }
    volume() { if (this.master) this.master.gain.setTargetAtTime(prefs.volume / 100 * .65, this.context.currentTime, .08); }
    noise(seconds = 3) {
      const buffer = this.context.createBuffer(1, Math.floor(this.context.sampleRate * seconds), this.context.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
      return buffer;
    }
    environment(name) {
      if (!prefs.sound || (!playing && screen !== "ending") || document.hidden || document.querySelector("dialog[open]")) return this.stop();
      if (!this.ready()) return notify("Leitura em texto disponível. Este navegador não conseguiu iniciar o som ambiente.");
      if (this.scene === name && this.sources.length) return;
      this.stop(); this.scene = name;
      if (name === "silence") return;
      const ctx = this.context;
      this.bed = ctx.createGain(); this.bed.connect(this.master);
      this.bed.gain.value = this.ducked ? .25 : 1;
      const noise = ctx.createBufferSource(); noise.buffer = this.noise(); noise.loop = true;
      const filter = ctx.createBiquadFilter(); filter.type = "lowpass";
      filter.frequency.value = name === "rain" ? 1900 : name === "street" ? 800 : name === "cafe" ? 650 : 340;
      const gain = ctx.createGain(); gain.gain.value = name === "rain" ? .2 : name === "street" ? .12 : .055;
      noise.connect(filter); filter.connect(gain); gain.connect(this.bed); noise.start();
      this.sources.push(noise);
      if (name !== "hospital") {
        if (!this.piano) {
          const length = Math.floor(ctx.sampleRate * 24);
          this.piano = ctx.createBuffer(2, length, ctx.sampleRate);
          const left = this.piano.getChannelData(0), right = this.piano.getChannelData(1);
          const chords = [[146.83,174.61,220,293.66],[116.54,146.83,174.61,233.08],[130.81,174.61,220,261.63],[130.81,164.81,196,261.63]];
          chords.forEach((chord, bar) => chord.forEach((frequency, note) => {
            const offset = Math.floor((bar * 6 + note * 1.18) * ctx.sampleRate);
            const count = Math.min(Math.floor(ctx.sampleRate * 3.6), length - offset);
            for (let j = 0; j < count; j++) {
              const t = j / ctx.sampleRate;
              const envelope = Math.min(1, t / .012) * Math.exp(-t * 1.6) * Math.min(1, (count - j) / (ctx.sampleRate * .2));
              const sample = (Math.sin(2 * Math.PI * frequency * t) + .23 * Math.sin(2 * Math.PI * frequency * 2.003 * t) + .08 * Math.sin(2 * Math.PI * frequency * 3.007 * t)) * envelope * .14;
              left[offset + j] += sample * (note % 2 ? .7 : 1);
              right[offset + j] += sample * (note % 2 ? 1 : .7);
            }
          }));
        }
        const pianoSource = ctx.createBufferSource(); pianoSource.buffer = this.piano; pianoSource.loop = true;
        const pianoGain = ctx.createGain(); pianoGain.gain.value = name === "memory" ? .95 : .6;
        pianoSource.connect(pianoGain); pianoGain.connect(this.bed); pianoSource.start(); this.sources.push(pianoSource);
      }

      const hum = ctx.createOscillator(); hum.type = "sine"; hum.frequency.value = name === "cafe" ? 146.83 : 110;
      const humGain = ctx.createGain(); humGain.gain.value = .013;
      hum.connect(humGain); humGain.connect(this.bed); hum.start(); this.sources.push(hum);
    }
    duck(on) { this.ducked = on; if (this.bed) this.bed.gain.setTargetAtTime(on ? .25 : 1, this.context.currentTime, .1); }
    tone(frequency, delay, duration, pan, volume = .12, type = "sine") {
      const ctx = this.context; const start = ctx.currentTime + delay;
      const oscillator = ctx.createOscillator(); const envelope = ctx.createGain();
      oscillator.type = type; oscillator.frequency.value = frequency;
      envelope.gain.setValueAtTime(0, start); envelope.gain.linearRampToValueAtTime(volume, start + .015); envelope.gain.exponentialRampToValueAtTime(.0001, start + duration);
      oscillator.connect(envelope);
      if (typeof ctx.createStereoPanner === "function") { const panner = ctx.createStereoPanner(); panner.pan.value = pan; envelope.connect(panner); panner.connect(this.master); } else envelope.connect(this.master);
      this.cues.add(oscillator); oscillator.onended = () => { this.cues.delete(oscillator); oscillator.disconnect(); envelope.disconnect(); };
      oscillator.start(start); oscillator.stop(start + duration + .02);
    }
    cue(kind, pan = 0) {
      if (!prefs.sound || !this.ready()) return;
      this.clearCues();
      if (kind === "paper") { this.tone(293.66, 0, .4, pan, .05, "triangle"); this.tone(349.23, .12, .5, pan, .04, "triangle"); }
      else if (kind === "door") { this.tone(146.83, 0, .6, pan, .08, "triangle"); this.tone(220, .25, .5, pan, .05); }
      else if (kind === "keys") { [1318.5, 1760, 1568].forEach((f, i) => this.tone(f, i * .14, .29, pan, .12)); }
      else if (kind === "radio") { [329.63, 392, 440, 392].forEach((f, i) => this.tone(f, i * .2, .23, pan, .08, "triangle")); }
      else if (kind === "cup") { this.tone(1864, 0, .65, pan, .11); this.tone(2349, .17, .45, pan, .07); }
      else if (kind === "water" || kind === "rain") { [523, 740, 587, 880, 659, 493].forEach((f, i) => this.tone(f, i * .16, .2, pan, .05)); }
      else if (kind === "bell") { this.tone(1046.5, 0, .8, pan); this.tone(1568, .08, .8, pan, .06); }
      else if (kind === "voice") { [440, 554.37, 659.25].forEach((f, i) => this.tone(f, i * .15, .3, pan, .085, "triangle")); }
      else { this.tone(220, 0, .13, pan, .12, "triangle"); this.tone(180, .24, .15, pan, .1, "triangle"); }
    }
    clearCues() { for (const source of this.cues) { try { source.stop(); } catch {} } this.cues.clear(); }
    stop() { for (const source of this.sources) { try { source.stop(); source.disconnect(); } catch {} } this.sources = []; this.scene = null; if (this.bed) { this.bed.disconnect(); this.bed = null; } this.clearCues(); }
  }

  /* 4. ESTADO. Salvamento defensivo: arquivo local / modo privado podem negar storage. */
  const defaultPrefs = {
    narration: false, sound: false, volume: 35, rate: 1, size: 1,
    contrast: false, motion: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || false,
    clear: false, shortcuts: false
  };
  let storageNoticeShown = false;
  function readJSON(key) { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } }
  function writeJSON(key, data) {
    try { localStorage.setItem(key, JSON.stringify(data)); return true; }
    catch { if (!storageNoticeShown) { storageNoticeShown = true; notify("O navegador não permitiu salvar. Você pode jogar normalmente nesta sessão."); } return false; }
  }
  function cleanPrefs(raw) {
    const result = { ...defaultPrefs };
    if (!raw || typeof raw !== "object") return result;
    for (const key of ["narration", "sound", "contrast", "motion", "clear", "shortcuts"]) if (typeof raw[key] === "boolean") result[key] = raw[key];
    if ([.85, 1, 1.15].includes(raw.rate)) result.rate = raw.rate;
    if ([1, 1.15, 1.3].includes(raw.size)) result.size = raw.size;
    if (typeof raw.volume === "number" && Number.isFinite(raw.volume)) result.volume = Math.max(0, Math.min(100, raw.volume));
    return result;
  }
  let prefs = cleanPrefs(readJSON(PREFS_KEY));
  function freshState() { return { version: 1, scene: 0, resolved: false, feedback: "", routeStep: 0, visited: [], choices: {}, notes: [], finished: false }; }
  function readSave() {
    const raw = readJSON(SAVE_KEY);
    if (!raw || raw.version !== 1 || !Number.isInteger(raw.scene) || raw.scene < 0 || raw.scene >= SCENES.length || !raw.choices || typeof raw.choices !== "object" || Array.isArray(raw.choices) || !Array.isArray(raw.notes)) return null;
    const choices = {};
    for (const scene of SCENES) if (scene.key && typeof raw.choices[scene.key] === "string" && scene.choices.some((c) => c.value === raw.choices[scene.key])) choices[scene.key] = raw.choices[scene.key];
    const notes = raw.notes.filter((n) => n && typeof n.id === "string" && typeof n.title === "string" && typeof n.text === "string").slice(0, 30).map((n) => ({ id: n.id.slice(0, 60), title: n.title.slice(0, 200), text: n.text.slice(0, 2000) }));
    return { version: 1, scene: raw.scene, resolved: Boolean(raw.resolved), feedback: typeof raw.feedback === "string" ? raw.feedback.slice(0, 4000) : "", visited: Array.isArray(raw.visited) ? [...new Set(raw.visited.filter(v => Number.isInteger(v) && v >= 0 && v < 3))] : [], routeStep: Number.isInteger(raw.routeStep) ? Math.min(3, Math.max(0, raw.routeStep)) : 0, choices, notes, finished: raw.scene === SCENES.length - 1 && Boolean(raw.finished) };
  }
  let state = freshState();
  let playing = false;
  let screen = "start";
  let renderedArt = "";
  let notificationTimer = null;
  let utterance = null;
  let speechRun = 0;
  const sound = new Soundscape();

  function notify(message) {
    clearTimeout(notificationTimer);
    const dialog = document.querySelector("dialog[open]");
    let target = $("system-status");
    if (dialog) {
      target = dialog.querySelector(".dialog-status");
      if (!target) { target = document.createElement("p"); target.className = "dialog-status small-note"; target.setAttribute("role", "status"); target.setAttribute("aria-live", "polite"); dialog.append(target); }
    }
    target.textContent = message;
    notificationTimer = setTimeout(() => { target.textContent = ""; }, 9000);
  }
  function save() { writeJSON(SAVE_KEY, state); }
  function addNote(note) { if (!state.notes.some((n) => n.id === note.id)) state.notes.push({ ...note }); $("notebook-count").textContent = String(state.notes.length); }
  function currentScene() { return SCENES[state.scene]; }
  function sceneParagraphs(scene) { return typeof scene.paragraphs === "function" ? scene.paragraphs() : scene.paragraphs; }
  function paragraphText(p) { return typeof p === "string" ? p : p.dialogue || p.letter || p.signature || ""; }

  /* 5. VOZ OPCIONAL. Fica desligada por padrão para não competir com NVDA / VoiceOver. */
  function stopVoice() { speechRun++; if ("speechSynthesis" in window) window.speechSynthesis.cancel(); utterance = null; sound.duck(false); }
  function speak(message, force = false) {
    stopVoice();
    if ((!prefs.narration && !force) || document.hidden) return;
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) { notify("A voz não está disponível neste navegador. Todo o conteúdo continua em texto e pode ser lido pelo seu leitor de tela."); return; }
    const run = speechRun;
    utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "pt-BR"; utterance.rate = prefs.rate; utterance.volume = .85;
    const voices = speechSynthesis.getVoices();
    const voice = voices.find((v) => v.lang.toLowerCase() === "pt-br") || voices.find((v) => v.lang.toLowerCase().startsWith("pt"));
    if (voice) utterance.voice = voice;
    utterance.onstart = () => { if (run === speechRun) sound.duck(true); };
    utterance.onend = () => { if (run === speechRun) { sound.duck(false); utterance = null; } };
    utterance.onerror = (event) => {
      if (run !== speechRun || ["interrupted", "canceled"].includes(event.error)) return;
      sound.duck(false);
      notify("O dispositivo não conseguiu reproduzir a voz. Use o texto ou o seu leitor de tela; tente instalar uma voz em português no sistema.");
    };
    try { speechSynthesis.speak(utterance); } catch { sound.duck(false); notify("Não foi possível iniciar a voz. A história continua disponível em texto."); }
  }
  function narrationForScene() {
    const scene = currentScene();
    let message = `Capítulo ${scene.chapter}. ${scene.chapterName}. Cena ${state.scene + 1} de ${SCENES.length}. ${scene.title} ${scene.description} `;
    message += sceneParagraphs(scene).map(paragraphText).join(" ");
    message += ` ${scene.objective} `;
    if (state.resolved && state.feedback) message += `${state.feedback} Continue quando quiser.`;
    else if (scene.type !== "next") message += scene.choices.map((c, i) => `Opção ${i + 1}: ${c.label}. ${c.detail || ""}`).join(" ");
    return message;
  }

  /* 6. INTERFACE / CENAS. Os recursos visuais ficam separados dos controles. */
  function setArtwork(name, mood = 0) {
    if (renderedArt !== name) { $("scene-art").innerHTML = ART[name] || ART.cover; renderedArt = name; }
    document.documentElement.style.setProperty("--scene-light", String(1 - mood * .07));
  }
  function setScreen(nextScreen) {
    screen = nextScreen; document.body.dataset.screen = nextScreen;
    if (nextScreen !== "story") document.body.classList.remove("letter-scene");
    $("start-screen").hidden = nextScreen !== "start"; $("story-screen").hidden = nextScreen !== "story"; $("ending").hidden = nextScreen !== "ending";
  }
  function applyPrefs() {
    document.documentElement.style.setProperty("--text-scale", String(prefs.size));
    document.body.classList.toggle("high-contrast", prefs.contrast);
    document.body.classList.toggle("reduce-motion", prefs.motion);
    document.body.classList.toggle("clear-scene", prefs.clear);
    for (const key of ["narration", "sound", "contrast", "motion", "clear", "shortcuts"]) $("setting-" + key).checked = prefs[key];
    $("setting-rate").value = String(prefs.rate); $("setting-size").value = String(prefs.size); $("setting-volume").value = String(prefs.volume);
    $("setting-volume").setAttribute("aria-valuetext", `${prefs.volume} por cento`);
    $("listen-button").setAttribute("aria-pressed", String(prefs.sound));
    $("listen-button").textContent = prefs.sound ? "Silenciar trilha" : "Ouvir trilha e ambiente";
    $("control-hint").textContent = prefs.shortcuts ? "1–3 escolher · N continuar · R repetir · C lembranças · P pausar" : "Tab para navegar · Enter para escolher";
    sound.volume();
  }
  function startGame(resume = false) {
    stopVoice(); sound.stop();
    state = resume ? readSave() || freshState() : freshState();
    playing = true;
    if (prefs.sound) sound.ready();
    if (state.finished) return finishGame();
    setScreen("story"); renderScene();
  }
  function renderScene() {
    stopVoice();
    const scene = currentScene();
    setArtwork(scene.art, scene.mood || 0);
    document.body.classList.toggle("letter-scene", Boolean(scene.letter));
    $("chapter-label").textContent = `CAPÍTULO ${String(scene.chapter).padStart(2, "0")} · ${scene.chapterName.toLocaleUpperCase("pt-BR")}`;
    $("scene-position").textContent = `${String(state.scene + 1).padStart(2, "0")} / ${SCENES.length}`;
    $("story-progress").max = SCENES.length; $("story-progress").value = state.scene + 1;
    $("story-progress").setAttribute("aria-valuetext", `Cena ${state.scene + 1} de ${SCENES.length}`);
    $("timeline-label").textContent = scene.when; $("scene-kicker").textContent = scene.kicker;
    $("scene-title").textContent = scene.title; $("scene-description").textContent = scene.description;
    $("scene-text").replaceChildren();
    for (const paragraph of sceneParagraphs(scene)) { const p = document.createElement("p"); p.textContent = paragraphText(paragraph); if (typeof paragraph !== "string") p.className = paragraph.letter ? "letter-copy" : paragraph.signature ? "letter-signature" : "dialogue"; $("scene-text").append(p); }
    $("objective").textContent = scene.objective;
    $("feedback").hidden = !state.feedback; $("feedback").textContent = state.feedback;
    $("next-button").hidden = !(scene.type === "next" || state.resolved);
    $("next-button").textContent = scene.nextLabel || "Continuar →";
    $("next-button").removeAttribute("aria-describedby");
    $("route-reset").hidden = scene.type !== "route" || state.routeStep === 0 || state.resolved;
    renderChoices(); renderRoute();
    if (scene.type === "route" && scene.note) addNote(scene.note);
    $("notebook-count").textContent = String(state.notes.length);
    sound.environment(scene.environment);
    save();
    window.scrollTo({ top: 0, behavior: "instant" });
    $("story-panel").focus({ preventScroll: true });
    speak(narrationForScene());
  }
  function renderChoices() {
    const container = $("choices"); container.replaceChildren();
    const scene = currentScene();
    if (scene.type === "next") return;
    scene.choices.forEach((choice, i) => {
      const button = document.createElement("button"); button.className = "choice-button"; button.type = "button"; button.dataset.index = String(i);
      const number = document.createElement("span"); number.className = "choice-number"; number.textContent = String(i + 1); number.setAttribute("aria-hidden", "true");
      const copy = document.createElement("span"); copy.className = "choice-copy"; copy.append(document.createTextNode(choice.label));
      if (choice.detail) { const small = document.createElement("small"); small.textContent = choice.detail; copy.append(small); }
      button.append(number, copy);
      button.disabled = state.resolved || (scene.type === "route" && scene.sequence.slice(0, state.routeStep).includes(choice.value));
      if (state.resolved && scene.key && state.choices[scene.key] === choice.value) { button.classList.add("selected"); button.setAttribute("aria-pressed", "true"); }
      if (scene.type === "gather" && state.visited.includes(i)) { button.classList.add("visited"); button.setAttribute("aria-pressed", "true"); number.textContent = "✓"; }
      button.addEventListener("click", () => choose(i)); container.append(button);
    });
  }
  function renderRoute() {
    const scene = currentScene(), list = $("route-progress"); list.replaceChildren();
    list.hidden = scene.type === "route" ? !state.routeStep : scene.type === "gather" ? !state.visited.length : true;
    list.setAttribute("aria-label", scene.type === "gather" ? "Objetos examinados" : "Etapas do trajeto");
    const labels = scene.type === "route" ? scene.sequence.slice(0, state.routeStep).map(value => scene.choices.find(c => c.value === value).label) : scene.type === "gather" ? state.visited.map(i => scene.choices[i].label) : [];
    for (const label of labels) { const li = document.createElement("li"); li.textContent = label; list.append(li); }
  }
  function showFeedback(message) { state.feedback = message; $("feedback").textContent = message; $("feedback").hidden = false; }
  function complete(message) {
    state.resolved = true; showFeedback(message);
    const scene = currentScene();
    if (scene.note) addNote(scene.note);
    renderChoices(); renderRoute();
    $("route-reset").hidden = true; $("next-button").hidden = false;
    $("next-button").setAttribute("aria-describedby", "feedback");
    $("next-button").focus({ preventScroll: false });
    save(); speak(`${message} Continue quando quiser.`);
  }
  function choose(index) {
    if (!playing || screen !== "story" || state.resolved || document.querySelector("dialog[open]")) return;
    const scene = currentScene(); const choice = scene.choices?.[index]; if (!choice) return;
    if (choice.cue) sound.cue(choice.cue, choice.pan || 0);
    if (scene.type === "gather") {
      if (!state.visited.includes(index)) state.visited.push(index);
      if (choice.note) addNote(choice.note);
      if (state.visited.length === scene.choices.length) return complete(choice.feedback + " " + scene.completeText);
      const message = `${choice.feedback} ${state.visited.length} de ${scene.choices.length} objetos examinados.`;
      showFeedback(message); renderChoices(); renderRoute();
      const nextIndex = scene.choices.findIndex((_, i) => !state.visited.includes(i));
      $("choices").children[nextIndex]?.focus(); save(); speak(message); return;
    }
    if (scene.type === "route") {
      if (scene.sequence.slice(0, state.routeStep).includes(choice.value)) return;
      if (choice.value !== scene.sequence[state.routeStep]) {
        const expected = scene.choices.find((c) => c.value === scene.sequence[state.routeStep]);
        const message = `Essa etapa vem depois. Agora: ${expected.label.toLocaleLowerCase("pt-BR")}. A sequência está na descrição e nas lembranças.`;
        showFeedback(message); save(); speak(message); return;
      }
      state.routeStep++;
      if (state.routeStep === scene.sequence.length) return complete(scene.completeText);
      const message = `${choice.label}. ${scene.routeHints[state.routeStep]}`;
      showFeedback(message); renderChoices(); renderRoute(); $("route-reset").hidden = false;
      const nextValue = scene.sequence[state.routeStep]; const nextIndex = scene.choices.findIndex((c) => c.value === nextValue);
      $("choices").children[nextIndex].focus(); save(); speak(message); return;
    }
    if (scene.type === "explore" && index !== scene.correct) { showFeedback(choice.feedback); save(); speak(choice.feedback); return; }
    if (scene.key) state.choices[scene.key] = choice.value;
    if (scene.key === "memory") { const memory = MEMORIES[choice.value]; addNote({ id: "memory", title: memory.title, text: memory.text }); }
    complete(choice.feedback);
    if (choice.spoken) speak(choice.feedback, true);
  }
  function nextScene() {
    if (!playing || screen !== "story" || document.querySelector("dialog[open]")) return;
    if (currentScene().type !== "next" && !state.resolved) return;
    if (currentScene().type === "next" && currentScene().note) addNote(currentScene().note);
    if (state.scene === SCENES.length - 1) return finishGame();
    state.scene++; state.resolved = false; state.feedback = ""; state.routeStep = 0; state.visited = [];
    renderScene();
  }
  function finishGame() {
    stopVoice(); sound.stop(); playing = false; state.finished = true; save();
    setScreen("ending"); document.body.classList.remove("letter-scene"); setArtwork("table", 0);
    const memory = MEMORIES[state.choices.memory || "cup"];
    $("ending-personal").textContent = memory.ending + (state.choices.future === "invite" ? " Na semana que vem, vamos pôr mais um prato." : " Domingo, meio-dia. A gente vai voltar.");
    sound.environment("memory");
    $("ending-content").focus({ preventScroll: true }); window.scrollTo({ top: 0, behavior: "instant" });
    speak(`Fim desta história. Seu lugar à mesa. Está guardado. ${$("ending-text").textContent} ${$("ending-personal").textContent} ${$("ending-message").textContent}`);
  }
  function showHome() {
    playing = false; stopVoice(); sound.stop(); setScreen("start"); setArtwork("cover", 0);
    const saved = readSave(); $("continue-button").hidden = !saved;
    $("start-button").firstChild.textContent = saved ? "Nova história " : "Começar história ";
    $("save-hint").hidden = !saved;
    $("save-hint").textContent = saved?.finished ? "Você concluiu a história. Pode rever o final ou começar outra vez." : saved ? `Você parou na cena ${saved.scene + 1} de ${SCENES.length}.` : "";
    $("start-button").focus({ preventScroll: true }); window.scrollTo({ top: 0, behavior: "instant" });
  }

  /* 7. JANELAS NATIVAS: foco contido, Escape, retorno ao botão de origem. */
  function openDialog(id) {
    stopVoice(); sound.stop();
    if (id === "notebook-dialog") {
      const list = $("notebook-list"); list.replaceChildren();
      const notes = state.notes.length ? state.notes : [{ title: "Uma página em branco", text: "Os objetos e as palavras que Daniel guarda aparecem aqui ao longo da história." }];
      for (const note of notes) { const li = document.createElement("li"); const title = document.createElement("strong"); const p = document.createElement("p"); title.textContent = note.title; p.textContent = note.text; li.append(title, p); list.append(li); }
    }
    $(id).showModal();
  }
  function closeAndOpen(from, to) { $(from).close(); openDialog(to); }
  document.querySelectorAll("[data-open]").forEach((button) => button.addEventListener("click", () => openDialog(button.dataset.open)));
  document.querySelectorAll("dialog").forEach((dialog) => dialog.addEventListener("close", () => {
    stopVoice();
    if (!document.querySelector("dialog[open]") && (playing || screen === "ending") && !document.hidden) sound.environment(screen === "ending" ? "memory" : currentScene().environment);
  }));

  /* 8. CONTROLES. Atalhos de caracteres só funcionam após ativação explícita. */
  $("start-button").addEventListener("click", () => startGame(false));
  $("continue-button").addEventListener("click", () => startGame(true));
  $("restart-button").addEventListener("click", () => startGame(false));
  $("next-button").addEventListener("click", nextScene);
  $("pause-button").addEventListener("click", () => openDialog("pause-dialog"));
  $("notebook-button").addEventListener("click", () => openDialog("notebook-dialog"));
  $("ending-notebook").addEventListener("click", () => openDialog("notebook-dialog"));
  $("help-settings").addEventListener("click", () => closeAndOpen("help-dialog", "settings-dialog"));
  $("home-button").addEventListener("click", () => { $("pause-dialog").close(); showHome(); });
  $("repeat-button").addEventListener("click", () => {
    if (prefs.narration) speak(narrationForScene()); else $("story-panel").focus();
  });
  $("listen-button").addEventListener("click", () => {
    prefs.sound = !prefs.sound; applyPrefs(); writeJSON(PREFS_KEY, prefs);
    if (prefs.sound) sound.environment(currentScene().environment); else sound.stop();
    notify(prefs.sound ? "Piano e ambiente ligados. Você pode ajustar o volume em Acessibilidade." : "Trilha e ambiente silenciados.");
  });
  $("route-reset").addEventListener("click", () => {
    if (currentScene().type !== "route" || state.resolved) return;
    stopVoice(); sound.clearCues(); state.routeStep = 0; state.feedback = "";
    renderChoices(); renderRoute(); $("route-reset").hidden = true; $("feedback").hidden = true; $("choices").children[0].focus(); save();
  });
  for (const key of ["narration", "sound", "contrast", "motion", "clear", "shortcuts", "rate", "size", "volume"]) {
    $("setting-" + key).addEventListener(key === "volume" ? "input" : "change", (event) => {
      const input = event.target; prefs[key] = input.type === "checkbox" ? input.checked : Number(input.value);
      if (key === "narration" && !prefs.narration) stopVoice();
      applyPrefs(); writeJSON(PREFS_KEY, prefs);
      if (key === "sound" && !prefs.sound) sound.stop();
      if (key === "narration" && prefs.narration) speak("Narração ligada. Ao voltar, use Reler cena para ouvir o trecho atual.");
    });
  }
  $("test-voice").addEventListener("click", () => speak("Seu lugar à mesa. Esta é a voz da história. Cada cena espera por você.", true));
  document.addEventListener("keydown", (event) => {
    if (!prefs.shortcuts || event.repeat || event.altKey || event.ctrlKey || event.metaKey || document.querySelector("dialog[open]") || event.target.matches("input, select, textarea, [contenteditable='true']")) return;
    const key = event.key.toLowerCase();
    if (key === "h") { event.preventDefault(); openDialog("help-dialog"); return; }
    if (screen !== "story") return;
    if (["1", "2", "3"].includes(key)) { event.preventDefault(); choose(Number(key) - 1); }
    if (key === "n") { event.preventDefault(); nextScene(); }
    if (key === "r") { event.preventDefault(); $("repeat-button").click(); }
    if (key === "e") { event.preventDefault(); $("listen-button").click(); }
    if (key === "c") { event.preventDefault(); openDialog("notebook-dialog"); }
    if (key === "p") { event.preventDefault(); openDialog("pause-dialog"); }
  });
  document.addEventListener("visibilitychange", () => { if (document.hidden) { stopVoice(); sound.stop(); } else if ((playing || screen === "ending") && !document.querySelector("dialog[open]")) sound.environment(screen === "ending" ? "memory" : currentScene().environment); });
  window.addEventListener("pagehide", () => { stopVoice(); sound.stop(); });

  applyPrefs(); setScreen("start"); setArtwork("cover", 0);
  const initialSave = readSave();
  if (initialSave) { $("continue-button").hidden = false; $("start-button").firstChild.textContent = "Nova história "; $("save-hint").hidden = false; $("save-hint").textContent = initialSave.finished ? "História concluída. Reveja o final ou comece outra vez." : `Progresso guardado: cena ${initialSave.scene + 1} de ${SCENES.length}.`; }
})();
