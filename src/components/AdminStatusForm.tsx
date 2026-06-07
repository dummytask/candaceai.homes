"use client";

import { useState } from "react";

interface AdminStatusFormProps {
  id: string;
  currentStatus: string;
  currentNotes: string | null;
}

export default function AdminStatusForm({
  id,
  currentStatus,
  currentNotes,
}: AdminStatusFormProps) {
  const [status, setStatus] = useState(currentStatus);
  const [notes, setNotes] = useState(currentNotes ?? "");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    setError("");

    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, notes }),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        const data = await res.json().catch(() => ({}));
        setError((data as { error?: string }).error ?? "Failed to save.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Status selector */}
      <div>
        <label className="block text-[10px] tracking-widest text-[#333] uppercase mb-2">
          Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-transparent border-b border-[#222] text-[#e8e8e8] text-sm w-full py-3 outline-none focus:border-[#555] cursor-pointer"
        >
          <option value="pending" className="bg-[#111] text-[#e8e8e8]">
            Pending
          </option>
          <option value="approved" className="bg-[#111] text-[#e8e8e8]">
            Approved
          </option>
          <option value="rejected" className="bg-[#111] text-[#e8e8e8]">
            Rejected
          </option>
        </select>
      </div>

      {/* Notes textarea */}
      <div>
        <label className="block text-[10px] tracking-widest text-[#333] uppercase mb-2">
          Internal Notes
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Internal notes..."
          rows={5}
          className="bg-transparent border border-[#1a1a1a] text-[#e8e8e8] text-sm w-full p-3 outline-none placeholder:text-[#333] focus:border-[#333] resize-none"
        />
      </div>

      {/* Save button */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full bg-white text-black text-xs tracking-widest uppercase py-3 hover:bg-[#e8e8e8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>

      {saved && (
        <p className="text-[10px] tracking-widest text-green-800 uppercase">
          Saved successfully.
        </p>
      )}
      {error && (
        <p className="text-[10px] tracking-widest text-red-800">{error}</p>
      )}
    </div>
  );
}
