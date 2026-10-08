import { createClient } from "@/lib/supabase/server";
import RouteMap from "@/app/components/RouteMap";
export default async function Home() {
  const supabase = await createClient();

  const { data: entries, error } = await supabase
    .from("entries")
    .select("*")
    .order("Date", { ascending: false });

  return (
    <main className="min-h-screen bg-[#f3efe7]">
      {/* Header */}
      <header className="border-b border-stone-200/80 bg-[#faf8f3]">
        <div className="mx-auto max-w-3xl px-5 py-8">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-stone-500">
            Tonnetjes's reisdagboek TEST
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-stone-900">
            Porto → Santiago
          </h1>

          <p className="mt-2 text-lg text-stone-600">
            Mijn Camino 2026
          </p>
        </div>
      </header>

      {/* Reisoverzicht */}
      <section className="mx-auto max-w-3xl px-5 py-7">
        <div className="rounded-3xl border border-stone-200/70 bg-[#faf8f3] p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-stone-500">Mijn reis</p>
              <p className="mt-1 text-xl font-semibold text-stone-900">
                Porto → Santiago de Compostela
              </p>
            </div>

            <div className="text-4xl">🥾</div>
          </div>

          <div className="mt-6 h-2 overflow-hidden rounded-full bg-stone-200">
            <div className="h-full w-[8%] rounded-full bg-stone-700" />
          </div>

          <div className="mt-2 flex justify-between text-xs text-stone-500">
            <span>Porto</span>
            <span>Santiago</span>
          </div>
        </div>
      </section>

      {/* Kaart */}
      <section className="mx-auto max-w-3xl px-5 pb-7">
  <div className="h-72 rounded-3xl bg-red-300 p-6">
    <h2 className="text-2xl font-bold text-black">
      TEST KAART
    </h2>
    <p className="mt-2 text-black">
      Als je dit ziet, werkt het kaartvak.
    </p>
  </div>
      </section>

      {/* Reisupdates */}
      <section className="mx-auto max-w-3xl px-5 pb-12">
        <h2 className="mb-5 text-2xl font-semibold text-stone-900">
          Mijn reis
        </h2>

        {error && (
          <div className="rounded-2xl bg-red-50 p-4 text-red-700">
            Fout bij laden: {error.message}
          </div>
        )}

        <div className="space-y-7">
          {entries?.map((entry) => (
            <article
              key={entry.id}
              className="overflow-hidden rounded-3xl border border-stone-200/70 bg-[#faf8f3] shadow-sm"
            >
              {/* Foto */}
              <div className="flex h-56 items-center justify-center bg-stone-300">
                <span className="text-sm text-stone-600">
                  Hier komt straks de reisfoto
                </span>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap items-center gap-2 text-sm text-stone-500">
                  <span>📍</span>
                  <span>{entry.Location}</span>
                  <span>·</span>
                  <span>{entry.Date}</span>
                </div>

                <h3 className="mt-3 text-2xl font-semibold text-stone-900">
                  {entry.Title}
                </h3>

                <p className="mt-3 leading-7 text-stone-700">
                  {entry.Content}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}