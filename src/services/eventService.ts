
import { supabase } from "@/integrations/supabase/client";
import { Event, SupabaseEvent, mapSupabaseEventToEvent } from "@/types/events";

// Get all events
export const getAllEvents = async (): Promise<Event[]> => {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true });
    
    if (error) {
      console.error("Error fetching events:", error);
      return [];
    }
    
    return (data as SupabaseEvent[]).map(mapSupabaseEventToEvent);
  } catch (error) {
    console.error("Unexpected error fetching events:", error);
    return [];
  }
};

// Get upcoming events
export const getUpcomingEvents = async (): Promise<Event[]> => {
  try {
    const { data, error } = await supabase
      .rpc("get_upcoming_events");
    
    if (error) {
      console.error("Error fetching upcoming events:", error);
      return [];
    }
    
    return (data as SupabaseEvent[]).map(mapSupabaseEventToEvent);
  } catch (error) {
    console.error("Unexpected error fetching upcoming events:", error);
    return [];
  }
};

// Get past events
export const getPastEvents = async (): Promise<Event[]> => {
  try {
    const { data, error } = await supabase
      .rpc("get_past_events");
    
    if (error) {
      console.error("Error fetching past events:", error);
      return [];
    }
    
    return (data as SupabaseEvent[]).map(mapSupabaseEventToEvent);
  } catch (error) {
    console.error("Unexpected error fetching past events:", error);
    return [];
  }
};

// Get event by ID
export const getEventById = async (id: string): Promise<Event | null> => {
  try {
    const { data, error } = await supabase
      .from("events")
      .select(`
        *,
        event_requirements(id, description),
        event_inclusions(id, description),
        event_images(id, image_url, is_primary)
      `)
      .eq("id", id)
      .single();
    
    if (error) {
      console.error("Error fetching event:", error);
      return null;
    }
    
    if (!data) return null;
    
    const event = mapSupabaseEventToEvent(data);
    
    // Add additional data
    if (data.event_requirements) {
      event.requirements = data.event_requirements.map((req: any) => req.description);
    }
    
    if (data.event_inclusions) {
      event.includes = data.event_inclusions.map((inc: any) => inc.description);
    }
    
    if (data.event_images) {
      event.images = data.event_images.map((img: any) => img.image_url);
    }
    
    return event;
  } catch (error) {
    console.error("Unexpected error fetching event:", error);
    return null;
  }
};

// Filter and sort events
export const filterAndSortEvents = async (
  category?: string,
  searchQuery?: string,
  sortOption?: string,
  dateFrom?: Date,
  dateTo?: Date
): Promise<Event[]> => {
  try {
    let query = supabase.from("events").select("*");
    
    // Apply category filter if specified
    if (category && category !== 'Todos') {
      query = query.eq("category", category);
    }
    
    // Apply search query if specified
    if (searchQuery) {
      query = query.or(`title.ilike.%${searchQuery}%,location.ilike.%${searchQuery}%`);
    }
    
    // Apply date range filter if specified
    if (dateFrom) {
      query = query.gte("date", dateFrom.toISOString());
    }
    
    if (dateTo) {
      query = query.lte("date", dateTo.toISOString());
    }
    
    // Execute query
    const { data, error } = await query;
    
    if (error) {
      console.error("Error filtering events:", error);
      return [];
    }
    
    // Map to Event objects
    let events = (data as SupabaseEvent[]).map(mapSupabaseEventToEvent);
    
    // Apply sorting
    if (sortOption) {
      events = sortEvents(events, sortOption);
    }
    
    return events;
  } catch (error) {
    console.error("Unexpected error filtering events:", error);
    return [];
  }
};

// Helper function to sort events
export const sortEvents = (events: Event[], sortOption: string): Event[] => {
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
    default:
      return sortedEvents;
  }
};

// Helper function to parse date strings
const parseEventDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split(' ')[0].split(',')[0].split(' ');
  const monthMap: Record<string, number> = {
    'Jan': 0, 'Fev': 1, 'Mar': 2, 'Abr': 3, 'Mai': 4, 'Jun': 5,
    'Jul': 6, 'Ago': 7, 'Set': 8, 'Out': 9, 'Nov': 10, 'Dez': 11
  };
  return new Date(parseInt(year), monthMap[month], parseInt(day));
};

// Helper function to parse price string to number
const parsePriceToNumber = (priceStr: string): number => {
  return parseFloat(priceStr.replace('R$ ', '').replace(',', '.')) || 0;
};

// Export event data to CSV
export const exportEventsToCSV = (events: Event[]): string => {
  const headers = 'ID,Título,Data,Local,Preço,Categoria,Status\n';
  const csvContent = headers + events.map(event => 
    `${event.id},"${event.title}","${event.date}","${event.location}","${event.price}","${event.category}","${event.status || ''}"`
  ).join('\n');
  
  return csvContent;
};

// Export event data to XLS (simplified - in a real app we'd use a library like xlsx)
export const exportEventsToXLS = (events: Event[]): Blob => {
  // This is a simplified version for demonstration
  // In a real app, use a library like xlsx to create a proper Excel file
  const csvContent = exportEventsToCSV(events);
  return new Blob([csvContent], { type: 'application/vnd.ms-excel' });
};

// Download events as CSV or XLS
export const downloadEvents = (events: Event[], format: 'csv' | 'xls'): void => {
  try {
    let content: string | Blob;
    let mimeType: string;
    let extension: string;
    
    if (format === 'csv') {
      content = exportEventsToCSV(events);
      mimeType = 'text/csv';
      extension = 'csv';
    } else {
      content = exportEventsToXLS(events);
      mimeType = 'application/vnd.ms-excel';
      extension = 'xls';
    }
    
    const blob = content instanceof Blob ? content : new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.download = `eventos-nuflow-${new Date().toISOString().split('T')[0]}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error(`Error exporting events to ${format.toUpperCase()}:`, error);
  }
};
