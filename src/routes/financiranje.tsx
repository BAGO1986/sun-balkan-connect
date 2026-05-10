import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Banknote, PiggyBank, TrendingUp } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/financiranje")({
  head: () => ({
    meta: [
      { title: "Financiranje solarne elektrane — Prosumer.ba" },
      { name: "description", content: "Kreditne i leasing opcije za solarne elektrane u BiH i Hrvatskoj. Procijeni mjesečnu ratu." },
    ],
  }),
  component: FinPage,
});

function FinPage() {
  const [amount, setAmount] = useState(8000);
  const [years, setYears] = useState(7);
  const rate = 0.069;
  const m = (amount * (rate / 12)) / (1 - Math.pow(1 + rate / 12, -years * 12));
  return (
    <SiteLayout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="mx-auto max-w-7xl px-5 pt-20 pb-12 lg:px-8 lg:pt-28">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-eco">Financiranje</span>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-navy sm:text-5xl">Plaćaj manje od mjesečnog računa za struju.</h1>
            <p className="mt-5 text-lg text-muted-foreground">Surađujemo s vodećim bankama u BiH i HR. Krediti od 5.9% i leasing opcije.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8 lg:pb-32">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-elevated">
            <h2 className="font-display text-2xl font-bold text-navy">Kalkulator rate</h2>
            <div className="mt-6">
              <div className="flex justify-between text-sm"><span className="font-semibold text-navy">Iznos kredita</span><span className="font-display text-lg font-bold text-navy">€{amount.toLocaleString("hr-HR")}</span></div>
              <input type="range" min={2000} max={30000} step={500} value={amount} onChange={(e) => setAmount(+e.target.value)} className="mt-3 w-full" />
            </div>
            <div className="mt-6">
              <div className="flex justify-between text-sm"><span className="font-semibold text-navy">Period</span><span className="font-display text-lg font-bold text-navy">{years} godina</span></div>
              <input type="range" min={2} max={15} value={years} onChange={(e) => setYears(+e.target.value)} className="mt-3 w-full" />
            </div>
            <div className="mt-8 rounded-2xl bg-navy p-6 text-primary-foreground">
              <div className="text-xs uppercase tracking-wider text-primary-foreground/60">Mjesečna rata</div>
              <motion.div key={m} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-1 font-display text-5xl font-bold">€{m.toFixed(0)}</motion.div>
              <div className="mt-1 text-xs text-primary-foreground/60">Kamatna stopa 6.9% EKS · informativni izračun</div>
            </div>
          </div>

          <div className="space-y-5">
            {[
              { i: Banknote, t: "Eko-krediti banaka", d: "UniCredit, Raiffeisen, ZABA — namjenski krediti za obnovljive izvore." },
              { i: PiggyBank, t: "Subvencije BiH i HR", d: "FZOEU u HR, FBiH/RS poticaji u BiH — pokrivamo proces apliciranja." },
              { i: TrendingUp, t: "Solar-as-a-Service", d: "Bez investicije — instalater postavlja, ti plaćaš mjesečno manje od trenutnog računa." },
            ].map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-3xl border border-border bg-card p-6">
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl bg-eco-soft text-eco"><c.i className="h-5 w-5" /></div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-navy">{c.t}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{c.d}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            <Link to="/kalkulator" className="flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-4 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]">
              Izračunaj svoju investiciju <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
