
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { EventManagementService } from '@/services/eventManagement';
import { ExtendedEventForManagement } from '@/types/eventManagement';
import { useFeedback } from '@/hooks/useFeedback';

interface EventFilters {
  status?: string;
  search?: string;
  partner?: string;
  event_type?: string;
  date_from?: string;
  date_to?: string;
}

export const useEventManagement = () => {
  const [filters, setFilters] = useState<EventFilters>({});
  const queryClient = useQueryClient();
  const { feedback } = useFeedback();

  const {
    data: events = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['events-management', filters],
    queryFn: () => EventManagementService.getEventsByFilters(filters),
    meta: {
      onError: () => {
        feedback.networkError();
      }
    }
  });

  const approveMutation = useMutation({
    mutationFn: ({ eventId, adminNotes }: { eventId: string; adminNotes?: string }) =>
      EventManagementService.approveEvent(eventId, adminNotes),
    onMutate: () => {
      feedback.processing();
    },
    onSuccess: () => {
      feedback.eventApproved();
      queryClient.invalidateQueries({ queryKey: ['events-management'] });
    },
    onError: () => {
      feedback.saveError('aprovar evento');
    }
  });

  const rejectMutation = useMutation({
    mutationFn: ({ eventId, reason, adminNotes }: { eventId: string; reason: string; adminNotes?: string }) =>
      EventManagementService.rejectEvent(eventId, reason, adminNotes),
    onMutate: () => {
      feedback.processing();
    },
    onSuccess: () => {
      feedback.eventRejected();
      queryClient.invalidateQueries({ queryKey: ['events-management'] });
    },
    onError: () => {
      feedback.saveError('rejeitar evento');
    }
  });

  const cloneMutation = useMutation({
    mutationFn: (eventId: string) => EventManagementService.cloneEvent(eventId),
    onMutate: () => {
      feedback.processing();
    },
    onSuccess: () => {
      feedback.saveSuccess('Evento clonado');
      queryClient.invalidateQueries({ queryKey: ['events-management'] });
    },
    onError: () => {
      feedback.saveError('clonar evento');
    }
  });

  const deactivateMutation = useMutation({
    mutationFn: (eventId: string) => EventManagementService.deactivateEvent(eventId),
    onMutate: () => {
      feedback.processing();
    },
    onSuccess: () => {
      feedback.saveSuccess('Evento desativado');
      queryClient.invalidateQueries({ queryKey: ['events-management'] });
    },
    onError: () => {
      feedback.saveError('desativar evento');
    }
  });

  const updateFilters = (newFilters: Partial<EventFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  return {
    events,
    isLoading,
    error,
    filters,
    updateFilters,
    clearFilters,
    refetch,
    approveEvent: approveMutation.mutate,
    rejectEvent: rejectMutation.mutate,
    cloneEvent: cloneMutation.mutate,
    deactivateEvent: deactivateMutation.mutate,
    isProcessing: approveMutation.isPending || rejectMutation.isPending || 
                  cloneMutation.isPending || deactivateMutation.isPending
  };
};
