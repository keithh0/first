'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { categoryLabel } from '@/lib/demoData';
import { ServiceCategory } from '@/lib/models';
import { upsertRequest } from '@/lib/storage';

const categories = Object.keys(categoryLabel) as ServiceCategory[];

export default function ClientRequestPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    area: 'Central',
    preferredDate: '',
    preferredTime: '19:00',
    people: 1,
    preferredCategory: 'oil' as ServiceCategory,
    budget: 1200,
    notes: ''
  });

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 pb-24">
      <div className="card">
        <h1 className="text-2xl font-semibold">Request a massage</h1>
        <p className="mt-1 text-sm text-modviaGrey">Tell merchants what you need. You will receive offers shortly.</p>

        <div className="mt-6 grid gap-4">
          <input className="rounded-2xl border border-black/10 p-3" placeholder="Area" value={form.area} onChange={(e) => setForm((f) => ({ ...f, area: e.target.value }))} />
          <div className="grid grid-cols-2 gap-3">
            <input type="date" className="rounded-2xl border border-black/10 p-3" value={form.preferredDate} onChange={(e) => setForm((f) => ({ ...f, preferredDate: e.target.value }))} />
            <input type="time" className="rounded-2xl border border-black/10 p-3" value={form.preferredTime} onChange={(e) => setForm((f) => ({ ...f, preferredTime: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input type="number" min={1} className="rounded-2xl border border-black/10 p-3" value={form.people} onChange={(e) => setForm((f) => ({ ...f, people: Number(e.target.value) }))} />
            <input type="number" min={200} className="rounded-2xl border border-black/10 p-3" value={form.budget} onChange={(e) => setForm((f) => ({ ...f, budget: Number(e.target.value) }))} />
          </div>
          <select className="rounded-2xl border border-black/10 p-3" value={form.preferredCategory} onChange={(e) => setForm((f) => ({ ...f, preferredCategory: e.target.value as ServiceCategory }))}>
            {categories.map((category) => (
              <option key={category} value={category}>{categoryLabel[category]}</option>
            ))}
          </select>
          <textarea className="min-h-24 rounded-2xl border border-black/10 p-3" placeholder="Notes" value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t border-black/10 bg-modviaIvory/95 p-4 backdrop-blur">
        <div className="mx-auto max-w-3xl">
          <button
            className="w-full rounded-full bg-modviaBlack px-5 py-3 text-white"
            onClick={() => {
              const request = upsertRequest(form);
              router.push(`/client/offers/${request.id}`);
            }}
          >
            Submit request
          </button>
        </div>
      </div>
    </main>
  );
}
