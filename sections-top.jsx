// Top-level page sections. Depend on globals: React, Reveal, CountUp, Eyebrow, LogoMark, Icon, TRANSLATIONS

const { useState: uS, useEffect: uE, useRef: uR, useMemo: uM } = React;

// =============== NAVBAR ===============
function Navbar({ t, lang, setLang, theme, setTheme }) {
  const [scrolled, setScrolled] = uS(false);
  const [mobile, setMobile] = uS(false);
  const [langOpen, setLangOpen] = uS(false);
  const langRef = uR(null);

  uE(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  uE(() => {
    const onClick = (e) => { if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false); };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const links = [
    { href: "#home", label: t.nav.home },
    { href: "#courses", label: t.nav.courses },
    { href: "#teachers", label: t.nav.teachers },
    { href: "#why", label: t.nav.about },
    { href: "#contact", label: t.nav.contact },
  ];
  const langs = [
    { code: "uz", label: "O'zbek", flag: "🇺🇿" },
    { code: "ru", label: "Русский", flag: "🇷🇺" },
    { code: "en", label: "English", flag: "🇬🇧" },
  ];
  const cur = langs.find((l) => l.code === lang);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backdropFilter: scrolled ? "saturate(140%) blur(18px)" : "none",
        background: scrolled ? "var(--nav-bg-scrolled)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--hairline)" : "1px solid transparent",
      }}
    >
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 h-[76px] flex items-center justify-between">
        <a href="#home" className="flex items-center"><LogoMark size={36} /></a>

        <nav className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[13px] tracking-wide hover:text-[var(--gold)] transition-colors" style={{ color: "var(--fg)", fontFamily: "Inter, sans-serif" }}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 lg:gap-3">
          {/* Lang switcher */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-2 px-3 h-9 rounded-full border text-[12px] hover:border-[var(--gold)] transition-colors"
              style={{ borderColor: "var(--hairline)", color: "var(--fg)" }}
              aria-label="Language"
            >
              <Icon.Globe />
              <span className="font-medium uppercase tracking-wider">{cur.code}</span>
              <Icon.ChevronDown />
            </button>
            <div
              className="absolute right-0 mt-2 w-44 rounded-xl border overflow-hidden transition-all"
              style={{
                background: "var(--card)", borderColor: "var(--hairline)",
                opacity: langOpen ? 1 : 0, transform: langOpen ? "translateY(0)" : "translateY(-6px)",
                pointerEvents: langOpen ? "auto" : "none", boxShadow: "0 24px 48px -16px rgba(0,0,0,0.25)",
              }}
            >
              {langs.map((l) => (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code); setLangOpen(false); }}
                  className="w-full px-4 py-2.5 flex items-center gap-3 text-[13px] hover:bg-[var(--hover)] transition-colors text-left"
                  style={{ color: lang === l.code ? "var(--gold)" : "var(--fg)" }}
                >
                  <span className="text-base">{l.flag}</span>
                  <span style={{ fontFamily: "Inter, sans-serif" }}>{l.label}</span>
                  {lang === l.code && <span className="ml-auto"><Icon.Check /></span>}
                </button>
              ))}
            </div>
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="grid place-items-center w-9 h-9 rounded-full border hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
            style={{ borderColor: "var(--hairline)", color: "var(--fg)" }}
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Icon.Moon /> : <Icon.Sun />}
          </button>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 h-9 px-5 rounded-full text-[12px] font-medium tracking-wide transition-transform hover:scale-[1.02]"
            style={{ background: "var(--gold)", color: "#1a1408", fontFamily: "Inter, sans-serif" }}
          >
            {t.nav.cta} <Icon.ArrowRight />
          </a>

          {/* Mobile menu */}
          <button
            onClick={() => setMobile((v) => !v)}
            className="lg:hidden grid place-items-center w-9 h-9 rounded-full border"
            style={{ borderColor: "var(--hairline)", color: "var(--fg)" }}
            aria-label="Menu"
          >
            {mobile ? <Icon.Close /> : <Icon.Menu />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className="lg:hidden overflow-hidden transition-all"
        style={{
          maxHeight: mobile ? 360 : 0,
          background: "var(--card)",
          borderBottom: mobile ? "1px solid var(--hairline)" : "none",
        }}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <a
              key={l.href} href={l.href} onClick={() => setMobile(false)}
              className="py-3 text-[14px] border-b last:border-0"
              style={{ color: "var(--fg)", borderColor: "var(--hairline)", fontFamily: "Inter, sans-serif" }}
            >{l.label}</a>
          ))}
          <a href="#contact" onClick={() => setMobile(false)} className="mt-3 inline-flex items-center justify-center gap-2 h-11 rounded-full text-[13px] font-medium" style={{ background: "var(--gold)", color: "#1a1408" }}>
            {t.nav.cta} <Icon.ArrowRight />
          </a>
        </div>
      </div>
    </header>
  );
}

// =============== HERO ===============
function Hero({ t, heroBg }) {
  return (
    <section id="home" className="relative overflow-hidden" style={{ paddingTop: "120px", paddingBottom: "80px", minHeight: "100vh" }}>
      <HeroBackground variant={heroBg} />

      <div className="relative max-w-[1320px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10 items-center" style={{ minHeight: "calc(100vh - 200px)" }}>
        <div className="lg:col-span-7">
          <Reveal>
            <Eyebrow>{t.hero.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={120}>
            <h1
              className="mt-6 leading-[0.95] tracking-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, color: "var(--fg)" }}
            >
              <span className="block text-[clamp(48px,8vw,108px)]">{t.hero.title1}</span>
              <span className="block text-[clamp(48px,8vw,108px)] italic" style={{ color: "var(--gold)" }}>{t.hero.title2}</span>
              <span className="block text-[clamp(48px,8vw,108px)]">{t.hero.title3}<span style={{ color: "var(--gold)" }}>.</span></span>
            </h1>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-8 max-w-[560px] text-[17px] leading-[1.65]" style={{ color: "var(--muted)", fontFamily: "Inter, sans-serif" }}>
              {t.hero.sub}
            </p>
          </Reveal>
          <Reveal delay={380}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#courses" className="group inline-flex items-center gap-2 h-12 px-7 rounded-full text-[13px] font-medium tracking-wide transition-all hover:scale-[1.02]" style={{ background: "var(--gold)", color: "#1a1408" }}>
                {t.hero.ctaPrimary}
                <span className="transition-transform group-hover:translate-x-1"><Icon.ArrowRight /></span>
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 h-12 px-7 rounded-full text-[13px] font-medium tracking-wide border transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]" style={{ borderColor: "var(--hairline)", color: "var(--fg)" }}>
                {t.hero.ctaSecondary}
              </a>
            </div>
          </Reveal>
          <Reveal delay={500}>
            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80",
                  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&q=80",
                  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&q=80",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80",
                ].map((src, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 overflow-hidden" style={{ borderColor: "var(--bg)" }}>
                    <img src={src} alt="" className="w-full h-full object-cover"/>
                  </div>
                ))}
              </div>
              <div className="text-[12px]" style={{ color: "var(--muted)", fontFamily: "Inter, sans-serif" }}>
                <div className="flex items-center gap-1 text-[var(--gold)]">
                  {[0,1,2,3,4].map(i=> <Icon.Star key={i} />)}
                  <span className="ml-1.5" style={{ color: "var(--fg)", fontWeight: 600 }}>4.9 / 5</span>
                </div>
                <div className="mt-0.5">{ {uz:"500+ talaba bizni tanladi", ru:"500+ студентов нас выбрали", en:"500+ students chose us"}[(window.__currentLang || "uz")] }</div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right visual card */}
        <div className="lg:col-span-5 relative">
          <Reveal delay={300}>
            <HeroVisual />
          </Reveal>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em]" style={{ color: "var(--muted)", fontFamily: "Inter, sans-serif" }}>
        <span>{t.hero.scroll}</span>
        <span className="block w-px h-10 relative overflow-hidden" style={{ background: "var(--hairline)" }}>
          <span className="absolute top-0 left-0 right-0 h-3" style={{ background: "var(--gold)", animation: "scrollDot 1.8s ease-in-out infinite" }}></span>
        </span>
      </div>
    </section>
  );
}

function HeroBackground({ variant = "mesh" }) {
  if (variant === "shapes") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-20 w-[520px] h-[520px] rounded-full" style={{ background: "radial-gradient(circle at 30% 30%, var(--gold) 0%, transparent 60%)", opacity: 0.18, animation: "float1 14s ease-in-out infinite" }} />
        <div className="absolute top-40 -right-32 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle at 60% 40%, var(--accent) 0%, transparent 60%)", opacity: 0.22, animation: "float2 18s ease-in-out infinite" }} />
        <div className="absolute -bottom-40 left-1/3 w-[480px] h-[480px] rounded-full" style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 60%)", opacity: 0.12, animation: "float3 16s ease-in-out infinite" }} />
        <GridLines />
      </div>
    );
  }
  if (variant === "particles") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ParticleField />
        <GridLines />
      </div>
    );
  }
  // mesh (default)
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0" style={{
        background: `radial-gradient(circle at 18% 22%, var(--mesh1) 0%, transparent 42%),
                     radial-gradient(circle at 82% 30%, var(--mesh2) 0%, transparent 45%),
                     radial-gradient(circle at 50% 90%, var(--mesh3) 0%, transparent 55%)`,
        opacity: 0.85, animation: "meshShift 22s ease-in-out infinite",
      }} />
      <GridLines />
    </div>
  );
}

function GridLines() {
  return (
    <div className="absolute inset-0" style={{
      backgroundImage: "linear-gradient(var(--hairline) 1px, transparent 1px), linear-gradient(90deg, var(--hairline) 1px, transparent 1px)",
      backgroundSize: "80px 80px",
      maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
      WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
      opacity: 0.5,
    }}/>
  );
}

function ParticleField() {
  const ref = uR(null);
  uE(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d");
    let w, h, raf;
    const resize = () => { w = c.width = c.offsetWidth * devicePixelRatio; h = c.height = c.offsetHeight * devicePixelRatio; };
    resize(); window.addEventListener("resize", resize);
    const N = 60;
    const parts = Array.from({length: N}, () => ({
      x: Math.random()*w, y: Math.random()*h,
      vx: (Math.random()-0.5)*0.3*devicePixelRatio, vy: (Math.random()-0.5)*0.3*devicePixelRatio,
      r: (Math.random()*1.5+0.5)*devicePixelRatio,
    }));
    const tick = () => {
      ctx.clearRect(0,0,w,h);
      const goldRGB = getComputedStyle(document.documentElement).getPropertyValue("--gold-rgb").trim() || "212,175,55";
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x<0||p.x>w) p.vx*=-1; if (p.y<0||p.y>h) p.vy*=-1;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${goldRGB},0.5)`;
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
      }
      for (let i=0;i<N;i++) for (let j=i+1;j<N;j++) {
        const dx=parts[i].x-parts[j].x, dy=parts[i].y-parts[j].y; const d=Math.hypot(dx,dy);
        if (d<140*devicePixelRatio) {
          ctx.strokeStyle = `rgba(${goldRGB},${0.18*(1-d/(140*devicePixelRatio))})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(parts[i].x,parts[i].y); ctx.lineTo(parts[j].x,parts[j].y); ctx.stroke();
        }
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

// Hero visual — stacked editorial cards
function HeroVisual() {
  return (
    <div className="relative aspect-[5/6] max-w-[480px] mx-auto">
      {/* Big photo */}
      <div className="absolute inset-0 rounded-[28px] overflow-hidden" style={{ boxShadow: "0 40px 80px -30px rgba(10,31,68,0.4)" }}>
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=85"
          alt="Students learning"
          className="w-full h-full object-cover"
          /* REPLACE: hero photograph */
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(10,15,30,0.55) 100%)" }} />
        <div className="absolute left-6 right-6 bottom-6 flex items-end justify-between text-white">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] opacity-80">{ {uz:"Joriy guruh", ru:"Текущая группа", en:"Current cohort"}[(window.__currentLang||"uz")] }</div>
            <div className="mt-1 text-[20px]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>IELTS · Spring 2026</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-[0.3em] opacity-80">Avg.</div>
            <div className="text-[28px]" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--gold)" }}>7.4</div>
          </div>
        </div>
      </div>

      {/* Floating badge — score */}
      <div
        className="absolute -left-6 top-10 rounded-2xl px-4 py-3 backdrop-blur"
        style={{ background: "var(--card)", border: "1px solid var(--hairline)", boxShadow: "0 20px 40px -20px rgba(0,0,0,0.2)", animation: "floatY 5s ease-in-out infinite" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 grid place-items-center rounded-full" style={{ background: "var(--gold)", color: "#1a1408" }}>
            <Icon.Star />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--muted)" }}>{ {uz:"Eng yuqori",ru:"Лучший",en:"Top"}[(window.__currentLang||"uz")] }</div>
            <div className="text-[15px]" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--fg)" }}>IELTS 8.5</div>
          </div>
        </div>
      </div>

      {/* Floating badge — admissions */}
      <div
        className="absolute -right-4 bottom-16 rounded-2xl px-4 py-3 backdrop-blur"
        style={{ background: "var(--card)", border: "1px solid var(--hairline)", boxShadow: "0 20px 40px -20px rgba(0,0,0,0.2)", animation: "floatY 6s ease-in-out infinite -2s" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 grid place-items-center rounded-full" style={{ background: "var(--ink)", color: "var(--gold)", border: "1px solid var(--gold)" }}>
            <Icon.Check />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--muted)" }}>{ {uz:"Qabul",ru:"Приём",en:"Admits"}[(window.__currentLang||"uz")] }</div>
            <div className="text-[15px]" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--fg)" }}>NYU · Harvard</div>
          </div>
        </div>
      </div>

      {/* Hairline frame */}
      <div className="absolute -inset-4 rounded-[36px] pointer-events-none" style={{ border: "1px solid var(--hairline)" }} />
    </div>
  );
}

window.Navbar = Navbar;
window.Hero = Hero;
