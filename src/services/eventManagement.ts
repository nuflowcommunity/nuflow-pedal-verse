
import { supabase } from '@/integrations/supabase/client';
import { ExtendedEventForManagement, EventFormData } from '@/types/eventManagement';

export class EventManagementService {
  static async getAllEvents(): Promise<ExtendedEventForManagement[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return (data || []).map(event => ({
      ...event,
      event_type: (event as any).event_type || 'evento',
      documents: (event as any).documents || [],
      group_purchase_enabled: (event as any).group_purchase_enabled || false,
      ticket_types: []
    })) as ExtendedEventForManagement[];
  }

  static async getEventsByFilters(filters: {
    status?: string;
    search?: string;
    partner?: string;
    event_type?: string;
    date_from?: string;
    date_to?: string;
  }): Promise<ExtendedEventForManagement[]> {
    let query = supabase.from('events').select('*');

    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,location.ilike.%${filters.search}%`);
    }

    if (filters.partner) {
      query = query.eq('organizer', filters.partner);
    }

    if (filters.event_type) {
      query = query.eq('category', filters.event_type);
    }

    if (filters.date_from) {
      query = query.gte('date', filters.date_from);
    }

    if (filters.date_to) {
      query = query.lte('date', filters.date_to);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    
    return (data || []).map(event => ({
      ...event,
      event_type: (event as any).event_type || event.category || 'evento',
      documents: (event as any).documents || [],
      group_purchase_enabled: (event as any).group_purchase_enabled || false,
      ticket_types: []
    })) as ExtendedEventForManagement[];
  }

  static async approveEvent(eventId: string, adminNotes?: string): Promise<void> {
    const updateData: any = {
      status: 'approved',
      approved_at: new Date().toISOString(),
    };

    if (adminNotes) {
      updateData.admin_notes = adminNotes;
    }

    const { error } = await supabase
      .from('events')
      .update(updateData)
      .eq('id', eventId);

    if (error) throw error;
  }

  static async rejectEvent(eventId: string, reason: string, adminNotes?: string): Promise<void> {
    const updateData: any = {
      status: 'rejected',
      rejection_reason: reason,
    };

    if (adminNotes) {
      updateData.admin_notes = adminNotes;
    }

    const { error } = await supabase
      .from('events')
      .update(updateData)
      .eq('id', eventId);

    if (error) throw error;
  }

  static async cloneEvent(eventId: string): Promise<string> {
    const { data: originalEvent, error: fetchError } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .single();

    if (fetchError) throw fetchError;

    const clonedEventData = {
      title: `${originalEvent.title} (Cópia)`,
      description: originalEvent.description,
      short_description: originalEvent.short_description,
      image_url: originalEvent.image_url,
      date: originalEvent.date,
      end_date: originalEvent.end_date,
      location: originalEvent.location,
      city: originalEvent.city,
      state: originalEvent.state,
      price: originalEvent.price,
      category: originalEvent.category,
      max_participants: originalEvent.max_participants,
      organizer: originalEvent.organizer,
      distance: originalEvent.distance,
      elevation: originalEvent.elevation,
      difficulty: originalEvent.difficulty,
      meeting_point: originalEvent.meeting_point,
      google_maps_url: originalEvent.google_maps_url,
      status: 'draft',
    };

    const { data: newEvent, error: createError } = await supabase
      .from('events')
      .insert(clonedEventData)
      .select()
      .single();

    if (createError) throw createError;

    return newEvent.id;
  }

  static async deactivateEvent(eventId: string): Promise<void> {
    const { error } = await supabase
      .from('events')
      .update({ status: 'cancelled' })
      .eq('id', eventId);

    if (error) throw error;
  }

  static async createOrUpdateEvent(eventData: EventFormData, eventId?: string): Promise<string> {
    const baseEventData = {
      title: eventData.title,
      description: eventData.description,
      short_description: eventData.short_description,
      image_url: eventData.image_url,
      category: eventData.category,
      location: eventData.location,
      city: eventData.city,
      state: eventData.state,
      meeting_point: eventData.meeting_point,
      google_maps_url: eventData.google_maps_url,
      date: eventData.date,
      end_date: eventData.end_date,
      max_participants: eventData.max_participants,
      difficulty: eventData.difficulty,
      distance: eventData.distance,
      elevation: eventData.elevation,
      organizer: eventData.organizer,
    };

    if (eventId) {
      const { error } = await supabase
        .from('events')
        .update({
          ...baseEventData,
          updated_at: new Date().toISOString()
        })
        .eq('id', eventId);

      if (error) throw error;
      return eventId;
    } else {
      const { data: newEvent, error } = await supabase
        .from('events')
        .insert({
          ...baseEventData,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;
      return newEvent.id;
    }
  }

  static async getEventRegistrations(eventId: string) {
    const { data, error } = await supabase
      .from('event_registrations')
      .select('*')
      .eq('event_id', eventId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async exportEventData(eventId: string, format: 'csv' | 'xlsx') {
    const registrations = await this.getEventRegistrations(eventId);
    const { data: event } = await supabase
      .from('events')
      .select('title')
      .eq('id', eventId)
      .single();

    return {
      data: registrations,
      filename: `inscricoes_${event?.title?.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}`,
      format
    };
  }
}
