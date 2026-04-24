import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <section className="card overflow-hidden bg-modviaBlack text-white">
        <div className="grid gap-8 p-2 md:grid-cols-2 md:p-8">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-modviaGold">Premium wellness on demand</p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-5xl">Book curated massage experiences in minutes.</h1>
            <p className="mt-4 text-white/80">Modvia connects clients to premium wellness merchants. Request once, compare offers, reserve with deposit.</p>
            <div className="mt-8 flex gap-3">
              <Link href="/client/request" className="rounded-full bg-modviaGold px-5 py-3 font-medium text-modviaBlack">Request a massage</Link>
              <Link href="/merchant" className="rounded-full border border-white/30 px-5 py-3">Merchant dashboard</Link>
            </div>
          </div>
          <div className="rounded-3xl bg-white/10 p-6">
            <h3 className="text-lg font-medium">How it works</h3>
            <ol className="mt-3 space-y-3 text-sm text-white/85">
              <li>1. Submit your preferred area, time, budget, and category.</li>
              <li>2. Premium merchants send personalized service offers.</li>
              <li>3. Compare plans, pay a deposit, and confirm instantly.</li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
