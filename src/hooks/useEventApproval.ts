
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { EventApprovalService } from '@/services/eventApproval';
import { EventApprovalAction } from '@/types/eventApproval';
import { useToast } from '@/hooks/use-toast';

export const useEventApproval = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('pending');
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Query para buscar eventos por status
  const {
    data: events = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['events-approval', selectedStatus],
    queryFn: () => EventApprovalService.getEventsByStatus(selectedStatus),
  });

  // Mutation para aprovar/rejeitar evento
  const approveRejectMutation = useMutation({
    mutationFn: (action: EventApprovalAction) => 
      EventApprovalService.approveOrRejectEvent(action),
    onSuccess: (_, variables) => {
      toast({
        title: "Sucesso!",
        description: variables.action === 'approve' 
          ? "Evento aprovado com sucesso!" 
          : "Evento rejeitado com sucesso!",
      });
      queryClient.invalidateQueries({ queryKey: ['events-approval'] });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Erro ao processar ação do evento.",
        variant: "destructive",
      });
      console.error('Error approving/rejecting event:', error);
    },
  });

  // Mutation para atualizar configurações de pagamento
  const updatePaymentMutation = useMutation({
    mutationFn: ({ eventId, settings }: { eventId: string; settings: any }) =>
      EventApprovalService.updatePaymentSettings(eventId, settings),
    onSuccess: () => {
      toast({
        title: "Sucesso!",
        description: "Configurações de pagamento atualizadas!",
      });
      queryClient.invalidateQueries({ queryKey: ['events-approval'] });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Erro ao atualizar configurações de pagamento.",
        variant: "destructive",
      });
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
