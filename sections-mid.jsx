// Mid sections: Stats, Courses, Teachers, Why
const { useState: mS, useEffect: mE, useRef: mR } = React;

// =============== STATS ===============
function Stats({ t }) {
  const items = [
    { end: 500, suf: "+", label: t.stats.grads },
    { end: 4, suf: "", label: t.stats.teachers },
    { end: 95, suf: "%", label: t.stats.success },
    { end: 10, suf: "+", label: t.stats.courses },
  ];
  return (
    <section className="relative py-24 lg:py-32" style={{ background: "var(--band)" }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
        {items.map((it, i) => (
          <Reveal key={i} delay={i * 90}>
            <div className="text-center lg:text-left">
              <div className="text-[clamp(48px,6vw,84px)] leading-none tracking-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, color: "var(--fg)" }}>
                <CountUp end={it.end} suffix={it.suf} />
              </div>
              <div className="mt-3 text-[12px] uppercase tracking-[0.25em]" style={{ color: "var(--muted)", fontFamily: "Inter, sans-serif" }}>{it.label}</div>
              <div className="mt-4 h-px w-12 mx-auto lg:mx-0" style={{ background: "var(--gold)" }}/>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// =============== COURSES ===============
const COURSE_VISUAL = {
  IELTS: { hue: 220, photo: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&q=80" },
  SAT: { hue: 38, photo: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800&q=80" },
  General: { hue: 160, photo: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80" },
  PSchool: { hue: 280, photo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80" },
  TOEFL: { hue: 12, photo: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80" },
  Speaking: { hue: 195, photo: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80" },
};

function Courses({ t }) {
  return (
    <section id="courses" className="py-24 lg:py-36">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-6 mb-16 items-end">
          <div className="lg:col-span-7">
            <Reveal><Eyebrow>{t.courses.eyebrow}</Eyebrow></Reveal>
            <Reveal delay={120}>
              <h2 className="mt-5 text-[clamp(40px,5.5vw,72px)] leading-[1.02] tracking-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, color: "var(--fg)" }}>
                {t.courses.title}<span style={{ color: "var(--gold)" }}>.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={220} className="lg:col-span-5">
            <p className="text-[16px] leading-[1.7]" style={{ color: "var(--muted)", fontFamily: "Inter, sans-serif" }}>{t.courses.sub}</p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* REPLACE: edit course descriptions in translations.jsx */}
          {t.courses.list.map((c, i) => {
            const v = COURSE_VISUAL[c.tag] || COURSE_VISUAL.IELTS;
            return (
              <Reveal key={i} delay={(i % 3) * 90}>
                <a href="#contact" className="group relative block rounded-3xl overflow-hidden h-full transition-all duration-500 hover:-translate-y-1" style={{ background: "var(--card)", border: "1px solid var(--hairline)", boxShadow: "0 1px 0 rgba(255,255,255,0.04) inset" }}>
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <img src={v.photo} alt="" className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"/>
                    <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 30%, rgba(10,15,30,0.7) 100%)` }} />
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3 h-7 inline-flex items-center rounded-full text-[10px] uppercase tracking-[0.2em] font-medium backdrop-blur" style={{ background: "rgba(255,255,255,0.14)", color: "white", border: "1px solid rgba(255,255,255,0.2)" }}>
                        {c.tag}
                      </span>
                    </div>
                    <div className="absolute left-5 right-5 bottom-4 flex items-center justify-between text-white text-[11px] uppercase tracking-[0.2em] opacity-90">
                      <span>{c.level}</span>
                      <span>{c.weeks}</span>
                    </div>
                  </div>
                  <div className="p-7">
                    <h3 className="text-[26px] leading-[1.15]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, color: "var(--fg)" }}>{c.name}</h3>
                    <p className="mt-3 text-[14px] leading-[1.65]" style={{ color: "var(--muted)", fontFamily: "Inter, sans-serif" }}>{c.desc}</p>
                    <div className="mt-6 flex items-center gap-2 text-[12px] font-medium tracking-wider uppercase" style={{ color: "var(--gold)" }}>
                      <span>{t.courses.more}</span>
                      <span className="transition-transform group-hover:translate-x-1"><Icon.ArrowRight /></span>
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)", opacity: 0, transition: "opacity .4s" }} />
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// =============== TEACHERS ===============
const TEACHER_PHOTOS = [
  // REPLACE: teacher photo URLs
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=85",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=85",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=85",
];

function Teachers({ t }) {
  return (
    <section id="teachers" className="py-24 lg:py-36" style={{ background: "var(--band)" }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-6 mb-16 items-end">
          <div className="lg:col-span-7">
            <Reveal><Eyebrow>{t.teachers.eyebrow}</Eyebrow></Reveal>
            <Reveal delay={120}>
              <h2 className="mt-5 text-[clamp(40px,5.5vw,72px)] leading-[1.02] tracking-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, color: "var(--fg)" }}>
                {t.teachers.title}<span style={{ color: "var(--gold)" }}>.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={220} className="lg:col-span-5">
            <p className="text-[16px] leading-[1.7]" style={{ color: "var(--muted)", fontFamily: "Inter, sans-serif" }}>{t.teachers.sub}</p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {t.teachers.list.map((tch, i) => (
            <Reveal key={i} delay={i * 90}>
              <article className="group rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2" style={{ background: "var(--card)", border: "1px solid var(--hairline)" }}>
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img src={TEACHER_PHOTOS[i]} alt={tch.name} className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(10,15,30,0.85) 100%)" }} />
                  <div className="absolute left-5 top-5">
                    <span className="px-3 h-7 inline-flex items-center rounded-full text-[10px] uppercase tracking-[0.2em] font-medium backdrop-blur" style={{ background: "var(--gold)", color: "#1a1408" }}>
                      {tch.subj}
                    </span>
                  </div>
                  <div className="absolute left-5 right-5 bottom-5 text-white">
                    <h3 className="text-[24px] leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>{tch.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[13px] leading-[1.65]" style={{ color: "var(--muted)", fontFamily: "Inter, sans-serif" }}>{tch.bio}</p>
                  <ul className="mt-5 space-y-2">
                    {tch.marks.map((m, j) => (
                      <li key={j} className="flex items-center gap-2 text-[12px]" style={{ color: "var(--fg)", fontFamily: "Inter, sans-serif" }}>
                        <span className="w-1 h-1 rounded-full" style={{ background: "var(--gold)" }} />
                        {m}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 pt-5 flex items-center gap-3" style={{ borderTop: "1px solid var(--hairline)" }}>
                    {[Icon.Instagram, Icon.Telegram, Icon.YouTube].map((I, k) => (
                      <a key={k} href="#" className="w-8 h-8 grid place-items-center rounded-full hover:text-[var(--gold)] hover:border-[var(--gold)] transition-colors border" style={{ borderColor: "var(--hairline)", color: "var(--muted)" }}>
                        <I />
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// =============== WHY ===============
function Why({ t }) {
  return (
    <section id="why" className="py-24 lg:py-36">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-6 mb-16 items-end">
          <div className="lg:col-span-7">
            <Reveal><Eyebrow>{t.why.eyebrow}</Eyebrow></Reveal>
            <Reveal delay={120}>
              <h2 className="mt-5 text-[clamp(40px,5.5vw,72px)] leading-[1.02] tracking-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, color: "var(--fg)" }}>
                {t.why.title}<span style={{ color: "var(--gold)" }}>.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={220} className="lg:col-span-5">
            <p className="text-[16px] leading-[1.7]" style={{ color: "var(--muted)", fontFamily: "Inter, sans-serif" }}>{t.why.sub}</p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3" style={{ borderTop: "1px solid var(--hairline)", borderLeft: "1px solid var(--hairline)" }}>
          {t.why.items.map((it, i) => (
            <Reveal key={i} delay={(i % 3) * 80}>
              <div className="group p-8 lg:p-10 transition-colors hover:bg-[var(--hover)]" style={{ borderRight: "1px solid var(--hairline)", borderBottom: "1px solid var(--hairline)", minHeight: 240 }}>
                <div className="flex items-start justify-between">
                  <div className="text-[12px] uppercase tracking-[0.25em]" style={{ color: "var(--gold)", fontFamily: "Inter, sans-serif" }}>0{i+1}</div>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--gold)" }}><Icon.ArrowRight /></span>
                </div>
                <h3 className="mt-8 text-[24px] leading-[1.2]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, color: "var(--fg)" }}>{it.t}</h3>
                <p className="mt-3 text-[14px] leading-[1.65]" style={{ color: "var(--muted)", fontFamily: "Inter, sans-serif" }}>{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Stats = Stats;
window.Courses = Courses;
window.Teachers = Teachers;
window.Why = Why;
