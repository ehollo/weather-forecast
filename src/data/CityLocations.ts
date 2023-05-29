import { LocationCoords } from "../hooks/useLocation";

export const Cities = [
  "London, GB",
  "Paris, FR",
  "Rome, IT",
  "New York, USA",
  "Cydney, AU",
  "Tokyo, JP",
];
export const CityLocations: Map<string, LocationCoords> = new Map<
  string,
  LocationCoords
>([
  ["London, GB", { lat: 51.5085, lon: -0.1257 }],
  ["Paris, FR", { lat: 48.85341, lon: 2.3488 }],
  ["Cydney, AU", { lat: -33.865143, lon: 151.2099 }],
  ["Tokyo, JP", { lat: 35.652832, lon: 139.839478 }],
  ["Rome, IT", { lat: 41.902782, lon: 12.496366 }],
  ["New York, USA", { lat: 40.73061, lon: -73.935242 }],
]);
