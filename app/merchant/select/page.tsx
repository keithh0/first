'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getState, updateSelectedMerchant } from '@/lib/storage';

export default function MerchantSelectPage() {
  const router = useRouter();
  const [merchantId, setMerchantId] = useState('');
  const [options, setOptions] = useState(getState().merchants);

  useEffect(() => {
    const state = getState();
    setOptions(state.merchants);
    setMerchantId(state.selectedMerchantId);
  }, []);

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <div className="card">
        <h1 className="text-2xl font-semibold">Choose merchant profile</h1>
        <p className="mt-1 text-sm text-modviaGrey">Fake authentication for demo merchant workflows.</p>
        <select value={merchantId} onChange={(e) => setMerchantId(e.target.value)} className="mt-4 w-full rounded-2xl border border-black/10 p-3">
          {options.map((merchant) => (
            <option key={merchant.id} value={merchant.id}>{merchant.name}</option>
          ))}
        </select>
        <button className="mt-4 rounded-full bg-modviaBlack px-4 py-2 text-white" onClick={() => { updateSelectedMerchant(merchantId); router.push('/merchant'); }}>
          Continue
        </button>
      </div>
    </main>
  );
}
