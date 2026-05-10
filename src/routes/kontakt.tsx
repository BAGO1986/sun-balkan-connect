import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt — Prosumer.ba" },
      { name: "description", content: "Kontaktiraj tim Prosumer.ba — Mostar, Sarajevo, Zagreb, Split." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl">Razgovarajmo o tvom solarnom projektu.</h1>
            <p className="mt-5 text-lg text-muted-foreground">Tu smo za pitanja, podršku i suradnju s instalaterima.</p>
            <div className="mt-10 space-y-5">
              {[
                { i: Mail, l: "Email", v: "hello@prosumer.ba" },
                { i: Phone, l: "Telefon", v: "+387 36 000 000" },
                { i: MessageCircle, l: "WhatsApp", v: "+387 63 000 000" },
                { i: MapPin, l: "Sjedište", v: "Mostar, BiH" },
              ].map((c) => (
                <div key={c.l} className="flex items-center gap-4">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-secondary text-navy"><c.i className="h-5 w-5" /></div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.l}</div>
                    <div className="font-medium text-navy">{c.v}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form className="rounded-3xl border border-border bg-card p-8 shadow-elevated space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Ime" />
              <Input label="Prezime" />
            </div>
            <Input label="Email" type="email" />
            <Input label="Telefon" type="tel" />
            <div>
              <label className="text-sm font-semibold text-navy">Poruka</label>
              <textarea rows={5} className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-solar" />
            </div>
            <button type="button" className="w-full rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]">
              Pošalji upit
            </button>
          </form>
        </div>
      </section>
    </SiteLayout>
  ),
});

function Input({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <div>
      <label className="text-sm font-semibold text-navy">{label}</label>
      <input type={type} className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-solar" />
    </div>
  );
}
