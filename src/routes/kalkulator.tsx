import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sun, Battery, Leaf, TrendingUp, Calculator } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { calculate } from "@/lib/solar";

export const Route = createFileRoute("/kalkulator")({
  head: () => ({
    meta: [
      { title: "Solarni kalkulator — Prosumer.ba" },
      { name: "description", content: "Izračunaj uštedu, ROI i veličinu solarne elektrane za tvoju lokaciju u BiH ili Hrvatskoj." },
    ],
  }),
  component: KalkulatorPage,
});

const cities = ["Mostar", "Ljubuški", "Sarajevo", "Banja Luka", "Zagreb", "Split", "Dubrovnik", "Rijeka"];

function KalkulatorPage() {
  const [bill, setBill] = useState(120);
  const [area, setArea] = useState(40);
  const [orientation, setOrientation] = useState<"jug" | "istok-zapad" | "sjever">("jug");
  const [city, setCity] = useState("Mostar");

  const r = useMemo(() => calculate({ monthlyBill: bill, roofArea: area, orientation, city }), [bill, area, orientation, city]);

  return (
    <SiteLayout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="mx-auto max-w-7xl px-5 pt-16 pb-12 lg:px-8 lg:pt-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-eco/30 bg-eco-soft px-3 py-1 text-xs font-semibold text-eco"><Calculator className="h-3.5 w-3.5" /> Solarni kalkulator</span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-navy sm:text-5xl">Procjena uštede u realnom vremenu</h1>
            <p className="mt-4 text-lg text-muted-foreground">Klizač pomakni — vidi rezultate odmah. Bez registracije.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8 lg:pb-32">
        <div className="grid gap-8 lg:grid-cols-5">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="lg:col-span-2 rounded-3xl border border-border bg-card p-7 shadow-elevated lg:sticky lg:top-24 self-start">
            <h2 className="font-display text-xl font-semibold text-navy">Tvoji podaci</h2>

            <Field label="Mjesečni račun za struju" value={`€${bill}`}>
              <input type="range" min={30} max={500} step={5} value={bill} onChange={(e) => setBill(+e.target.value)} className="range" />
            </Field>

            <Field label="Dostupna površina krova" value={`${area} m²`}>
              <input type="range" min={10} max={200} step={5} value={area} onChange={(e) => setArea(+e.target.value)} className="range" />
            </Field>

            <div className="mt-6">
              <label className="text-sm font-semibold text-navy">Orijentacija krova</label>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {([["jug","Jug"],["istok-zapad","I/Z"],["sjever","Sjever"]] as const).map(([k, l]) => (
                  <button key={k} onClick={() => setOrientation(k)} className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${orientation === k ? "border-navy bg-navy text-primary-foreground" : "border-border bg-background text-navy hover:bg-secondary"}`}>{l}</button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <label className="text-sm font-semibold text-navy">Grad</label>
              <select value={city} onChange={(e) => setCity(e.target.value)} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-navy outline-none focus:ring-2 focus:ring-solar">
                {cities.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>

            <Link to="/instalateri" className="mt-8 flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]">
              Zatraži ponude od instalatera <ArrowRight className="h-4 w-4" />
            </Link>
            <style>{`.range{appearance:none;width:100%;height:6px;background:linear-gradient(to right,var(--navy),var(--eco));border-radius:9999px;outline:none;margin-top:14px}.range::-webkit-slider-thumb{appearance:none;width:22px;height:22px;border-radius:9999px;background:white;border:3px solid var(--navy);box-shadow:0 4px 12px rgba(0,0,0,.15);cursor:pointer}.range::-moz-range-thumb{width:22px;height:22px;border-radius:9999px;background:white;border:3px solid var(--navy);cursor:pointer}`}</style>
          </motion.div>

          <div className="lg:col-span-3 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Stat icon={Sun} label="Veličina sustava" value={`${r.systemKw} kWp`} tone="navy" />
              <Stat icon={TrendingUp} label="Godišnja proizvodnja" value={`${r.yearlyKwh.toLocaleString("hr-HR")} kWh`} tone="eco" />
              <Stat icon={Calculator} label="Mjesečna ušteda" value={`€${r.monthlySavings}`} tone="solar" />
              <Stat icon={Leaf} label="CO₂ ušteda/god" value={`${r.co2Tons} t`} tone="eco" />
            </div>

            <div className="rounded-3xl border border-border bg-card p-7 shadow-elevated">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Procijenjena investicija</div>
                  <div className="mt-1 font-display text-4xl font-bold text-navy">€{r.estCost.toLocaleString("hr-HR")}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Povrat</div>
                  <div className="mt-1 font-display text-4xl font-bold text-eco">{r.paybackYears} god</div>
                </div>
              </div>
              <div className="mt-6">
                <div className="flex justify-between text-xs text-muted-foreground"><span>Godina 1</span><span>Godina 25</span></div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-secondary">
                  <motion.div key={r.paybackYears} initial={{ width: 0 }} animate={{ width: `${Math.min((r.paybackYears / 25) * 100, 100)}%` }} transition={{ duration: 0.8 }} className="h-full bg-gradient-to-r from-navy to-eco" />
                </div>
                <div className="mt-3 text-xs text-muted-foreground">Nakon povrata, ušteda je čista zarada. Sustav ima vijek 25+ godina.</div>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-7">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-solar-soft text-navy"><Battery className="h-5 w-5" /></div>
                <div>
                  <div className="font-display text-lg font-semibold text-navy">{r.batteryRec}</div>
                  <div className="text-sm text-muted-foreground">Preporuka temeljena na veličini sustava i potrošnji.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-semibold text-navy">{label}</label>
        <span className="font-display text-lg font-bold text-navy">{value}</span>
      </div>
      {children}
    </div>
  );
}

function Stat({ icon: Icon, label, value, tone }: { icon: any; label: string; value: string; tone: "navy" | "eco" | "solar" }) {
  const styles = { navy: "bg-navy text-primary-foreground", eco: "bg-eco-soft text-eco-foreground", solar: "bg-solar-soft text-navy" } as const;
  const iconStyles = { navy: "bg-solar text-navy", eco: "bg-eco text-primary-foreground", solar: "bg-navy text-solar" } as const;
  const labelTone = tone === "navy" ? "text-primary-foreground/70" : "text-muted-foreground";
  const valueTone = tone === "navy" ? "text-primary-foreground" : "text-navy";
  return (
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className={`rounded-3xl p-5 ${styles[tone]}`}>
      <div className={`grid h-10 w-10 place-items-center rounded-xl ${iconStyles[tone]}`}><Icon className="h-5 w-5" /></div>
      <div className={`mt-4 text-xs uppercase tracking-wider ${labelTone}`}>{label}</div>
      <div className={`mt-1 font-display text-2xl font-bold ${valueTone}`}>{value}</div>
    </motion.div>
  );
}
