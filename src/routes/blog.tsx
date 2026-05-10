import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog & vodiči — Prosumer.ba" },
      { name: "description", content: "Vodiči, analize i novosti o solarnoj energiji, subvencijama i ROI-u za BiH i HR." },
    ],
  }),
  component: BlogPage,
});

const posts = [
  { t: "Subvencije za solarne elektrane u BiH 2026", c: "Vodič", d: "Pregled poticaja FBiH i RS za građane i poslovne korisnike.", g: "var(--gradient-navy)" },
  { t: "Koliko stvarno štedi 6 kWp sustav u Mostaru?", c: "Studija", d: "Analiza realne potrošnje i proizvodnje kroz cijelu godinu.", g: "var(--gradient-solar)" },
  { t: "Baterijski sustavi: kada se isplate?", c: "Tehnologija", d: "ROI analiza skladištenja energije za prosječno kućanstvo.", g: "var(--gradient-eco)" },
  { t: "Solarna elektrana u Splitu: kompletan vodič", c: "Lokacija", d: "Sve što trebaš znati za instalaciju u Dalmaciji.", g: "var(--gradient-solar)" },
  { t: "Toplotne pumpe + solar: idealna kombinacija", c: "Vodič", d: "Kako spojiti toplotnu pumpu sa solarnom elektranom.", g: "var(--gradient-eco)" },
  { t: "EV punjači kod kuće — što trebaš znati", c: "EV", d: "Kompletan vodič za instalaciju kućnog punjača.", g: "var(--gradient-navy)" },
];

function BlogPage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="mx-auto max-w-7xl px-5 pt-20 pb-12 lg:px-8 lg:pt-28">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-eco">Resursi</span>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-navy sm:text-6xl">Vodiči i analize</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">Sve što trebaš znati o solarnoj energiji, subvencijama, baterijama i ROI-u u regiji.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <motion.article key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group cursor-pointer rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-elevated">
              <div className="aspect-[16/10] rounded-2xl" style={{ background: p.g }} />
              <span className="mt-5 inline-block text-[11px] font-semibold uppercase tracking-wider text-eco">{p.c}</span>
              <h3 className="mt-2 font-display text-lg font-semibold text-navy group-hover:text-eco">{p.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
              <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-navy">Pročitaj <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></div>
            </motion.article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
