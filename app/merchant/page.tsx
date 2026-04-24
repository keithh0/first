'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { categoryLabel } from '@/lib/demoData';
import { ClientRequest } from '@/lib/models';
import { getState } from '@/lib/storage';

export default function MerchantDashboardPage() {
  const [requests, setRequests] = useState<ClientRequest[]>([]);
  const [merchantName, setMerchantName] = useState('');

  useEffect(() => {
    const state = getState();
    const merchant = state.merchants.find((m) => m.id === state.selectedMerchantId);
    setMerchantName(merchant?.name ?? 'Unknown');
    setRequests(state.requests.filter((r) => r.status === 'open' || r.status === 'offered'));
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold">Merchant dashboard</h1>
          <p className="text-sm text-modviaGrey">Signed in as {merchantName}</p>
        </div>
        <div className="flex gap-2">
          <Link href="/merchant/select" className="rounded-full border border-black/10 bg-white px-3 py-2 text-sm">Switch profile</Link>
          <Link href="/merchant/service-plans" className="rounded-full bg-modviaBlack px-3 py-2 text-sm text-white">Manage service plans</Link>
        </div>
      </div>

      <div className="space-y-3">
        {requests.length === 0 ? (
          <div className="card text-sm text-modviaGrey">No open requests right now.</div>
        ) : requests.map((request) => (
          <Link key={request.id} href={`/merchant/requests/${request.id}`} className="card block transition hover:scale-[1.01]">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium">{request.area} · {request.people} {request.people > 1 ? 'people' : 'person'}</p>
                <p className="text-sm text-modviaGrey">{request.preferredDate || 'Flexible date'} at {request.preferredTime}</p>
              </div>
              <span className="rounded-full bg-modviaIvory px-3 py-1 text-xs">{categoryLabel[request.preferredCategory]}</span>
            </div>
            <p className="mt-2 text-sm text-modviaGrey">Budget HKD {request.budget} · {request.notes || 'No notes'}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
