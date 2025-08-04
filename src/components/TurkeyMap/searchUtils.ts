import type { CityType } from './types';

/**
 * Normalizes Turkish characters for search comparison
 * Converts: ğ→g, ü→u, ş→s, ı→i, ö→o, ç→c
 */
export function normalizeTurkishText(text: string): string {
  const turkishCharMap: { [key: string]: string } = {
    'ğ': 'g', 'Ğ': 'G',
    'ü': 'u', 'Ü': 'U', 
    'ş': 's', 'Ş': 'S',
    'ı': 'i', 'I': 'i',
    'ö': 'o', 'Ö': 'O',
    'ç': 'c', 'Ç': 'C'
  };

  return text
    .split('')
    .map(char => turkishCharMap[char] || char)
    .join('')
    .toLowerCase()
    .trim();
}

/**
 * Filters cities by name using progressive search
 * Supports Turkish characters and case-insensitive matching
 * Returns cities that START WITH the search term
 */
export function filterCitiesByName(cities: CityType[], searchTerm: string): CityType[] {
  if (!searchTerm || searchTerm.trim() === '') {
    return [];
  }

  const normalizedSearchTerm = normalizeTurkishText(searchTerm);
  
  return cities.filter(city => {
    const normalizedCityName = normalizeTurkishText(city.name);
    return normalizedCityName.startsWith(normalizedSearchTerm);
  });
}

/**
 * Gets array of city IDs that match the search term
 */
export function getMatchingCityIds(cities: CityType[], searchTerm: string): string[] {
  const matchingCities = filterCitiesByName(cities, searchTerm);
  return matchingCities.map(city => city.id);
}

/**
 * Checks if a city matches the search term
 */
export function cityMatchesSearch(city: CityType, searchTerm: string): boolean {
  if (!searchTerm || searchTerm.trim() === '') {
    return false;
  }
  
  const normalizedSearchTerm = normalizeTurkishText(searchTerm);
  const normalizedCityName = normalizeTurkishText(city.name);
  
  return normalizedCityName.startsWith(normalizedSearchTerm);
}