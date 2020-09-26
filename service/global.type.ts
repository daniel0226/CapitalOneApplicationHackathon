export interface Merchant {
    _id: string;
    name: string;
    category: string[];
    geocode: Geocode;
    address: Address;
}

export interface Geocode {
    lat: number;
    lng: number;
}
export interface Address {
    street_number: string;
}

export interface Purchases {
    _id: string;
    merchant_id: string;
    medium: string;
    purchase_date: string;
    amount: number;
    status: string;
    description: string;
    type: string;
    payer_id: string;
}
