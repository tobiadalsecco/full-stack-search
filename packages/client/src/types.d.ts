export type Hotel = { 
  _id: string, 
  hotel_name: string; 
};

export type City = {
  _id: string, 
  name: string;
};

export type Country = {
  _id: string, 
  country: string;
};

export type SearchResponse = {
  hotels: Hotel[],
  countries: Country[],
  cities: City[];
};