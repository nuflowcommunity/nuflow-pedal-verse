
import { supabase } from "@/integrations/supabase/client";
import { Event, SupabaseEvent, mapSupabaseEventToEvent } from "@/types/events";
import { EventCategory, SortOption } from "./types";
import { sortEvents } from "./utils";

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
    
    // Use type assertion to handle data returned from Supabase
    return (data as unknown as SupabaseEvent[]).map(mapSupabaseEventToEvent);
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
    
    // Use type assertion to handle data returned from Supabase
    return (data as unknown as SupabaseEvent[]).map(mapSupabaseEventToEvent);
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
    
    // Use type assertion to handle data returned from Supabase
    return (data as unknown as SupabaseEvent[]).map(mapSupabaseEventToEvent);
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
    
    // Use type assertion for data returned from Supabase
    const event = mapSupabaseEventToEvent(data as unknown as SupabaseEvent);
    
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
      const validCategories: EventCategory[] = ["MTB", "Speed", "Gravel", "Urbano", "Outro"];
      // Check if the category is valid before using it in the query
      if (validCategories.includes(category as EventCategory)) {
        query = query.eq("category", category);
      }
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
    
    // Map to Event objects using type assertion
    let events = (data as unknown as SupabaseEvent[]).map(mapSupabaseEventToEvent);
    
    // Apply sorting
    if (sortOption) {
      events = sortEvents(events, sortOption as SortOption);
    }
    
    return events;
  } catch (error) {
    console.error("Unexpected error filtering events:", error);
    return [];
  }
};
