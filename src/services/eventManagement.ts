
import { supabase } from '@/integrations/supabase/client';
import { ExtendedEventForManagement, EventFormData } from '@/types/eventManagement';

export class EventManagementService {
  static async getAllEvents(): Promise<ExtendedEventForManagement[]> {
    const { data, error } = await supabase
      .from('events')
      .select(`
        *
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    // Garantir que os campos obrigatórios existam
    const eventsWithDefaults = (data || []).map(event => ({
      ...event,
      event_type: event.event_type || 'evento',
      documents: event.documents || [],
      group_purchase_enabled: event.group_purchase_enabled || false,
      ticket_types: []
    }));

    return eventsWithDefaults as ExtendedEventForManagement[];
  }

  static async getEventsByFilters(filters: {
    status?: string;
    search?: string;
    partner?: string;
    event_type?: string;
    date_from?: string;
    date_to?: string;
  }): Promise<ExtendedEventForManagement[]> {
    let query = supabase
      .from('events')
      .select(`*`);

    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,location.ilike.%${filters.search}%`);
    }

    if (filters.partner) {
      query = query.eq('partner_name', filters.partner);
    }

    if (filters.event_type) {
      query = query.eq('event_type', filters.event_type);
    }

    if (filters.date_from) {
      query = query.gte('date', filters.date_from);
    }

    if (filters.date_to) {
      query = query.lte('date', filters.date_to);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    
    // Garantir que os campos obrigatórios existam
    const eventsWithDefaults = (data || []).map(event => ({
      ...event,
      event_type: event.event_type || 'evento',
      documents: event.documents || [],
      group_purchase_enabled: event.group_purchase_enabled || false,
      ticket_types: []
    }));

    return eventsWithDefaults as ExtendedEventForManagement[];
  }

  static async approveEvent(eventId: string, adminNotes?: string): Promise<void> {
    const { error } = await supabase
      .from('events')
      .update({
        status: 'approved',
        approved_at: new Date().toISOString(),
        admin_notes: adminNotes
      })
      .eq('id', eventId);

    if (error) throw error;

    // Log da ação
    await this.logAdminAction(eventId, 'approved', { admin_notes: adminNotes });
  }

  static async rejectEvent(eventId: string, reason: string, adminNotes?: string): Promise<void> {
    const { error } = await supabase
      .from('events')
      .update({
        status: 'rejected',
        rejection_reason: reason,
        admin_notes: adminNotes
      })
      .eq('id', eventId);

    if (error) throw error;

    // Log da ação
    await this.logAdminAction(eventId, 'rejected', { rejection_reason: reason, admin_notes: adminNotes });
  }

  static async cloneEvent(eventId: string): Promise<string> {
    // Buscar evento original
    const { data: originalEvent, error: fetchError } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .single();

    if (fetchError) throw fetchError;

    // Criar evento clonado
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
      event_type: originalEvent.event_type || 'evento',
      partner_name: originalEvent.partner_name,
      documents: originalEvent.documents || [],
      terms_text: originalEvent.terms_text,
      experience_text: originalEvent.experience_text,
      group_purchase_enabled: originalEvent.group_purchase_enabled || false,
      status: 'draft' as const,
      cloned_from_id: eventId
    };

    const { data: newEvent, error: createError } = await supabase
      .from('events')
      .insert(clonedEventData)
      .select()
      .single();

    if (createError) throw createError;

    // Log da ação
    await this.logAdminAction(newEvent.id, 'cloned', { cloned_from: eventId });

    return newEvent.id;
  }

  static async deactivateEvent(eventId: string): Promise<void> {
    const { error } = await supabase
      .from('events')
      .update({ status: 'cancelled' })
      .eq('id', eventId);

    if (error) throw error;

    await this.logAdminAction(eventId, 'deactivated');
  }

  static async createOrUpdateEvent(eventData: EventFormData, eventId?: string): Promise<string> {
    const { ticket_types, documents, ...eventFields } = eventData;

    if (eventId) {
      // Atualizar evento existente
      const { error } = await supabase
        .from('events')
        .update({
          ...eventFields,
          documents: documents,
          updated_at: new Date().toISOString()
        })
        .eq('id', eventId);

      if (error) throw error;

      await this.logAdminAction(eventId, 'edited');
      return eventId;
    } else {
      // Criar novo evento
      const { data: newEvent, error } = await supabase
        .from('events')
        .insert({
          ...eventFields,
          documents: documents,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      await this.logAdminAction(newEvent.id, 'created');
      return newEvent.id;
    }
  }

  static async getEventRegistrations(eventId: string) {
    const { data, error } = await supabase
      .from('event_registrations')
      .select(`
        *
      `)
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

  private static async logAdminAction(eventId: string, action: string, details: any = {}) {
    const { data: { user } } = await supabase.auth.getUser();
    
    try {
      await supabase
        .from('event_admin_logs')
        .insert({
          event_id: eventId,
          admin_user_id: user?.id,
          action,
          details
        });
    } catch (error) {
      console.error('Error logging admin action:', error);
      // Não falhar a operação principal se o log falhar
    }
  }
}
