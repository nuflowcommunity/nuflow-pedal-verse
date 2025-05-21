
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface EntityFiltersPanelProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  partnerFilter: string;
  setPartnerFilter: (value: string) => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  validationFilter: string;
  setValidationFilter: (value: string) => void;
  activeTab: string;
  partners: string[];
}

export const EntityFiltersPanel: React.FC<EntityFiltersPanelProps> = ({
  searchQuery,
  setSearchQuery,
  partnerFilter,
  setPartnerFilter,
  typeFilter,
  setTypeFilter,
  statusFilter,
  setStatusFilter,
  validationFilter,
  setValidationFilter,
  activeTab,
  partners,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="col-span-1 md:col-span-2">
          <div className="relative">
            <Input
              placeholder="Buscar por nome ou parceiro..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-full"
            />
            <Search className="absolute top-3 left-3 h-4 w-4 opacity-50" />
          </div>
        </div>
        <Select value={partnerFilter} onValueChange={setPartnerFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Parceiro" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="_all">Todos os parceiros</SelectItem>
            {partners.map(partner => (
              <SelectItem key={partner} value={partner}>{partner}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="_all">Todos os tipos</SelectItem>
            <SelectItem value="evento">Evento</SelectItem>
            <SelectItem value="mensalidade">Mensalidade</SelectItem>
            <SelectItem value="dayUse">Day Use</SelectItem>
            <SelectItem value="credito">Crédito</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="_all">Todos os status</SelectItem>
            <SelectItem value="ativo">Ativo</SelectItem>
            <SelectItem value="pendente">Pendente</SelectItem>
            <SelectItem value="cancelado">Cancelado</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Validation filter row */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
        {/* Filtro adicional para validação, visível apenas na aba de Créditos */}
        {(activeTab === 'credito' || activeTab === 'todos') && (
          <div className={activeTab === 'todos' ? "col-span-1 md:col-span-4" : "col-span-1 md:col-span-4"}>
            <Select value={validationFilter} onValueChange={setValidationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status de validação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="_all">Todos</SelectItem>
                <SelectItem value="validated">Validados</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="failed">Com falha</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </>
  );
};
