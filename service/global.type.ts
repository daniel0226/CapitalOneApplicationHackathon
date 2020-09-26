interface Merchant {
    _id: string;
    name: string;
    category: string[];
    geocode: Geocode;
    address: Address;
}

interface Geocode {
    lat: number;
    lng: number;
}
interface Address {
    street_number: string;
}

