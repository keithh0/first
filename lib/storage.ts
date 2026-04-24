'use client';

import { v4 as uuid } from 'uuid';
import { demoMerchants } from '@/lib/demoData';
import { AppState, Booking, ClientRequest, MerchantOffer } from '@/lib/models';

const STORAGE_KEY = 'modvia_state_v1';

const initialState: AppState = {
  merchants: demoMerchants,
  requests: [],
  offers: [],
  bookings: [],
  selectedMerchantId: demoMerchants[0].id
};

export function getState(): AppState {
  if (typeof window === 'undefined') {
    return initialState;
  }
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState));
    return initialState;
  }

  try {
    return JSON.parse(raw) as AppState;
  } catch {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState));
    return initialState;
  }
}

export function saveState(state: AppState) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function resetDemoData() {
  saveState(initialState);
}

export function upsertRequest(request: Omit<ClientRequest, 'id' | 'status'>): ClientRequest {
  const state = getState();
  const next: ClientRequest = { id: uuid(), status: 'open', ...request };
  state.requests.unshift(next);
  saveState(state);
  return next;
}

export function createOffer(offer: Omit<MerchantOffer, 'id' | 'status'>): MerchantOffer {
  const state = getState();
  const next: MerchantOffer = { id: uuid(), status: 'pending', ...offer };
  state.offers.unshift(next);

  const req = state.requests.find((r) => r.id === offer.requestId);
  if (req) req.status = 'offered';

  saveState(state);
  return next;
}

export function createBooking(payload: Omit<Booking, 'id' | 'paymentStatus' | 'bookingStatus'>): Booking {
  const state = getState();
  const next: Booking = {
    ...payload,
    id: uuid(),
    paymentStatus: 'deposit_paid',
    bookingStatus: 'confirmed'
  };

  const request = state.requests.find((r) => r.id === payload.requestId);
  if (request) request.status = 'confirmed';

  const winningOffer = state.offers.find((o) => o.id === payload.offerId);
  if (winningOffer) winningOffer.status = 'accepted';
  state.offers.forEach((offer) => {
    if (offer.requestId === payload.requestId && offer.id !== payload.offerId) {
      offer.status = 'rejected';
    }
  });

  state.bookings.unshift(next);
  saveState(state);
  return next;
}

export function updateSelectedMerchant(merchantId: string) {
  const state = getState();
  state.selectedMerchantId = merchantId;
  saveState(state);
}

export function updateServicePlans(merchantId: string, services: AppState['merchants'][number]['services']) {
  const state = getState();
  const merchant = state.merchants.find((m) => m.id === merchantId);
  if (!merchant) return;
  merchant.services = services;
  saveState(state);
}

export function seedDemoOffers() {
  const state = getState();
  const openRequests = state.requests.filter((r) => r.status === 'open' || r.status === 'offered');
  if (openRequests.length === 0) return;

  openRequests.forEach((request) => {
    state.merchants.forEach((merchant, index) => {
      const matching = merchant.services.filter((s) => s.category === request.preferredCategory);
      const chosen = matching.length > 0 ? matching.slice(0, 1) : merchant.services.slice(0, 1);
      if (chosen.length === 0) return;

      const customPrices: Record<string, number> = {};
      chosen.forEach((service) => {
        customPrices[service.id] = Math.max(320, service.basePrice - (index * 60));
      });

      const exists = state.offers.some((o) => o.requestId === request.id && o.merchantId === merchant.id);
      if (exists) return;

      const availableTime = request.preferredTime;
      const base = Object.values(customPrices)[0];

      state.offers.unshift({
        id: uuid(),
        requestId: request.id,
        merchantId: merchant.id,
        servicePlanIds: chosen.map((s) => s.id),
        customPrices,
        availableTime,
        depositAmount: Math.round(base * 0.25),
        note: 'We can host your request with premium therapist availability.',
        status: 'pending'
      });

      request.status = 'offered';
    });
  });

  saveState(state);
}
