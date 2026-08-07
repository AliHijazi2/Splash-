/* ============================================================
   Fußball Imposter – Spiellogik
   ============================================================ */
(function () {
  "use strict";

  // ---------- State ----------
  var state = {
    mode: "players",  // "players" (Fußballer) oder "clubs" (Vereine)
    players: 4,
    imposters: 1,
    hint: false,
    randomStarter: true,
    names: [],        // eigene Spielernamen (optional)
    // Runde
    roles: [],        // pro Spieler: { imposter: bool, word: string, hint: string }
    word: null,       // aktueller Fußballer der Runde
    imposterIdx: [],  // Indizes der Imposter
    order: [],        // zufällige Ziehreihenfolge (Spieler-Indizes)
    current: 0,       // aktueller Schritt beim Aufdecken (Position in order)
    starter: 0
  };

  var LIMITS = { players: { min: 3, max: 15 }, imposters: { min: 1, max: 5 } };

  // ---------- Helpers ----------
  function $(id) { return document.getElementById(id); }
  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  // Liste des aktuellen Modus (Fußballer oder Vereine)
  function currentList() {
    return state.mode === "clubs" ? window.CLUBS : window.FOOTBALLERS;
  }
  // Bezeichnung auf der Aufdeck-Karte je nach Modus
  function subjectLabel() {
    return state.mode === "clubs" ? "Dein Verein" : "Dein Fußballer";
  }

  // Land -> Kontinent (für den vagen Imposter-Tipp im Vereins-Modus)
  var CONTINENTS = {
    "England": "Europa", "Schottland": "Europa", "Wales": "Europa", "Spanien": "Europa",
    "Deutschland": "Europa", "Italien": "Europa", "Frankreich": "Europa", "Niederlande": "Europa",
    "Portugal": "Europa", "Türkei": "Europa", "Belgien": "Europa", "Griechenland": "Europa",
    "Österreich": "Europa", "Schweiz": "Europa", "Ukraine": "Europa", "Kroatien": "Europa",
    "Serbien": "Europa", "Tschechien": "Europa", "Norwegen": "Europa",
    "Saudi-Arabien": "Asien", "USA": "Nordamerika", "Mexiko": "Nordamerika",
    "Argentinien": "Südamerika", "Brasilien": "Südamerika", "Ägypten": "Afrika"
  };

  // Kleiner, bewusst vager Tipp NUR für den Imposter
  function impostorHint() {
    var parts = state.word.hint.split(" · ");
    if (state.mode === "clubs") {
      return CONTINENTS[parts[0]] || "International"; // nur Kontinent, kein Land/Liga
    }
    return parts[0]; // Fußballer: nur die Position, kein Land
  }

  // Anzeigename: eigener Name falls eingegeben, sonst "Spieler N"
  function playerLabel(i) {
    var n = (state.names[i] || "").trim();
    return n || ("Spieler " + (i + 1));
  }

  function showScreen(id) {
    var screens = document.querySelectorAll(".screen");
    for (var i = 0; i < screens.length; i++) screens[i].classList.remove("active");
    $(id).classList.add("active");
    window.scrollTo(0, 0);
  }

  // ---------- Setup: Stepper ----------
  function clampImposters() {
    // Max: höchstens die Hälfte der Spieler minus Sicherheit
    var maxByPlayers = Math.max(1, Math.floor(state.players / 2));
    LIMITS.imposters.max = Math.min(5, maxByPlayers);
    if (state.imposters > LIMITS.imposters.max) state.imposters = LIMITS.imposters.max;
    if (state.imposters < LIMITS.imposters.min) state.imposters = LIMITS.imposters.min;
  }

  function renderSteppers() {
    clampImposters();
    $("players-value").textContent = state.players;
    $("imposters-value").textContent = state.imposters;
    renderNames();
  }

  // Namensfelder passend zur Spielerzahl aufbauen (Eingaben bleiben erhalten)
  function renderNames() {
    var list = $("names-list");
    if (!list) return;
    list.innerHTML = "";
    for (var i = 0; i < state.players; i++) {
      var row = document.createElement("div");
      row.className = "name-row";

      var num = document.createElement("span");
      num.className = "name-num";
      num.textContent = (i + 1);

      var input = document.createElement("input");
      input.type = "text";
      input.className = "name-input";
      input.placeholder = "Spieler " + (i + 1);
      input.value = state.names[i] || "";
      input.maxLength = 20;
      input.autocomplete = "off";
      input.setAttribute("aria-label", "Name Spieler " + (i + 1));
      (function (idx) {
        input.addEventListener("input", function () { state.names[idx] = this.value; });
      })(i);

      row.appendChild(num);
      row.appendChild(input);
      list.appendChild(row);
    }
  }

  function bindSteppers() {
    document.querySelectorAll("[data-stepper]").forEach(function (el) {
      var key = el.getAttribute("data-stepper");
      el.querySelectorAll(".step-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var dir = parseInt(btn.getAttribute("data-dir"), 10);
          var next = state[key] + dir;
          var lim = LIMITS[key];
          if (next < lim.min || next > lim.max) return;
          state[key] = next;
          renderSteppers();
        });
      });
    });
  }

  function bindModeSwitch() {
    document.querySelectorAll("#mode-switch .mode-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.mode = btn.getAttribute("data-mode");
        document.querySelectorAll("#mode-switch .mode-btn").forEach(function (b) {
          b.classList.toggle("active", b === btn);
        });
      });
    });
  }

  function bindToggles() {
    $("hint-toggle").addEventListener("click", function () {
      state.hint = !state.hint;
      this.classList.toggle("on", state.hint);
      this.setAttribute("aria-checked", state.hint ? "true" : "false");
    });
    $("starter-toggle").addEventListener("click", function () {
      state.randomStarter = !state.randomStarter;
      this.classList.toggle("on", state.randomStarter);
      this.setAttribute("aria-checked", state.randomStarter ? "true" : "false");
    });
  }

  // ---------- Runde vorbereiten ----------
  function buildRound() {
    clampImposters();
    state.word = pick(currentList());

    // Imposter-Indizes auslosen
    var idx = [];
    for (var i = 0; i < state.players; i++) idx.push(i);
    shuffle(idx);
    state.imposterIdx = idx.slice(0, state.imposters).sort(function (a, b) { return a - b; });

    // Rollen bauen
    state.roles = [];
    for (var p = 0; p < state.players; p++) {
      var isImp = state.imposterIdx.indexOf(p) !== -1;
      state.roles.push({
        imposter: isImp,
        word: isImp ? null : state.word.name,
        hint: (isImp && state.hint) ? impostorHint() : null
      });
    }

    // Zufällige Ziehreihenfolge: die Karten kommen gemischt, nicht 1..N
    var order = [];
    for (var q = 0; q < state.players; q++) order.push(q);
    shuffle(order);
    state.order = order;

    state.current = 0;
    state.starter = Math.floor(Math.random() * state.players);
  }

  // aktueller Spieler-Index gemäß zufälliger Ziehreihenfolge
  function currentPlayer() { return state.order[state.current]; }

  // ---------- Reveal ----------
  var isRevealed = false;

  function renderDots() {
    var wrap = $("progress-dots");
    wrap.innerHTML = "";
    for (var i = 0; i < state.players; i++) {
      var d = document.createElement("span");
      d.className = "dot" + (i < state.current ? " done" : "") + (i === state.current ? " active" : "");
      wrap.appendChild(d);
    }
  }

  function renderRevealCard() {
    var card = $("pass-card");
    card.classList.remove("flipped");
    isRevealed = false;
    $("player-num").textContent = playerLabel(currentPlayer());
    renderDots();
  }

  function fillRevealContent() {
    var role = state.roles[currentPlayer()];
    var label = $("reveal-label");
    var word = $("reveal-word");
    var hint = $("reveal-hint");

    if (role.imposter) {
      label.textContent = "Psst …";
      word.textContent = "Du bist der Imposter";
      word.classList.add("imposter");
      hint.textContent = role.hint ? "Tipp: " + role.hint : "";
      hint.classList.toggle("visible", !!role.hint);
    } else {
      label.textContent = subjectLabel();
      word.textContent = role.word;
      word.classList.remove("imposter");
      // Hilfe für den Fall, dass man den Spieler nicht kennt: Position + Nationalland
      hint.textContent = state.word.hint;
      hint.classList.add("visible");
    }
  }

  function flipReveal() {
    if (isRevealed) return;
    fillRevealContent();
    $("pass-card").classList.add("flipped");
    isRevealed = true;
    if (navigator.vibrate) navigator.vibrate(15);
  }

  function nextPlayer() {
    state.current++;
    if (state.current >= state.players) {
      startPlayPhase();
      return;
    }
    renderRevealCard();
  }

  // ---------- Play-Phase ----------
  function startPlayPhase() {
    stopTimer();
    setTimer(0);
    var line = $("starter-line");
    if (state.randomStarter) {
      line.textContent = playerLabel(state.starter) + " beginnt.";
      line.style.display = "";
    } else {
      line.style.display = "none";
    }
    showScreen("screen-play");
  }

  // ---------- Timer ----------
  var timer = { remaining: 0, total: 0, id: null, running: false };

  function fmt(s) {
    var m = Math.floor(s / 60), sec = s % 60;
    return (m < 10 ? "0" : "") + m + ":" + (sec < 10 ? "0" : "") + sec;
  }
  function setTimer(s) {
    timer.remaining = s;
    $("timer-display").textContent = fmt(s);
  }
  function stopTimer() {
    timer.running = false;
    if (timer.id) { clearInterval(timer.id); timer.id = null; }
    $("timer-toggle").textContent = "Start";
  }
  function tick() {
    if (timer.remaining <= 0) {
      stopTimer();
      $("timer-display").classList.add("done");
      if (navigator.vibrate) navigator.vibrate([120, 60, 120]);
      return;
    }
    setTimer(timer.remaining - 1);
  }
  function bindTimer() {
    document.querySelectorAll("[data-timer]").forEach(function (chip) {
      chip.addEventListener("click", function () {
        stopTimer();
        $("timer-display").classList.remove("done");
        timer.total = parseInt(chip.getAttribute("data-timer"), 10);
        setTimer(timer.total);
        document.querySelectorAll("[data-timer]").forEach(function (c) { c.classList.remove("sel"); });
        chip.classList.add("sel");
      });
    });
    $("timer-toggle").addEventListener("click", function () {
      if (timer.running) { stopTimer(); return; }
      if (timer.remaining <= 0) return;
      $("timer-display").classList.remove("done");
      timer.running = true;
      this.textContent = "Pause";
      timer.id = setInterval(tick, 1000);
    });
    $("timer-reset").addEventListener("click", function () {
      stopTimer();
      $("timer-display").classList.remove("done");
      setTimer(timer.total || 0);
    });
  }

  // ---------- Result ----------
  function showResult() {
    stopTimer();
    $("result-word").textContent = state.word.name;

    var kicker = $("imposter-kicker");
    kicker.textContent = state.imposterIdx.length > 1 ? "Die Imposter waren" : "Der Imposter war";

    var list = $("imposter-list");
    list.innerHTML = "";
    state.imposterIdx.forEach(function (i) {
      var chip = document.createElement("div");
      chip.className = "imposter-chip";
      chip.textContent = playerLabel(i);
      list.appendChild(chip);
    });

    showScreen("screen-result");
  }

  // ---------- Flow-Bindings ----------
  function bindFlow() {
    $("start-btn").addEventListener("click", function () {
      buildRound();
      renderRevealCard();
      showScreen("screen-reveal");
    });

    // Karte antippen zum Aufdecken
    $("pass-front").addEventListener("click", flipReveal);

    // Verdecken + nächster Spieler
    $("hide-btn").addEventListener("click", function (e) {
      e.stopPropagation();
      $("pass-card").classList.remove("flipped");
      // kurze Verzögerung, damit die Flip-Animation sauber zurückläuft
      setTimeout(nextPlayer, 260);
    });

    $("reveal-quit").addEventListener("click", function () {
      showScreen("screen-setup");
    });

    $("resolve-btn").addEventListener("click", showResult);

    // Neue Runde: gleiche Spielerzahl/Einstellungen, neues Wort
    $("again-btn").addEventListener("click", function () {
      buildRound();
      renderRevealCard();
      showScreen("screen-reveal");
    });

    $("new-game-btn").addEventListener("click", function () {
      showScreen("screen-setup");
    });
  }

  // ---------- Init ----------
  document.addEventListener("DOMContentLoaded", function () {
    renderSteppers();
    bindModeSwitch();
    bindSteppers();
    bindToggles();
    bindTimer();
    bindFlow();
  });
})();
