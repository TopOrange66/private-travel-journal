"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type CommentFormProps = {
  entryId: number;
};

export default function CommentForm({ entryId }: CommentFormProps) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim() || !comment.trim()) return;

    setSending(true);

    
    const { error } = await supabase.from("comments").insert({
      entry_id: entryId,
      name: name.trim(),
      comment: comment.trim(),
    });

    setSending(false);

    if (error) {
      alert("Er ging iets mis bij het plaatsen van je reactie.");
      return;
    }

    setName("");
    setComment("");

    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
      <input
        type="text"
        placeholder="Je naam"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
      />

      <textarea
        placeholder="Schrijf een reactie..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
      />

      <button
        type="submit"
        disabled={sending}
        className="rounded-lg bg-gray-800 px-4 py-2 text-sm text-white disabled:opacity-50"
      >
        {sending ? "Plaatsen..." : "Reactie plaatsen"}
      </button>
    </form>
  );
}