
import React, { useState } from 'react';
import { LoadingButton } from '@/components/ui/loading-button';
import { Download } from 'lucide-react';
import { Event } from '@/types/events';
import { downloadEvents } from '@/services/events';
import { useFeedback } from '@/hooks/useFeedback';
import { ExportFormat } from '@/services/events/types';

interface ExportEventsButtonProps {
  events: Event[];
  format: ExportFormat;
}

const ExportEventsButton = ({ events, format }: ExportEventsButtonProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const { feedback } = useFeedback();

  const handleExport = async () => {
    if (events.length === 0) {
      feedback.showWarning({
        title: "Nenhum evento para exportar",
        description: "Não há eventos disponíveis para exportar.",
      });
      return;
    }

    setIsExporting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay para feedback visual
      downloadEvents(events, format);
      feedback.exportSuccess(`Arquivo ${format.toUpperCase()}`);
    } catch (error) {
      console.error(`Error exporting to ${format}:`, error);
      feedback.exportError(`arquivo ${format.toUpperCase()}`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <LoadingButton 
      variant="outline" 
      className="flex items-center gap-2 border-nuflow-mineral/30"
      onClick={handleExport}
      loading={isExporting}
      loadingText="Exportando..."
      icon={<Download size={18} />}
    >
      {format.toUpperCase()}
    </LoadingButton>
  );
};

export default ExportEventsButton;
