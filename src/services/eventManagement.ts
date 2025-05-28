
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
    
    // Garantir que os campos obrigatórios existam com type assertions
    const eventsWithDefaults = (data || []).map(event => ({
      ...event,
      event_type: (event as any).event_type || 'evento',
      documents: (event as any).documents || [],
      group_purchase_enabled: (event as any).group_purchase_enabled || false,
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
      query = query.eq('status', filters.status as any);
    }

    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,location.ilike.%${filters.search}%`);
    }

    if (filters.partner) {
      // Type assertion para campos que não existem no schema atual
      query = query.eq('partner_name' as any, filters.partner);
    }

    if (filters.event_type) {
      query = query.eq('event_type' as any, filters.event_type);
    }

    if (filters.date_from) {
      query = query.gte('date', filters.date_from);
    }

    if (filters.date_to) {
      query = query.lte('date', filters.date_to);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    
    // Garantir que os campos obrigatórios existam com type assertions
    const eventsWithDefaults = (data || []).map(event => ({
      ...event,
      event_type: (event as any).event_type || 'evento',
      documents: (event as any).documents || [],
      group_purchase_enabled: (event as any).group_purchase_enabled || false,
      ticket_types: []
    }));

    return eventsWithDefaults as ExtendedEventForManagement[];
  }

  static async approveEvent(eventId: string, adminNotes?: string): Promise<void> {
    const updateData: any = {
      status: 'approved' as any,
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

    // Log da ação
    await this.logAdminAction(eventId, 'approved', { admin_notes: adminNotes });
  }

  static async rejectEvent(eventId: string, reason: string, adminNotes?: string): Promise<void> {
    const updateData: any = {
      status: 'rejected' as any,
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

    // Criar evento clonado - usando apenas campos que existem no schema
    const clonedEventData: any = {
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
      status: 'draft' as any,
    };

    // Adicionar campos extras que podem não existir no schema atual
    if ((originalEvent as any).event_type) {
      clonedEventData.event_type = (originalEvent as any).event_type;
    }
    if ((originalEvent as any).partner_name) {
      clonedEventData.partner_name = (originalEvent as any).partner_name;
    }
    if ((originalEvent as any).documents) {
      clonedEventData.documents = (originalEvent as any).documents;
    }
    if ((originalEvent as any).terms_text) {
      clonedEventData.terms_text = (originalEvent as any).terms_text;
    }
    if ((originalEvent as any).experience_text) {
      clonedEventData.experience_text = (originalEvent as any).experience_text;
    }
    if ((originalEvent as any).group_purchase_enabled !== undefined) {
      clonedEventData.group_purchase_enabled = (originalEvent as any).group_purchase_enabled;
    }
    if ((originalEvent as any).cloned_from_id) {
      clonedEventData.cloned_from_id = eventId;
    }

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
      .update({ status: 'cancelled' as any })
      .eq('id', eventId);

    if (error) throw error;

    await this.logAdminAction(eventId, 'deactivated');
  }

  static async createOrUpdateEvent(eventData: EventFormData, eventId?: string): Promise<string> {
    const { ticket_types, documents, ...eventFields } = eventData;

    // Preparar dados básicos que existem no schema
    const baseEventData: any = {
      title: eventFields.title,
      description: eventFields.description,
      short_description: eventFields.short_description,
      image_url: eventFields.image_url,
      category: eventFields.category,
      location: eventFields.location,
      city: eventFields.city,
      state: eventFields.state,
      meeting_point: eventFields.meeting_point,
      google_maps_url: eventFields.google_maps_url,
      date: eventFields.date,
      end_date: eventFields.end_date,
      max_participants: eventFields.max_participants,
      difficulty: eventFields.difficulty,
      distance: eventFields.distance,
      elevation: eventFields.elevation,
      organizer: eventFields.organizer,
    };

    // Adicionar campos extras com type assertions
    if (eventFields.event_type) {
      (baseEventData as any).event_type = eventFields.event_type;
    }
    if (eventFields.partner_name) {
      (baseEventData as any).partner_name = eventFields.partner_name;
    }
    if (documents) {
      (baseEventData as any).documents = documents;
    }
    if (eventFields.terms_text) {
      (baseEventData as any).terms_text = eventFields.terms_text;
    }
    if (eventFields.experience_text) {
      (baseEventData as any).experience_text = eventFields.experience_text;
    }
    if (eventFields.group_purchase_enabled !== undefined) {
      (baseEventData as any).group_purchase_enabled = eventFields.group_purchase_enabled;
    }

    if (eventId) {
      // Atualizar evento existente
      const updateData = {
        ...baseEventData,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('events')
        .update(updateData)
        .eq('id', eventId);

      if (error) throw error;

      await this.logAdminAction(eventId, 'edited');
      return eventId;
    } else {
      // Criar novo evento
      const insertData = {
        ...baseEventData,
        status: 'pending' as any
      };

      const { data: newEvent, error } = await supabase
        .from('events')
        .insert(insertData)
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
      // Tentar inserir no log de admin, mas não falhar se a tabela não existir
      await supabase
        .from('event_admin_logs' as any)
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
