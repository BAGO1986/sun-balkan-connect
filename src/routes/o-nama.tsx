import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ArrowRight, Sun } from "lucide-react";

export const Route = createFileRoute("/o-nama")({
  head: () => ({
    meta: [
      { title: "O nama — Prosumer.ba" },
      { name: "description", content: "Misija Prosumer.ba: ubrzati solarnu tranziciju Balkana." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <section className="mx-auto max-w-4xl px-5 py-24 lg:px-8 lg:py-32">
        <Sun className="h-12 w-12 text-solar" />
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-navy sm:text-6xl">Ubrzavamo solarnu tranziciju Balkana.</h1>
        <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
          Prosumer.ba je nezavisna platforma osnovana s jednim ciljem — učiniti solarnu energiju jednostavnom, transparentnom i dostupnom svakom kućanstvu i biznisu u Bosni i Hercegovini, Hrvatskoj i regiji.
        </p>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          Vjerujemo da prelazak na solar ne bi trebao biti komplikovan. Zato povezujemo vlasnike nekretnina s provjerenim instalaterima, pružamo realne procjene uštede i pomažemo u financiranju.
        </p>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {[
            { n: "240+", l: "Instalatera" },
            { n: "12.5K", l: "Procjena" },
            { n: "18 MW", l: "Instalirano" },
          ].map((s) => (
            <div key={s.l} className="rounded-3xl border border-border bg-card p-6 text-center">
              <div className="font-display text-3xl font-bold text-navy">{s.n}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>

        <Link to="/kontakt" className="mt-12 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]">
          Razgovarajmo <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </SiteLayout>
  ),
});
