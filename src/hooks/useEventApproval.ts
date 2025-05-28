
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { EventApprovalService } from '@/services/eventApproval';
import { EventApprovalAction } from '@/types/eventApproval';
import { useFeedback } from '@/hooks/useFeedback';

export const useEventApproval = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('pending');
  const queryClient = useQueryClient();
  const { feedback } = useFeedback();

  // Query para buscar eventos por status
  const {
    data: events = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['events-approval', selectedStatus],
    queryFn: () => EventApprovalService.getEventsByStatus(selectedStatus),
    meta: {
      onError: () => {
        feedback.networkError();
      }
    }
  });

  // Mutation para aprovar/rejeitar evento
  const approveRejectMutation = useMutation({
    mutationFn: (action: EventApprovalAction) => 
      EventApprovalService.approveOrRejectEvent(action),
    onMutate: () => {
      feedback.processing();
    },
    onSuccess: (_, variables) => {
      if (variables.action === 'approve') {
        feedback.eventApproved();
      } else {
        feedback.eventRejected();
      }
      queryClient.invalidateQueries({ queryKey: ['events-approval'] });
    },
    onError: (error) => {
      feedback.showError({
        title: "Erro ao processar evento",
        description: "Não foi possível processar a ação do evento. Tente novamente.",
      });
      console.error('Error approving/rejecting event:', error);
    },
  });

  // Mutation para atualizar configurações de pagamento
  const updatePaymentMutation = useMutation({
    mutationFn: ({ eventId, settings }: { eventId: string; settings: any }) =>
      EventApprovalService.updatePaymentSettings(eventId, settings),
    onMutate: () => {
      feedback.saving();
    },
    onSuccess: () => {
      feedback.saveSuccess("Configurações de pagamento");
      queryClient.invalidateQueries({ queryKey: ['events-approval'] });
    },
    onError: (error) => {
      feedback.saveError("configurações de pagamento");
      console.error('Error updating payment settings:', error);
    },
  });

  return {
    events,
    isLoading,
    error,
    selectedStatus,
    setSelectedStatus,
    refetch,
    approveEvent: (eventId: string, adminNotes?: string) => 
      approveRejectMutation.mutate({ eventId, action: 'approve', adminNotes }),
    rejectEvent: (eventId: string, reason: string, adminNotes?: string) => 
      approveRejectMutation.mutate({ eventId, action: 'reject', reason, adminNotes }),
    updatePaymentSettings: updatePaymentMutation.mutate,
    isProcessing: approveRejectMutation.isPending || updatePaymentMutation.isPending,
  };
};
