'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getState } from '@/lib/storage';

export default function BookingConfirmationPage() {
  const params = useParams<{ bookingId: string }>();
  const [data, setData] = useState<{
    merchantName: string;
    serviceName: string;
    totalPrice: number;
    depositAmount: number;
  } | null>(null);

  useEffect(() => {
    const state = getState();
    const booking = state.bookings.find((b) => b.id === params.bookingId);
    if (!booking) return;
    const merchant = state.merchants.find((m) => m.id === booking.merchantId);
    const service = merchant?.services.find((s) => s.id === booking.servicePlanId);
    setData({
      merchantName: merchant?.name ?? 'Unknown merchant',
      serviceName: service?.name ?? 'Service plan',
      totalPrice: booking.totalPrice,
      depositAmount: booking.depositAmount
    });
  }, [params.bookingId]);

  if (!data) return <main className="mx-auto max-w-3xl px-4 py-8">Booking not found.</main>;

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="card text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-modviaGold text-2xl">✓</div>
        <h1 className="text-3xl font-semibold">Booking confirmed</h1>
        <p className="mt-2 text-modviaGrey">Your deposit has been marked as paid.</p>
        <div className="mt-6 rounded-2xl bg-modviaIvory p-4 text-left">
          <p><span className="text-modviaGrey">Merchant:</span> {data.merchantName}</p>
          <p><span className="text-modviaGrey">Service:</span> {data.serviceName}</p>
          <p><span className="text-modviaGrey">Total:</span> HKD {data.totalPrice}</p>
          <p><span className="text-modviaGrey">Deposit paid:</span> HKD {data.depositAmount}</p>
        </div>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/" className="rounded-full bg-modviaBlack px-4 py-2 text-white">Back home</Link>
          <Link href="/client/request" className="rounded-full border border-black/10 bg-white px-4 py-2">New request</Link>
        </div>
      </div>
    </main>
  );
}
