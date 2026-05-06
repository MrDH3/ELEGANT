// Bottom sections: Testimonials, Pricing, Contact, Footer
const { useState: bS, useEffect: bE, useRef: bR } = React;

// =============== TESTIMONIALS ===============
const TESTIMONIAL_PHOTOS = [
  // REPLACE: testimonial photo URLs
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=85",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=85",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=85",
  "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&q=85",
];

function Testimonials({ t }) {
  const [idx, setIdx] = bS(0);
  const list = t.testimonials.list;
  bE(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % list.length), 6000);
    return () => clearInterval(id);
  }, [list.length]);

  return (
    <section className="py-24 lg:py-36" style={{ background: "var(--ink)", color: "#f3eed8" }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <Reveal><div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em]" style={{ color: "var(--gold)" }}>
          <span className="h-px w-8" style={{ background: "var(--gold)", opacity: 0.6 }}/>
          <span style={{ fontFamily: "Inter, sans-serif" }}>{t.testimonials.eyebrow}</span>
        </div></Reveal>
        <Reveal delay={100}>
          <h2 className="mt-5 text-[clamp(40px,5.5vw,72px)] leading-[1.02] tracking-tight max-w-[900px]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
            {t.testimonials.title}<span style={{ color: "var(--gold)" }}>.</span>
          </h2>
        </Reveal>

        <div className="mt-16 relative">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${idx * 100}%)` }}>
              {list.map((q, i) => (
                <div key={i} className="w-full shrink-0 px-2">
                  <figure className="grid lg:grid-cols-12 gap-10 items-center">
                    <div className="lg:col-span-4">
                      <div className="relative aspect-square max-w-[360px] rounded-3xl overflow-hidden" style={{ border: "1px solid rgba(212,175,55,0.3)" }}>
                        <img src={TESTIMONIAL_PHOTOS[i % TESTIMONIAL_PHOTOS.length]} alt={q.name} className="w-full h-full object-cover"/>
                        <div className="absolute -inset-4 rounded-[28px] pointer-events-none" style={{ border: "1px solid rgba(212,175,55,0.18)" }} />
                      </div>
                    </div>
                    <blockquote className="lg:col-span-8">
                      <div className="text-[var(--gold)] text-[80px] leading-none mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>"</div>
                      <p className="text-[clamp(22px,2.6vw,38px)] leading-[1.3] text-balance" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "#f3eed8" }}>
                        {q.text}
                      </p>
                      <figcaption className="mt-8 flex items-center gap-4">
                        <div className="h-px w-10" style={{ background: "var(--gold)" }}/>
                        <div>
                          <div className="text-[15px]" style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}>{q.name}</div>
                          <div className="text-[12px] uppercase tracking-[0.25em] mt-1" style={{ color: "var(--gold)" }}>{q.result}</div>
                        </div>
                      </figcaption>
                    </blockquote>
                  </figure>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex items-center justify-between">
            <div className="flex gap-2">
              {list.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)} aria-label={`Slide ${i+1}`}
                  className="h-1 rounded-full transition-all"
                  style={{ width: i === idx ? 36 : 16, background: i === idx ? "var(--gold)" : "rgba(243,238,216,0.25)" }} />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setIdx((i) => (i - 1 + list.length) % list.length)} className="w-11 h-11 rounded-full grid place-items-center hover:bg-white/5 transition-colors" style={{ border: "1px solid rgba(243,238,216,0.18)" }} aria-label="Prev">
                <span style={{ transform: "rotate(180deg)", display: "inline-flex" }}><Icon.ArrowRight /></span>
              </button>
              <button onClick={() => setIdx((i) => (i + 1) % list.length)} className="w-11 h-11 rounded-full grid place-items-center hover:bg-white/5 transition-colors" style={{ border: "1px solid rgba(243,238,216,0.18)" }} aria-label="Next">
                <Icon.ArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// =============== PRICING ===============
function Pricing({ t }) {
  return (
    <section className="py-24 lg:py-36">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="text-center max-w-[760px] mx-auto mb-16">
          <Reveal><div className="inline-block"><Eyebrow>{t.pricing.eyebrow}</Eyebrow></div></Reveal>
          <Reveal delay={120}>
            <h2 className="mt-5 text-[clamp(40px,5.5vw,72px)] leading-[1.02] tracking-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, color: "var(--fg)" }}>
              {t.pricing.title}<span style={{ color: "var(--gold)" }}>.</span>
            </h2>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-5 text-[16px] leading-[1.7]" style={{ color: "var(--muted)", fontFamily: "Inter, sans-serif" }}>{t.pricing.sub}</p>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 max-w-[1100px] mx-auto">
          {t.pricing.tiers.map((tier, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="relative rounded-3xl p-8 lg:p-10 h-full transition-all hover:-translate-y-1"
                style={{
                  background: tier.popular ? "var(--ink)" : "var(--card)",
                  color: tier.popular ? "#f3eed8" : "var(--fg)",
                  border: `1px solid ${tier.popular ? "var(--gold)" : "var(--hairline)"}`,
                  boxShadow: tier.popular ? "0 30px 60px -30px rgba(10,15,30,0.4)" : "none",
                }}>
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 h-7 inline-flex items-center rounded-full text-[10px] uppercase tracking-[0.25em] font-medium" style={{ background: "var(--gold)", color: "#1a1408" }}>
                    {{uz:"Tavsiya etiladi", ru:"Рекомендуем", en:"Recommended"}[(window.__currentLang||"uz")]}
                  </span>
                )}
                <div className="text-[12px] uppercase tracking-[0.3em]" style={{ color: tier.popular ? "var(--gold)" : "var(--muted)", fontFamily: "Inter, sans-serif" }}>{tier.name}</div>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-[clamp(40px,4.5vw,60px)] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>{tier.price}</span>
                  <span className="text-[13px]" style={{ color: tier.popular ? "rgba(243,238,216,0.7)" : "var(--muted)", fontFamily: "Inter, sans-serif" }}>{tier.per}</span>
                </div>
                <div className="my-7 h-px" style={{ background: tier.popular ? "rgba(243,238,216,0.18)" : "var(--hairline)" }}/>
                <ul className="space-y-3">
                  {tier.feats.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-[14px]" style={{ fontFamily: "Inter, sans-serif" }}>
                      <span className="mt-0.5" style={{ color: "var(--gold)" }}><Icon.Check /></span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="mt-9 inline-flex items-center justify-center gap-2 h-12 w-full rounded-full text-[13px] font-medium tracking-wide transition-transform hover:scale-[1.02]"
                  style={{
                    background: tier.popular ? "var(--gold)" : "transparent",
                    color: tier.popular ? "#1a1408" : "var(--fg)",
                    border: tier.popular ? "none" : "1px solid var(--hairline)",
                    fontFamily: "Inter, sans-serif",
                  }}>
                  {t.pricing.pickCta} <Icon.ArrowRight />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// =============== CONTACT ===============
function Contact({ t, lang }) {
  const [form, setForm] = bS({ name: "", phone: "", course: "", message: "" });
  const [errors, setErrors] = bS({});
  const [status, setStatus] = bS("idle"); // idle | sending | done

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = t.contact.errName;
    if (!/^[+\d\s()-]{7,}$/.test(form.phone)) e.phone = t.contact.errPhone;
    if (!form.course) e.course = t.contact.errCourse;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    setTimeout(() => {
      setStatus("done");
      setForm({ name: "", phone: "", course: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }, 1100);
  };

  const inp = (name, ph, type = "text") => (
    <div>
      <input
        type={type}
        value={form[name]}
        onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
        placeholder={ph}
        className="w-full bg-transparent border-0 border-b py-4 text-[15px] outline-none transition-colors focus:border-[var(--gold)]"
        style={{ borderColor: errors[name] ? "#c84a4a" : "var(--hairline)", color: "var(--fg)", fontFamily: "Inter, sans-serif" }}
      />
      {errors[name] && <div className="mt-1 text-[11px]" style={{ color: "#c84a4a" }}>{errors[name]}</div>}
    </div>
  );

  return (
    <section id="contact" className="py-24 lg:py-36" style={{ background: "var(--band)" }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <Reveal><Eyebrow>{t.contact.eyebrow}</Eyebrow></Reveal>
          <Reveal delay={120}>
            <h2 className="mt-5 text-[clamp(40px,5vw,68px)] leading-[1.02] tracking-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, color: "var(--fg)" }}>
              {t.contact.title}<span style={{ color: "var(--gold)" }}>.</span>
            </h2>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-5 text-[16px] leading-[1.7]" style={{ color: "var(--muted)", fontFamily: "Inter, sans-serif" }}>{t.contact.sub}</p>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-10 space-y-5" style={{ fontFamily: "Inter, sans-serif" }}>
              <ContactRow icon={<Icon.Pin />} label={t.contact.address} />
              <ContactRow icon={<Icon.Phone />} label={t.contact.phoneNum} />
              <ContactRow icon={<Icon.Clock />} label={t.contact.hours} />
            </div>
          </Reveal>

          {/* Map placeholder */}
          <Reveal delay={400}>
            <div className="mt-8 rounded-2xl overflow-hidden relative aspect-[16/9]" style={{ border: "1px solid var(--hairline)", background: "linear-gradient(135deg, var(--mesh1), var(--mesh2))" }}>
              <div className="absolute inset-0" style={{
                backgroundImage: "linear-gradient(var(--hairline) 1px, transparent 1px), linear-gradient(90deg, var(--hairline) 1px, transparent 1px)",
                backgroundSize: "32px 32px", opacity: 0.6,
              }}/>
              <div className="absolute inset-0 grid place-items-center">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur" style={{ background: "var(--card)", border: "1px solid var(--gold)" }}>
                  <span style={{ color: "var(--gold)" }}><Icon.Pin /></span>
                  <span className="text-[12px]" style={{ color: "var(--fg)", fontFamily: "Inter, sans-serif" }}>ELEGANT · Tashkent</span>
                </div>
              </div>
              <div className="absolute left-3 top-3 text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--muted)", fontFamily: "Inter, sans-serif" }}>{/* REPLACE with embedded Google Map */}Map preview</div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={200}>
            <form onSubmit={submit} className="rounded-3xl p-8 lg:p-12" style={{ background: "var(--card)", border: "1px solid var(--hairline)" }}>
              <div className="grid sm:grid-cols-2 gap-6">
                {inp("name", t.contact.name)}
                {inp("phone", t.contact.phone, "tel")}
              </div>
              <div className="mt-6">
                <select
                  value={form.course}
                  onChange={(e) => setForm((f) => ({ ...f, course: e.target.value }))}
                  className="w-full bg-transparent border-0 border-b py-4 text-[15px] outline-none transition-colors focus:border-[var(--gold)]"
                  style={{ borderColor: errors.course ? "#c84a4a" : "var(--hairline)", color: form.course ? "var(--fg)" : "var(--muted)", fontFamily: "Inter, sans-serif" }}
                >
                  <option value="">{t.contact.coursePh}</option>
                  {t.courses.list.map((c) => <option key={c.tag} value={c.tag}>{c.name}</option>)}
                </select>
                {errors.course && <div className="mt-1 text-[11px]" style={{ color: "#c84a4a" }}>{errors.course}</div>}
              </div>
              <div className="mt-6">
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder={t.contact.message}
                  rows={3}
                  className="w-full bg-transparent border-0 border-b py-4 text-[15px] outline-none transition-colors focus:border-[var(--gold)] resize-none"
                  style={{ borderColor: "var(--hairline)", color: "var(--fg)", fontFamily: "Inter, sans-serif" }}
                />
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <div className="text-[12px] flex items-center gap-3" style={{ color: "var(--muted)", fontFamily: "Inter, sans-serif" }}>
                  {[Icon.Instagram, Icon.Telegram, Icon.YouTube, Icon.Facebook].map((I, k) => (
                    <a key={k} href="#" className="w-9 h-9 grid place-items-center rounded-full hover:text-[var(--gold)] hover:border-[var(--gold)] transition-colors border" style={{ borderColor: "var(--hairline)" }}>
                      <I />
                    </a>
                  ))}
                </div>
                <button type="submit" disabled={status !== "idle"} className="inline-flex items-center gap-2 h-12 px-7 rounded-full text-[13px] font-medium tracking-wide transition-transform hover:scale-[1.02] disabled:opacity-70" style={{ background: status === "done" ? "#1f8a5b" : "var(--gold)", color: "#1a1408", fontFamily: "Inter, sans-serif" }}>
                  {status === "sending" ? t.contact.submitting : status === "done" ? <span className="flex items-center gap-2"><Icon.Check /> {t.contact.success}</span> : <span className="flex items-center gap-2">{t.contact.submit} <Icon.Send /></span>}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon, label }) {
  return (
    <div className="flex items-start gap-4 text-[14px]" style={{ color: "var(--fg)" }}>
      <span className="mt-0.5 w-8 h-8 grid place-items-center rounded-full shrink-0" style={{ border: "1px solid var(--gold)", color: "var(--gold)" }}>{icon}</span>
      <span style={{ lineHeight: 1.5, color: "var(--muted)" }}>{label}</span>
    </div>
  );
}

// =============== FOOTER ===============
function Footer({ t, lang }) {
  return (
    <footer style={{ background: "var(--ink)", color: "#cfc8b0" }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-20 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <LogoMark size={40} />
          <p className="mt-6 text-[14px] leading-[1.7] max-w-[360px]" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "#f3eed8" }}>
            {t.footer.tagline}
          </p>
          <div className="mt-6 flex items-center gap-3">
            {[Icon.Instagram, Icon.Telegram, Icon.YouTube, Icon.Facebook].map((I, k) => (
              <a key={k} href="#" className="w-9 h-9 grid place-items-center rounded-full hover:text-[var(--gold)] hover:border-[var(--gold)] transition-colors border" style={{ borderColor: "rgba(243,238,216,0.2)" }}>
                <I />
              </a>
            ))}
          </div>
        </div>

        <FooterCol title={t.footer.quick} items={[t.nav.home, t.nav.courses, t.nav.teachers, t.nav.about, t.nav.contact]} />
        <FooterCol title={t.footer.coursesT} items={t.courses.list.slice(0, 5).map(c => c.name)} />
        <FooterCol title={t.footer.contactT} items={[t.contact.phoneNum, "hello@elegant.uz", t.contact.address]} />
      </div>
      <div className="border-t" style={{ borderColor: "rgba(243,238,216,0.1)" }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-6 flex flex-wrap items-center justify-between gap-4 text-[12px]" style={{ fontFamily: "Inter, sans-serif", color: "rgba(243,238,216,0.6)" }}>
          <span>© 2025 ELEGANT Learning Centre · {t.footer.rights}</span>
          <span style={{ letterSpacing: "0.2em", textTransform: "uppercase" }}>Tashkent · Uzbekistan</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }) {
  return (
    <div className="lg:col-span-2">
      <div className="text-[11px] uppercase tracking-[0.3em] mb-5" style={{ color: "var(--gold)", fontFamily: "Inter, sans-serif" }}>{title}</div>
      <ul className="space-y-3 text-[13px]" style={{ fontFamily: "Inter, sans-serif" }}>
        {items.map((it, i) => (
          <li key={i}><a href="#" className="hover:text-[var(--gold)] transition-colors">{it}</a></li>
        ))}
      </ul>
    </div>
  );
}

window.Testimonials = Testimonials;
window.Pricing = Pricing;
window.Contact = Contact;
window.Footer = Footer;
