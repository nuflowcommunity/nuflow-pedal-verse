
import { Event } from "@/types/events";
import { SortOption } from "./types";

// Helper function to sort events
export const sortEvents = (events: Event[], sortOption: SortOption): Event[] => {
  const sortedEvents = [...events];
  
  switch (sortOption) {
    case 'date-asc':
      return sortedEvents.sort((a, b) => {
        const dateA = new Date(parseEventDate(a.date));
        const dateB = new Date(parseEventDate(b.date));
        return dateA.getTime() - dateB.getTime();
      });
    case 'date-desc':
      return sortedEvents.sort((a, b) => {
        const dateA = new Date(parseEventDate(a.date));
        const dateB = new Date(parseEventDate(b.date));
        return dateB.getTime() - dateA.getTime();
      });
    case 'price-asc':
      return sortedEvents.sort((a, b) => parsePriceToNumber(a.price) - parsePriceToNumber(b.price));
    case 'price-desc':
      return sortedEvents.sort((a, b) => parsePriceToNumber(b.price) - parsePriceToNumber(a.price));
    case 'name-asc':
      return sortedEvents.sort((a, b) => a.title.localeCompare(b.title));
    case 'name-desc':
      return sortedEvents.sort((a, b) => b.title.localeCompare(a.title));
    case 'popularity':
      // Placeholder for popularity sorting
      return sortedEvents;
    default:
      return sortedEvents;
  }
};

// Helper function to parse date strings
export const parseEventDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split(' ')[0].split(',')[0].split(' ');
  const monthMap: Record<string, number> = {
    'Jan': 0, 'Fev': 1, 'Mar': 2, 'Abr': 3, 'Mai': 4, 'Jun': 5,
    'Jul': 6, 'Ago': 7, 'Set': 8, 'Out': 9, 'Nov': 10, 'Dez': 11
  };
  return new Date(parseInt(year), monthMap[month], parseInt(day));
};

// Helper function to parse price string to number
export const parsePriceToNumber = (priceStr: string): number => {
  return parseFloat(priceStr.replace('R$ ', '').replace(',', '.')) || 0;
};
