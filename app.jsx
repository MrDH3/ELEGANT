// Main app — composes everything, handles theme + palette + Tweaks
const { useState: aS, useEffect: aE, useMemo: aM } = React;

const TWEAKS_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "navy",
  "heroBg": "mesh",
  "headlineFont": "cormorant",
  "lang": "uz"
}/*EDITMODE-END*/;

// Palette presets — each defines the design system tokens
const PALETTES = {
  navy: {
    label: "Navy & Gold",
    light: {
      bg: "#FAF7F0", fg: "#0A1F44", muted: "#5d6378", card: "#FFFFFF", band: "#F4EFE3", ink: "#0A1F44",
      gold: "#C8A14A", goldRgb: "200,161,74", accent: "#0A1F44",
      hairline: "rgba(10,31,68,0.12)", hover: "rgba(10,31,68,0.04)",
      navScrolled: "rgba(250,247,240,0.78)",
      mesh1: "rgba(200,161,74,0.22)", mesh2: "rgba(10,31,68,0.10)", mesh3: "rgba(200,161,74,0.10)",
    },
    dark: {
      bg: "#0B1326", fg: "#f3eed8", muted: "#9aa1b6", card: "#101a32", band: "#0d1628", ink: "#070d1c",
      gold: "#D4AF37", goldRgb: "212,175,55", accent: "#D4AF37",
      hairline: "rgba(243,238,216,0.10)", hover: "rgba(243,238,216,0.04)",
      navScrolled: "rgba(11,19,38,0.72)",
      mesh1: "rgba(212,175,55,0.18)", mesh2: "rgba(60,90,160,0.18)", mesh3: "rgba(212,175,55,0.10)",
    },
  },
  emerald: {
    label: "Emerald & Gold",
    light: {
      bg: "#F8F6EE", fg: "#0F4C3A", muted: "#4f6660", card: "#FFFFFF", band: "#EFEBDC", ink: "#0F4C3A",
      gold: "#C49A2C", goldRgb: "196,154,44", accent: "#0F4C3A",
      hairline: "rgba(15,76,58,0.14)", hover: "rgba(15,76,58,0.04)",
      navScrolled: "rgba(248,246,238,0.78)",
      mesh1: "rgba(196,154,44,0.20)", mesh2: "rgba(15,76,58,0.10)", mesh3: "rgba(196,154,44,0.10)",
    },
    dark: {
      bg: "#08221b", fg: "#f1ecd2", muted: "#9bb1a8", card: "#0d2e25", band: "#0a261d", ink: "#051712",
      gold: "#D4AF37", goldRgb: "212,175,55", accent: "#D4AF37",
      hairline: "rgba(241,236,210,0.10)", hover: "rgba(241,236,210,0.04)",
      navScrolled: "rgba(8,34,27,0.72)",
      mesh1: "rgba(212,175,55,0.18)", mesh2: "rgba(40,120,90,0.20)", mesh3: "rgba(212,175,55,0.10)",
    },
  },
  ink: {
    label: "Ink & Coral",
    light: {
      bg: "#F5F2EB", fg: "#1a1820", muted: "#5c5868", card: "#FFFFFF", band: "#ECE7DA", ink: "#1a1820",
      gold: "#D9633F", goldRgb: "217,99,63", accent: "#1a1820",
      hairline: "rgba(26,24,32,0.12)", hover: "rgba(26,24,32,0.04)",
      navScrolled: "rgba(245,242,235,0.78)",
      mesh1: "rgba(217,99,63,0.18)", mesh2: "rgba(26,24,32,0.08)", mesh3: "rgba(217,99,63,0.10)",
    },
    dark: {
      bg: "#0e0d12", fg: "#f0ebd9", muted: "#9b95a8", card: "#181620", band: "#121118", ink: "#06050a",
      gold: "#E2734D", goldRgb: "226,115,77", accent: "#E2734D",
      hairline: "rgba(240,235,217,0.10)", hover: "rgba(240,235,217,0.04)",
      navScrolled: "rgba(14,13,18,0.72)",
      mesh1: "rgba(226,115,77,0.18)", mesh2: "rgba(80,60,100,0.20)", mesh3: "rgba(226,115,77,0.10)",
    },
  },
};

const FONT_FAMILIES = {
  cormorant: "'Cormorant Garamond', serif",
  playfair: "'Playfair Display', serif",
  fraunces: "'Fraunces', serif",
};

function applyTokens(tokens, headlineFont) {
  const r = document.documentElement;
  Object.entries({
    "--bg": tokens.bg, "--fg": tokens.fg, "--muted": tokens.muted, "--card": tokens.card, "--band": tokens.band, "--ink": tokens.ink,
    "--gold": tokens.gold, "--gold-rgb": tokens.goldRgb, "--accent": tokens.accent,
    "--hairline": tokens.hairline, "--hover": tokens.hover,
    "--nav-bg-scrolled": tokens.navScrolled,
    "--mesh1": tokens.mesh1, "--mesh2": tokens.mesh2, "--mesh3": tokens.mesh3,
    "--headline-font": FONT_FAMILIES[headlineFont] || FONT_FAMILIES.cormorant,
  }).forEach(([k, v]) => r.style.setProperty(k, v));
}

function App() {
  const tweaks = useTweaks(TWEAKS_DEFAULTS);
  const [tweaksObj, setTweak] = tweaks;
  const [theme, setTheme] = aS("light");
  const [lang, setLang] = aS(tweaksObj.lang || "uz");

  // Sync language with tweaks
  aE(() => { if (tweaksObj.lang && tweaksObj.lang !== lang) setLang(tweaksObj.lang); }, [tweaksObj.lang]);
  aE(() => { window.__currentLang = lang; }, [lang]);

  // Apply CSS tokens whenever palette or theme changes
  aE(() => {
    const p = PALETTES[tweaksObj.palette] || PALETTES.navy;
    const tokens = theme === "dark" ? p.dark : p.light;
    applyTokens(tokens, tweaksObj.headlineFont);
    document.body.style.background = tokens.bg;
    document.body.style.color = tokens.fg;
  }, [theme, tweaksObj.palette, tweaksObj.headlineFont]);

  const t = TRANSLATIONS[lang];

  return (
    <div style={{ background: "var(--bg)", color: "var(--fg)", minHeight: "100vh" }}>
      <Navbar t={t} lang={lang} setLang={(l) => { setLang(l); setTweak("lang", l); }} theme={theme} setTheme={setTheme} />
      <main>
        <Hero t={t} heroBg={tweaksObj.heroBg} />
        <Stats t={t} />
        <Courses t={t} />
        <Teachers t={t} />
        <Why t={t} />
        <Testimonials t={t} />
        <Pricing t={t} />
        <Contact t={t} lang={lang} />
      </main>
      <Footer t={t} lang={lang} />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Palette">
          <TweakRadio
            label="Theme"
            value={theme}
            options={[{ value: "light", label: "Light" }, { value: "dark", label: "Dark" }]}
            onChange={setTheme}
          />
          <TweakSelect
            label="Color system"
            value={tweaksObj.palette}
            options={Object.entries(PALETTES).map(([k, v]) => ({ value: k, label: v.label }))}
            onChange={(v) => setTweak("palette", v)}
          />
        </TweakSection>
        <TweakSection title="Typography">
          <TweakSelect
            label="Headline font"
            value={tweaksObj.headlineFont}
            options={[
              { value: "cormorant", label: "Cormorant Garamond" },
              { value: "playfair", label: "Playfair Display" },
              { value: "fraunces", label: "Fraunces" },
            ]}
            onChange={(v) => setTweak("headlineFont", v)}
          />
        </TweakSection>
        <TweakSection title="Hero background">
          <TweakRadio
            label="Style"
            value={tweaksObj.heroBg}
            options={[{ value: "mesh", label: "Mesh" }, { value: "shapes", label: "Shapes" }, { value: "particles", label: "Particles" }]}
            onChange={(v) => setTweak("heroBg", v)}
          />
        </TweakSection>
        <TweakSection title="Language">
          <TweakRadio
            label="Display"
            value={lang}
            options={[{ value: "uz", label: "UZ" }, { value: "ru", label: "RU" }, { value: "en", label: "EN" }]}
            onChange={(l) => { setLang(l); setTweak("lang", l); }}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
