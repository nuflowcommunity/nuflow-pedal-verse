
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Event } from '@/types/events';
import { downloadEvents } from '@/services/events';
import { useToast } from '@/components/ui/use-toast';
import { ExportFormat } from '@/services/events/types';

interface ExportEventsButtonProps {
  events: Event[];
  format: ExportFormat;
}

const ExportEventsButton = ({ events, format }: ExportEventsButtonProps) => {
  const { toast } = useToast();

  const handleExport = () => {
    try {
      downloadEvents(events, format);
      toast({
        title: "Download iniciado",
        description: `Os eventos foram exportados para ${format.toUpperCase()}.`,
      });
    } catch (error) {
      console.error(`Error exporting to ${format}:`, error);
      toast({
        title: "Erro ao exportar eventos",
        description: "Houve um problema ao exportar os eventos. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button 
      variant="outline" 
      className="flex items-center gap-2 border-nuflow-mineral/30"
      onClick={handleExport}
    >
      <Download size={18} />
      {format.toUpperCase()}
    </Button>
  );
};

export default ExportEventsButton;
