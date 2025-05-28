
import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LoadingButton } from '@/components/ui/loading-button';
import { useFeedback } from '@/hooks/useFeedback';

export interface ExportData {
  [key: string]: any;
}

export interface ExportConfig {
  filename: string;
  headers: { [key: string]: string };
  fields: string[];
}

interface ExportButtonsProps {
  data: ExportData[];
  config: ExportConfig;
  className?: string;
}

// CSV Export Function
const downloadCSV = (data: ExportData[], config: ExportConfig): void => {
  const headers = Object.keys(config.headers);
  const csvContent = [
    // Add headers
    headers.map(key => `"${config.headers[key]}"`).join(','),
    
    // Add data rows
    ...data.map(item => 
      headers.map(key => {
        const value = item[key];
        if (value == null) return '""';
        if (typeof value === 'object') return `"${JSON.stringify(value)}"`;
        return `"${String(value).replace(/"/g, '""')}"`;
      }).join(',')
    )
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${config.filename}_${new Date().toISOString().slice(0,10)}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Excel Export Function (simplified for demo - would use a library like exceljs in production)
const downloadExcel = (data: ExportData[], config: ExportConfig): void => {
  // For now, we'll create a tab-separated file with .xls extension
  // In production, you would use a library like exceljs or xlsx
  const headers = Object.keys(config.headers);
  const content = [
    headers.map(key => config.headers[key]).join('\t'),
    ...data.map(item => 
      headers.map(key => {
        const value = item[key];
        if (value == null) return '';
        if (typeof value === 'object') return JSON.stringify(value);
        return String(value);
      }).join('\t')
    )
  ].join('\n');
  
  const blob = new Blob([content], { type: 'application/vnd.ms-excel' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${config.filename}_${new Date().toISOString().slice(0,10)}.xls`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const ExportButtons: React.FC<ExportButtonsProps> = ({
  data,
  config,
  className = ""
}) => {
  const [isExportingCSV, setIsExportingCSV] = useState(false);
  const [isExportingExcel, setIsExportingExcel] = useState(false);
  const { showWarning, feedback } = useFeedback();

  const handleExport = async (format: 'csv' | 'excel') => {
    if (data.length === 0) {
      showWarning({
        title: "Nenhum dado para exportar",
        description: "Não há dados disponíveis para exportar.",
      });
      return;
    }

    const setLoading = format === 'csv' ? setIsExportingCSV : setIsExportingExcel;
    
    setLoading(true);
    
    try {
      // Add visual delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (format === 'csv') {
        downloadCSV(data, config);
        feedback.exportSuccess('arquivo CSV');
      } else {
        downloadExcel(data, config);
        feedback.exportSuccess('arquivo Excel');
      }
    } catch (error) {
      console.error(`Error exporting ${format}:`, error);
      feedback.exportError(`arquivo ${format.toUpperCase()}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      <LoadingButton
        variant="outline"
        size="sm"
        onClick={() => handleExport('csv')}
        loading={isExportingCSV}
        loadingText="Exportando..."
        icon={<FileText size={16} />}
        className="flex items-center gap-2"
      >
        CSV
      </LoadingButton>
      
      <LoadingButton
        variant="outline"
        size="sm"
        onClick={() => handleExport('excel')}
        loading={isExportingExcel}
        loadingText="Exportando..."
        icon={<FileSpreadsheet size={16} />}
        className="flex items-center gap-2"
      >
        Excel
      </LoadingButton>
    </div>
  );
};
