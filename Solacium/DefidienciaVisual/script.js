"use strict";

/* O QUE PERMANECE
   Releitura da estrutura de cenas / cenário / interações de Como me sinto.
   Não há avanço automático nem testes de reflexo. Os efeitos só atingem a arte.
   Todos os dados são locais; nenhuma dependência, imagem ou música remota. */

(() => {
  const $ = (id) => document.getElementById(id);
  const SAVE_KEY = "o-que-permanece-historia-v1";
  const PREFS_KEY = "o-que-permanece-preferencias-v1";
  const ART = {};

  /* 1. CENÁRIOS VETORIAIS. Decorativos: cada cena tem descrição em texto. */
  const svg = (inside) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice"><defs>
    <linearGradient id="wall" x2="1" y2=".5"><stop stop-color="#243943"/><stop offset="1" stop-color="#4d5b58"/></linearGradient>
    <linearGradient id="sky" x2="0" y2="1"><stop stop-color="#718c93"/><stop offset=".57" stop-color="#c5b9a0"/><stop offset="1" stop-color="#e7bc85"/></linearGradient>
    <linearGradient id="light" x2="1" y2="1"><stop stop-color="#f8dba4" stop-opacity=".32"/><stop offset="1" stop-color="#f8dba4" stop-opacity="0"/></linearGradient>
    <linearGradient id="floor" x2="0" y2="1"><stop stop-color="#5e655d"/><stop offset="1" stop-color="#1b3037"/></linearGradient>
    <linearGradient id="glass" x2="1" y2=".8"><stop stop-color="#7b9c9b" stop-opacity=".15"/><stop offset="1" stop-color="#fff1c5" stop-opacity=".18"/></linearGradient>
    <radialGradient id="glow"><stop stop-color="#ffdfa2" stop-opacity=".6"/><stop offset="1" stop-color="#ffdfa2" stop-opacity="0"/></radialGradient>
    <linearGradient id="road" x2="0" y2="1"><stop stop-color="#8b9690"/><stop offset="1" stop-color="#2d454c"/></linearGradient>
    <filter id="soft"><feGaussianBlur stdDeviation="12"/></filter>
  </defs><g class="scene-paint">${inside}</g></svg>`;

  ART.room = svg(`<path fill="url(#wall)" d="M0 0h1600v1000H0z"/>
    <path fill="#34484c" d="M0 0h1600v48H0z"/><path fill="#253b43" d="M0 743h1600v257H0z"/>
    <path fill="url(#floor)" d="M0 744h1600v256H0z"/>
    <g stroke="#bac2a3" stroke-opacity=".1"><path d="M0 810h1600M0 902h1600M200 744L0 1000M510 744l-40 256M820 744l130 256M1110 744l260 256M1400 744l360 256"/></g>
    <path fill="#1c343d" d="M714 102h709v594H714z"/>
    <path fill="url(#sky)" d="M739 127h658v540H739z"/>
    <circle fill="#ffe1b0" cx="1220" cy="345" r="42" opacity=".9"/><circle fill="url(#glow)" cx="1220" cy="345" r="185"/>
    <path fill="#5f7b7a" d="M735 522v-95h62v43h69v-83h72v97h60v-38h72v78h83v-66h91v62h151v147H735z"/>
    <path fill="#4b6c70" d="M737 581h79v-40h51v22h90v-57h79v63h86v-34h52v16h99v-67h44v64h80v119H737z"/>
    <g fill="#d8c8a3" opacity=".55"><path d="M876 416h7v14h-7zM896 416h7v14h-7zM1010 468h7v14h-7zM1197 485h7v12h-7zM1214 485h7v12h-7zM1300 564h8v14h-8zM1319 564h8v14h-8zM1232 596h7v14h-7zM928 591h7v14h-7zM945 591h7v14h-7z"/></g>
    <path fill="url(#glass)" d="M739 127h658v540H739z"/>
    <g fill="#2b4248"><path d="M951 115h13v566h-13zM1170 115h13v566h-13zM728 419h679v10H728z"/><path d="M715 667h716v27H715z"/></g>
    <path fill="#879087" opacity=".44" d="M693 96q-23 253-7 600h64q-29-313 15-600z"/>
    <path fill="#d6c4a0" opacity=".35" d="M1412 93q-31 311 10 600h78q-63-271-18-600z"/>
    <path fill="url(#light)" d="M740 430l655 236 205 334H375z"/>
    <path fill="#263d43" d="M70 400h325v326H70z"/><path fill="#647b76" d="M88 416h290v288H88z"/>
    <path fill="#bac5ac" opacity=".5" d="M104 433h256v255H104z"/><path fill="#536f72" d="M104 614l95-114 74 71 87-68v185H104z"/>
    <path fill="#304a4d" d="M105 650l91-79 79 57 85-44v104H105z"/>
    <path fill="#263d43" d="M529 472h10v265h-10z"/><path fill="#c6b594" d="M473 464l18-72h89l20 72z"/>
    <ellipse fill="url(#glow)" cx="534" cy="443" rx="115" ry="100" opacity=".3"/>
    <path fill="#1c343b" d="M111 814q-9-84 75-88h343q70 5 67 88l-17 113H110z"/>
    <path fill="#49605d" d="M149 717q0-30 39-30h318q35 0 35 30v90H149z"/>
    <path fill="#536a61" d="M161 747q160-23 362 0v57H161z"/>
    <path fill="#9c9c7a" d="M192 719l79-10 19 65-83 9z"/><path fill="#7d8b7b" d="M427 721l66 1-7 64-71-9z"/>
    <path fill="#263d3d" d="M133 802h431v54H133zM129 867h18v89h-18zM540 865h18v87h-18z"/>
    <ellipse fill="#142c3466" cx="1080" cy="923" rx="273" ry="44"/>
    <path fill="#293e40" d="M880 746h14l-29 204h-13zM1280 746h14l31 204h-13z"/>
    <path fill="#ac9e7a" d="M829 727q232-39 510 0v27q-238 20-510 0z"/>
    <ellipse fill="#c1b18d" cx="1084" cy="724" rx="255" ry="23"/>
    <ellipse fill="#29484b" cx="1154" cy="715" rx="38" ry="8"/><path fill="#d6cdb0" d="M1132 679h46v32q-23 11-46 0z"/><path fill="none" stroke="#d6cdb0" stroke-width="7" d="M1176 686q25-1 16 20h-14"/>
    <path fill="#506d6c" d="M968 699l77-8 7 15-77 8z"/><path fill="#c6b184" d="M975 713l71-8 3 4-71 8z"/>
    <g fill="none" stroke="#d9c79b" stroke-width="3"><ellipse cx="1086" cy="712" rx="9" ry="5"/><ellipse cx="1095" cy="714" rx="9" ry="5"/><path d="M1103 715l19 5m-5-3 2 5"/></g>
    <path fill="#324d49" d="M1429 758l-20 135h99l-20-135z"/>
    <g stroke="#415b48" stroke-width="5" fill="#637c5a"><path d="M1459 768q-89-63-67-121 67 6 67 121zM1462 771q-16-124 32-154 41 74-32 154zM1462 769q44-105 92-85 8 48-92 85zM1459 760q-61-146-17-176 54 64 17 176z"/></g>
    <path fill="#f9d2a7" opacity=".12" d="M746 696h652l-165 90H678z"/>
  `);

  ART.studio = svg(`<path fill="#425b60" d="M0 0h1600v1000H0z"/><path fill="#344e56" d="M0 713h1600v287H0z"/>
    <path fill="url(#floor)" d="M0 760l1600-50v290H0z"/>
    <path fill="#768f8a" d="M800 120h573v505H800z"/><path fill="url(#sky)" d="M819 140h534v466H819z"/>
    <path fill="#5f7b76" d="M819 499q120-121 242-54t292-51v212H819z"/><path fill="#456a69" d="M819 537q206-77 534-34v103H819z"/>
    <g fill="#324f56"><path d="M1080 130h13v490h-13zM806 378h560v12H806z"/></g>
    <path fill="url(#light)" d="M819 460l535 146 246 394H490z"/>
    <path fill="#2b434b" d="M262 204h256v322H262z"/><path fill="#afbaa2" d="M278 222h224v286H278z"/>
    <g fill="none" stroke="#63817a" stroke-width="4"><path d="M314 276h146M314 301h111M314 326h126"/><circle cx="390" cy="418" r="45"/><path d="M353 419h74M390 377v83"/></g>
    <g fill="#233e44"><path d="M652 688h16l-31 215h-16zM1251 679h16l23 224h-16z"/><path d="M571 653h767v35H571z"/></g>
    <ellipse fill="#b6ad8a" cx="951" cy="647" rx="387" ry="31"/>
    <path fill="#a1b9ac" d="M862 614h130v17H862z"/><path fill="#d5cbb0" d="M872 594h104v18H872z"/>
    <g fill="none" stroke="#768978" stroke-width="5"><path d="M1083 604h67m-67 11h67m-67 11h67"/></g>
    <path fill="#324d51" d="M352 710q0-40 36-40h125q36 0 36 40v137H352z"/>
    <path fill="#7f9382" d="M370 676q73-19 162 0v109H370z"/><path fill="#526e64" d="M345 782h212v49H345z"/>
    <path fill="#263f46" d="M356 827h13v114h-13zM533 827h13v114h-13z"/>
    <path fill="#ccc7ae" d="M753 693l-22 237h8l24-237z"/><path fill="#354d4b" d="M755 688h11v37h-11z"/><path fill="#ad684f" d="M734 894h8l-4 37h-8z"/>
    <path fill="#374f4b" d="M1450 693h63l-9 112h-46z"/><g fill="#7e9270"><path d="M1480 706q-62-80-47-134 49 11 47 134zM1484 702q-4-127 45-130 34 83-45 130zM1482 705q40-78 80-43-11 38-80 43z"/></g>
    <path fill="none" stroke="#c9c39d" stroke-width="3" stroke-dasharray="2 13" d="M661 1000l158-195 213 140 175-109"/>
  `);

  ART.street = svg(`<path fill="url(#sky)" d="M0 0h1600v1000H0z"/>
    <path fill="#6a8080" d="M0 308h199v339H0zM180 241h227v431H180zM1230 260h206v420h-206zM1400 191h200v570h-200z"/>
    <path fill="#7f8d83" d="M410 312h184v344H410zM1070 344h154v314h-154z"/>
    <path fill="#354e57" d="M0 0h336v1000H0z"/><path fill="#506966" d="M336 88l293 221v454L336 1000z"/>
    <path fill="#354f54" d="M1398 62l202-62v1000h-202z"/><path fill="#829083" d="M1111 331l287-269v938l-287-242z"/>
    <path fill="url(#road)" d="M629 620h482l489 380H180z"/>
    <path fill="#a1a697" d="M629 620l68 1-228 379H180z"/><path fill="#abb09e" d="M1065 622h46l489 378h-225z"/>
    <g stroke="#5e7974" stroke-width="2" opacity=".5"><path d="M570 715h632M500 821h818M390 959h1107M685 622L640 1000M838 622l28 378M1007 622l131 378"/></g>
    <path fill="#2c4850" d="M385 325l193 101v240l-193 95z"/>
    <path fill="#e2c695" d="M402 461l160 52v143l-160 64z"/><path fill="#e6c89a" opacity=".3" d="M402 716l160-60 82 344H321z"/>
    <path fill="#a77d63" d="M368 423l226 91-1 42-225-79z"/>
    <g fill="#dac6a5"><path d="M390 432l28 11v42l-28-9zM443 453l28 11v39l-28-9zM501 475l28 11v38l-28-9zM558 498l29 12v36l-29-10z"/></g>
    <path fill="none" stroke="#8c7054" stroke-width="8" d="M438 620q28-48 40-7m25 2q27-39 39-12"/>
    <path fill="#253f47" d="M1160 420l177-118v351l-177-12z"/><path fill="#b7c2a8" d="M1175 450l146-83v245l-146 1z"/>
    <path fill="#36594f" d="M1150 403l197-131v46l-197 124z"/>
    <g fill="#c5bd9d"><path d="M69 166h79v130H69zM198 166h79v130h-79zM69 374h79v130H69zM198 374h79v130h-79zM1450 188h67v133h-67zM1537 164h63v133h-63z"/></g>
    <g fill="#4a6668"><path d="M82 179h52v98H82zM211 179h52v98h-52zM82 388h52v98H82zM211 388h52v98h-52zM1462 201h43v103h-43zM1548 178h52v103h-52z"/></g>
    <path fill="#4e6865" d="M781 426h13v285h-13z"/><path fill="#ecd3a1" d="M746 419q42-44 83 0v21h-83z"/>
    <circle fill="url(#glow)" cx="787" cy="427" r="95" opacity=".48"/>
    <g stroke="#546e62" stroke-width="11" fill="#7e9275"><path d="M1019 425l-12 221"/><ellipse cx="1018" cy="394" rx="69" ry="87"/><ellipse cx="978" cy="409" rx="48" ry="58"/><ellipse cx="1057" cy="407" rx="50" ry="62"/></g>
    <path fill="#c6af84" d="M900 718l34-16 56 72-35 23z"/><path fill="#b16c51" d="M914 725l12-6 49 61-14 8z"/>
    <path fill="#c6af84" d="M1047 795l-20-16-54 73 24 19z"/><path fill="#b16c51" d="M1034 796l-9-6-41 56 9 7z"/>
    <path stroke="#dccfa8" stroke-width="9" d="M934 710l112 86"/>
    <g fill="#e1c5a2" opacity=".19"><path d="M412 864l68-8-18 115h-76zM1178 827l55 28 73 135h-62zM756 762h12l-9 152h-15z"/></g>
  `);

  ART.cafe = svg(`<path fill="url(#sky)" d="M0 0h1600v1000H0z"/>
    <path fill="#6d817b" d="M0 260h335v415H0zM1210 291h390v422h-390z"/><path fill="#859486" d="M203 341h213v327H203zM1132 357h155v324h-155z"/>
    <path fill="#314d54" d="M0 94h415v699H0z"/><path fill="#536b65" d="M1210 180h390v619h-390z"/>
    <g fill="#b6b89a"><path d="M56 175h95v139H56zM212 175h95v139h-95zM56 373h95v142H56zM212 373h95v142h-95zM1301 281h76v116h-76zM1444 281h76v116h-76z"/></g>
    <g fill="#4d6d6d"><path d="M69 188h69v112H69zM225 188h69v112h-69zM69 388h69v114H69zM225 388h69v114h-69zM1312 294h54v90h-54zM1455 294h54v90h-54z"/></g>
    <path fill="#919b8b" d="M0 671h1600v329H0z"/><path fill="url(#road)" d="M454 676h656l490 324H0z"/>
    <path fill="#50695d" d="M825 313h17v367h-17z"/><g fill="#71876c"><ellipse cx="835" cy="322" rx="143" ry="113"/><ellipse cx="746" cy="348" rx="82" ry="86"/><ellipse cx="926" cy="343" rx="91" ry="78"/></g>
    <path fill="#aeb09a" d="M780 645h333v26H780z"/><path fill="#6a8480" d="M806 665h280l-20 66H827z"/><path fill="#c5c4a6" d="M935 533h23v123h-23z"/>
    <ellipse fill="#b6c1ab" cx="946" cy="531" rx="66" ry="14"/>
    <path fill="none" stroke="#b8d0c0" stroke-width="3" opacity=".65" d="M946 524q-46-49-77 25m77-25q47-50 75 27m-77-33v-30"/>
    <path fill="#e1c89c" d="M1030 119h570v33h-570z"/><path fill="#324c50" d="M1019 140h581v42h-581z"/>
    <path fill="#31534b" d="M1098 450h502v98h-502z"/><g fill="#9ba887"><path d="M1121 450h42v98h-42zM1206 450h42v98h-42zM1290 450h42v98h-42zM1376 450h42v98h-42zM1460 450h42v98h-42zM1545 450h42v98h-42z"/></g>
    <path fill="#233e47" d="M1209 549h391v195h-391z"/><path fill="#d9be90" opacity=".8" d="M1227 564h149v140h-149zM1392 564h189v140h-189z"/>
    <path fill="#e6cd9e" opacity=".18" d="M1227 704h353l20 296h-517z"/>
    <path fill="#314e51" d="M1006 774h15v208h-15zM1397 774h15v208h-15z"/>
    <ellipse fill="#cfb68c" cx="1204" cy="771" rx="229" ry="31"/><ellipse fill="#edd1a2" cx="1204" cy="765" rx="226" ry="21"/>
    <g fill="#2a494a"><ellipse cx="1119" cy="760" rx="35" ry="8"/><ellipse cx="1284" cy="757" rx="35" ry="8"/></g>
    <g fill="#ede0b9"><path d="M1097 724h45v32q-23 10-45 0zM1261 721h45v32q-22 10-45 0z"/></g>
    <g fill="none" stroke="#ede0b9" stroke-width="6"><path d="M1141 730q24-3 17 17h-17M1305 727q24-3 17 17h-17"/></g>
    <path fill="#52726c" d="M1021 892q0-46 43-46h39q40 0 40 46v108h-122z"/>
    <path fill="#be9c7b" d="M555 773q1-23 24-23h116q23 0 24 23v142H555z"/>
    <path fill="#213e47" d="M542 850h187v28H542zM555 877h12v99h-12zM706 877h12v99h-12z"/>
    <path fill="#364d54" d="M567 737q0-61 67-64 66 3 66 64l-15 111h-105z"/>
    <ellipse fill="#bfa68b" cx="635" cy="638" rx="32" ry="39"/><path fill="#263c45" d="M603 634q-4-43 31-43 39-2 35 44l-11-18-44 4z"/>
    <path fill="none" stroke="#475f62" stroke-width="24" stroke-linecap="round" d="M580 743l-35 40m145-40 31-39"/>
    <path fill="none" stroke="#c5ab8c" stroke-width="15" stroke-linecap="round" d="M721 703l-4-30"/>
    <path fill="none" stroke="#c5ae83" stroke-width="2" d="M0 80q620 233 1600 101"/>
    <g fill="#ffdda6"><circle cx="330" cy="149" r="7"/><circle cx="570" cy="180" r="7"/><circle cx="823" cy="197" r="7"/><circle cx="1073" cy="202" r="7"/><circle cx="1325" cy="199" r="7"/></g>
  `);

  /* 2. HISTÓRIA. Altere aqui para criar cenas, falas e novas interações. */
  const MEMORIES = {
    window: { title: "A luz na janela", text: "O fim da tarde desenhava um retângulo dourado na mesa. Bia dizia que a casa também sabia tirar fotografias." },
    laugh: { title: "A risada de Bia", text: "Bia ria antes de terminar a própria piada. Eu conseguia reconhecê-la sem olhar para a porta." },
    coffee: { title: "O primeiro café", text: "O cheiro do café atravessava a casa antes da primeira conversa. A caneca tinha uma pequena ranhura junto à alça." }
  };
  const SCENES = [
    {
      chapter: 1, chapterName: "Os contornos", when: "Antes · um fim de tarde", kicker: "01 / ANTES DOS CONTORNOS", title: "A luz das seis.", art: "room", vision: 0, environment: "room",
      description: "Um apartamento ao entardecer. A janela ilumina a mesa; há uma caneca, um livro e um chaveiro.",
      paragraphs: ["Meu nome é Alex. Tenho 24 anos e uma mania de guardar os dias em fotografias. A luz na parede, o café esfriando, a minha irmã rindo de alguma coisa.", "Naquele tempo, eu ainda não sabia quantas maneiras existiam de guardar uma lembrança."],
      type: "choice", key: "memory", objective: "Escolha uma lembrança para levar com você. Ela volta mais tarde.",
      choices: [
        { label: "A luz na janela", detail: "Um retângulo dourado na mesa", value: "window", feedback: "Guardo a luz de fim de tarde. Bia diz que a casa também sabe tirar fotografias." },
        { label: "A risada de Bia", detail: "Uma voz que eu reconheceria em qualquer lugar", value: "laugh", feedback: "Guardo a risada de Bia, que sempre começa antes do fim da própria piada." },
        { label: "O cheiro do café", detail: "A caneca de sempre, ainda morna", value: "coffee", feedback: "Guardo o cheiro do café e a pequena ranhura na alça da minha caneca." }
      ]
    },
    {
      chapter: 1, chapterName: "Os contornos", when: "Alguns meses depois", kicker: "01 / AS PRIMEIRAS MUDANÇAS", title: "Pequenas ausências.", art: "street", vision: 1.6, environment: "street",
      description: "Uma rua conhecida. As fachadas continuam ali, mas seus detalhes começam a se misturar.",
      paragraphs: ["Primeiro, foi um rosto do outro lado da rua. Depois, o número do ônibus. A letra que eu aumentava no celular e, dias depois, precisava aumentar de novo.", "Não aconteceu de uma vez. A mudança foi entrando no cotidiano, em detalhes que antes eu nem percebia."],
      type: "next", objective: "Continue quando terminar de ler ou escutar."
    },
    {
      chapter: 1, chapterName: "Os contornos", when: "Depois das primeiras consultas", kicker: "01 / DAR NOME À MUDANÇA", title: "Mais do que cansaço.", art: "studio", vision: 3, environment: "room",
      description: "Uma sala tranquila, duas cadeiras e luz suave entrando por uma janela grande.",
      paragraphs: ["Procurei atendimento. As consultas e os exames confirmaram uma perda de visão progressiva. O acompanhamento passou a fazer parte da minha vida.", "Eu tinha perguntas que não cabiam naquela sala. Bia não tentou responder por mim. Ficou ali e escutou."],
      type: "choice", key: "firstWords", objective: "O que você quer dizer agora? As duas escolhas têm espaço nesta história.",
      choices: [
        { label: "Ainda não sei o que sentir", value: "time", feedback: "“Tudo bem não saber agora”, Bia responde. Não preciso transformar uma notícia difícil em uma decisão imediata." },
        { label: "Quero entender minhas possibilidades", value: "questions", feedback: "Peço que minhas dúvidas sejam anotadas. Vou fazer perguntas no meu tempo, com as informações de que preciso." }
      ]
    },
    {
      chapter: 2, chapterName: "Entre mudanças", when: "Em casa · naquela semana", kicker: "02 / TEMPO DE ASSIMILAR", title: "Posso ficar aqui?", art: "room", vision: 4.5, environment: "rain",
      description: "A casa de antes, agora em contornos mais suaves. A chuva toca a janela.",
      paragraphs: ["Eu sabia onde cada coisa costumava estar. Mesmo assim, havia dias em que tudo parecia pedir um esforço novo.", { dialogue: "“Você quer conversar ou prefere que eu só fique aqui?”" }, "Bia perguntou. Não decidiu por mim."],
      type: "choice", key: "company", objective: "Escolha como quer companhia neste momento.",
      choices: [
        { label: "Quero conversar", value: "talk", feedback: "Falo da saudade de algumas coisas e do medo de outras. Bia escuta sem procurar uma frase capaz de resolver tudo." },
        { label: "Fica comigo em silêncio", value: "quiet", feedback: "A gente fica ouvindo a chuva. Não é preciso preencher cada pausa para estar perto." }
      ], note: { id: "voice", title: "Uma escolha que é minha", text: "Posso dizer de que apoio preciso, pedir companhia e também pedir tempo." }
    },
    {
      chapter: 2, chapterName: "Entre mudanças", when: "Nas semanas seguintes", kicker: "02 / APRENDER OUTROS CAMINHOS", title: "Não começar do zero.", art: "studio", vision: 5.5, environment: "room",
      description: "Uma mesa de trabalho, materiais com relevo e uma bengala ao lado da cadeira.",
      paragraphs: ["Comecei a reabilitação. Havia gente para me acompanhar no uso da bengala, na orientação pelos espaços e nas ferramentas de leitura.", "Minha história não tinha sido apagada. Eu levava minhas experiências para aprender outras maneiras de fazer as coisas."],
      type: "choice", key: "learning", objective: "Por onde você quer começar hoje?",
      choices: [
        { label: "Reconhecer os espaços", value: "spaces", feedback: "Começamos em um ambiente conhecido, com tempo para explorar. Orientação se aprende com prática e acompanhamento." },
        { label: "Experimentar ferramentas de leitura", value: "reading", feedback: "Experimento ampliação, contraste e leitura por voz. Posso combinar ferramentas conforme o que funciona para mim." }
      ], note: { id: "tools", title: "Ferramentas e acompanhamento", text: "Ampliação, contraste, leitura por voz, bengala e reabilitação entram na história conforme as necessidades de Alex." }
    },
    {
      chapter: 2, chapterName: "Entre mudanças", when: "Em casa · uma manhã de chuva", kicker: "02 / UMA CASA QUE RECONHEÇO", title: "As chaves de sempre.", art: "room", vision: 6.4, environment: "rain",
      description: "À esquerda, a chuva na janela. Ao centro, a mesa com um chaveiro de três argolas. À direita, o rádio na estante.",
      paragraphs: ["Combinamos de deixar os objetos em lugares previsíveis. Não é que eu tenha passado a ouvir mais. Comecei a prestar atenção em referências que antes ficavam ao fundo.", "Antes de sair, preciso das chaves. Posso explorar sem pressa."],
      type: "explore", objective: "Encontre as chaves. Cada opção descreve a posição e a pista; o som é opcional.", correct: 1,
      choices: [
        { label: "Explorar a janela", detail: "Esquerda · chuva no vidro", cue: "rain", pan: -.8, feedback: "Encontro a cortina e o peitoril. A chuva vem da esquerda; as chaves estão sobre a mesa, ao centro." },
        { label: "Explorar a mesa", detail: "Centro · chaveiro com três argolas", cue: "keys", pan: 0, feedback: "Minhas mãos encontram o chaveiro de três argolas. As chaves estão no lugar que combinamos." },
        { label: "Explorar a estante", detail: "Direita · música do rádio", cue: "radio", pan: .8, feedback: "O rádio está à direita. Reconheço a estante; as chaves estão sobre a mesa, ao centro." }
      ], note: { id: "home", title: "Referências da casa", text: "Janela à esquerda, mesa ao centro, estante à direita. As chaves ficam no mesmo recipiente sobre a mesa." }
    },
    {
      chapter: 3, chapterName: "Novas referências", when: "Algumas semanas de prática", kicker: "03 / ALÉM DA APARÊNCIA", title: "Um detalhe que encontro.", art: "room", vision: 7, environment: "room",
      description: "Três estojos sobre a mesa, identificados também por faixas em relevo.",
      paragraphs: ["Eu escolhi um jeito de identificar meus estojos: uma faixa em relevo para os fones; duas para as chaves; três para o cartão.", "A informação deixou de depender de uma cor ou de uma etiqueta pequena."],
      type: "explore", objective: "Qual estojo tem o cartão? As marcas estão descritas nos botões.", correct: 2,
      choices: [
        { label: "Uma faixa em relevo", detail: "Estojo dos fones", cue: "tap", pan: -.7, feedback: "Uma faixa identifica os fones. O cartão está no estojo de três faixas. Posso consultar a descrição de novo." },
        { label: "Duas faixas em relevo", detail: "Estojo das chaves", cue: "keys", pan: 0, feedback: "Duas faixas identificam as chaves. O cartão está no estojo de três faixas." },
        { label: "Três faixas em relevo", detail: "Estojo do cartão", cue: "tap", pan: .7, feedback: "Três faixas. Encontro o cartão e guardo o estojo de volta no lugar." }
      ], note: { id: "touch", title: "Marcas que fazem sentido para mim", text: "Neste jogo: uma faixa = fones; duas = chaves; três = cartão. São marcas escolhidas por Alex, não um código universal." }
    },
    {
      chapter: 3, chapterName: "Novas referências", when: "Um dia de cada vez", kicker: "03 / CABE UMA PAUSA", title: "O tempo também é meu.", art: "room", vision: 7, environment: "rain",
      description: "A caneca repousa sobre a mesa. A luz continua entrando, difusa, pela janela.",
      paragraphs: ["Às vezes eu termino o dia com disposição. Às vezes, me canso de explicar a mesma coisa ou de aprender algo que parecia automático.", "Eu posso parar. Descansar não apaga o que já aprendi."],
      type: "choice", key: "rest", objective: "Escolha uma pausa. Ela dura o tempo que você quiser antes de continuar.",
      choices: [
        { label: "Ficar um pouco com a chuva", value: "rain", cue: "rain", pan: 0, feedback: "Escuto a chuva. Não há tarefa escondida, contagem nem ritmo para acertar. Posso continuar quando quiser." },
        { label: "Sentir a caneca nas mãos", value: "cup", feedback: "Reconheço a alça e a pequena ranhura na cerâmica. Fico aqui por um momento, sem precisar resolver mais nada." }
      ]
    },
    {
      chapter: 3, chapterName: "Novas referências", when: "Um convite de Bia", kicker: "03 / OUTRAS FORMAS DE LER", title: "Tem uma mensagem.", art: "room", vision: 7.4, environment: "room",
      description: "O celular está sobre a mesa. Uma notificação anuncia uma mensagem de Bia.",
      paragraphs: ["O celular avisa que chegou uma mensagem. Hoje posso escolher como ler. A ferramenta serve ao que eu quero fazer.", { dialogue: "Bia: “Vamos ao café da praça? Quero te contar uma coisa. Pode ser no sábado, às quatro?”" }],
      type: "choice", key: "message", objective: "Como você quer acessar a mensagem?",
      choices: [
        { label: "Ouvir a mensagem", value: "voice", spoken: "Mensagem de Bia. Vamos ao café da praça? Quero te contar uma coisa. Pode ser no sábado, às quatro?", feedback: "“Vamos ao café da praça? Quero te contar uma coisa. Pode ser no sábado, às quatro?” Ouvir também é uma maneira de acessar o texto." },
        { label: "Ampliar o texto da mensagem", value: "zoom", feedback: "“Vamos ao café da praça? Quero te contar uma coisa. Pode ser no sábado, às quatro?” Ajusto a leitura ao que funciona melhor neste momento." }
      ], note: { id: "message", title: "O convite", text: "Bia me convidou para o café da praça, no sábado às quatro. O conteúdo pode ser acessado por ampliação ou por voz." }
    },
    {
      chapter: 4, chapterName: "O caminho de fora", when: "Planejar também é escolher", kicker: "04 / UM ENCONTRO MARCADO", title: "Como quero chegar.", art: "studio", vision: 7.5, environment: "room",
      description: "Sobre a mesa, referências de uma rota já praticada com acompanhamento.",
      paragraphs: ["O trajeto até a praça já tinha sido praticado com a instrutora. Havia referências que eu conhecia e alternativas que tínhamos conversado.", "Posso combinar companhia ou encontrar Bia lá. Não tenho de provar nada com essa escolha."],
      type: "choice", key: "companion", objective: "Como você prefere fazer esse caminho?",
      choices: [
        { label: "Combinar de ir com Bia", value: "together", feedback: "“Te encontro no portão”, ela responde. Eu escolho a companhia e continuo participando das decisões do caminho." },
        { label: "Encontrar Bia na praça", value: "meet", feedback: "Combinamos o ponto do encontro. Vou usar a rota que pratiquei e posso pedir apoio quando precisar." }
      ], note: { id: "support", title: "Companhia escolhida", text: "Autonomia inclui decidir como receber apoio. Fazer um trajeto com alguém não vale menos que fazê-lo sem companhia." }
    },
    {
      chapter: 4, chapterName: "O caminho de fora", when: "Antes de sair", kicker: "04 / UM MAPA DE REFERÊNCIAS", title: "Um lugar depois do outro.", art: "studio", vision: 7.5, environment: "room",
      description: "Um mapa narrativo de três referências: primeiro o portão, depois a padaria, por fim a praça.",
      paragraphs: ["Relembro o trajeto que pratiquei: saio pelo portão, passo pela padaria e chego à praça.", "Neste pequeno mapa da história, posso consultar as referências quantas vezes quiser."],
      type: "route", objective: "Monte a sequência: portão → padaria → praça. Você pode consultar o caderno.",
      choices: [ { label: "Praça", detail: "O destino do encontro", cue: "water", pan: .7, value: "square" }, { label: "Portão", detail: "O ponto de partida", cue: "tap", pan: -.7, value: "gate" }, { label: "Padaria", detail: "A referência no meio do caminho", cue: "bell", pan: 0, value: "bakery" } ],
      sequence: ["gate", "bakery", "square"], note: { id: "route", title: "Minha rota praticada", text: "1. Portão. 2. Padaria. 3. Praça. Este mapa pertence à ficção e pode ser relido durante a interação." }
    },
    {
      chapter: 4, chapterName: "O caminho de fora", when: "No trajeto conhecido", kicker: "04 / O MUNDO CONTINUA AQUI", title: "A rua tem referências.", art: "street", vision: 8, environment: "street",
      description: "Uma passagem de pedestres. À esquerda, o sino da padaria; adiante, árvores junto à praça.",
      paragraphs: () => [state.choices.companion === "together" ? "Bia caminha comigo. Reconheço o sino da padaria e digo que estamos perto. Ela acompanha o meu ritmo." : "Reconheço o sino da padaria. É uma referência do trajeto que pratiquei. Saber onde estou também inclui reconhecer quando preciso de informação.", "Minha atenção tem outros apoios agora. Posso parar, conferir e decidir como seguir."],
      type: "choice", key: "street", objective: "Escolha uma forma de conferir a referência.",
      choices: [
        { label: "Relembrar o mapa", detail: "Portão, padaria, praça", value: "map", feedback: "Portão, padaria, praça. Não preciso guardar todas as informações de uma vez: posso consultar as minhas referências." },
        { label: "Pedir uma descrição do entorno", detail: "Uma informação também é apoio", value: "description", feedback: "Peço que descrevam o que há adiante. Uma informação clara me ajuda a decidir o próximo passo." }
      ]
    },
    {
      chapter: 4, chapterName: "O caminho de fora", when: "Um imprevisto", kicker: "04 / A BARREIRA ESTÁ NO CAMINHO", title: "Hoje tem uma obra.", art: "street", vision: 8, environment: "street",
      description: "Uma barreira sinaliza uma obra que bloqueia a passagem conhecida. Alex para antes de continuar.",
      paragraphs: ["Uma obra bloqueou parte da passagem conhecida. Eu paro. É o espaço que mudou; não é uma falha minha.", "Alguém pergunta se quero ajuda. Eu posso explicar como prefiro recebê-la."],
      type: "choice", key: "barrier", objective: "Como você quer pedir apoio? As duas formas são válidas.",
      choices: [
        { label: "Descreva uma passagem acessível", value: "describe", feedback: "Peço informações sobre uma passagem acessível e segura. Só continuo depois de entender a alternativa, com o apoio necessário." },
        { label: "Quero ajuda para contornar a obra", value: "company", feedback: "Digo que quero companhia para o trecho e explico como prefiro ser ajudado. Pedir consentimento antes de ajudar faz diferença." }
      ], note: { id: "access", title: "Acesso não é esforço individual", text: "Um caminho bloqueado é uma barreira do ambiente. Informação acessível, espaços adequados e apoio com consentimento fazem parte da autonomia." }
    },
    {
      chapter: 5, chapterName: "O que permanece", when: "Na chegada à praça", kicker: "05 / SEM PRECISAR PROVAR", title: "Chegar do meu jeito.", art: "cafe", vision: 8, environment: "cafe",
      description: "Uma praça com árvores, uma fonte ao centro e mesas de café à direita.",
      paragraphs: () => [state.choices.companion === "together" ? "Bia e eu chegamos à praça. Conversamos sobre a obra e sobre o café que vamos pedir. Ter companhia não tornou o caminho menos meu." : "Chego à praça depois de conferir as referências e pedir a informação de que precisei. O caminho não foi uma prova de coragem. Era só o meu encontro de sábado.", "À minha frente, a tarde continua acontecendo. E eu faço parte dela."],
      type: "next", objective: "Uma etapa de cada vez. Continue no seu tempo."
    },
    {
      chapter: 5, chapterName: "O que permanece", when: "Um som conhecido", kicker: "05 / RECONHECER ALGUÉM", title: "Eu conheço essa risada.", art: "cafe", vision: 8, environment: "cafe",
      description: "À esquerda, a voz e a risada de Bia. Ao centro, água na fonte. À direita, xícaras no café.",
      paragraphs: ["Bia fala meu nome. Depois ri daquele jeito que começa antes da piada. A praça tem muitas coisas acontecendo, mas essa voz é uma referência que eu conheço.", "Posso conferir cada pista antes de responder."],
      type: "explore", correct: 0, objective: "Localize a voz de Bia. A posição e o conteúdo de cada pista também estão escritos.",
      choices: [
        { label: "Responder à voz à esquerda", detail: "Bia chama: “Alex, estou aqui!”", cue: "voice", pan: -.8, feedback: "“Estou aqui!”, respondo. Bia se aproxima e descreve onde estão as mesas. Reconheço a pessoa antes de reconhecer o lugar." },
        { label: "Conferir o som ao centro", detail: "Água caindo na fonte", cue: "water", pan: 0, feedback: "É a fonte, ao centro da praça. A voz de Bia vem da esquerda. Posso experimentar outra pista." },
        { label: "Conferir o som à direita", detail: "Xícaras se tocando no café", cue: "cup", pan: .8, feedback: "São as xícaras, à direita. A voz de Bia vem da esquerda. Não há pressa para responder." }
      ], note: { id: "meeting", title: "Uma referência de afeto", text: "A voz de Bia vem da esquerda. Fonte ao centro, café à direita. As pistas deste jogo têm equivalentes em texto." }
    },
    {
      chapter: 5, chapterName: "O que permanece", when: "Na mesa do café", kicker: "05 / O QUE A MEMÓRIA GUARDA", title: "A lembrança ficou.", art: "cafe", vision: 8, environment: "cafe",
      description: "Duas canecas sobre uma mesa. A praça permanece em contornos suaves; a visão não retorna.",
      paragraphs: () => [MEMORIES[state.choices.memory || "window"].text, "Conto a Bia a lembrança que guardei. Ela acrescenta um detalhe. Eu acrescento outro. Não estamos tentando refazer o passado: estamos dividindo uma história.", "Perdi parte da visão ao longo desses meses. Meus gostos, os vínculos e a vontade de viver outras coisas também fazem parte de mim."],
      type: "next", objective: "A lembrança escolhida no início está no seu caderno."
    },
    {
      chapter: 5, chapterName: "O que permanece", when: "Uma conversa que continua", kicker: "05 / CONTINUAR FAZENDO PLANOS", title: "E no próximo sábado?", art: "cafe", vision: 8, environment: "cafe",
      description: "A luz da tarde atravessa a praça. Bia está à mesa, escutando.",
      paragraphs: ["Bia conta que começou um curso de fotografia. Quer fazer um projeto com imagens, sons e descrições. Pergunta se eu gostaria de participar.", "Eu ainda tenho dias difíceis. Também tenho curiosidade sobre os dias que vêm. Posso falar de uma coisa sem esconder a outra."],
      type: "choice", key: "future", objective: "Como você quer continuar esta conversa?",
      choices: [
        { label: "Vamos pensar nesse projeto", value: "project", feedback: "Imagino fotografias com descrições e registros sonoros da praça. Quero participar das escolhas, inventar e experimentar." },
        { label: "Quero contar como tenho me sentido", value: "feelings", feedback: "Conto sobre o que tem sido difícil e sobre o que quero tentar. Bia escuta. Há lugar para novos planos e para uma conversa sincera." }
      ]
    },
    {
      chapter: 5, chapterName: "O que permanece", when: "A tarde segue", kicker: "05 / AINDA SOU EU", title: "Outras formas de chegar.", art: "cafe", vision: 8, environment: "cafe",
      description: "A mesma praça, a mesma visão residual, uma conversa e novos planos.",
      paragraphs: ["Eu não voltei a enxergar como antes. Também não me tornei outra pessoa de um dia para o outro.", "Fui encontrando ferramentas, referências e pessoas que respeitam minhas escolhas. Ainda estou aprendendo. A vida não precisa estar resolvida para continuar sendo minha."],
      type: "next", objective: "Quando quiser, termine esta história.", nextLabel: "Terminar história"
    }
  ];

  /* 3. SOM. Web Audio sintetiza ambientes discretos, sem arquivos externos.
     Nenhuma tarefa exige som. Pan -1 = esquerda, 0 = centro, 1 = direita. */
  class Soundscape {
    constructor() { this.context = null; this.master = null; this.bed = null; this.sources = []; this.cues = new Set(); this.scene = null; this.ducked = false; }
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
      if (!prefs.sound || !playing || document.hidden || document.querySelector("dialog[open]")) return this.stop();
      if (!this.ready()) return notify("Leitura em texto disponível. Este navegador não conseguiu iniciar o som ambiente.");
      if (this.scene === name && this.sources.length) return;
      this.stop(); this.scene = name;
      const ctx = this.context;
      this.bed = ctx.createGain(); this.bed.connect(this.master);
      this.bed.gain.value = this.ducked ? .25 : 1;
      const noise = ctx.createBufferSource(); noise.buffer = this.noise(); noise.loop = true;
      const filter = ctx.createBiquadFilter(); filter.type = "lowpass";
      filter.frequency.value = name === "rain" ? 1900 : name === "street" ? 800 : name === "cafe" ? 650 : 340;
      const gain = ctx.createGain(); gain.gain.value = name === "rain" ? .2 : name === "street" ? .12 : .055;
      noise.connect(filter); filter.connect(gain); gain.connect(this.bed); noise.start();
      this.sources.push(noise);
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
      if (kind === "keys") { [1318.5, 1760, 1568].forEach((f, i) => this.tone(f, i * .14, .29, pan, .12)); }
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
  function freshState() { return { version: 1, scene: 0, resolved: false, feedback: "", routeStep: 0, choices: {}, notes: [], finished: false }; }
  function readSave() {
    const raw = readJSON(SAVE_KEY);
    if (!raw || raw.version !== 1 || !Number.isInteger(raw.scene) || raw.scene < 0 || raw.scene >= SCENES.length || !raw.choices || typeof raw.choices !== "object" || Array.isArray(raw.choices) || !Array.isArray(raw.notes)) return null;
    const choices = {};
    for (const scene of SCENES) if (scene.key && typeof raw.choices[scene.key] === "string" && scene.choices.some((c) => c.value === raw.choices[scene.key])) choices[scene.key] = raw.choices[scene.key];
    const notes = raw.notes.filter((n) => n && typeof n.id === "string" && typeof n.title === "string" && typeof n.text === "string").slice(0, 30).map((n) => ({ id: n.id.slice(0, 60), title: n.title.slice(0, 200), text: n.text.slice(0, 2000) }));
    return { version: 1, scene: raw.scene, resolved: Boolean(raw.resolved), feedback: typeof raw.feedback === "string" ? raw.feedback.slice(0, 4000) : "", routeStep: Number.isInteger(raw.routeStep) ? Math.min(3, Math.max(0, raw.routeStep)) : 0, choices, notes, finished: raw.scene === SCENES.length - 1 && Boolean(raw.finished) };
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
    message += sceneParagraphs(scene).map((p) => typeof p === "string" ? p : p.dialogue).join(" ");
    message += ` ${scene.objective} `;
    if (state.resolved && state.feedback) message += `${state.feedback} Continue quando quiser.`;
    else if (scene.type !== "next") message += scene.choices.map((c, i) => `Opção ${i + 1}: ${c.label}. ${c.detail || ""}`).join(" ");
    return message;
  }

  /* 6. INTERFACE / CENAS. Texto e botões ficam fora das camadas de desfoque. */
  function setArtwork(name, vision = 0) {
    if (renderedArt !== name) { $("scene-art").innerHTML = ART[name] || ART.room; renderedArt = name; }
    document.documentElement.style.setProperty("--scene-blur", `${vision}px`);
    document.documentElement.style.setProperty("--scene-light", String(1 - vision * .025));
    document.documentElement.style.setProperty("--vision-opacity", String(vision * .065));
  }
  function setScreen(nextScreen) {
    screen = nextScreen; document.body.dataset.screen = nextScreen;
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
    $("listen-button").textContent = prefs.sound ? "Silenciar ambiente" : "Ouvir ambiente";
    $("control-hint").textContent = prefs.shortcuts ? "1–3 escolher · N continuar · R repetir · C caderno · P pausar" : "Tab para navegar · Enter para escolher";
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
    setArtwork(scene.art, scene.vision);
    $("chapter-label").textContent = `CAPÍTULO ${String(scene.chapter).padStart(2, "0")} · ${scene.chapterName.toLocaleUpperCase("pt-BR")}`;
    $("scene-position").textContent = `${String(state.scene + 1).padStart(2, "0")} / ${SCENES.length}`;
    $("story-progress").max = SCENES.length; $("story-progress").value = state.scene + 1;
    $("story-progress").setAttribute("aria-valuetext", `Cena ${state.scene + 1} de ${SCENES.length}`);
    $("timeline-label").textContent = scene.when; $("scene-kicker").textContent = scene.kicker;
    $("scene-title").textContent = scene.title; $("scene-description").textContent = scene.description;
    $("scene-text").replaceChildren();
    for (const paragraph of sceneParagraphs(scene)) { const p = document.createElement("p"); p.textContent = typeof paragraph === "string" ? paragraph : paragraph.dialogue; if (typeof paragraph !== "string") p.className = "dialogue"; $("scene-text").append(p); }
    $("objective").textContent = scene.objective;
    $("feedback").hidden = !state.feedback; $("feedback").textContent = state.feedback;
    $("feedback").classList.toggle("enlarged-message", scene.key === "message" && state.choices.message === "zoom" && state.resolved);
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
      button.addEventListener("click", () => choose(i)); container.append(button);
    });
  }
  function renderRoute() {
    const scene = currentScene(); const list = $("route-progress"); list.replaceChildren(); list.hidden = scene.type !== "route" || !state.routeStep;
    if (scene.type === "route") for (const value of scene.sequence.slice(0, state.routeStep)) { const li = document.createElement("li"); li.textContent = scene.choices.find((c) => c.value === value).label; list.append(li); }
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
    if (scene.type === "route") {
      if (scene.sequence.slice(0, state.routeStep).includes(choice.value)) return;
      if (choice.value !== scene.sequence[state.routeStep]) {
        const expected = scene.choices.find((c) => c.value === scene.sequence[state.routeStep]);
        const message = `Essa referência vem depois. ${state.routeStep === 0 ? "Começo pelo" : "Agora procuro:"} ${expected.label.toLocaleLowerCase("pt-BR")}. A sequência está na descrição e no caderno.`;
        showFeedback(message); save(); speak(message); return;
      }
      state.routeStep++;
      if (state.routeStep === scene.sequence.length) return complete("Portão, padaria, praça. Relembrei as três referências. Posso levar esse mapa no caderno e consultá-lo quando precisar.");
      const message = `${choice.label} registrado. ${state.routeStep === 1 ? "Depois do portão, vem a padaria." : "Depois da padaria, vem a praça."}`;
      showFeedback(message); renderChoices(); renderRoute(); $("route-reset").hidden = false;
      const nextValue = scene.sequence[state.routeStep]; const nextIndex = scene.choices.findIndex((c) => c.value === nextValue);
      $("choices").children[nextIndex].focus(); save(); speak(message); return;
    }
    if (scene.type === "explore" && index !== scene.correct) { showFeedback(choice.feedback); save(); speak(choice.feedback); return; }
    if (scene.key) state.choices[scene.key] = choice.value;
    if (scene.key === "memory") { const memory = MEMORIES[choice.value]; addNote({ id: "memory", title: memory.title, text: memory.text }); }
    if (scene.key === "message" && choice.value === "zoom") {
      $("feedback").classList.add("enlarged-message");
    } else $("feedback").classList.remove("enlarged-message");
    complete(choice.feedback);
    if (choice.spoken) speak(choice.feedback, true);
    if (choice.cue === "voice") speak("Bia chama, à esquerda: Alex, estou aqui! " + choice.feedback);
  }
  function nextScene() {
    if (!playing || screen !== "story" || document.querySelector("dialog[open]")) return;
    if (currentScene().type !== "next" && !state.resolved) return;
    if (state.scene === SCENES.length - 1) return finishGame();
    state.scene++; state.resolved = false; state.feedback = ""; state.routeStep = 0;
    $("feedback").classList.remove("enlarged-message"); renderScene();
  }
  function finishGame() {
    stopVoice(); sound.stop(); playing = false; state.finished = true; save();
    setScreen("ending"); setArtwork("cafe", 8);
    const memory = MEMORIES[state.choices.memory || "window"];
    const memoryTitle = memory.title.charAt(0).toLocaleLowerCase("pt-BR") + memory.title.slice(1);
    $("ending-personal").textContent = state.choices.future === "project" ? `Levo comigo ${memoryTitle} e um projeto para inventar com Bia.` : `Levo comigo ${memoryTitle} e uma conversa em que pude dizer como me sinto.`;
    $("ending-content").focus({ preventScroll: true }); window.scrollTo({ top: 0, behavior: "instant" });
    speak(`Fim desta história. A vida ainda é minha. ${$("ending-text").textContent} ${$("ending-personal").textContent} ${$("ending-message").textContent}`);
  }
  function showHome() {
    playing = false; stopVoice(); sound.stop(); setScreen("start"); setArtwork("room", 0);
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
      const notes = state.notes.length ? state.notes : [{ title: "Uma página em branco", text: "Suas lembranças e referências aparecem aqui ao longo da história." }];
      for (const note of notes) { const li = document.createElement("li"); const title = document.createElement("strong"); const p = document.createElement("p"); title.textContent = note.title; p.textContent = note.text; li.append(title, p); list.append(li); }
    }
    $(id).showModal();
  }
  function closeAndOpen(from, to) { $(from).close(); openDialog(to); }
  document.querySelectorAll("[data-open]").forEach((button) => button.addEventListener("click", () => openDialog(button.dataset.open)));
  document.querySelectorAll("dialog").forEach((dialog) => dialog.addEventListener("close", () => {
    stopVoice();
    if (!document.querySelector("dialog[open]") && playing && !document.hidden) sound.environment(currentScene().environment);
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
    notify(prefs.sound ? "Ambiente ligado. As pistas também estão escritas nas opções." : "Ambiente silenciado.");
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
      if (key === "narration" && prefs.narration) speak("Narração ligada. Ao voltar, use Repetir cena para ouvir o trecho atual.");
    });
  }
  $("test-voice").addEventListener("click", () => speak("O que permanece. Esta é a voz da história. Cada cena espera por você.", true));
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
  document.addEventListener("visibilitychange", () => { if (document.hidden) { stopVoice(); sound.stop(); } else if (playing && !document.querySelector("dialog[open]")) sound.environment(currentScene().environment); });
  window.addEventListener("pagehide", () => { stopVoice(); sound.stop(); });

  applyPrefs(); setScreen("start"); setArtwork("room", 0);
  const initialSave = readSave();
  if (initialSave) { $("continue-button").hidden = false; $("start-button").firstChild.textContent = "Nova história "; $("save-hint").hidden = false; $("save-hint").textContent = initialSave.finished ? "História concluída. Reveja o final ou comece outra vez." : `Progresso guardado: cena ${initialSave.scene + 1} de ${SCENES.length}.`; }
})();
