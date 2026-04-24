'use client';

import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { categoryLabel } from '@/lib/demoData';
import { ServiceCategory, ServicePlan } from '@/lib/models';
import { getState, updateServicePlans } from '@/lib/storage';

export default function ServicePlansPage() {
  const [merchantId, setMerchantId] = useState('');
  const [plans, setPlans] = useState<ServicePlan[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const state = getState();
    const merchant = state.merchants.find((m) => m.id === state.selectedMerchantId);
    if (!merchant) return;
    setMerchantId(merchant.id);
    setPlans(merchant.services);
  }, []);

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 pb-24">
      <h1 className="text-2xl font-semibold">Service plans management</h1>
      <p className="text-sm text-modviaGrey">Edit your plans and pricing.</p>
      <div className="mt-5 space-y-3">
        {plans.map((plan, idx) => (
          <div key={plan.id} className="card">
            <div className="grid gap-3 md:grid-cols-2">
              <input className="rounded-xl border border-black/10 p-2" value={plan.name} onChange={(e) => setPlans((prev) => prev.map((p, i) => i === idx ? { ...p, name: e.target.value } : p))} />
              <input type="number" className="rounded-xl border border-black/10 p-2" value={plan.basePrice} onChange={(e) => setPlans((prev) => prev.map((p, i) => i === idx ? { ...p, basePrice: Number(e.target.value) } : p))} />
              <input type="number" className="rounded-xl border border-black/10 p-2" value={plan.durationMinutes} onChange={(e) => setPlans((prev) => prev.map((p, i) => i === idx ? { ...p, durationMinutes: Number(e.target.value) } : p))} />
              <select className="rounded-xl border border-black/10 p-2" value={plan.category} onChange={(e) => setPlans((prev) => prev.map((p, i) => i === idx ? { ...p, category: e.target.value as ServiceCategory } : p))}>
                {Object.entries(categoryLabel).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
              </select>
            </div>
            <textarea className="mt-3 w-full rounded-xl border border-black/10 p-2" value={plan.description} onChange={(e) => setPlans((prev) => prev.map((p, i) => i === idx ? { ...p, description: e.target.value } : p))} />
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          className="rounded-full border border-black/20 bg-white px-4 py-2"
          onClick={() => setPlans((prev) => [...prev, { id: uuid(), name: 'New Plan', durationMinutes: 60, basePrice: 800, description: 'Describe this service', category: 'oil' }])}
        >
          Add plan
        </button>
        <button
          className="rounded-full bg-modviaBlack px-4 py-2 text-white"
          onClick={() => {
            updateServicePlans(merchantId, plans);
            setSaved(true);
            setTimeout(() => setSaved(false), 1500);
          }}
        >
          Save changes
        </button>
      </div>
      {saved && <p className="mt-2 text-sm text-green-700">Saved.</p>}
    </main>
  );
}
