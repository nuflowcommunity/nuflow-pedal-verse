
import { supabase } from '@/integrations/supabase/client';
import { ExtendedEventForManagement, EventFormData, EventTicketType } from '@/types/eventManagement';

export class EventManagementService {
  static async getAllEvents(): Promise<ExtendedEventForManagement[]> {
    const { data, error } = await supabase
      .from('events')
      .select(`
        *,
        payment_settings:event_payment_settings(*),
        custom_questions:event_custom_questions(*),
        ticket_types:event_ticket_types(*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
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
      .select(`
        *,
        payment_settings:event_payment_settings(*),
        custom_questions:event_custom_questions(*),
        ticket_types:event_ticket_types(*)
      `);

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
    return data || [];
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
      ...originalEvent,
      id: undefined,
      title: `${originalEvent.title} (Cópia)`,
      status: 'draft',
      cloned_from_id: eventId,
      created_at: undefined,
      updated_at: undefined,
      approved_at: null,
      approved_by: null,
      rejection_reason: null
    };

    const { data: newEvent, error: createError } = await supabase
      .from('events')
      .insert(clonedEventData)
      .select()
      .single();

    if (createError) throw createError;

    // Clonar tipos de ingresso
    const { data: ticketTypes } = await supabase
      .from('event_ticket_types')
      .select('*')
      .eq('event_id', eventId);

    if (ticketTypes?.length) {
      const clonedTickets = ticketTypes.map(ticket => ({
        ...ticket,
        id: undefined,
        event_id: newEvent.id,
        quantity_sold: 0
      }));

      await supabase
        .from('event_ticket_types')
        .insert(clonedTickets);
    }

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

      // Atualizar tipos de ingresso
      if (ticket_types?.length) {
        // Remover tipos antigos
        await supabase
          .from('event_ticket_types')
          .delete()
          .eq('event_id', eventId);

        // Inserir novos tipos
        const ticketsToInsert = ticket_types.map(ticket => ({
          ...ticket,
          event_id: eventId
        }));

        await supabase
          .from('event_ticket_types')
          .insert(ticketsToInsert);
      }

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

      // Inserir tipos de ingresso
      if (ticket_types?.length) {
        const ticketsToInsert = ticket_types.map(ticket => ({
          ...ticket,
          event_id: newEvent.id
        }));

        await supabase
          .from('event_ticket_types')
          .insert(ticketsToInsert);
      }

      await this.logAdminAction(newEvent.id, 'created');
      return newEvent.id;
    }
  }

  static async getEventRegistrations(eventId: string) {
    const { data, error } = await supabase
      .from('event_registrations')
      .select(`
        *,
        answers:event_registration_answers(
          *,
          question:event_custom_questions(*)
        )
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
    
    await supabase
      .from('event_admin_logs')
      .insert({
        event_id: eventId,
        admin_user_id: user?.id,
        action,
        details
      });
  }
}
