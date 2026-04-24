'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { resetDemoData, seedDemoOffers } from '@/lib/storage';

export function TopBar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-modviaIvory/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="text-xl font-semibold tracking-wide text-modviaBlack">Modvia</Link>
        <div className="flex items-center gap-2 text-sm">
          <Link href="/client/request" className={`rounded-full px-3 py-1.5 ${pathname.startsWith('/client') ? 'bg-modviaBlack text-white' : 'bg-white text-modviaBlack'}`}>
            Client
          </Link>
          <Link href="/merchant" className={`rounded-full px-3 py-1.5 ${pathname.startsWith('/merchant') ? 'bg-modviaBlack text-white' : 'bg-white text-modviaBlack'}`}>
            Merchant
          </Link>
          <button
            onClick={() => {
              seedDemoOffers();
              router.refresh();
            }}
            className="rounded-full bg-modviaGold px-3 py-1.5 text-modviaBlack"
          >
            Seed demo offers
          </button>
          <button
            onClick={() => {
              resetDemoData();
              router.push('/');
              router.refresh();
            }}
            className="rounded-full bg-modviaBlack px-3 py-1.5 text-white"
          >
            Reset demo data
          </button>
        </div>
      </div>
    </header>
  );
}
