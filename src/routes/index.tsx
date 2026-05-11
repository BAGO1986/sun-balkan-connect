import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ShieldCheck, Sparkles, Sun, TrendingUp, Battery, Leaf, Star, Zap, CheckCircle2, MapPin, Clock, Award } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Counter } from "@/components/site/Counter";
import { useState } from "react";
import heroHouse from "@/assets/hero-house.jpg";
import cardHeating from "@/assets/card-heating.jpg";
import cardElectricity from "@/assets/card-electricity.jpg";
import cardBattery from "@/assets/card-battery.jpg";
import cardEv from "@/assets/card-ev.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prosumer.ba — Uštedi do 70% na struji uz solarne elektrane" },
      { name: "description", content: "Usporedi ponude provjerenih instalatera solarnih elektrana u BiH i Hrvatskoj. Izračunaj uštedu, ROI i financiranje u 60 sekundi." },
      { property: "og:title", content: "Prosumer.ba — Solarna platforma za Balkan" },
      { property: "og:description", content: "Provjereni instalateri, transparentne ponude, AI procjena uštede." },
    ],
  }),
  component: Index,
});

 const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as any } } };

function Index() {
  return (
    <SiteLayout>
      <Hero />
      <TrustBar />
      <SavingsPreview />
      <HowItWorks />
      <Comparison />
      <ContentTeaser />
      <CTA />
    </SiteLayout>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="mx-auto w-full px-4 pt-10 pb-16 sm:px-6 lg:px-10 lg:pt-16 lg:pb-24">
        <motion.div initial="hidden" animate="show" variants={fadeUp} className="text-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-eco/30 bg-eco-soft px-3 py-1 text-xs font-semibold text-eco">
            <Sparkles className="h-3.5 w-3.5" /> Solarna platforma za Balkan
          </span>
          <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight text-navy sm:text-5xl lg:text-6xl">
            Napajaj svoj dom <span className="gradient-text">na svoj način</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Solarne elektrane, baterije, punjači i toplinske pumpe — usporedi ponude provjerenih instalatera u BiH i Hrvatskoj.
          </p>
        </motion.div>

        <div className="mt-12 -mx-2 sm:-mx-4 lg:-mx-6">
          <HeroCards />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-eco" /> Provjereni instalateri</span>
          <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-eco" /> Ponude u 24h</span>
          <span className="inline-flex items-center gap-1.5"><Award className="h-4 w-4 text-eco" /> 100% besplatno</span>
        </div>
      </div>
    </section>
  );
}

const heroCards = [
  { img: cardHeating, title: "Grijanje i\nhlađenje", desc: "Toplinske pumpe i klima sustavi prilagođeni za naše tržište.", to: "/kalkulator" },
  { img: cardElectricity, title: "Tarife za\nstruju", desc: "Usporedi opskrbljivače i prebaci se na povoljniju tarifu.", to: "/financiranje" },
  { img: heroHouse, title: "Snizi račun\nna desetljeća.", desc: "Usporedi solarne ponude i vidi dugoročnu uštedu za svoj dom.", to: "/kalkulator", cta: "Zatraži ponudu" },
  { img: cardBattery, title: "Zatraži ponudu", desc: "Najbolje rješenje za Vas.", to: "/kalkulator" },
  { img: cardEv, title: "Punjenje\nelektričnih auta", desc: "Kućni i poslovni punjači integrirani sa solarnom elektranom.", to: "/kalkulator" },
];

function HeroCards() {
  const [active, setActive] = useState(2);
  const next = () => setActive((a) => (a + 1) % heroCards.length);
  const prev = () => setActive((a) => (a - 1 + heroCards.length) % heroCards.length);

  return (
    <div>
      {/* Mobile: one full card at a time (swipeable) */}
      <div className="md:hidden overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {heroCards.map((c, i) => (
            <Link
              key={i}
              to={c.to}
              aria-label={c.title.replace("\n", " ")}
              className="relative block h-[420px] w-full flex-shrink-0 overflow-hidden rounded-2xl shadow-elevated"
            >
              <img src={c.img} alt="" loading={i === 2 ? "eager" : "lazy"} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/35 to-transparent" />
              <div className="relative flex h-full flex-col justify-end p-5 text-primary-foreground">
                <h3 className="font-display text-3xl font-semibold leading-[1.05] tracking-tight whitespace-pre-line">
                  {c.title}
                </h3>
                <p className="mt-3 max-w-md text-sm text-primary-foreground/90">{c.desc}</p>
                <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-solar px-5 py-3 text-sm font-semibold text-navy">
                  {c.cta ?? "Saznaj više"} <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop: expanding flex carousel */}
      <div className="hidden md:flex gap-3 lg:gap-4 h-[460px] lg:h-[560px]">
        {heroCards.map((c, i) => {
          const isActive = i === active;
          return (
            <Link
              key={i}
              to={c.to}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              aria-label={c.title.replace("\n", " ")}
              className="group relative block overflow-hidden rounded-3xl shadow-elevated transition-[flex-grow] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-solar"
              style={{ flexGrow: isActive ? 5 : 1, flexBasis: 0, minWidth: 0 }}
            >
              <img
                src={c.img}
                alt=""
                loading={i === 2 ? "eager" : "lazy"}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className={`absolute inset-0 transition-opacity duration-700 ${isActive ? "bg-gradient-to-t from-navy/85 via-navy/35 to-transparent" : "bg-gradient-to-t from-navy/80 via-navy/40 to-navy/10"}`} />
              <div className="relative flex h-full flex-col justify-end p-5 lg:p-8 text-primary-foreground">
                <h3 className={`font-display font-semibold leading-[1.05] tracking-tight whitespace-pre-line transition-all duration-500 ${isActive ? "text-3xl lg:text-5xl" : "text-lg lg:text-xl"}`}>
                  {isActive ? c.title : c.title.replace("\n", " ")}
                </h3>
                <div
                  className={`grid transition-[grid-template-rows,opacity,margin] duration-500 ${
                    isActive ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-md text-sm text-primary-foreground/90 lg:text-base">{c.desc}</p>
                    <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-solar px-5 py-3 text-sm font-semibold text-navy transition-transform group-hover:scale-[1.03]">
                      {c.cta ?? "Saznaj više"} <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Carousel controls */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button onClick={prev} aria-label="Prethodno" className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background text-navy transition-colors hover:bg-secondary">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2">
          {heroCards.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Kartica ${i + 1}`}
              className={`h-2 rounded-full transition-all ${i === active ? "w-6 bg-navy" : "w-2 bg-navy/25 hover:bg-navy/50"}`}
            />
          ))}
        </div>
        <button onClick={next} aria-label="Sljedeće" className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background text-navy transition-colors hover:bg-secondary">
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function TrustBar() {
  const stats = [
    { v: 240, s: "+", l: "Provjerenih instalatera" },
    { v: 12500, s: "+", l: "Izračunatih ponuda" },
    { v: 4.9, s: "/5", l: "Prosječna ocjena", d: 1 },
    { v: 18, s: " MW", l: "Instalirane snage" },
  ];
  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-12 sm:grid-cols-4 lg:px-8">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="text-center sm:text-left">
            <div className="font-display text-3xl font-bold text-navy sm:text-4xl"><Counter to={s.v} suffix={s.s} decimals={s.d ?? 0} /></div>
            <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function SavingsPreview() {
  const months = [120, 145, 180, 210, 240, 265, 280, 270, 230, 190, 150, 130];
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-eco">Kalkulator uštede</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">Saznaj koliko možeš uštediti — u 60 sekundi.</h2>
          <p className="mt-5 text-base text-muted-foreground sm:text-lg">
            Naš algoritam uzima u obzir lokaciju, orijentaciju krova, potrošnju i lokalne tarife. Dobiješ realnu procjenu sustava, ROI period i CO₂ uštedu.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {["Realna procjena za BiH i HR tržište", "Preporuka veličine baterije", "Procjena financiranja i mjesečne rate", "Direktna veza s 3+ instalatera"].map((t) => (
              <li key={t} className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-eco" /><span className="text-foreground">{t}</span></li>
            ))}
          </ul>
          <Link to="/kalkulator" className="mt-10 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-elevated transition-all hover:scale-[1.03]">
            Pokreni kalkulator <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
          <div className="rounded-3xl bg-card p-6 shadow-elevated sm:p-8 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Procijenjena godišnja proizvodnja</div>
                <div className="mt-1 font-display text-3xl font-bold text-navy">8.420 <span className="text-base font-medium text-muted-foreground">kWh</span></div>
              </div>
              <span className="rounded-full bg-eco-soft px-3 py-1 text-xs font-semibold text-eco">+12% YoY</span>
            </div>
            <div className="mt-6 grid grid-cols-12 items-end gap-2 h-44">
              {months.map((h, i) => (
                <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${(h / 280) * 100}%` }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }} className="rounded-md bg-gradient-to-t from-navy to-eco" />
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
              {["S","V","O","T","S","L","S","K","R","L","S","P"].map((m, i) => <span key={i}>{m}</span>)}
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { l: "Ušteda/god", v: "€2.180", c: "text-eco" },
                { l: "Povrat", v: "6.4 god", c: "text-navy" },
                { l: "CO₂", v: "4.2 t", c: "text-eco" },
              ].map((m) => (
                <div key={m.l} className="rounded-2xl bg-secondary/60 p-4 text-center">
                  <div className={`font-display text-lg font-bold ${m.c}`}>{m.v}</div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{m.l}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Unesi detalje nekretnine", d: "Lokacija, potrošnja, tip krova — manje od minute.", i: MapPin },
    { n: "02", t: "Usporedi ponude instalatera", d: "Do 5 ponuda od provjerenih instalatera u 24h.", i: Zap },
    { n: "03", t: "Štedi novac sa solarom", d: "Odaberi najbolju ponudu i kreni štedjeti odmah.", i: TrendingUp },
  ];
  return (
    <section className="bg-navy text-primary-foreground">
      <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-solar">Kako funkcionira</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Od ideje do solarne elektrane — u 3 koraka.</h2>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div key={s.n} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }} className="group relative overflow-hidden rounded-3xl glass-dark p-8">
              <div className="flex items-start justify-between">
                <span className="font-display text-5xl font-bold text-solar/30">{s.n}</span>
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-solar text-navy transition-transform group-hover:rotate-6"><s.i className="h-5 w-5" strokeWidth={2.5} /></span>
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold">{s.t}</h3>
              <p className="mt-3 text-sm text-primary-foreground/70">{s.d}</p>
              <div className="mt-8 h-px w-full bg-gradient-to-r from-solar/40 to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InstallerStrip() {
  const installers = [
    { n: "SunTech BH", c: "Mostar", r: 4.9, p: 87, b: "Premium Partner" },
    { n: "Adriatic Solar", c: "Split", r: 4.8, p: 142, b: "Verified" },
    { n: "Eko Energija", c: "Sarajevo", r: 4.9, p: 64, b: "Premium Partner" },
    { n: "Solaris HR", c: "Zagreb", r: 4.7, p: 210, b: "Verified" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-eco">Marketplace</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">Provjereni instalateri u tvojoj regiji</h2>
        </div>
        <Link to="/instalateri" className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-eco">
          Svi instalateri <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {installers.map((it, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="group rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-elevated">
            <div className="flex items-center justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-navy to-navy-soft text-solar font-display font-bold">{it.n[0]}</div>
              <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${it.b.includes("Premium") ? "bg-solar-soft text-navy" : "bg-eco-soft text-eco"}`}>{it.b}</span>
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold text-navy">{it.n}</h3>
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" /> {it.c}</div>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-sm">
              <span className="inline-flex items-center gap-1 font-semibold text-navy"><Star className="h-4 w-4 fill-solar text-solar" /> {it.r}</span>
              <span className="text-muted-foreground">{it.p} projekata</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Comparison() {
  const offers = [
    { n: "SunTech BH", panel: "JA Solar 450W", inv: "Huawei", w: "25 god", price: 7890, prod: 8420, fin: "€96/mj", reco: true },
    { n: "Adriatic Solar", panel: "Trina Vertex 440W", inv: "SolarEdge", w: "20 god", price: 8240, prod: 8200, fin: "€102/mj" },
    { n: "Eko Energija", panel: "LONGi Hi-MO 6", inv: "Fronius", w: "25 god", price: 8650, prod: 8600, fin: "€108/mj" },
  ];
  return (
    <section className="bg-secondary/40">
      <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-eco">Usporedba ponuda</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">Transparentno. Bez skrivenih troškova.</h2>
          <p className="mt-5 text-muted-foreground">Side-by-side usporedba s realnim brendovima panela i invertera.</p>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {offers.map((o, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-3xl border bg-card p-7 ${o.reco ? "border-solar shadow-glow" : "border-border"}`}>
              {o.reco && <span className="absolute -top-3 left-7 rounded-full bg-solar px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-navy">Najbolja vrijednost</span>}
              <h3 className="font-display text-lg font-semibold text-navy">{o.n}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold text-navy">€{o.price.toLocaleString("hr-HR")}</span>
              </div>
              <div className="mt-1 text-sm text-muted-foreground">ili {o.fin} kroz financiranje</div>
              <ul className="mt-6 space-y-3 text-sm">
                <Row k="Paneli" v={o.panel} />
                <Row k="Inverter" v={o.inv} />
                <Row k="Garancija" v={o.w} />
                <Row k="Procjena proizvodnje" v={`${o.prod.toLocaleString("hr-HR")} kWh`} />
                <Row k="Povrat investicije" v="6.4 godine" />
              </ul>
              <Link to="/kalkulator" className={`mt-7 block rounded-full px-5 py-3 text-center text-sm font-semibold transition-all ${o.reco ? "bg-navy text-primary-foreground hover:scale-[1.02]" : "border border-border text-navy hover:bg-secondary"}`}>
                Zatraži ovu ponudu
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <li className="flex items-center justify-between gap-3 border-b border-border/60 pb-2 last:border-0">
      <span className="text-muted-foreground">{k}</span>
      <span className="text-right font-medium text-foreground">{v}</span>
    </li>
  );
}

function ContentTeaser() {
  const posts = [
    { t: "Subvencije za solarne elektrane u BiH 2026", d: "Pregled poticaja FBiH i RS za građane i poslovne korisnike.", c: "Vodič" },
    { t: "Koliko stvarno štedi 6 kWp sustav u Mostaru?", d: "Analiza realne potrošnje i proizvodnje kroz cijelu godinu.", c: "Studija slučaja" },
    { t: "Baterijski sustavi: kada se isplate?", d: "ROI analiza skladištenja energije za prosječno kućanstvo.", c: "Tehnologija" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
      <div className="flex items-end justify-between gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-eco">Resursi</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">Vodiči i analize za informirane odluke</h2>
        </div>
        <Link to="/blog" className="hidden items-center gap-2 text-sm font-semibold text-navy sm:inline-flex hover:text-eco">Sve objave <ArrowRight className="h-4 w-4" /></Link>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {posts.map((p, i) => (
          <motion.article key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group cursor-pointer rounded-3xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-elevated">
            <div className="aspect-[16/10] rounded-2xl bg-gradient-to-br from-navy via-navy-soft to-eco" style={{
              backgroundImage: i === 0 ? "var(--gradient-navy)" : i === 1 ? "var(--gradient-solar)" : "var(--gradient-eco)"
            }} />
            <span className="mt-5 inline-block text-[11px] font-semibold uppercase tracking-wider text-eco">{p.c}</span>
            <h3 className="mt-2 font-display text-lg font-semibold text-navy group-hover:text-eco">{p.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-navy p-10 text-primary-foreground sm:p-16 lg:p-20">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-solar/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-eco/20 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <Leaf className="h-9 w-9 text-eco" />
            <h2 className="mt-5 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">Spreman za solarnu elektranu?<br />Krenimo zajedno.</h2>
            <p className="mt-4 max-w-lg text-primary-foreground/70">Besplatna procjena. Bez obaveza. Ponude u 24 sata.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Link to="/kalkulator" className="inline-flex items-center justify-center gap-2 rounded-full bg-solar px-7 py-4 text-sm font-bold text-navy transition-transform hover:scale-[1.03]">
              Izračunaj uštedu <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/instalateri" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-primary-foreground hover:bg-white/10">
              Pregledaj instalatere
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
