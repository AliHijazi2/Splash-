/* ============================================================
   Vereins-Datenbank (Modus "Vereine")
   Nur bekannte Klubs. hint: kurzer Tipp (Land · Liga)
   ============================================================ */
window.CLUBS = [
  // --- England ---
  { name: "Manchester City",        hint: "England · Premier League" },
  { name: "Manchester United",      hint: "England · Premier League" },
  { name: "FC Liverpool",           hint: "England · Premier League" },
  { name: "FC Arsenal",             hint: "England · Premier League" },
  { name: "FC Chelsea",             hint: "England · Premier League" },
  { name: "Tottenham Hotspur",      hint: "England · Premier League" },
  { name: "Newcastle United",       hint: "England · Premier League" },
  { name: "Aston Villa",            hint: "England · Premier League" },
  { name: "West Ham United",        hint: "England · Premier League" },
  { name: "FC Everton",             hint: "England · Premier League" },

  // --- Spanien ---
  { name: "Real Madrid",            hint: "Spanien · LaLiga" },
  { name: "FC Barcelona",           hint: "Spanien · LaLiga" },
  { name: "Atlético Madrid",        hint: "Spanien · LaLiga" },
  { name: "FC Sevilla",             hint: "Spanien · LaLiga" },
  { name: "FC Valencia",            hint: "Spanien · LaLiga" },
  { name: "Real Betis",             hint: "Spanien · LaLiga" },
  { name: "Athletic Bilbao",        hint: "Spanien · LaLiga" },
  { name: "FC Villarreal",          hint: "Spanien · LaLiga" },
  { name: "Real Sociedad",          hint: "Spanien · LaLiga" },

  // --- Deutschland ---
  { name: "FC Bayern München",      hint: "Deutschland · Bundesliga" },
  { name: "Borussia Dortmund",      hint: "Deutschland · Bundesliga" },
  { name: "RB Leipzig",             hint: "Deutschland · Bundesliga" },
  { name: "Bayer Leverkusen",       hint: "Deutschland · Bundesliga" },
  { name: "Eintracht Frankfurt",    hint: "Deutschland · Bundesliga" },
  { name: "VfB Stuttgart",          hint: "Deutschland · Bundesliga" },
  { name: "Borussia Mönchengladbach", hint: "Deutschland · Bundesliga" },
  { name: "VfL Wolfsburg",          hint: "Deutschland · Bundesliga" },
  { name: "SC Freiburg",            hint: "Deutschland · Bundesliga" },
  { name: "TSG Hoffenheim",         hint: "Deutschland · Bundesliga" },
  { name: "Werder Bremen",          hint: "Deutschland · Bundesliga" },
  { name: "1. FC Union Berlin",     hint: "Deutschland · Bundesliga" },
  { name: "1. FC Köln",             hint: "Deutschland · Bundesliga" },
  { name: "Hamburger SV",           hint: "Deutschland · Bundesliga" },
  { name: "FC Augsburg",            hint: "Deutschland · Bundesliga" },
  { name: "1. FSV Mainz 05",        hint: "Deutschland · Bundesliga" },
  { name: "FC Schalke 04",          hint: "Deutschland · 2. Bundesliga" },

  // --- Italien ---
  { name: "Juventus Turin",         hint: "Italien · Serie A" },
  { name: "AC Mailand",             hint: "Italien · Serie A" },
  { name: "Inter Mailand",          hint: "Italien · Serie A" },
  { name: "AS Rom",                 hint: "Italien · Serie A" },
  { name: "SSC Neapel",             hint: "Italien · Serie A" },
  { name: "Lazio Rom",              hint: "Italien · Serie A" },
  { name: "Fiorentina",             hint: "Italien · Serie A" },
  { name: "Atalanta Bergamo",       hint: "Italien · Serie A" },

  // --- Frankreich ---
  { name: "Paris Saint-Germain",    hint: "Frankreich · Ligue 1" },
  { name: "Olympique Marseille",    hint: "Frankreich · Ligue 1" },
  { name: "Olympique Lyon",         hint: "Frankreich · Ligue 1" },
  { name: "AS Monaco",              hint: "Frankreich · Ligue 1" },
  { name: "OGC Nizza",              hint: "Frankreich · Ligue 1" },
  { name: "OSC Lille",              hint: "Frankreich · Ligue 1" },

  // --- Niederlande ---
  { name: "Ajax Amsterdam",         hint: "Niederlande · Eredivisie" },
  { name: "PSV Eindhoven",          hint: "Niederlande · Eredivisie" },
  { name: "Feyenoord Rotterdam",    hint: "Niederlande · Eredivisie" },

  // --- Portugal ---
  { name: "Benfica Lissabon",       hint: "Portugal · Primeira Liga" },
  { name: "FC Porto",               hint: "Portugal · Primeira Liga" },
  { name: "Sporting Lissabon",      hint: "Portugal · Primeira Liga" },

  // --- Türkei ---
  { name: "Galatasaray",            hint: "Türkei · Süper Lig" },
  { name: "Fenerbahçe",             hint: "Türkei · Süper Lig" },
  { name: "Beşiktaş",               hint: "Türkei · Süper Lig" },

  // --- Schottland ---
  { name: "Celtic Glasgow",         hint: "Schottland · Premiership" },
  { name: "Glasgow Rangers",        hint: "Schottland · Premiership" },

  // --- Belgien ---
  { name: "FC Brügge",              hint: "Belgien · Pro League" },
  { name: "RSC Anderlecht",         hint: "Belgien · Pro League" },

  // --- Griechenland ---
  { name: "Olympiakos Piräus",      hint: "Griechenland · Super League" },

  // --- Saudi-Arabien ---
  { name: "Al-Hilal",               hint: "Saudi-Arabien · Saudi Pro League" },
  { name: "Al-Nassr",               hint: "Saudi-Arabien · Saudi Pro League" },
  { name: "Al-Ittihad",             hint: "Saudi-Arabien · Saudi Pro League" },

  // --- USA ---
  { name: "Inter Miami",            hint: "USA · MLS" },
  { name: "LA Galaxy",              hint: "USA · MLS" },

  // --- Südamerika ---
  { name: "Boca Juniors",           hint: "Argentinien · Liga Profesional" },
  { name: "River Plate",            hint: "Argentinien · Liga Profesional" },
  { name: "Flamengo",               hint: "Brasilien · Série A" },
  { name: "Palmeiras",              hint: "Brasilien · Série A" },
  { name: "Corinthians",            hint: "Brasilien · Série A" },
  { name: "Santos FC",              hint: "Brasilien · Série A" }
].filter(function (c) { return c.name && c.hint; });
