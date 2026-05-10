import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Zap, TrendingUp, ShieldCheck, FileText, Sun } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/kako-funkcionira")({
  head: () => ({
    meta: [
      { title: "Kako funkcionira — Prosumer.ba" },
      { name: "description", content: "Tri jednostavna koraka do tvoje solarne elektrane." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="mx-auto max-w-7xl px-5 pt-20 pb-12 lg:px-8 lg:pt-28">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-eco">Proces</span>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-navy sm:text-6xl">Od ideje do solarne elektrane.</h1>
            <p className="mt-5 text-lg text-muted-foreground">Brzo, transparentno, bez stresa. Pratimo te kroz svaki korak.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8 lg:pb-32">
        {[
          { n: "01", t: "Unesi detalje nekretnine", d: "Lokacija, mjesečna potrošnja, tip krova i orijentacija. Naš algoritam koristi PVGIS podatke za tvoju regiju.", i: MapPin },
          { n: "02", t: "Usporedi ponude", d: "Do 5 detaljnih ponuda od provjerenih instalatera unutar 24 sata. Side-by-side usporedba — paneli, inverteri, garancije.", i: Zap },
          { n: "03", t: "Odaberi i instaliraj", d: "Direktna komunikacija s instalaterom. Mi ostajemo uz tebe za podršku i recenziju.", i: ShieldCheck },
          { n: "04", t: "Štedi godinama", d: "Tvoj sustav radi 25+ godina. Mjesečna ušteda postaje čista zarada nakon povrata investicije.", i: TrendingUp },
        ].map((s, i) => (
          <motion.div key={s.n} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
            className={`grid gap-8 py-12 border-b border-border last:border-0 lg:grid-cols-12 lg:gap-12 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <div className="lg:col-span-7">
              <span className="font-display text-7xl font-bold text-solar/40 lg:text-8xl">{s.n}</span>
              <h2 className="mt-4 font-display text-2xl font-bold text-navy sm:text-3xl">{s.t}</h2>
              <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">{s.d}</p>
            </div>
            <div className="lg:col-span-5">
              <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-navy to-eco p-8 text-primary-foreground shadow-elevated grid place-items-center">
                <s.i className="h-20 w-20 text-solar" strokeWidth={1.5} />
              </div>
            </div>
          </motion.div>
        ))}

        <div className="mt-16 flex justify-center">
          <Link to="/kalkulator" className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-4 text-sm font-semibold text-primary-foreground shadow-elevated transition-transform hover:scale-[1.03]">
            Pokreni kalkulator <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  ),
});
