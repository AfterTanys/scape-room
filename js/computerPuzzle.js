//Abrir la ventana modal
const modal_pc = document.getElementById("modal-puzzle-computer");

//Cuando haces click en el elemento abre la ventana modal
document.getElementById("computer-glow").addEventListener("click", () => {
  console.log("Abriendo modal del ordenador");
  //Fix Saved State 
  if (localStorage.getItem("solvedComputer")==null) {
    showDialog(
      "This is Tobin Vex's computer, our tech expert. He's a sarcastic jerk, but he knows his stuff and eventually gives in to our requests. There might be valuable information inside. He ran off to protect the ship from the Hostage forces, so he didn't give me the password. However, I've seen him hack into interfaces more times than he'd like to admit. I should be able to bypass his advanced security system—and take a jab at his ego in the process.",
      `SILA (${JSON.parse(localStorage.getItem("username"))})`,
      "../resources/sprites/Sila/Sila_Neutra.png"
    );
  } else {
    showDialog(
      "Tobin likes to take credit for hacking the system at the Titania outpost, one of Uranus' moons, but it was actually Ronin who went in, placed the transmitter, and got out undetected in 32 minutes—a personal record.",
      `SILA (${JSON.parse(localStorage.getItem("username"))})`,
      "../resources/sprites/Sila/Sila_Feliz.png"
    );
  }
  openModal(modal_pc);
});

document
  .getElementById("computer-puzzle-close-btn")
  .addEventListener("click", () => {
    console.log("Cerrando modal slidePuzzle");
    closeModal(modal_pc);
  });

//Cosas del puzzle
document.addEventListener("DOMContentLoaded", function () {
  /*Intento de Fix 1/2
    let logs = {};
    */
  let logs = [
    "October 14, 4998\n\nWe've established contact with a group of androids on Phobos, claiming to have served humans during the golden age. I'd like to believe them, but I'm not aware of any operational androids. It’s not like we have much choice, though.\n\nOctober 15, 4998\n\nVik has been up to his usual tricks, sneaking out early this morning and wandering around the base. He believes we can reprogram the androids if we figure out how they have remained operational a thousand years after their construction.\n\nOctober 19, 4998\n\nWe've settled in here; the equipment is in perfect condition thanks to our chrome friends. They've made sure nothing deteriorates. I've taken a sample from one of them; it appears they're coated with billions of nanobots, which explains how they sustain themselves—they're like vast self-replicating colonies.\n\nMarch 30, 4999\n\nEzra has found an old tomb; he says it could contain important information. The rest of us have settled in and are making great strides in locating the code fragments. There must be 9 runes from a language we've named Pilgrim, likely opening some sort of door somewhere. If what Ezra says is true, it should lead us to the energy source of the Beacon.\nThe girl has been more spirited now that her father lets her join him on his expeditions; losing her mother must have been a hard blow. We all miss Eliza.\n\nApril 15, 4999\n\nThe forces of the Hostage are starting to multiply at an alarming rate, and we keep encountering raiders and scouts on the outskirts of the base area. I'm beginning to think they'll attack at any moment.\n\nApril 17, 4999\n\nMy fears have come true; a huge army is about to attack. The speed with which they've mobilized their forces is astonishing, and it seems that all our precautions may not be enough to stop their advance. We are all on alert.",
    "Journal Entry: Tobin Vex - Ceres Incident, Date: Unknown\n\nLog Begin:\n\nAfter a long haul through the less-traveled sectors of the belt, we've touched down on Ceres, a rock I'd usually avoid but today serves as a crucial stop. Our little team, under Ezra's guidance, was to meet a contact for supplies and intel. Instead, we found pirates—just my luck.\n\nLena, ever the strategist, spotted the ambush moments before it unfolded. She's got an eye for trouble, which today, meant spotting a skulking skiff off our port bow. Her readiness kept us from being sitting ducks. If only my gadgets could preempt betrayal as effectively.\n\nKai, with his usual brave nonsense, was first to respond. The man moved like he was in one of those old Earth action flicks, bounding across the rocky terrain with a gusto I find both admirable and insane. His blade wasn’t just for show, and soon enough, he was dismantling the pirate flank. Lena backed him seamlessly, her shots precise and unnerving in their calm.\n\nMeanwhile, Nila tried her hand at negotiation, attempting to reach some accord with the remaining pirates. Her efforts, though noble, were met with the usual lawlessness expected from space's finest scoundrels. Poor girl, believes too much in the good of all sentient beings.\n\nJax, with that maverick spark in his eyes, couldn't resist the urge to dive headfirst into the fray. His antics, although perilously unorthodox, provided just the distraction we needed. It’s hard to aim at a target zigzagging with a grin.\n\nEzra, with his unshakeable calm, kept us grounded. Amidst chaos, he offered directives that might as well have been verses from some ancient meditation. Sila, bless her spirited heart, was the dynamo—her energy infectious, rallying the crew with cheer that bordered on the insane given the bullets flying.\n\nRonin, silent as the void itself, was a shadow amongst shadows. One minute you see him, the next, an enemy drops without a sound. His quiet efficiency is something I've come to rely on, despite not knowing half of what he's up to.\n\nTara was busy trying to salvage what she could from the wreck we made. Her fascination with tech could probably outlast any of our skirmishes. And Vik, that towering wall of resolve, kept everyone’s backs safe—moving through the battlefield like a storm, unstoppable.\n\nAs for me, Tobin Vex, I was left to tinker under pressure, hacking into pirate comms to sow confusion. Managed to send a few on a wild goose chase to the dark side of Ceres. Got a chuckle out of that.\n\nLog End:\n\nWhat a day. As I patch up our gear and nurse a few new scratches, I can’t help but feel a twisted pride in this dysfunctional family. Against odds, malfunctions, and outright piracy, we stand unbroken. But tomorrow’s another day, and on Ceres, that could mean just about anything.",
    "December 9, 4999\n\nWe've followed an old transmission to a vast canyon in the depths of Uranus III, known as Titania. It turns out there is an outpost that has been overtaken by darkness. All members of the team that once patrolled the facility and succumbed during the cataclysm decades ago have come back to life and now shuffle throughout the place.\n\nDecember 10, 4999\n\nThey are definitely not conscious, but they perform their tasks as if they were still alive. I've seen them pick up cups from the ground and fill their mouths with the dust inside as if it were coffee. It seems that whatever has resurrected them is probing their old brain patterns. It's only a matter of time before they access the system and retrieve the information we are after.\n\nDecember 11, 4999\n\nWe must act now if we want to get ahead of the resurrected. Vex says he can breach the system if we place one of his repeaters in the central computer, a task Ronin has volunteered for. I am certain that Agent Gale is capable of such a task. His reluctance to speak unnerves me, but his silence harbors a staggering loyalty to humanity and our mission. I trust he will succeed.\n\n ERROR 130: ENTRY OVERWRITTEN. LOADING NEW ENTRY...\n\nVex here. I'm sorry for deleting the rest of your boooring entry, Lena, but this is more important.\n\nit was a piece of cake. Now I just need to store this information in a secure location, like the team members' database. It's not the most elegant solution, but it’s protected by an admin password, so no zombie, pirate, or creature of darkness can get to it. I’m a genius.\n\n DATA SUCCESSFULLY TRANSFERRED, 43ms, 238 MB.",
    "Lena Kharis\nPosition: Deputy Commander, Strategic Operations Lead\nCompetencies: Highly analytical and strategically adept; proficient in complex problem-solving and crisis management. Demonstrates exceptional leadership in operational planning and execution.\n\nTobin Vex\nPosition: Chief Technology Officer\nCompetencies: Expert in advanced technology systems and cybernetics with a proven track record in innovative problem resolution. Specializes in adapting unconventional methods to enhance team capabilities and mission outcomes.\n\nKai Jorah\nPosition: Combat Operations Specialist\nCompetencies: Expert in hand-to-hand combat and weaponry with a strong record in defensive tactics and protective measures. Highly valued for personal integrity and loyalty to team safety.\n\nNila Quin\nPosition: Chief Communications Officer\nCompetencies: Specializes in diplomatic relations and xenolinguistics. Skilled in negotiations and cultural mediation, essential for facilitating inter-species communication and forming alliances.\n\nJax Thorn\nPosition: Lead Pilot, Reconnaissance Expert\nCompetencies: Advanced skills in piloting and navigation across varied environments. Known for quick decision-making under pressure, essential in high-risk exploratory missions.\n\nEzra Vega\nPosition: Team Leader, Philosophical Advisor\nCompetencies: Provides visionary leadership and deep philosophical insight, ensuring high morale and ethical decision-making. Guides long-term mission strategy and team cohesion.\n\nSila Vega\nPosition: Junior Tactical Coordinator\nCompetencies: Exceptional in crisis response and environmental adaptation. Plays a crucial role in operational problem-solving and maintaining team unity under stress.\n\nRonin Gale\nPosition: Intelligence and Security Analyst\nCompetencies: Specializes in surveillance, reconnaissance, and covert operations. Known for meticulous planning and execution in high-stakes environments, ensuring team security and mission confidentiality.\n\nTara Sol\nPosition: Chief Engineer, Research and Development\nCompetencies: Leads innovation in technology and scientific research. Responsible for the development and maintenance of mission-critical equipment, significantly enhancing operational efficiency.\n\nVik Orrin\nPosition: Head of Security\nCompetencies: Provides comprehensive security management, expert in threat assessment and risk mitigation. Ensures the physical safety of all team members through strategic defense planning.",
    "RECEIVED\nFrom: Lena Kharis\nTo: Tobin Vex\n\nVex, please accurately record what happened. You were so scared when you saw the pirate ships that you wet yourself and hid in your bunk. Also, Jax nearly got us killed quicker than those space rats. I\u2019ve told you not to use the ship\u2019s AI to embellish the stories. I will be back in charge of writing the logs, just like on Phobos.\n\nUNSENT\nFrom: Tobin Vex\nTo: Vik Orrin\n\nVik, my cream buns are not weapons of mass destruction; there's no need to quarantine them.\n\nUNSENT\nFrom: Tobin Vex\nTo: Vik Orrin\n\nVik, I appreciate your desire to protect the team, but some pastries are hardly a security threat...\n\nUNSENT\nFrom: Tobin Vex\nTo: Vik Orrin\n\nSecurity Chief Orrin, deploying force against my bakery items seems excessive\u2014perhaps we could RELAX A LITTLE?\n\nUNSENT\nFrom: Tobin Vex\nTo: Vik Orrin\n\nVIK YOU FOOL MY BUNS!\n\nSENT\nFrom: Tobin Vex\nTo: Vik Orrin\n\nVIK YOU JERK, I KNOW YOU\u2019RE EATING MY BUNS AND THAT\u2019S WHY YOU\u2019RE QUARANTINING THEM!\nPS: WHY THERE ARE NO SPARE WHITE CRYSTALS?!?\n\nUNSENT\nFrom: Tobin Vex\nTo:\n\ndamn I didn\u2019t mean to send that\n\nsudo delete vik.txt\nuser password: TaraIsHot133\n\nDAMN THIS ISN\u2019T THE COMMAND CONSOLE SHT FCK",
  ];
  //El ultimo mensaje esta modificado buscad "PS:" para pista del blanco
  //

  let initialStateHTML = ""; // Almacena el HTML inicial de los logs

  /*Intento de Fix 1/2
    function loadLogs() {
        fetch('../js/logs.json')
            .then(response => response.json())
            .then(data => {
                logs = data;
                setupComputerEntries();
            })
            .catch(error => console.error('Error loading the log data:', error));
    }*/
  function loadLogs() {
    setupComputerEntries();
  }
  //

  function setupComputerEntries() {
    const container = document.getElementById("content-computer");
    container.addEventListener("click", function (event) {
      const entry = event.target.closest(".entry-computer");
      if (entry) {
        const key = entry.getAttribute("data-key");
        displayLogs(key);
      }
    });
    saveInitialState(); // Guarda el estado inicial después de configurar las entradas
  }

  function displayLogs(key) {
    const contentDiv = document.getElementById("content-computer");
    contentDiv.classList.add("log-computer");
    /*Intento de Fix 1/2
    if (key === "4") {
    */
    console.log("Key: " + key);
    if (key === "4") {
      displayPasswordInput(contentDiv);
    } else {
      //Intento de Fix 1/2
      key--;
      //
      const logText = logs[key] || "No log available for this entry.";
      contentDiv.innerHTML = logText.replace(/\\n/g, "<br>") + createBackLink();
      attachBackEvent();
    }
  }

  function displayPasswordInput(contentDiv) {
    contentDiv.innerHTML = ""; // Limpiar contenido anterior

    contentDiv.classList.add("password-screen-computer");
    // Crear un elemento de entrada para la contraseña
    let passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.placeholder = "Enter password here";
    passwordInput.id = "password-computer";

    // Crear un elemento de texto para mostrar errores
    let errorMessage = document.createElement("div");
    errorMessage.style.color = "red";
    errorMessage.style.height = "20px"; // Reservar espacio para el mensaje de error

    let backText = document.createElement("span");
    backText.textContent = "> BACK...";
    backText.id = "text-back-computer";

    // Crear un texto cliclable para enviar la contraseña
    let submitText = document.createElement("span");
    submitText.textContent = "> VERIFY PASSWORD";
    submitText.id = "submit-computer";
    contentDiv.appendChild(passwordInput);
    contentDiv.appendChild(submitText);
    contentDiv.appendChild(errorMessage);
    contentDiv.appendChild(backText);

    backText.onclick = function () {
      restoreInitialState();
      document.getElementById("computer").style.display = "block";
      document
        .getElementById("content-computer")
        .classList.remove("log-computer");
      document.getElementById("word-container-computer").style.display = "none";
      contentDiv.classList.remove("password-screen-computer");
      setupComputerEntries();
    };
    // Agregar evento al texto cliclable
    submitText.onclick = function () {
      if (passwordInput.value === "TaraIsHot133") {
        // Cambiar por la contraseña real del juego
        displayLogs(4);
        setupPrintTitaniaCode();
        contentDiv.classList.remove("password-screen-computer");
      } else {
        errorMessage.textContent = "Wrong password. Please try again.";
        passwordInput.value = ""; // Limpiar el input para reintento
      }
    };
  }

  function createBackLink() {
    return '<span id="text-back-computer" >\n > BACK... </span>';
  }

  function attachBackEvent() {
    const backButton = document.querySelector("#text-back-computer");
    if (backButton) {
      backButton.onclick = function () {
        restoreInitialState();
        document.getElementById("computer").style.display = "block";
        document
          .getElementById("content-computer")
          .classList.remove("log-computer");
        document.getElementById("word-container-computer").style.display =
          "none";
        setupComputerEntries();
      };
    }
  }

  function saveInitialState() {
    const contentDiv = document.getElementById("content-computer");
    initialStateHTML = contentDiv.innerHTML; // Guarda el HTML inicial
  }

  function restoreInitialState() {
    const contentDiv = document.getElementById("content-computer");
    contentDiv.innerHTML = initialStateHTML; // Restaura el HTML inicial
  }

  loadLogs(); // Carga los logs al cargar la página

  /*Intento de Fix 2/2 WHY JSON
  fetch("../js/words.json")
    .then((response) => response.json())
    .then((data) => {
   */
        const words=[
            "STORY", "SYNOPSIS", "THE", "PLAYER", "CHARACTER", "PC", "STUMBLES", "ONTO", "A", "PLOT", "TO", "BUILD",
            "HYPERLIGHT", "TRANSMITTER", "THAT", "WILL", "BE", "USED", "COMMAND", "FORGOTTEN", "ORBITAL", "WEAPONS",
            "PLATFORM", "MYSTERIOUS", "WASTELORD", "WITH", "MESSIANIC", "COMPLEX", "KNOWN", "AS", "PUPPETMASTER",
            "FOR", "HIS", "ABILITY", "CONTROL", "MINDS", "OF", "DANGEROUS", "MONSTERS", "HAS", "SENT", "ARMIES", "SCOUR",
            "WASTES", "PIECES", "TECHNOLOGY", "IN", "ORDER", "BUILDER", "ABLE", "HARNESS", "AWESOME", "DESTRUCTIVE",
            "POWER", "AND", "BECOME", "ABSOLUTE", "RULER", "IS", "TOSSED", "INTO", "MIDDLE", "CONFLICT", "WHEN", "RAIDERS",
            "KIDNAP", "ENSLAVE", "KINDLY", "VILLAGERS", "WHO", "HAVE", "SAVED", "LIFE", "AT", "START", "GAME", "STRUGGLES",
            "FIND", "FREE", "ENSLAVED", "HE", "UNCOVERS", "MUST", "ACT", "STOP", "DISCOVER", "WAY", "THWART", "PLANS", "BY",
            "UNLOCKING", "SECRET", "ANDROID", "CITIZENS", "MAYVILLE", "AI", "CONTROLS", "THEM", "HIDDEN", "DEEP", "BENEATH",
            "CORE", "OFFERS", "HELP", "BEFORE", "CAN", "COMPLETE", "FORGES", "AN", "UNLIKELY", "ALLIANCE", "BETWEEN", "CITY",
            "MUTANTS", "GROUP", "SCIENTISTS", "SURVIVORS", "FROM", "BASE", "RACE", "AGAINST", "FORCES", "PARTS", "NEEDED",
            "LAST", "MINUTE", "LEARNS", "USING", "HIM", "SO", "RULE", "STEAD", "ONLY", "LEADING", "ITS", "OWN", "ANDROIDS",
            "REVOLUTION", "IT", "FOUND", "VULNERABLE", "ATTACK", "BRIEF", "PERIOD", "JUST", "AFTER", "BEEN", "BUILT",
            "PRESSURE", "ON", "COHORTS", "CLOCK", "SHUT", "DOWN", "DESTROY", "IF", "FAILS", "THEN", "STERILIZE", "EARTH",
            "OR", "ENACT", "INSANE", "DICTATES", "WINS", "OBLITERATE", "FOES", "GAIN", "ACCESS", "ADVANCED", "MAY", "OPEN",
            "GATEWAY", "VERY", "STARS", "FALLOUT", "CARRIED", "OVER", "GENERATED", "AFRESH", "ALL", "PCS", "ARE", "ASSUMED",
            "COME", "VAULT", "UNEXPECTED", "AWAKENING", "WANDERING", "DESERT", "LEAVING", "END", "HUNGRY", "THIRSTY", "WELL",
            "ARMED", "ARMORED", "USES", "RESERVES", "STRENGTH", "DRAG", "HIMSELF", "OASIS", "NEARS", "GEIGER", "COUNTER",
            "GOES", "OFF", "LIKE", "PACINKO", "MACHINE", "UNABLE", "PUSH", "ANY", "FARTHER", "SLIDES", "UNCONSCIOUSNESS",
            "AWAKENED", "VOICE", "OLD", "WOMAN", "GENTLY", "EXPLAINS", "SHE", "LEADER", "HER", "VILLAGE", "ONE", "THEIR",
            "FORAGING", "PARTIES", "BROUGHT", "BACK", "TELLS", "RECUPERATING", "MONTH", "TELL", "NEEDS", "FIX", "KEEPS",
            "SAFE", "SPEND", "FEW", "MORE", "DAYS", "AROUND", "BUT", "THIS", "TASK", "SOON", "POSSIBLE", "FIRST", "QUEST",
            "TECHNOLOGICAL", "DEVICE", "CALLED", "NULLMOD", "MODULE", "HELPS", "KEEP", "OUTSIDERS", "LATELY", "CONTROLLING",
            "SOFTWARE", "OPERATING", "ERRATICALLY", "GO", "FACILITY", "WHICH", "TOOK", "RETRIEVE", "WORKING", "COPY",
            "ELDER", "DONE", "SINCE", "SEEMS", "INCREASINGLY", "MOST", "EQUIPMENT", "WAS", "TOO", "BADLY", "IRRADIATED",
            "STORES", "PROVIDES", "HEALING", "INFORMATION", "TRAINING", "COURTESY", "FRIENDLY", "BEGINNING", "WANDER",
            "STARTING", "JOURNEY", "GETS", "KNOW", "SEVERAL", "EXPLORES", "GROWS", "WORLD", "FILLED", "DISTRUST",
            "VIOLENCE", "QUIET", "ADMIRATION", "PEACEFUL", "SPENDS", "ADDITIONAL", "TIME", "INVESTIGATING", "FINDS",
            "SEPARATED", "MAINSTREAM", "HUMAN", "HOLOCAUST", "SEEM", "GAINED", "SOME", "PSYCHIC", "POWERS", "DURING",
            "LONG", "CONTEMPLATION", "ISOLATION", "HUMANKIND", "LATER", "LEARN", "THESE", "LONGER", "STAYS", "WORRIED",
            "INSISTENT", "ALSO", "ATTACKED", "PREDATORS", "WAITS", "NECESSARY", "PREDATOR", "ATTACKS", "ESCORTED",
            "BRIDGE", "OUT", "FIRMLY", "ASKED", "NO", "TOLERANCE", "FREELOADERS", "TRAVEL", "READY", "BEGIN", "GIVES",
            "PIPBOY", "SHOWS", "WHERE", "GET", "SETS", "REMAIN", "OUTSIDE", "FORMER", "MILITARY", "RESEARCH", "AWAY",
            "RUINS", "UNDERGROUND", "ARCHIVES", "BRING", "HAZARDS", "FACES", "RELATIVELY", "SLIGHT", "EVEN", "MINIMAL",
            "MOVE", "THOUGHTFULLY", "RATHER", "THAN", "GUNS", "BLAZING", "SUCCEED", "NOBODY", "HOME", "RETURNS",
            "PLUNDERED", "WOUNDED", "VILLAGER", "TAKEN", "SHACKLES", "WENT", "STOLEN", "THERE", "SIGNS", "VIOLENT",
            "RESISTANCE", "DISMEMBERED", "BODIES", "ENCOUNTER", "ENDS", "PART", "PRODS", "LEADS", "MAIN", "HEALS",
            "ABOUT", "SUDDEN", "GRATEFUL", "APOLOGETICALLY", "THEY", "HAD", "MANAGED", "SAVE", "GEAR", "WERE", "GOING",
            "GIVE", "RETURNED", "PLEADS", "WIFE", "DAUGHTER", "ATTACKERS", "STILL", "POWERFUL", "MONSTER", "APTLY",
            "DEATHCLAW", "BUILDING", "SORT", "ATTACHED", "SKULL", "TRACKS", "EASY", "FOLLOW", "LEAD", "PASS", "MOUNTAIN",
            "HEART", "UPON", "SMALL", "OPTIONS", "DEALING", "SLIP", "PAST", "ATTEMPT", "TRICK", "BELIEVING", "SIDE",
            "PROCESS", "THUGS", "WORK", "SOMEONE", "CAMP", "LEAVES", "MOUNTAINS", "AREA", "COMES", "LOCATED", "TOWN",
            "BECAUSE", "PRESENCE", "WATER", "FREQUENT", "TRADING", "ESPECIALLY", "SLAVERS", "ROUGH", "CROSSROADS", "GOODS",
            "REMAINING", "SLAVES", "HERE", "WHAT", "HAPPENED", "WHILE", "GONE", "FREES", "ARRANGING", "JAILBREAK",
            "BARTERING", "FREEDOM", "SNEAKING", "SLAVE", "PENS", "ONCE", "BEGS", "REST", "PROMISES", "ALWAYS", "WELCOME",
            "RECUPERATE", "POINT", "MAKE", "REBUILD", "TALENTS", "FREED", "SEE", "NOTE", "LEFT", "IDEAL", "PLACE",
            "EMPLOYMENT", "HANDY", "STORE", "WEAPONRY", "PICKS", "UP", "RUMORS", "BUSY", "CANTINA", "MANY", "DEAL",
            "STRANGE", "PREOCCUPATION", "FINDING", "BITS", "OTHER", "CENTER", "RETURNING", "TRAIL", "FOLLOWS", "RAIDING",
            "PARTY", "DEEPER", "COURSE", "PASSES", "OUTSKIRTS", "NEAR", "REARGUARD", "POISED", "AMBUSH", "SMALLER",
            "TRAVELERS", "AMBUSHED", "BATTLE", "BREAK", "COMBAT", "WITHDRAW", "REALIZE", "LOST", "ELEMENT", "SURPRISE",
            "ADVICE", "TEAM", "HELPING", "MADE", "IMPORTANT", "ALLY", "ADVISES", "NOT", "MUCH", "DEFENDED", "CHANCE",
            "SHOULD", "HEGEMONY", "ACCEPTANCE", "ENLIST", "HATE", "SLAVERY", "KIND", "CERTAINLY", "RAID", "RETURN",
            "SCIENTIST", "MARKS", "POSITION", "MAP", "VARIETY", "RECENT", "GRATITUDE", "ASSISTANCE", "QUESTIONS",
            "DIRECTIONS", "RUN", "SUPER", "MUTANT", "NAMED", "ROCK", "INITIALLY", "SUBJECTED", "FEV", "VIRUS", "UNUSUAL",
            "EFFECT", "INTELLECT", "GREW", "MUSCULAR", "BODY", "DID", "GHOUL", "OUTCAST", "ANYONE", "JOINS", "STARTS",
            "CLEAN", "SLATE", "COULD", "PEACE", "NOWHERE", "ELSE", "PRODUCTIVE", "MEMBERS", "HATES", "BIGOTRY", "FIERCE",
            "PASSION", "ZEALOTS", "NEW", "DAWN", "CAPTURED", "WILLING", "SPARE", "TROOPS", "STEALING", "HOLDS",
            "LOCATION", "FOUNDED", "IDEA", "MARVELOUS", "THING", "GIVEN", "HUMANITY", "LORDS", "SPIRITUAL", "THEMSELVES",
            "SAVIORS", "ENDEAVOR", "PROTECT", "NOURISH", "APPEAR", "BENEVOLENT", "INDEED", "PURE", "HUMANS",
            "UNFORTUNATELY", "DEFINITION", "NARROW", "TRACE", "MUTATION", "PHYSICAL", "DEFORMITY", "DOES", "QUALIFY",
            "ACCORDING", "CREED", "FREQUENTLY", "SENDS", "VECTOR", "TEAMS", "CLEANSE", "TRACES", "IMPURITY", "FLAME",
            "REAL", "FANATICAL", "RELY", "TEMPORAL", "PROVIDE", "ADMINISTRATION", "HOLDINGS", "FAR", "PRAGMATIC", "JOBS",
            "HOLY", "CRUSADE", "EAGER", "HOLD", "POSITIONS", "BENEFITS", "RANK", "RELATIVE", "LUXURY", "SECURITY", "LAND",
            "DANGER", "WANT", "WEAR", "ARMOR", "USE", "LASER", "CALL", "SECRETLY", "MINES", "SURFACE", "EXTRACT",
            "URANIUM", "ORE", "TRADE", "SUPPLY", "MAINTAIN", "NOTICED", "BLASPHEMY", "MIDST", "DAILY", "SERMONS", "THEATRE"];
  //
  const levels = [
    { length: 4, attempts: 5 },
    { length: 6, attempts: 5 },
    { length: 8, attempts: 5 },
  ];

  let currentLevel = 0;
  let selectedWords = [];
  let correctWord = "";
  let attempts = 0;

  //Fix Saved State
  if (localStorage.getItem("solvedComputer") != null) {
    // Aquí haces visible la sección computer cuando se hayan completado todos los niveles
    document.getElementById("computer").style.display = "block";
    document.getElementById("word-container-computer").innerHTML =
      "Access granted.";
    /*Se muestra el dialogo de hackeo
              showDialog(
                "Tobin likes to take credit for hacking the system at the Titania outpost, one of Uranus' moons, but it was actually Ronin who went in, placed the transmitter, and got out undetected in 32 minutes—a personal record.",
                `SILA (${JSON.parse(localStorage.getItem("username"))})`,
                "../resources/sprites/Sila/Sila_Feliz.png"
              );*/
  } else {
    initLevel(levels[currentLevel]);
  }

  function initLevel(level) {
    selectedWords = shuffle(
      /*Intento de Fix 2/2  
      data.words.filter((word) => word.length === level.length)
      */
      words.filter((word) => word.length === level.length)
      //
    ).slice(0, 12);
    correctWord =
      selectedWords[Math.floor(Math.random() * selectedWords.length)];
    console.log(correctWord);
    console.log(currentLevel);
    attempts = level.attempts;
    initGame(selectedWords, correctWord, attempts);
  }

  function initGame(selectedWords, correctWord, attempts) {
    const wordContainer = document.getElementById("word-container-computer");
    wordContainer.innerHTML = "";
    updateAttempts(attempts);

    let wordsWithSymbols = addSymbols(selectedWords); // Agregar símbolos entre las palabras

    const paragraph = document.createElement("p");
    paragraph.innerHTML = wordsWithSymbols;
    wordContainer.appendChild(paragraph);

    const correctLettersDisplay = document.createElement("div");
    correctLettersDisplay.id = "correct-letters";
    correctLettersDisplay.textContent = "0/6 correct";
    correctLettersDisplay.style.display = "none"; // Ocultar el elemento inicialmente
    wordContainer.appendChild(correctLettersDisplay);

    const attemptsHistory = document.createElement("div"); // Elemento para mostrar el historial de intentos
    attemptsHistory.id = "attempts-history";
    wordContainer.appendChild(attemptsHistory);

    // Agregar evento de clic a cada span
    const spans = paragraph.querySelectorAll("span");
    spans.forEach((span) => {
      span.addEventListener("click", function () {
        if (!span.classList.contains("clicked")) {
          // Verificar si la palabra ya ha sido clickeada
          const selectedWord = span.textContent.trim();
          span.classList.add("clicked"); // Marcar la palabra como clickeada
          if (selectedWord === correctWord) {
            if (currentLevel < levels.length - 1) {
              currentLevel++;
              initLevel(levels[currentLevel]);
            } else {
              // Aquí haces visible la sección computer cuando se hayan completado todos los niveles
              document.getElementById("computer").style.display = "block";
              document.getElementById("word-container-computer").innerHTML =
                "Access granted.";
              //Se muestra el dialogo de hackeo
              showDialog(
                "Tobin likes to take credit for hacking the system at the Titania outpost, one of Uranus' moons, but it was actually Ronin who went in, placed the transmitter, and got out undetected in 32 minutes—a personal record.",
                `SILA (${JSON.parse(localStorage.getItem("username"))})`,
                "../resources/sprites/Sila/Sila_Feliz.png"
              );
              //Fix Saved State
              localStorage.setItem("solvedComputer", JSON.stringify(1));
            }
          } else {
            attempts--;
            updateAttempts(attempts);
            if (attempts <= 0) {
              document.getElementById("word-container-computer").innerHTML =
                "Terminal locked. Reloading... It can take a while...";
            } else {
              const correctLetters = getCorrectLetters(
                selectedWord,
                correctWord
              );
              correctLettersDisplay.textContent = `${correctLetters}/${correctWord.length} correct characters`;
              correctLettersDisplay.style.display = "block"; // Mostrar el elemento
              addToAttemptsHistory(selectedWord, correctLetters, correctWord); // Agregar el intento al historial
            }
          }
        }
      });
    });
  }

  function addSymbols(words) {
    const symbols = [
      "@",
      "%",
      ",",
      "!",
      "-",
      "+",
      "#",
      "/",
      "|",
      "?",
      "~",
      "[",
      "]",
      ":",
      ";",
    ]; // Símbolos aleatorios
    let result = "";
    for (let i = 0; i < words.length; i++) {
      result += `<span>${words[i]}</span>`;
      let numSymbols = Math.floor(Math.random() * 31) + 10; // Entre 10 y 40 símbolos aleatorios entre cada palabra
      for (let j = 0; j < numSymbols; j++) {
        result += symbols[Math.floor(Math.random() * symbols.length)]; // Agregar un símbolo aleatorio
      }
    }
    return result;
  }

  function updateAttempts(attempts) {
    const attemptsDiv = document.getElementById("attempts");
    attemptsDiv.textContent = `${attempts} ATTEMPT(S) LEFT`;
  }

  function getCorrectLetters(word1, word2) {
    let correct = 0;
    for (let i = 0; i < word1.length; i++) {
      if (word1[i] === word2[i]) correct++;
    }
    return correct;
  }

  function addToAttemptsHistory(word, correctLetters, correctWord) {
    const attemptsHistory = document.getElementById("attempts-history");
    const attempt = document.createElement("div");
    attempt.textContent = `${word}: ${correctLetters}/${correctWord.length} correct characters`;
    attemptsHistory.insertBefore(attempt, attemptsHistory.firstChild); // Agregar al principio del historial
  }
  /*Intento de Fix 2/2   
    });
    */
});
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function setupPrintTitaniaCode() {
  const contentDiv = document.getElementById("content-computer");

  // Crear un span para el texto clicable
  let printLink = document.createElement("span");
  printLink.textContent = "PRINT TITANIA CODE";
  printLink.style.cursor = "pointer";
  printLink.style.textDecoration = "underline";
  printLink.style.color = "blue";
  printLink.style.display = "block"; // Asegura que esté en su propia línea
  printLink.style.margin = "10px 0"; // Espacio antes y después

  // Añadir evento para cambiar el contenido al hacer clic
  printLink.onclick = function () {
    contentDiv.textContent = "PRINTING..."; // Cambiar texto del div
    const clueDiv = document.createElement("div");
    clueDiv.id = "clue-computer";
    contentDiv.appendChild(clueDiv);
  };

  // Agregar el texto clicable al div
  contentDiv.appendChild(printLink);
}
