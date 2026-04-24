# Modvia MVP (Next.js + TypeScript + Tailwind)

High-end, Uber-like MVP for a massage and wellness marketplace.

## Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- localStorage persistence (no backend)

## Features
- Landing page with premium brand direction
- Client request flow -> offers -> fake deposit -> confirmation
- Merchant flow with profile selector, dashboard, request response flow
- Merchant service plan management
- Demo merchants + realistic HKD pricing
- `Seed demo offers` and `Reset demo data` actions in the top bar

## Pages
- `/` Landing
- `/client/request` Client request form
- `/client/offers/[requestId]` Client offers comparison
- `/merchant` Merchant dashboard
- `/merchant/select` Merchant selector
- `/merchant/service-plans` Service plans management
- `/merchant/requests/[requestId]` Merchant request detail + offer submission
- `/booking/[bookingId]/confirmation` Booking confirmation

## Run locally
```bash
npm install
npm run dev
```

Then open: http://localhost:3000

## Demo steps
1. Go to `/client/request` and submit a request.
2. Use top bar: **Seed demo offers** (or create offers manually from merchant dashboard).
3. Open the request offers page and compare offers.
4. Choose a plan and click **Reserve with deposit**.
5. Confirm in fake payment modal.

## Notes
- All app state is stored in `localStorage` under key `modvia_state_v1`.
- No external APIs or real Stripe used.
