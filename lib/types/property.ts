export interface IProperty {
  address: string;
  _id: string;
  acres: number;
  name: string;
  description: string;
  photos: string[];
  insurance: string;
  gameAvailable: string;
  pricePerNight: number;
  city: string;
  owner: string;
  bookedDates: string[];
  location: { latitude: number; longitude: number };
}
