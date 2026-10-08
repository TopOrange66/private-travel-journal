"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [currentPlace, setCurrentPlace] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
const [longitude, setLongitude] = useState<number | null>(null);
const [photos, setPhotos] = useState<File[]>([]);
  return (
    <main className="min-h-screen bg-[#f3efe7] px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-semibold text-stone-800">
          Nieuwe reisupdate
        </h1>

        <p className="mt-2 text-stone-600">
          Voeg een nieuw moment toe aan je reisdagboek.
        </p>

        <form
  onSubmit={async (e) => {
    e.preventDefault();

    // 1. Reisupdate opslaan
    const { data: entry, error } = await supabase
      .from("entries")
      .insert({
        Title: title,
        Content: content,
        Location: location,
        Date: date,
        current_place: currentPlace,
      })
      .select()
      .single();

    if (error) {
      alert(`Fout bij opslaan reisupdate: ${error.message}`);
      console.error(error);
      return;
    }

    // 2. Foto's uploaden
    for (const photo of photos) {
      const fileName = `${Date.now()}-${photo.name}`;

      const { error: uploadError } = await supabase.storage
        .from("travel-photos")
        .upload(fileName, photo);

      if (uploadError) {
        alert(`Fout bij uploaden foto: ${uploadError.message}`);
        console.error(uploadError);
        return;
      }

      // 3. Publieke URL ophalen
      const { data: publicUrl } = supabase.storage
        .from("travel-photos")
        .getPublicUrl(fileName);

      // 4. Foto koppelen aan de reisupdate
      const { error: photoError } = await supabase
        .from("entry_photos")
        .insert({
          entry_id: entry.id,
          photo_url: publicUrl.publicUrl,
        });

      if (photoError) {
        alert(`Fout bij koppelen foto: ${photoError.message}`);
        console.error(photoError);
        return;
      }
    }

    alert("Reisupdate met foto('s) opgeslagen!");

    // Formulier leegmaken
    setTitle("");
    setContent("");
    setDate("");
    setLocation("");
    setPhotos([]);
  }}
  className="mt-8 space-y-5 rounded-2xl bg-white p-6 shadow-sm"
>
  <div>
    <label className="block text-sm font-medium text-stone-700">
      Foto's
    </label>

    <input
      type="file"
      accept="image/*"
      multiple
      onChange={(e) => {
        setPhotos(Array.from(e.target.files ?? []));
      }}
      className="mt-1 w-full"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-stone-700">
      Titel
    </label>

    <input
      type="text"
      placeholder="Bijvoorbeeld: Aankomst in Porto"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-stone-700">
      Verhaal
    </label>

    <textarea
      placeholder="Wat heb je vandaag meegemaakt?"
      value={content}
      onChange={(e) => setContent(e.target.value)}
      rows={6}
      className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-stone-700">
      Datum
    </label>

    <input
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
      className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-stone-700">
      Locatie
    </label>

    <input
      type="text"
      placeholder="Bijvoorbeeld: Porto"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
    />

    <button
      type="button"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            setLatitude(latitude);
            setLongitude(longitude);

            setLocation(`${latitude}, ${longitude}`);
          },
          () => {
            alert("Locatie kon niet worden opgehaald.");
          }
        );
      }}
      className="mt-2 rounded-lg border border-stone-300 px-4 py-2 text-sm text-stone-700"
    >
      📍 Gebruik mijn huidige locatie
    </button>
  </div>
<div>
  <label className="block text-sm font-medium text-stone-700">
    Huidige plaats op de route
  </label>

  <select
    value={currentPlace}
    onChange={(e) => setCurrentPlace(e.target.value)}
    className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
  >
    <option value="">Kies een plaats</option>
    <option value="Porto">Porto</option>
    <option value="São Pedro de Rates">São Pedro de Rates</option>
    <option value="Barcelos">Barcelos</option>
    <option value="Balugães">Balugães</option>
    <option value="Ponte de Lima">Ponte de Lima</option>
    <option value="Rubiães">Rubiães</option>
    <option value="Tui">Tui</option>
    <option value="O Porriño">O Porriño</option>
    <option value="Redondela">Redondela</option>
    <option value="Pontevedra">Pontevedra</option>
    <option value="Caldas de Reis">Caldas de Reis</option>
    <option value="Padrón">Padrón</option>
    <option value="Santiago de Compostela">Santiago de Compostela</option>
  </select>
</div>
  <button
    type="submit"
    className="rounded-lg bg-stone-800 px-5 py-2.5 text-white"
  >
    Reisupdate opslaan
  </button>
</form>
      </div>
    </main>
  );
}