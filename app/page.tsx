export default function Home() {
  return (
    <main className="min-h-screen bg-stone-100">
      {/* Header */}
      <header className="bg-white border-b border-stone-200">
        <div className="mx-auto max-w-3xl px-5 py-6">
          <p className="text-sm font-medium uppercase tracking-wide text-stone-500">
            Privé reisdagboek
          </p>

          <h1 className="mt-2 text-3xl font-bold text-stone-900">
            Porto → Santiago
          </h1>

          <p className="mt-1 text-stone-600">
            Mijn Camino 2026
          </p>
        </div>
      </header>

      {/* Reisoverzicht */}
      <section className="mx-auto max-w-3xl px-5 py-6">
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-stone-500">Mijn reis</p>
              <p className="mt-1 text-lg font-semibold text-stone-900">
                Porto → Santiago de Compostela
              </p>
            </div>

            <div className="text-3xl">🥾</div>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-stone-200">
            <div className="h-full w-[8%] rounded-full bg-stone-700" />
          </div>

          <div className="mt-2 flex justify-between text-xs text-stone-500">
            <span>Porto</span>
            <span>Santiago</span>
          </div>
        </div>
      </section>

      {/* Tijdlijn */}
      <section className="mx-auto max-w-3xl px-5 pb-12">
        <h2 className="mb-4 text-xl font-semibold text-stone-900">
          Mijn reis
        </h2>

        <article className="overflow-hidden rounded-3xl bg-white shadow-sm">
          {/* Tijdelijke foto */}
          <div className="flex h-56 items-center justify-center bg-stone-300">
            <span className="text-sm text-stone-600">
              Hier komt straks de reisfoto
            </span>
          </div>

          <div className="p-6">
            <div className="flex items-center gap-2 text-sm text-stone-500">
              <span>📍</span>
              <span>Porto, Portugal</span>
              <span>·</span>
              <span>Dag 1</span>
            </div>

            <h3 className="mt-3 text-2xl font-semibold text-stone-900">
              Het avontuur begint!
            </h3>

            <p className="mt-3 leading-7 text-stone-700">
              Vandaag begint mijn reis van Porto naar Santiago.
              Alles is gepakt en ik ben er klaar voor!
            </p>
          </div>
        </article>
      </section>
    </main>
  );
}