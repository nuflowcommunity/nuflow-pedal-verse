
import { supabase } from '@/integrations/supabase/client';
import { ExtendedEvent, EventApprovalAction, EventPaymentSettings, EventCustomQuestion, EventQuestionOption } from '@/types/eventApproval';

export class EventApprovalService {
  // Buscar eventos por status
  static async getEventsByStatus(status?: string) {
    let query = supabase
      .from('events')
      .select(`
        *,
        event_payment_settings(*),
        event_custom_questions(
          *,
          event_question_options(*)
        )
      `)
      .order('created_at', { ascending: false });

    if (status && status !== 'all') {
      query = query.eq('status', status as any);
    }

    const { data, error } = await query;
    if (error) throw error;
    
    // Garantir que os campos obrigatórios existam
    const eventsWithDefaults = (data || []).map(event => ({
      ...event,
      event_type: event.event_type || 'evento',
      documents: event.documents || [],
      group_purchase_enabled: event.group_purchase_enabled || false
    }));

    return eventsWithDefaults as ExtendedEvent[];
  }

  // Aprovar ou rejeitar evento
  static async approveOrRejectEvent(action: EventApprovalAction) {
    const { eventId, action: actionType, reason, adminNotes } = action;
    
    const updateData: any = {
      status: actionType === 'approve' ? 'approved' : 'rejected',
      updated_at: new Date().toISOString(),
    };

    if (actionType === 'approve') {
      updateData.approved_at = new Date().toISOString();
      // TODO: Adicionar approved_by quando tivermos auth
    } else {
      updateData.rejection_reason = reason;
    }

    if (adminNotes) {
      updateData.admin_notes = adminNotes;
    }

    const { data, error } = await supabase
      .from('events')
      .update(updateData)
      .eq('id', eventId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Atualizar configurações de pagamento
  static async updatePaymentSettings(eventId: string, settings: Partial<EventPaymentSettings>) {
    const { data, error } = await supabase
      .from('event_payment_settings')
      .upsert({
        event_id: eventId,
        ...settings,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Criar pergunta customizada
  static async createCustomQuestion(question: Omit<EventCustomQuestion, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('event_custom_questions')
      .insert(question)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Atualizar pergunta customizada
  static async updateCustomQuestion(questionId: string, updates: Partial<EventCustomQuestion>) {
    const { data, error } = await supabase
      .from('event_custom_questions')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', questionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Deletar pergunta customizada
  static async deleteCustomQuestion(questionId: string) {
    const { error } = await supabase
      .from('event_custom_questions')
      .delete()
      .eq('id', questionId);

    if (error) throw error;
  }

  // Criar opção de pergunta
  static async createQuestionOption(option: Omit<EventQuestionOption, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('event_question_options')
      .insert(option)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Atualizar ordem das perguntas
  static async updateQuestionsOrder(questions: { id: string; sort_order: number }[]) {
    // Atualizar cada pergunta individualmente
    const updatePromises = questions.map(question => 
      supabase
        .from('event_custom_questions')
        .update({ 
          sort_order: question.sort_order,
          updated_at: new Date().toISOString()
        })
        .eq('id', question.id)
    );

    const results = await Promise.all(updatePromises);
    
    // Verificar se alguma atualização falhou
    const errors = results.filter(result => result.error);
    if (errors.length > 0) {
      throw errors[0].error;
    }

    return true;
  }

  // Buscar notificações de eventos
  static async getEventNotifications(userId?: string) {
    let query = supabase
      .from('event_notifications')
      .select('*')
      .order('created_at', { ascending: false });

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  // Marcar notificação como lida
  static async markNotificationAsRead(notificationId: string) {
    const { data, error } = await supabase
      .from('event_notifications')
      .update({ is_read: true })
      .eq('id', notificationId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}
