export interface SkipData {
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost: number | null;
  per_tonne_cost: number | null;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: string;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}

export interface AddressData {
  postcode: string;
  city: string;
  streetName: string;
  houseNumber: string;
}

export interface WasteType {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface BookingData {
  address: AddressData;
  wasteTypes: string[];
  selectedSkip: SkipData | null;
  placement: 'private' | 'public';
  deliveryDate: Date | null;
  collectionDate: Date | null;
  permitRequired: boolean;
  additionalCharges: {
    permitFee: number;
    tonneBag: number;
  };
}

export interface PaymentData {
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
  country: string;
  saveCard: boolean;
}