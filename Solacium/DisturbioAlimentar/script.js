"use strict";

/* FICA MAIS UM POUCO — Como me sinto, história 04.
   Ficção sobre transtorno alimentar, vínculo e cuidado profissional.
   As interações tratam de lembranças e comunicação; não simulam dietas,
   controle de peso, compensações ou avaliação clínica. Sem pontuação de saúde.
   Cada cena espera pelo jogador; os trechos intensos têm leitura mais suave. */

(() => {
  const $ = (id) => document.getElementById(id);
  const SAVE_KEY = "fica-mais-um-pouco-historia-v1";
  const PREFS_KEY = "fica-mais-um-pouco-preferencias-v1";
  const ART = {};

  /* 1. CENÁRIOS. Objetos, luz e vínculos, sem comparações de corpos. */
  const svg = (body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice"><defs>
    <linearGradient id="wall" x2="1" y2=".5"><stop stop-color="#31394e"/><stop offset="1" stop-color="#727581"/></linearGradient>
    <linearGradient id="sky" x2="0" y2="1"><stop stop-color="#8496aa"/><stop offset=".65" stop-color="#b5a8a8"/><stop offset="1" stop-color="#e1bb9e"/></linearGradient>
    <linearGradient id="nightsky" x2="0" y2="1"><stop stop-color="#26344d"/><stop offset="1" stop-color="#708296"/></linearGradient>
    <linearGradient id="floor" x2="0" y2="1"><stop stop-color="#746c6d"/><stop offset="1" stop-color="#242f43"/></linearGradient>
    <linearGradient id="light" x2="1" y2="1"><stop stop-color="#efcdaa" stop-opacity=".3"/><stop offset="1" stop-color="#efcdaa" stop-opacity="0"/></linearGradient>
    <radialGradient id="glow"><stop stop-color="#f4d2b1" stop-opacity=".6"/><stop offset="1" stop-color="#f4d2b1" stop-opacity="0"/></radialGradient>
  </defs><g class="scene-paint">${body}</g></svg>`;
  const guitar = (x, y, scale = 1) => `<g transform="translate(${x} ${y}) scale(${scale}) rotate(9)">
    <path fill="#3e3c4a" d="M-5-216h22v193H-5z"/><path fill="#b69278" d="M-11-248h34v51h-34z"/>
    <g fill="#b9b9ae"><path d="M-18-239h8v7h-8zM23-238h8v7h-8zM-18-220h8v7h-8zM23-219h8v7h-8z"/></g>
    <path fill="#bb8b64" stroke="#dfb88e" stroke-width="4" d="M5-43q-42-35-63 0-15 29 3 49-45 27-37 75 7 48 97 48 87 0 95-48 8-48-36-75 16-27 1-49-20-33-60 0z"/>
    <circle cy="20" cx="6" r="26" fill="#5b4c49"/><circle cy="20" cx="6" r="32" fill="none" stroke="#e1c29a" stroke-width="2"/>
    <path fill="#4c4650" d="M-24 82h62v13h-62z"/>
    <g stroke="#e8d3b0" stroke-width=".8" opacity=".75"><path d="M0-221V87M4-221V87M8-221V87M12-221V87"/></g>
    <path fill="#a7a0c5" d="M17-217l20 26-15 44-12-27-14 12 11-52z"/>
  </g>`;
  const windowArt = (night = false) => `<path fill="#303b52" d="M780 99h635v537H780z"/><path fill="${night ? "url(#nightsky)" : "url(#sky)"}" d="M802 121h590v491H802z"/>
    <path fill="#6e7c91" d="M802 476h50v-67h78v90h48v-128h72v115h76v-55h91v67h64v-115h61v99h50v130H802z"/>
    <path fill="#53687e" d="M802 538h94v-31h72v28h83v-23h122v-49h60v61h159v88H802z"/>
    <g fill="#debc99" opacity=".65"><path d="M912 442h7v15h-7zM932 442h7v15h-7zM1005 405h7v15h-7zM1024 405h7v15h-7zM1299 415h7v15h-7zM1280 415h7v15h-7zM1152 539h7v15h-7z"/></g>
    <path fill="#3d4b62" d="M998 115h13v503h-13zM1194 115h13v503h-13zM795 363h604v10H795zM775 614h646v27H775z"/>
    <path fill="#b3afba" opacity=".3" d="M755 90q-23 281-5 552h69q-33-273 10-552zM1396 92q-35 301 0 552h74q-48-280-16-552z"/>`;
  const rehearsal = (evening = false) => svg(`<path fill="url(#wall)" d="M0 0h1600v1000H0z"/><path fill="url(#floor)" d="M0 751h1600v249H0z"/>
    ${windowArt(evening)}
    <path fill="url(#light)" d="M801 447l590 167 209 386H519z"/>
    <path fill="#3e4961" d="M393 247h201v252H393z"/><path fill="#b1adba" d="M408 263h170v220H408z"/>
    <g stroke="#77798c" stroke-width="2" fill="none"><path d="M432 315h118m-118 10h118m-118 10h118m-118 10h118m-118 10h118"/><path d="M468 340v-42l24-5v39"/><ellipse cx="461" cy="342" rx="7" ry="5" fill="#77798c"/><ellipse cx="485" cy="334" rx="7" ry="5" fill="#77798c"/></g>
    <path fill="#3b445c" d="M1290 539h183v214h-183z"/><path fill="#59677c" d="M1308 555h148v177h-148z"/>
    <circle cx="1382" cy="658" r="53" fill="#303d56"/><circle cx="1382" cy="658" r="34" fill="#4f6076"/><circle cx="1382" cy="658" r="15" fill="#34465d"/>
    <path fill="#bfac91" d="M1145 635h13v240h-13z"/><path fill="#d4bea1" d="M1078 631l22-84h103l25 84z"/><circle fill="url(#glow)" cx="1152" cy="624" r="190"/>
    <path fill="#817581" d="M843 786h193v25H843zM865 812h16v161h-16zM1000 812h16v161h-16z"/>
    <ellipse fill="#b5a08e" cx="941" cy="786" rx="107" ry="24"/>
    ${guitar(961, 682, 1.08)}
    <path fill="none" stroke="#9babb6" stroke-width="7" d="M1246 912l4-377m-30 377 30-24 41 24"/>
    <path fill="#526071" d="M1215 513q36-23 70 0v26h-70z"/><path fill="#aeb5b3" d="M1219 507q31-24 61 0v16h-61z"/>
    <path fill="none" stroke="#26384f" stroke-width="4" d="M1251 536q-58 229 4 376t-177 39"/>
    <path fill="#64768a" d="M579 748h149v86H579z"/><path fill="#a1a5ac" d="M590 752h127v51H590z"/>
    <path fill="#c5bca8" d="M596 762h113v30H596z"/><path fill="#596278" d="M641 804h54v7h-54z"/>
    <path fill="#9f8996" d="M589 840h124v20H589z"/><path fill="#ddd0b4" d="M612 824l72-8 8 24-75 7z"/>
    <g stroke="#b2a8a0" stroke-opacity=".17"><path d="M0 829h1600M0 933h1600M440 751L265 1000M841 751l21 249M1251 751l215 249"/></g>
  `);
  ART.cover = rehearsal(false);
  ART.rehearsal = rehearsal(false);
  ART.studio = rehearsal(true);

  const room = (night = false) => svg(`<path fill="url(#wall)" d="M0 0h1600v1000H0z"/><path fill="url(#floor)" d="M0 752h1600v248H0z"/>
    ${windowArt(night)}
    <path fill="#454b66" d="M243 449h344v295H243z"/><path fill="#6f7284" d="M261 467h309v259H261z"/>
    <path fill="#878593" d="M262 516h307v8H262zM262 590h307v8H262zM262 663h307v8H262z"/>
    <g fill="#aaa5a0"><path d="M289 479h14v36h-14zM309 471h12v44h-12zM329 481h15v34h-15zM351 475h12v40h-12zM385 473h29v42h-29z"/></g>
    <path fill="#aaa9b9" d="M482 540l42-2 4 48-42 2z"/>
    <path fill="#555e73" d="M1161 669q0-40 43-40h254q40 0 42 40v166h-339z"/><path fill="#7b7c89" d="M1180 650h297v117h-297z"/>
    <path fill="#b0a2a9" d="M1196 670l72-4 4 70-70 4z"/><path fill="#686a7c" d="M1162 769h338v59h-338zM1181 829h13v93h-13zM1468 829h13v93h-13z"/>
    <path fill="#645d68" d="M636 780h493v33H636zM657 814h18v149h-18zM1091 814h18v149h-18z"/><path fill="#c0a98f" d="M621 760h523v29H621z"/>
    <path fill="#d0b9a0" d="M946 759h139l-14-86H959z"/><path fill="#92817b" d="M1010 674h10V509h-10z"/><path fill="#d4bea1" d="M945 508l22-79h97l26 79z"/><circle fill="url(#glow)" cx="1015" cy="518" r="219"/>
    <path fill="#454d65" d="M723 730l98-5 9 31-102 7z"/><path fill="#aab7bc" d="M730 733l84-4 6 18-85 6z"/>
    <path fill="#ded0b4" d="M849 736l73-7 9 25-76 7z"/><g fill="none" stroke="#a58b9c" stroke-width="2"><path d="M861 739l45-4m-42 12 45-5"/></g>
    ${guitar(1438, 791, .7)}
    <path fill="none" stroke="#b5c4cb" stroke-opacity="${night ? ".25" : ".1"}" stroke-width="1.3" d="M849 140l-33 225m135-251-40 270m187-249-37 258m217-234-37 252m64-23-28 203M902 364l-28 179m203-144-23 169"/>
  `);
  ART.room = room(false);
  ART.rain = room(true);

  ART.waiting = svg(`<path fill="#626d80" d="M0 0h1600v1000H0z"/><path fill="#83918f" d="M0 744h1600v256H0z"/>
    <path fill="#34495f" d="M835 146h508v410H835z"/><path fill="#b4c2bd" d="M853 165h472v373H853z"/>
    <path fill="#77988a" d="M853 460q111-111 235-50t237-27v155H853z"/><path fill="#557f7e" d="M853 500q190-72 472-15v53H853z"/>
    <path fill="#546a7a" d="M1084 161h12v381h-12z"/>
    <path fill="#bec2b3" d="M464 249h233v274H464z"/><path fill="#dadecb" d="M480 264h200v242H480z"/>
    <g fill="none" stroke="#82968f" stroke-width="4"><path d="M508 311h142m-142 24h111m-111 24h127m-127 24h102"/><circle cx="580" cy="452" r="27"/></g>
    <g fill="#536c79"><path d="M757 702q0-42 34-42h112q34 0 34 42v133H757zM1015 702q0-42 34-42h112q34 0 34 42v133h-180z"/></g>
    <g fill="#8ca198"><path d="M772 676h150v97H772zM1030 676h150v97h-150z"/></g>
    <g fill="#3f586c"><path d="M751 777h191v47H751zM1009 777h191v47h-191zM770 824h13v107h-13zM914 824h13v107h-13zM1028 824h13v107h-13zM1172 824h13v107h-13z"/></g>
    <path fill="#d2d5c6" d="M1313 777h137l-14 31h-111z"/><path fill="#586f72" d="M1377 806h12v123h-12z"/>
    <path fill="#dadcc7" d="M1417 564h70l-9 150h-51z"/><g fill="#6c8b75"><path d="M1448 571q-73-103-36-126 53 31 36 126zM1450 566q1-130 41-130 32 79-41 130zM1450 569q50-88 81-53-6 52-81 53z"/></g>
    <path fill="url(#light)" d="M853 420l472 117 275 463H463z"/>
  `);

  ART.balcony = svg(`<path fill="url(#sky)" d="M0 0h1600v1000H0z"/>
    <path fill="#8494a3" d="M0 388h198v331H0zM223 302h197v417H223zM477 422h149v297H477zM1294 355h306v364h-306z"/>
    <path fill="#657e93" d="M0 582h1600v219H0z"/>
    <path fill="#2e3d56" d="M0 0h505v1000H0z"/><path fill="#556074" d="M505 0h50v1000h-50zM1524 0h76v1000h-76z"/>
    <path fill="#7d7880" d="M556 767h968v233H556z"/><path fill="url(#floor)" d="M556 802h968v198H556z"/>
    <path fill="#445d72" d="M560 640h966v19H560z"/><g stroke="#445d72" stroke-width="9"><path d="M601 652v146M723 652v146M845 652v146M967 652v146M1089 652v146M1211 652v146M1333 652v146M1455 652v146"/></g>
    <path fill="#9d9190" d="M729 819h215v23H729zM748 843h16v123h-16zM907 843h16v123h-16zM1100 820h215v23h-215zM1119 843h16v123h-16zM1278 843h16v123h-16z"/>
    <g transform="translate(841 817)"><path fill="#77758f" d="M-57-85q57-32 114 0l10 95H-67z"/><ellipse fill="#b5a092" cy="-127" rx="32" ry="36"/><path fill="#494657" d="M-33-118q-6-58 34-59 42 2 34 70l-12-39-48 8z"/><path fill="#3e5068" d="M-52 10h104l11 135H34L12 44-12 145h-32z"/></g>
    <g transform="translate(1200 820)"><path fill="#a28a8b" d="M-57-85q57-32 114 0l10 95H-67z"/><ellipse fill="#c2aa97" cy="-127" rx="32" ry="36"/><path fill="#3d3c4b" d="M-34-122q-7-52 35-55 40 3 35 58l-17-29-42 4z"/><path fill="#44576d" d="M-52 10h104l8 133H32L10 45-12 143h-32z"/></g>
    <path fill="none" stroke="#c5af9d" stroke-width="14" stroke-linecap="round" d="M892 755l91 33 165-27"/>
    <path fill="#3f5366" d="M990 809h66v16h-66zM1017 822h12v123h-12z"/><path fill="#d5c5aa" d="M999 791l45-4 6 20-47 5z"/>
    <path fill="#9b9e9f" d="M1437 691h68l-13 123h-43z"/><g fill="#7c967b"><path d="M1471 697q-77-109-43-132 54 28 43 132zM1474 694q-4-143 43-143 32 82-43 143z"/></g>
    <path fill="none" stroke="#c1b1a0" stroke-width="2" d="M550 160q450 154 977 49"/><g fill="#f2d8b4"><circle cx="663" cy="190" r="6"/><circle cx="857" cy="222" r="6"/><circle cx="1054" cy="237" r="6"/><circle cx="1255" cy="236" r="6"/><circle cx="1444" cy="220" r="6"/></g>
  `);

  /* 2. ROTEIRO. Luísa é uma personagem, não um modelo de diagnóstico. */
  const MEMORIES = {
    recording: { title: "A gravação do ensaio", text: "Numa gravação antiga, Iara perde o começo da música. Minha voz aparece ao fundo: pode começar de novo, eu fico aqui.", ending: "Guardo a gravação com as nossas vozes. Ainda posso reconhecer minha risada entre uma nota e outra." },
    ribbon: { title: "A fita lilás", text: "Iara amarrou uma fita lilás no violão para reconhecê-lo no meio dos instrumentos. A ponta ficou torta. Eu pedi que deixasse daquele jeito.", ending: "A fita lilás continua no violão. Iara ajeita a ponta e eu peço que deixe um pedacinho torto, como antes." },
    note: { title: "O começo de uma canção", text: "Num papel dobrado, escrevemos: quando faltar palavra, eu sento com você. A canção ficou inacabada por muito tempo.", ending: "Abro o papel da nossa canção. Ainda há espaço depois da última linha, e eu não preciso preencher tudo hoje." }
  };
  const SCENES = [
    {
      chapter: 1, chapterName: "Quando havia música", when: "Um fim de tarde · antes do silêncio", kicker: "01 / A NOSSA PARTE DA MÚSICA", title: "Pode começar de novo.", art: "rehearsal", mood: 0, environment: "memory",
      description: "Uma pequena sala de ensaio. Há um violão com fita lilás, um gravador e uma folha dobrada perto da janela.",
      paragraphs: ["Iara sempre entrava cedo demais no refrão. Eu parava o violão e ela começava a rir antes de pedir desculpas.", { dialogue: "“Pode começar de novo. Eu fico aqui.”" }, "Meu nome é Luísa. Tenho 23 anos. Naquele tempo, a minha irmã dizia que a nossa música só ficaria pronta quando a gente parasse de conversar no meio.", "A gente nunca parava."],
      type: "choice", key: "memory", objective: "Escolha uma lembrança desse ensaio. Ela volta no final.",
      choices: [
        { label: "Guardar a gravação", detail: "Duas vozes e uma risada no fundo", value: "recording", cue: "chord", feedback: "Deixo o gravador ligado. Iara erra a entrada outra vez. Minha risada quase cobre o primeiro acorde. Guardo assim mesmo." },
        { label: "Olhar a fita lilás", detail: "Uma ponta torta no violão", value: "ribbon", cue: "paper", feedback: "Iara tenta ajeitar o laço, e eu peço que deixe. Agora dá para reconhecer o nosso violão de longe." },
        { label: "Dobrar o começo da canção", detail: "Um papel que ainda tem espaço", value: "note", cue: "paper", feedback: "No papel, escrevemos: “quando faltar palavra, eu sento com você”. Dobro com cuidado e guardo no estojo." }
      ]
    },
    {
      chapter: 1, chapterName: "Quando havia música", when: "Um tempo depois", kicker: "01 / O QUE FOI OCUPANDO ESPAÇO", title: "O barulho por dentro.", art: "room", mood: 0, environment: "room",
      description: "O celular está aceso sobre uma mesa. O violão repousa perto da janela; a folha da canção continua dobrada.",
      paragraphs: ["Eu não saberia escolher o dia em que as coisas começaram a mudar. Havia comparações por toda parte, comentários sobre aparência e uma cobrança que eu levava para casa mesmo quando a conversa já tinha terminado.", "Aos poucos, ficou difícil prestar atenção na música sem pensar no que eu achava que precisava corrigir em mim.", "Quem estava de fora ainda me via sorrir nas fotografias."],
      softParagraphs: ["Luísa começa a lidar com cobranças e comparações que prejudicam seu bem-estar. Mesmo mantendo algumas atividades, passa a se sentir mais distante das pessoas e da música."],
      type: "next", objective: "Você pode usar a versão mais suave desta cena quando quiser."
    },
    {
      chapter: 1, chapterName: "Quando havia música", when: "As mensagens se acumulam", kicker: "01 / DEPOIS EU RESPONDO", title: "O ensaio ficou para depois.", art: "rain", mood: 1, environment: "rain",
      description: "Uma sala à noite. Há notificações no celular e um caderno fechado sobre a mesa.",
      paragraphs: ["Iara mandava uma ideia para o refrão. Uma amiga perguntava se eu ia ao encontro do grupo. Eu abria as mensagens e procurava uma resposta que parecesse simples.", "Depois eu respondo. Depois eu volto. Depois eu conto por que está difícil.", "O violão começou a ficar mais tempo dentro do estojo. Eu escutava as mensagens de Iara sem saber como pedir que ela continuasse mandando."],
      type: "choice", key: "messages", objective: "Qual mensagem Luísa consegue escrever hoje?",
      choices: [
        { label: "Não estou conseguindo conversar muito", value: "honest", feedback: "Escrevo só isso. Iara responde que pode mandar uma música sem esperar resposta. Ela não pede uma explicação pronta." },
        { label: "Pode continuar me chamando?", value: "invite", feedback: "Apago a frase algumas vezes antes de enviar. Iara responde: “Posso. Se quiser só companhia, me diz também.”" }
      ]
    },
    {
      chapter: 1, chapterName: "Quando havia música", when: "O que quase ninguém percebia", kicker: "01 / MAIS DO QUE UMA APARÊNCIA", title: "Não cabia na resposta.", art: "room", mood: 1, environment: "room",
      description: "A mesma sala de sempre. Os objetos permanecem no lugar, mas Luísa já não consegue se sentir presente como antes.",
      paragraphs: ["A alimentação passou a vir acompanhada de medo, culpa e pensamentos que ocupavam o meu dia. Eu me sentia sozinha até quando estava perto de alguém.", "Não sabia explicar aquilo sem me julgar antes de terminar a frase. Quando perguntavam como eu estava, eu dizia que estava cansada.", "Era uma palavra pequena para um sofrimento que vinha tomando tanto espaço."],
      softParagraphs: ["A relação de Luísa com a alimentação e com o próprio corpo está causando sofrimento e afetando sua vida. Ela ainda tem dificuldade para falar do que sente e precisa de acolhimento e cuidado."],
      type: "next", objective: "A cena espera por você. Pausar também é uma opção."
    },
    {
      chapter: 1, chapterName: "Quando havia música", when: "Uma noite de ensaio", kicker: "01 / A CADEIRA PERTO DO MICROFONE", title: "Iara deixou minha parte.", art: "studio", mood: 1, environment: "memory",
      description: "Na sala de ensaio há dois lugares preparados. Um violão está apoiado no banco; o microfone permanece disponível.",
      paragraphs: ["Naquela noite, eu não consegui ir. Iara gravou um pedaço do ensaio e mandou para mim. Na parte em que eu costumava cantar, ela tocou mais baixo e deixou a música seguir.", "Depois veio outra mensagem.", { dialogue: "“Guardei a sua ideia para a gente testar quando você quiser. Quer que eu passe aí?”" }, "Eu ouvi de novo. Dessa vez, consegui ficar com o telefone nas mãos até a música acabar."],
      type: "next", objective: "Continue quando quiser ouvir o que Luísa tenta dizer."
    },
    {
      chapter: 2, chapterName: "O que eu escondia", when: "Uma visita sem ensaio", kicker: "02 / AS RESPOSTAS PRONTAS", title: "Tudo bem. E você?", art: "rain", mood: 1, environment: "rain",
      description: "Iara chega para uma visita. O caderno e o violão estão próximos, mas não há obrigação de ensaiar.",
      paragraphs: ["Quando Iara perguntou se eu estava bem, dei a resposta de sempre e devolvi a pergunta rápido demais.", "Ela contou uma coisa pequena sobre o dia. Depois ficou ali, sem ligar a televisão, sem procurar um assunto que cobrisse o silêncio.", { dialogue: "“Eu posso perguntar outra vez?”" }],
      type: "choice", key: "visit", objective: "Como Luísa quer continuar essa visita?",
      choices: [
        { label: "Pode. Mas eu vou precisar de tempo", value: "time", feedback: "Iara faz que sim. Eu não preciso conseguir contar tudo para a conversa ter começado." },
        { label: "Hoje eu só queria que você ficasse", value: "company", feedback: "“Eu fico um pouco”, ela responde. Sentamos perto da janela. A chuva faz o resto do barulho." }
      ]
    },
    {
      chapter: 2, chapterName: "O que eu escondia", when: "Depois que a visita vai embora", kicker: "02 / PROCURAR AS PALAVRAS", title: "O que eu não dizia.", art: "room", mood: 1, environment: "room",
      description: "O caderno está aberto. Uma página em branco fica entre o celular e a folha da canção.",
      paragraphs: ["Eu tinha medo de que alguém tratasse o que eu sentia como exagero. Também tinha medo de ser compreendida e não saber o que viria depois.", "Passei tanto tempo tentando parecer bem que pedir ajuda parecia desmentir a pessoa que todo mundo conhecia.", "Abri o caderno. Pela primeira vez naquela semana, escrevi uma frase que não tentava deixar ninguém tranquilo."],
      softParagraphs: ["Luísa começa a escrever sobre o que está vivendo. Ainda há insegurança, mas ela procura uma forma de pedir apoio sem precisar organizar toda a história de uma vez."],
      type: "next", objective: "Você pode acompanhar esta cena pela leitura mais suave."
    },
    {
      chapter: 2, chapterName: "O que eu escondia", when: "Uma página em branco", kicker: "02 / UMA FRASE DE CADA VEZ", title: "Um começo de conversa.", art: "room", mood: 0, environment: "memory",
      description: "Três papéis ajudam a compor o que Luísa quer contar: o que sente, do que precisa e como quer companhia.",
      paragraphs: ["Não consegui escrever uma carta inteira. Separei pequenas frases que eu poderia usar numa conversa.", "Elas não precisavam explicar minha vida. Só precisavam abrir uma porta."],
      type: "gather", objective: "Leia os três papéis. Eles ajudam a montar a mensagem da próxima cena.", completeText: "Olho as três frases juntas. Já existe um começo que eu consigo dividir com alguém.",
      choices: [
        { label: "O que estou sentindo", detail: "Está difícil lidar com isso sozinha", value: "feel", cue: "paper", feedback: "Escrevo: “está difícil lidar com isso sozinha”. A frase não precisa convencer ninguém pelo tamanho do sofrimento.", note: { id: "feel", title: "O que consegui dizer", text: "Está difícil lidar com isso sozinha. Luísa pode começar por uma frase pequena." } },
        { label: "Do que preciso", detail: "Quero ajuda para procurar cuidado", value: "need", cue: "paper", feedback: "Escrevo: “quero ajuda para procurar cuidado”. Posso pedir orientação sem já saber o nome de tudo o que está acontecendo.", note: { id: "need", title: "Um pedido possível", text: "Quero ajuda para procurar cuidado. Luísa quer apoio para buscar um atendimento profissional." } },
        { label: "Como quero companhia", detail: "Você pode me acompanhar?", value: "company", cue: "paper", feedback: "Escrevo: “você pode me acompanhar?”. Ainda posso escolher o que quero contar e o que prefiro conversar em particular.", note: { id: "company", title: "Companhia e privacidade", text: "Você pode me acompanhar? Pedir companhia não tira de Luísa a escolha sobre sua privacidade." } }
      ]
    },
    {
      chapter: 2, chapterName: "O que eu escondia", when: "Na tela do celular", kicker: "02 / A MENSAGEM QUE EU ENVIEI", title: "Iara, eu preciso de ajuda.", art: "rain", mood: 0, environment: "rain",
      description: "Uma mensagem curta está pronta no celular. Ela existe apenas dentro desta história.",
      paragraphs: ["A mensagem ficou muito menor do que o tempo que levei para escrevê-la.", { dialogue: "“Iara, estou com dificuldade com a alimentação e com o que tenho sentido. Preciso de ajuda para procurar atendimento. Você pode conversar comigo?”" }, "Eu reli devagar. Não acrescentei um pedido de desculpas no fim."],
      type: "choice", key: "reach", objective: "Como Luísa quer compartilhar esse pedido?",
      choices: [
        { label: "Enviar a mensagem na história", value: "message", feedback: "A resposta chega sem cobrança: “Posso conversar. Você prefere que eu vá aí ou que a gente se fale por aqui?”" },
        { label: "Mostrar o papel quando Iara chegar", value: "paper", feedback: "Combino uma visita e deixo o papel ao meu alcance. Quando Iara chega, entrego a página. Ela termina de ler antes de perguntar o que eu preciso." }
      ]
    },
    {
      chapter: 2, chapterName: "O que eu escondia", when: "Uma conversa perto da janela", kicker: "02 / ALGUÉM FICOU PARA ESCUTAR", title: "Não precisa caber tudo hoje.", art: "balcony", mood: 0, environment: "memory",
      description: "As irmãs estão sentadas perto uma da outra. Um papel repousa entre elas; a conversa pode ter pausas.",
      paragraphs: ["Contei algumas coisas. Outras ficaram pela metade. Iara me perguntou como podia apoiar a procura por atendimento e o que eu preferia fazer primeiro.", "Houve um momento em que eu parei de falar. Achei que precisaria preencher aquela pausa para ela continuar entendendo.", { dialogue: "“A gente pode ficar aqui enquanto você procura as palavras.”" }],
      type: "choice", key: "firstSupport", objective: "Que companhia Luísa quer neste momento?",
      choices: [
        { label: "Quero que você me escute um pouco", value: "listen", feedback: "Conto mais uma parte. Iara escuta sem procurar uma frase que resolva a minha vida naquela tarde." },
        { label: "Podemos só ficar juntas agora?", value: "quiet", feedback: "A gente fica. Não ensaiamos. Não precisamos fazer daquele encontro uma conversa perfeita." }
      ], note: { id: "support", title: "Um espaço para falar", text: "Iara oferece escuta e apoio para buscar atendimento, respeitando o tempo e a privacidade de Luísa." }
    },
    {
      chapter: 3, chapterName: "Dar nome ao silêncio", when: "Antes do primeiro atendimento", kicker: "03 / ESCOLHER COMO CHEGAR", title: "Você entra comigo?", art: "room", mood: 0, environment: "room",
      description: "Luísa organiza o caderno e combina com Iara como gostaria de ser acompanhada.",
      paragraphs: ["Procurei acolhimento na unidade de saúde. Organizar a ida também trouxe perguntas que eu ainda não tinha pensado em fazer.", "Iara podia me acompanhar. Eu também podia reservar uma parte da conversa para mim. Não precisava escolher entre ter companhia e ter voz."],
      type: "choice", key: "companion", objective: "Como Luísa prefere receber esse apoio?",
      choices: [
        { label: "Quero companhia na chegada", value: "waiting", feedback: "Combinamos de ir juntas. Na conversa com a equipe, posso dizer quando prefiro falar em particular." },
        { label: "Quero ajuda para mostrar minhas anotações", value: "notes", feedback: "Levo o caderno e explico à equipe que ele ajuda quando as palavras demoram. Posso pedir que Iara participe de uma parte, se eu quiser." }
      ]
    },
    {
      chapter: 3, chapterName: "Dar nome ao silêncio", when: "Na unidade de saúde", kicker: "03 / A PRIMEIRA PORTA", title: "Eu não tinha uma fala pronta.", art: "waiting", mood: 0, environment: "room",
      description: "Uma sala de espera tranquila, com duas cadeiras e uma janela voltada para árvores.",
      paragraphs: ["Cheguei com o caderno no colo. Quando chamaram meu nome, esqueci a primeira frase que tinha ensaiado.", "No atendimento, contei o que estava conseguindo contar. Conversamos sobre minha relação com a alimentação, sobre minha saúde física e sobre o que vinha acontecendo comigo.", "A equipe começou a avaliar minhas necessidades e a organizar os próximos cuidados e encaminhamentos."],
      type: "next", objective: "Continue quando quiser acompanhar a conversa de Luísa."
    },
    {
      chapter: 3, chapterName: "Dar nome ao silêncio", when: "Durante o acolhimento", kicker: "03 / UMA PERGUNTA DIFERENTE", title: "Do que você sente falta?", art: "waiting", mood: 0, environment: "room",
      description: "O caderno permanece ao alcance de Luísa. Há tempo para responder e pedir esclarecimentos.",
      paragraphs: ["Entre as perguntas da conversa, houve uma que ficou comigo: como aquilo estava afetando a minha vida?", "Pensei no tempo que eu passava longe das pessoas, mesmo querendo estar perto. No ensaio que eu escutava pelo telefone. No caderno que ficava fechado."],
      type: "choice", key: "miss", objective: "Qual parte Luísa consegue contar primeiro?",
      choices: [
        { label: "Sinto falta de fazer música", value: "music", feedback: "Conto do violão e da dificuldade de me sentir presente. O que eu gosto de fazer também pode fazer parte dessa conversa." },
        { label: "Sinto falta de estar perto de alguém", value: "people", feedback: "Conto como tenho me afastado dos encontros e das conversas. Não preciso resumir tudo ao que os outros conseguem ver." }
      ]
    },
    {
      chapter: 3, chapterName: "Dar nome ao silêncio", when: "Nos atendimentos seguintes", kicker: "03 / CUIDADO TEM MAIS DE UMA PARTE", title: "Isso merece cuidado.", art: "waiting", mood: 0, environment: "room",
      description: "O acompanhamento começa a ser organizado com Luísa. Informações e dúvidas podem ser retomadas ao longo do cuidado.",
      paragraphs: ["Nos atendimentos, conversamos sobre transtorno alimentar. Ouvir esse nome trouxe medo, perguntas e a possibilidade de deixar de carregar tudo sozinha.", "Fui compreendendo que o cuidado envolve aspectos físicos, psicológicos e nutricionais, conforme a avaliação dos profissionais. Minha saúde precisava de atenção, e a equipe me ajudou a organizar o acompanhamento.", "Eu não saí com a vida resolvida. Saí sabendo qual era o próximo atendimento e com quem poderia conversar sobre as dúvidas."],
      softParagraphs: ["Luísa começa um acompanhamento profissional para um transtorno alimentar. A equipe avalia sua saúde e organiza cuidados físicos, psicológicos e nutricionais de acordo com suas necessidades. A história continua com apoio e tratamento."],
      type: "next", objective: "O acompanhamento passa a fazer parte do caminho de Luísa.", note: { id: "care", title: "Cuidado acompanhado", text: "Luísa começa acompanhamento profissional. Sua saúde física, seus sentimentos e sua relação com a alimentação fazem parte da avaliação e do cuidado." }
    },
    {
      chapter: 3, chapterName: "Dar nome ao silêncio", when: "Uma conversa sobre apoio", kicker: "03 / QUEM PODE ESTAR PERTO", title: "O que eu quero compartilhar.", art: "balcony", mood: 0, environment: "memory",
      description: "Luísa e Iara conversam sobre o acompanhamento. O caderno guarda informações que pertencem a Luísa.",
      paragraphs: ["Passei a combinar com a equipe como contar às pessoas próximas o que eu estava vivendo e o tipo de apoio que poderia ajudar.", "Eu podia escolher uma pessoa de confiança e falar sobre os meus limites. Havia coisas que eu queria dividir com a minha mãe. Outras, por enquanto, ficariam na conversa do atendimento."],
      type: "choice", key: "family", objective: "Por onde Luísa quer começar?",
      choices: [
        { label: "Pedir ajuda para conversar com minha mãe", value: "mother", feedback: "Conversamos sobre esse encontro no acompanhamento. Quero que ela me escute e que eu também possa dizer quando um comentário me faz mal." },
        { label: "Combinar primeiro com Iara", value: "sister", feedback: "Conto o que quero compartilhar agora. Iara pergunta como pode apoiar meus próximos passos, sem exigir acesso a tudo o que eu converso no atendimento." }
      ], note: { id: "privacy", title: "Apoio com privacidade", text: "Luísa pode conversar com a equipe sobre sua rede de apoio e escolher o que deseja compartilhar com pessoas próximas." }
    },
    {
      chapter: 4, chapterName: "Aprender a voltar", when: "Entre um atendimento e outro", kicker: "04 / OS DIAS NÃO FORAM IGUAIS", title: "Naquela quarta, foi difícil.", art: "rain", mood: 1, environment: "rain",
      description: "Uma tarde chuvosa. O caderno de Luísa está aberto perto do celular e da fita lilás.",
      paragraphs: ["Houve dias em que eu conseguia falar com mais clareza. Em outros, o medo e a culpa voltavam a ocupar muito espaço.", "Naquela quarta, fiquei triste por ainda estar difícil. Quase transformei isso em mais uma coisa para esconder.", "Abri o caderno e anotei o que estava acontecendo para conversar no acompanhamento. Eu podia precisar de ajuda de novo, mesmo depois de já ter pedido."],
      softParagraphs: ["Luísa atravessa um dia mais difícil durante o acompanhamento. Ela registra o que está vivendo para conversar com a equipe e considera pedir o apoio que já vinha combinando."],
      type: "next", objective: "Esta cena também tem uma versão mais suave. Seu ritmo não muda o desfecho."
    },
    {
      chapter: 4, chapterName: "Aprender a voltar", when: "Sobre a mesa", kicker: "04 / O QUE POSSO LEVAR PARA A CONVERSA", title: "Não preciso lembrar de tudo.", art: "room", mood: 0, environment: "room",
      description: "Na mesa há uma anotação do dia, uma pergunta para o atendimento e uma mensagem de Iara.",
      paragraphs: ["Separei coisas que eu queria retomar. Não era uma lista para conseguir fazer um dia perfeito. Eram pedaços do que estava acontecendo comigo.", "Até uma frase incompleta podia entrar naquela conversa."],
      type: "gather", objective: "Leia os três papéis para conhecer o que Luísa quer compartilhar.", completeText: "Guardo os papéis no caderno. Posso pedir ajuda para transformar essas anotações em conversa.",
      choices: [
        { label: "Uma anotação do dia", detail: "Hoje ficou difícil. Quero falar disso.", value: "day", cue: "paper", feedback: "A anotação cabe em uma linha. Quero conseguir mostrá-la no próximo atendimento.", note: { id: "day", title: "Uma linha que pode ser dita", text: "Hoje ficou difícil. Quero falar disso. Luísa pode levar o que está vivendo para o acompanhamento." } },
        { label: "Uma pergunta para a equipe", detail: "Como podemos ajustar meu apoio?", value: "question", cue: "paper", feedback: "Anoto uma pergunta sobre o apoio de que preciso. Não preciso decidir sozinha como lidar com tudo.", note: { id: "question", title: "Uma pergunta guardada", text: "Como podemos ajustar meu apoio? As dúvidas de Luísa podem ser retomadas com os profissionais que a acompanham." } },
        { label: "Uma mensagem de Iara", detail: "Quer companhia para ir ao atendimento?", value: "message", cue: "paper", feedback: "Iara oferece companhia. Posso responder de acordo com o que preciso naquele momento.", note: { id: "offer", title: "Uma companhia possível", text: "Quer companhia para ir ao atendimento? Iara pode apoiar a procura por cuidado sem substituir o acompanhamento profissional." } }
      ]
    },
    {
      chapter: 4, chapterName: "Aprender a voltar", when: "Uma conversa em casa", kicker: "04 / COMBINAR OUTRO JEITO DE ESTAR JUNTO", title: "Pergunta como eu estou.", art: "room", mood: 0, environment: "memory",
      description: "A família conversa em casa. O foco está no que Luísa quer comunicar e em como prefere ser acolhida.",
      paragraphs: ["Minha mãe me pediu que dissesse quando alguma conversa estivesse me fazendo mal. Eu expliquei o que estava conseguindo perceber, com o apoio que vinha recebendo.", "Ela ficou quieta por um instante. Disse que queria aprender a me escutar melhor.", "Nós não acertamos todas as palavras naquele dia. Pudemos começar a combiná-las."],
      type: "choice", key: "boundaries", objective: "O que Luísa quer pedir nessa conversa?",
      choices: [
        { label: "Quero falar de como tenho me sentido", value: "feelings", feedback: "Peço espaço para contar como estou, sem comentários sobre a minha aparência. Minha mãe me escuta e faz uma pergunta de cada vez." },
        { label: "Quero que a gente converse sobre outras coisas também", value: "life", feedback: "Conto de uma ideia para a música. Ainda posso ser a pessoa que inventa versos ruins e discute o melhor lugar para pôr um refrão." }
      ]
    },
    {
      chapter: 4, chapterName: "Aprender a voltar", when: "Num fim de tarde com Iara", kicker: "04 / A VIDA QUE CONTINUA MAIOR", title: "O que não cabia numa fotografia.", art: "balcony", mood: 0, environment: "memory",
      description: "As irmãs estão perto da janela. A luz de fim de tarde atravessa o espaço entre elas.",
      paragraphs: ["As pessoas nem sempre percebiam os dias difíceis. Eu também comecei a reconhecer pequenos momentos que não apareciam em fotografia nenhuma.", "Conseguir dizer que estava precisando de companhia. Mostrar uma pergunta no atendimento. Escutar uma música sem tentar transformar aquele momento em uma prova de que tudo tinha passado.", "Iara ainda me mandava ideias para o refrão. Eu voltei a responder algumas delas."],
      type: "next", objective: "A história segue no tempo de Luísa, junto do acompanhamento."
    },
    {
      chapter: 4, chapterName: "Aprender a voltar", when: "Um papel entregue em mãos", kicker: "04 / O QUE MINHA IRMÃ ESCREVEU", title: "Tem espaço aqui do lado.", art: "room", mood: 0, environment: "memory", letter: true,
      description: "Iara entrega um bilhete escrito naquele dia. Ela fica perto enquanto Luísa lê.",
      paragraphs: [
        { letter: "Lu, eu ando procurando um jeito de te chamar sem fazer parecer que você está atrasada para alguma coisa." },
        { letter: "Sinto falta de sentar do seu lado. De tocar uma ideia e perguntar se ficou estranha. De ouvir você falando por cima do começo da música." },
        { letter: "Você pode vir sem ter uma história boa para contar. Pode dizer que hoje está difícil. Se você quiser companhia para procurar cuidado ou para esperar o atendimento, me chama. A gente combina o que for possível." },
        { signature: "Tem espaço aqui do lado.\nIara." }
      ],
      type: "next", objective: "O bilhete fica guardado nas suas lembranças.", note: { id: "letter", title: "O bilhete de Iara", text: "Você pode vir sem ter uma história boa para contar. Pode dizer que hoje está difícil. Tem espaço aqui do lado. — Iara." }
    },
    {
      chapter: 5, chapterName: "O que ainda é meu", when: "O estojo volta a abrir", kicker: "05 / UMA LEMBRANÇA INTEIRA", title: "Eu tinha guardado isso.", art: "rehearsal", mood: 0, environment: "memory",
      description: "O estojo do violão está aberto. A lembrança escolhida no primeiro ensaio volta a fazer parte da conversa.",
      paragraphs: () => [MEMORIES[state.choices.memory || "recording"].text, "Eu tinha passado tanto tempo tentando organizar o sofrimento que quase esqueci quantas outras coisas faziam parte da minha vida.", "Abro o estojo com Iara perto de mim. Não precisamos marcar uma apresentação. Podemos só ficar ali e olhar o que guardamos."],
      type: "choice", key: "memoryShare", objective: "Como Luísa quer dividir essa lembrança?",
      choices: [
        { label: "Contar o detalhe de que me lembrei", value: "tell", feedback: "Conto um detalhe que Iara já tinha esquecido. Ela acrescenta outro. Nossa conversa começa a parecer uma música que as duas conhecem." },
        { label: "Pedir que Iara conte o que lembra", value: "hear", feedback: "Iara conta do primeiro ensaio. Fala tanto que se perde no meio. Eu começo a rir antes de ela terminar." }
      ]
    },
    {
      chapter: 5, chapterName: "O que ainda é meu", when: "Uma gravação antiga", kicker: "05 / A MINHA VOZ AO FUNDO", title: "Eu fico aqui.", art: "rehearsal", mood: 0, environment: "memory",
      description: "O gravador reproduz uma lembrança. Seu conteúdo é apresentado integralmente em texto.",
      paragraphs: ["Iara encontra a gravação. O começo tem um chiado, uma cadeira sendo arrastada e o som de alguém procurando o acorde.", "Então vem a voz dela, pequena dentro daquele arquivo. Ela erra a entrada e pede para parar. A minha voz responde ao fundo:", { dialogue: "“Pode começar de novo. Eu fico aqui.”" }, "Eu escuto a frase sem conseguir falar. Iara segura minha mão. Depois repete as mesmas palavras, olhando para mim."],
      type: "next", objective: "Você pode ficar nesta cena pelo tempo que quiser."
    },
    {
      chapter: 5, chapterName: "O que ainda é meu", when: "De volta à sala de ensaio", kicker: "05 / UM JEITO DE PARTICIPAR", title: "Posso ficar só ouvindo?", art: "studio", mood: 0, environment: "memory",
      description: "Há um violão ao alcance e um lugar para Luísa ouvir. Participar pode ter mais de uma forma.",
      paragraphs: ["Voltamos à sala de ensaio num dia combinado. Eu ainda estava em acompanhamento e havia coisas difíceis para conversar nos próximos atendimentos.", "Olhei para o violão e depois para Iara. Ela perguntou o que eu queria fazer. Podíamos experimentar um acorde, ou ela podia tocar enquanto eu escutava.", "Havia lugar para mim nas duas respostas."],
      type: "choice", key: "return", objective: "Como Luísa prefere participar hoje? As duas escolhas continuam a história.",
      choices: [
        { label: "Quero experimentar o primeiro acorde", value: "play", cue: "chord", feedback: "Pouso a mão nas cordas. O acorde sai diferente do que imaginei. Iara espera que eu decida se quero tocar de novo. Eu ainda tenho uma escolha depois da primeira nota." },
        { label: "Hoje quero ficar ouvindo", value: "listen", feedback: "Iara começa devagar. Eu reconheço a melodia e fico para ouvir. Estar ali também pode ser o bastante para esse encontro." }
      ]
    },
    {
      chapter: 5, chapterName: "O que ainda é meu", when: "Depois do começo da música", kicker: "05 / O REENCONTRO", title: "Fica mais um pouco?", art: "balcony", mood: 0, environment: "memory",
      description: "As irmãs seguem juntas depois do ensaio. A conversa continua mesmo quando os instrumentos param.",
      paragraphs: () => [state.choices.return === "play" ? "Toquei um pouco e depois descansei o violão. Não consegui terminar a canção. Iara perguntou sobre uma das palavras que tínhamos escrito, e a conversa foi seguindo." : "Fiquei ouvindo Iara tocar. Depois, contei que lembrava de outro jeito para a última frase. Ela largou o violão para me escutar.", "Quando olhei para a janela, já tinha escurecido. Eu ainda tinha dias difíceis e cuidados para continuar. Também estava vivendo aquela conversa.", { dialogue: "“Fica mais um pouco?”, Iara perguntou." }, "Eu fiquei. Tive vontade de contar uma coisa pequena que tinha acontecido no meu dia."],
      type: "next", objective: "O acompanhamento continua. Você pode permanecer nesta conversa pelo tempo que quiser."
    },
    {
      chapter: 5, chapterName: "O que ainda é meu", when: "Depois da última nota", kicker: "05 / UMA PRÓXIMA CONVERSA", title: "Amanhã eu continuo.", art: "room", mood: 0, environment: "memory",
      description: "O caderno está aberto ao lado do estojo. Luísa organiza o que quer retomar no acompanhamento.",
      paragraphs: ["Guardo o violão e olho as anotações que vou levar ao próximo atendimento. Ainda há perguntas. Eu quero conseguir contar também o que ficou difícil, junto do que foi bom.", "O cuidado segue. Iara pode me acompanhar em parte desse caminho, e eu posso continuar conversando com a equipe sobre o apoio de que preciso.", "Antes de ir embora, minha irmã pergunta como quero combinar a próxima conversa."],
      type: "choice", key: "future", objective: "Como Luísa quer organizar esse próximo passo?",
      choices: [
        { label: "Quero combinar companhia para o atendimento", value: "company", feedback: "Combinamos a companhia de Iara de acordo com o que é possível para nós. Posso dizer à equipe o que quero conversar em particular." },
        { label: "Quero levar o que escrevi no caderno", value: "notes", feedback: "Separo as anotações para mostrar no acompanhamento. Não preciso esperar que as frases estejam bonitas para poder compartilhá-las." }
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
          const chords = [[130.81,155.56,196,261.63],[103.83,130.81,155.56,207.65],[116.54,146.83,174.61,233.08],[98,130.81,146.83,196]];
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
      if (kind === "chord") { [130.81,196,261.63,311.13].forEach((f, i) => this.tone(f, i * .07, 1.6, pan, .055, "triangle")); }
      else if (kind === "paper") { this.tone(293.66, 0, .4, pan, .05, "triangle"); this.tone(349.23, .12, .5, pan, .04, "triangle"); }
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
    clear: false, soft: false, shortcuts: false
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
    for (const key of ["narration", "sound", "contrast", "motion", "clear", "soft", "shortcuts"]) if (typeof raw[key] === "boolean") result[key] = raw[key];
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
  function sceneParagraphs(scene) {
    const paragraphs = prefs.soft && scene.softParagraphs ? scene.softParagraphs : scene.paragraphs;
    return typeof paragraphs === "function" ? paragraphs() : paragraphs;
  }
  function updateSoftButton(scene) {
    $("soft-button").hidden = !scene.softParagraphs;
    $("soft-button").setAttribute("aria-pressed", String(prefs.soft));
    $("soft-button").textContent = prefs.soft ? "Ler cena completa" : "Ler versão mais suave";
  }
  function renderSceneText(scene) {
    $("scene-text").replaceChildren();
    for (const paragraph of sceneParagraphs(scene)) {
      const p = document.createElement("p"); p.textContent = paragraphText(paragraph);
      if (typeof paragraph !== "string") p.className = paragraph.letter ? "letter-copy" : paragraph.signature ? "letter-signature" : "dialogue";
      $("scene-text").append(p);
    }
    updateSoftButton(scene);
  }
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
    for (const key of ["narration", "sound", "contrast", "motion", "clear", "soft", "shortcuts"]) $("setting-" + key).checked = prefs[key];
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
    renderSceneText(scene);
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
    setScreen("ending"); document.body.classList.remove("letter-scene"); setArtwork("studio", 0);
    const memory = MEMORIES[state.choices.memory || "recording"];
    $("ending-personal").textContent = memory.ending + (state.choices.future === "company" ? " Combinei companhia para o próximo atendimento." : " Levo as minhas anotações para a próxima conversa no acompanhamento.");
    sound.environment("memory");
    $("ending-content").focus({ preventScroll: true }); window.scrollTo({ top: 0, behavior: "instant" });
    speak(`Fim desta história. Fica mais um pouco. Ainda há voz aqui. ${$("ending-text").textContent} ${$("ending-personal").textContent} ${$("ending-message").textContent}`);
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
      const notes = state.notes.length ? state.notes : [{ title: "Uma página em branco", text: "Os objetos e as palavras que Luísa guarda aparecem aqui ao longo da história." }];
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
  $("soft-button").addEventListener("click", () => {
    if (screen !== "story" || !currentScene().softParagraphs) return;
    prefs.soft = !prefs.soft; applyPrefs(); writeJSON(PREFS_KEY, prefs); renderScene();
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
  for (const key of ["narration", "sound", "contrast", "motion", "clear", "soft", "shortcuts", "rate", "size", "volume"]) {
    $("setting-" + key).addEventListener(key === "volume" ? "input" : "change", (event) => {
      const input = event.target; prefs[key] = input.type === "checkbox" ? input.checked : Number(input.value);
      if (key === "narration" && !prefs.narration) stopVoice();
      if (key === "soft" && screen === "story") renderSceneText(currentScene());
      applyPrefs(); writeJSON(PREFS_KEY, prefs);
      if (key === "sound" && !prefs.sound) sound.stop();
      if (key === "narration" && prefs.narration) speak("Narração ligada. Ao voltar, use Reler cena para ouvir o trecho atual.");
    });
  }
  $("test-voice").addEventListener("click", () => speak("Fica mais um pouco. Esta é a voz da história. Cada cena espera por você.", true));
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
