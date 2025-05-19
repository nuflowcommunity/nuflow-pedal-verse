
import { Event } from "@/types/events";

// Export event data to CSV
export const exportEventsToCSV = (events: Event[]): string => {
  const headers = 'ID,Título,Data,Local,Preço,Categoria,Status\n';
  const csvContent = headers + events.map(event => 
    `${event.id},"${event.title}","${event.date}","${event.location}","${event.price}","${event.category}","${event.status || ''}"`
  ).join('\n');
  
  return csvContent;
};

// Export event data to XLS (simplified - in a real app we'd use a library like xlsx)
export const exportEventsToXLS = (events: Event[]): Blob => {
  // This is a simplified version for demonstration
  // In a real app, use a library like xlsx to create a proper Excel file
  const csvContent = exportEventsToCSV(events);
  return new Blob([csvContent], { type: 'application/vnd.ms-excel' });
};

// Download events as CSV or XLS
export const downloadEvents = (events: Event[], format: 'csv' | 'xls'): void => {
  try {
    let content: string | Blob;
    let mimeType: string;
    let extension: string;
    
    if (format === 'csv') {
      content = exportEventsToCSV(events);
      mimeType = 'text/csv';
      extension = 'csv';
    } else {
      content = exportEventsToXLS(events);
      mimeType = 'application/vnd.ms-excel';
      extension = 'xls';
    }
    
    const blob = content instanceof Blob ? content : new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.download = `eventos-nuflow-${new Date().toISOString().split('T')[0]}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error(`Error exporting events to ${format.toUpperCase()}:`, error);
  }
};
