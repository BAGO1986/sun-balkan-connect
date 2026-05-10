import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, MapPin, ShieldCheck, Search, ArrowRight, Filter } from "lucide-react";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/instalateri")({
  head: () => ({
    meta: [
      { title: "Provjereni solarni instalateri — Prosumer.ba" },
      { name: "description", content: "Pregledaj provjerene instalatere solarnih elektrana u BiH i Hrvatskoj. Ocjene, certifikati, recenzije." },
    ],
  }),
  component: InstalateriPage,
});

const installers = [
  { n: "SunTech BH", c: "Mostar", country: "BiH", r: 4.9, p: 87, b: "Premium", desc: "Specijalisti za rezidencijalne sustave do 15 kWp.", tags: ["JA Solar", "Huawei", "Baterije"] },
  { n: "Adriatic Solar", c: "Split", country: "HR", r: 4.8, p: 142, b: "Verified", desc: "Veliki rezidencijalni i komercijalni sustavi.", tags: ["Trina", "SolarEdge"] },
  { n: "Eko Energija", c: "Sarajevo", country: "BiH", r: 4.9, p: 64, b: "Premium", desc: "Premium komponente, doživotna podrška.", tags: ["LONGi", "Fronius"] },
  { n: "Solaris HR", c: "Zagreb", country: "HR", r: 4.7, p: 210, b: "Verified", desc: "Najveći broj instalacija u sjevernoj HR.", tags: ["JinkoSolar", "Growatt"] },
  { n: "Hercegovina Solar", c: "Ljubuški", country: "BiH", r: 4.8, p: 53, b: "Premium", desc: "Lokalni stručnjaci za hercegovački klimat.", tags: ["JA Solar", "Sungrow"] },
  { n: "Dalmacija Energy", c: "Dubrovnik", country: "HR", r: 4.9, p: 96, b: "Premium", desc: "Premium instalacije na obali.", tags: ["REC", "Enphase"] },
];

function InstalateriPage() {
  const [filter, setFilter] = useState<"sve" | "BiH" | "HR">("sve");
  const [q, setQ] = useState("");
  const list = installers.filter((i) => (filter === "sve" || i.country === filter) && i.n.toLowerCase().includes(q.toLowerCase()));

  return (
    <SiteLayout>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="mx-auto max-w-7xl px-5 pt-16 pb-10 lg:px-8 lg:pt-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-eco/30 bg-eco-soft px-3 py-1 text-xs font-semibold text-eco"><ShieldCheck className="h-3.5 w-3.5" /> Marketplace</span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-navy sm:text-5xl">Pronađi pravog instalatera</h1>
            <p className="mt-4 text-lg text-muted-foreground">Provjereni, ocijenjeni i certificirani instalateri u BiH i Hrvatskoj.</p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Pretraži instalatere..." className="w-full rounded-full border border-border bg-card pl-11 pr-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-solar" />
            </div>
            <div className="flex gap-2 rounded-full border border-border bg-card p-1">
              {(["sve", "BiH", "HR"] as const).map((k) => (
                <button key={k} onClick={() => setFilter(k)} className={`rounded-full px-5 py-2 text-sm font-semibold capitalize transition-all ${filter === k ? "bg-navy text-primary-foreground" : "text-navy hover:bg-secondary"}`}>{k}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((it, i) => (
            <motion.article key={it.n} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group rounded-3xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-elevated">
              <div className="flex items-start justify-between">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-navy to-navy-soft text-solar font-display text-xl font-bold">{it.n[0]}</div>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${it.b === "Premium" ? "bg-solar-soft text-navy" : "bg-eco-soft text-eco"}`}>{it.b}</span>
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-navy">{it.n}</h3>
              <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" /> {it.c}, {it.country}</div>
              <p className="mt-4 text-sm text-muted-foreground">{it.desc}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {it.tags.map((t) => <span key={t} className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-navy">{t}</span>)}
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                <span className="inline-flex items-center gap-1 font-semibold text-navy"><Star className="h-4 w-4 fill-solar text-solar" /> {it.r}</span>
                <span className="text-xs text-muted-foreground">{it.p} projekata</span>
              </div>
              <Link to="/kalkulator" className="mt-5 flex items-center justify-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]">
                Zatraži ponudu <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.article>
          ))}
        </div>
        {list.length === 0 && <div className="text-center text-muted-foreground py-16">Nema rezultata.</div>}
      </section>
    </SiteLayout>
  );
}
