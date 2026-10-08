import { createClient } from "@/lib/supabase/server";
import RouteMapWrapper from "@/app/components/RouteMapWrapper";
import CommentForm from "@/app/components/CommentForm";
export default async function Home() {
  const supabase = await createClient();

  const { data: entries, error } = await supabase
  .from("entries")
  .select("*")
  .order("Date", { ascending: false });

  const currentPlace = entries?.[0]?.current_place ?? "";

const { data: entryPhotos, error: photosError } = await supabase
  .from("entry_photos")
  .select("*");
const { data: comments, error: commentsError } = await supabase
  .from("comments")
  .select("*")
  .order("created_at", { ascending: true });
  return (
    <main className="min-h-screen bg-[#f3efe7]">
      {/* Header */}
      <header className="border-b border-stone-200/80 bg-[#faf8f3]">
        <div className="mx-auto max-w-3xl px-5 py-8">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-stone-500">
            Tonnetjes's reisdagboek
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
  <div className="overflow-hidden rounded-3xl border border-stone-200/70 bg-[#faf8f3] shadow-sm">
    <RouteMapWrapper currentPlace={currentPlace} />
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
             {/* Foto's */}
<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
  {entryPhotos
    ?.filter((photo) => photo.entry_id === entry.id)
    .map((photo) => (
      <div key={photo.id} className="overflow-hidden">
        <img
          src={photo.photo_url}
          alt="Foto uit mijn reisdagboek"
          className="h-56 w-full object-cover"
        />
      </div>
    ))}
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
                <CommentForm entryId={entry.id} />

<div className="mt-6 space-y-3">
  {comments
    ?.filter((comment) => comment.entry_id === entry.id)
    .map((comment) => (
      <div
        key={comment.id}
        className="rounded-lg bg-white/70 p-4"
      >
        <div className="font-medium text-stone-700">
          {comment.name}
        </div>

        <div className="mt-1 text-sm text-stone-600">
          {comment.comment}
        </div>
      </div>
    ))}
</div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}