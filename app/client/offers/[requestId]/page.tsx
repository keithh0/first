'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PaymentModal } from '@/components/PaymentModal';
import { categoryLabel } from '@/lib/demoData';
import { createBooking, getState } from '@/lib/storage';
import { ClientRequest, MerchantOffer } from '@/lib/models';

export default function OffersPage() {
  const router = useRouter();
  const params = useParams<{ requestId: string }>();
  const requestId = params.requestId;

  const [request, setRequest] = useState<ClientRequest | null>(null);
  const [offers, setOffers] = useState<MerchantOffer[]>([]);
  const [selected, setSelected] = useState<{ offerId: string; servicePlanId: string } | null>(null);
  const [paymentOpen, setPaymentOpen] = useState(false);

  useEffect(() => {
    const state = getState();
    setRequest(state.requests.find((r) => r.id === requestId) ?? null);
    setOffers(state.offers.filter((o) => o.requestId === requestId && o.status === 'pending'));
  }, [requestId]);

  const enriched = useMemo(() => {
    const state = getState();
    return offers.map((offer) => {
      const merchant = state.merchants.find((m) => m.id === offer.merchantId)!;
      const plans = merchant.services.filter((service) => offer.servicePlanIds.includes(service.id));
      return { offer, merchant, plans };
    });
  }, [offers]);

  const selectedOffer = enriched.find((item) => item.offer.id === selected?.offerId);
  const deposit = selectedOffer?.offer.depositAmount ?? 0;

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 pb-24">
      <h1 className="text-2xl font-semibold">Offers for your request</h1>
      {request && <p className="mt-1 text-sm text-modviaGrey">{request.area} · {request.preferredDate || 'Flexible date'} · {categoryLabel[request.preferredCategory]}</p>}

      {enriched.length === 0 ? (
        <div className="card mt-6 text-center">
          <p className="text-lg font-medium">Waiting for offers…</p>
          <p className="mt-2 text-sm text-modviaGrey">Ask a merchant to respond from the dashboard, or use “Seed demo offers”.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {enriched.map(({ offer, merchant, plans }) => (
            <section key={offer.id} className="card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">{merchant.name}</h2>
                  <p className="text-sm text-modviaGrey">{merchant.area} · ⭐ {merchant.rating}</p>
                  <p className="mt-1 text-sm text-modviaGrey">Available time: {offer.availableTime}</p>
                </div>
                <div className="rounded-xl bg-modviaIvory px-3 py-2 text-sm">Deposit HKD {offer.depositAmount}</div>
              </div>
              <p className="mt-2 text-sm text-modviaGrey">{offer.note}</p>

              <div className="mt-4 space-y-2">
                {plans.map((plan) => {
                  const price = offer.customPrices[plan.id] ?? plan.basePrice;
                  const picked = selected?.offerId === offer.id && selected?.servicePlanId === plan.id;
                  return (
                    <button
                      key={plan.id}
                      className={`w-full rounded-2xl border p-3 text-left ${picked ? 'border-modviaGold bg-modviaIvory' : 'border-black/10 bg-white'}`}
                      onClick={() => setSelected({ offerId: offer.id, servicePlanId: plan.id })}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{plan.name}</span>
                        <span>HKD {price}</span>
                      </div>
                      <p className="text-sm text-modviaGrey">{plan.durationMinutes} min · {plan.description}</p>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 border-t border-black/10 bg-modviaIvory/95 p-4 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <p className="text-sm text-modviaGrey">{selected ? 'Ready to reserve this offer' : 'Select one service plan to continue'}</p>
          <button disabled={!selected} onClick={() => setPaymentOpen(true)} className="rounded-full bg-modviaBlack px-5 py-3 text-white disabled:opacity-50">Reserve with deposit</button>
        </div>
      </div>

      <PaymentModal
        open={paymentOpen}
        amount={deposit}
        onClose={() => setPaymentOpen(false)}
        onConfirm={() => {
          if (!selected || !selectedOffer || !request) return;
          const price = selectedOffer.offer.customPrices[selected.servicePlanId];
          const booking = createBooking({
            requestId,
            offerId: selected.offerId,
            merchantId: selectedOffer.merchant.id,
            servicePlanId: selected.servicePlanId,
            totalPrice: price,
            depositAmount: selectedOffer.offer.depositAmount
          });
          setPaymentOpen(false);
          router.push(`/booking/${booking.id}/confirmation`);
        }}
      />
    </main>
  );
}
