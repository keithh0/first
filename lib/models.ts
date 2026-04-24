export type ServiceCategory = 'foot' | 'thai' | 'oil' | 'deep_tissue' | 'couples' | 'spa';

export type Merchant = {
  id: string;
  name: string;
  area: string;
  address: string;
  description: string;
  rating: number;
  imageUrl: string;
  phone: string;
  services: ServicePlan[];
};

export type ServicePlan = {
  id: string;
  name: string;
  durationMinutes: number;
  basePrice: number;
  description: string;
  category: ServiceCategory;
};

export type ClientRequestStatus = 'open' | 'offered' | 'confirmed' | 'cancelled';

export type ClientRequest = {
  id: string;
  area: string;
  preferredDate: string;
  preferredTime: string;
  people: number;
  preferredCategory: ServiceCategory;
  budget: number;
  notes: string;
  status: ClientRequestStatus;
};

export type MerchantOfferStatus = 'pending' | 'accepted' | 'rejected';

export type MerchantOffer = {
  id: string;
  requestId: string;
  merchantId: string;
  servicePlanIds: string[];
  customPrices: Record<string, number>;
  availableTime: string;
  depositAmount: number;
  note: string;
  status: MerchantOfferStatus;
};

export type Booking = {
  id: string;
  requestId: string;
  offerId: string;
  merchantId: string;
  servicePlanId: string;
  totalPrice: number;
  depositAmount: number;
  paymentStatus: 'deposit_pending' | 'deposit_paid';
  bookingStatus: 'confirmed' | 'completed' | 'cancelled';
};

export type AppState = {
  merchants: Merchant[];
  requests: ClientRequest[];
  offers: MerchantOffer[];
  bookings: Booking[];
  selectedMerchantId: string;
};
