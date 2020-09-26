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

