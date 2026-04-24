'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { categoryLabel } from '@/lib/demoData';
import { ClientRequest } from '@/lib/models';
import { createOffer, getState } from '@/lib/storage';

export default function MerchantRequestDetailPage() {
  const router = useRouter();
  const params = useParams<{ requestId: string }>();
  const requestId = params.requestId;

  const [request, setRequest] = useState<ClientRequest | null>(null);
  const [merchantId, setMerchantId] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [availableTime, setAvailableTime] = useState('19:30');
  const [depositAmount, setDepositAmount] = useState(300);
  const [note, setNote] = useState('');

  const merchant = useMemo(() => {
    const state = getState();
    return state.merchants.find((m) => m.id === merchantId);
  }, [merchantId]);

  useEffect(() => {
    const state = getState();
    setMerchantId(state.selectedMerchantId);
    setRequest(state.requests.find((r) => r.id === requestId) ?? null);
  }, [requestId]);

  useEffect(() => {
    if (!merchant) return;
    const defaults: Record<string, number> = {};
    merchant.services.forEach((service) => {
      defaults[service.id] = service.basePrice;
    });
    setPrices(defaults);
  }, [merchant]);

  if (!request || !merchant) return <main className="mx-auto max-w-4xl px-4 py-8">Loading…</main>;

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 pb-24">
      <div className="card">
        <h1 className="text-2xl font-semibold">Request detail</h1>
        <p className="mt-1 text-sm text-modviaGrey">{request.area} · {request.preferredDate || 'Flexible'} · {request.preferredTime}</p>
        <p className="mt-1 text-sm text-modviaGrey">{request.people} people · {categoryLabel[request.preferredCategory]} · Budget HKD {request.budget}</p>
        <p className="mt-3 rounded-2xl bg-modviaIvory p-3 text-sm">{request.notes || 'No notes'}</p>
      </div>

      <div className="card mt-4">
        <h2 className="text-lg font-semibold">Create your offer</h2>
        <p className="text-sm text-modviaGrey">Choose services and set custom pricing.</p>

        <div className="mt-4 space-y-3">
          {merchant.services.map((service) => {
            const checked = selectedServices.includes(service.id);
            return (
              <label key={service.id} className="flex items-center justify-between rounded-2xl border border-black/10 p-3">
                <div>
                  <div className="font-medium">{service.name}</div>
                  <div className="text-sm text-modviaGrey">{service.durationMinutes} min · base HKD {service.basePrice}</div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="number" className="w-24 rounded-lg border border-black/10 p-1.5" value={prices[service.id] ?? service.basePrice} onChange={(e) => setPrices((prev) => ({ ...prev, [service.id]: Number(e.target.value) }))} />
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedServices((prev) => [...prev, service.id]);
                      else setSelectedServices((prev) => prev.filter((id) => id !== service.id));
                    }}
                  />
                </div>
              </label>
            );
          })}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <input type="time" className="rounded-xl border border-black/10 p-2" value={availableTime} onChange={(e) => setAvailableTime(e.target.value)} />
          <input type="number" className="rounded-xl border border-black/10 p-2" value={depositAmount} onChange={(e) => setDepositAmount(Number(e.target.value))} />
        </div>
        <textarea className="mt-3 w-full rounded-xl border border-black/10 p-2" placeholder="Optional note" value={note} onChange={(e) => setNote(e.target.value)} />
      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t border-black/10 bg-modviaIvory/95 p-4 backdrop-blur">
        <div className="mx-auto max-w-4xl">
          <button
            className="w-full rounded-full bg-modviaBlack px-5 py-3 text-white disabled:opacity-50"
            disabled={selectedServices.length === 0}
            onClick={() => {
              createOffer({
                requestId,
                merchantId,
                servicePlanIds: selectedServices,
                customPrices: prices,
                availableTime,
                depositAmount,
                note
              });
              router.push('/merchant');
            }}
          >
            Submit offer
          </button>
        </div>
      </div>
    </main>
  );
}
