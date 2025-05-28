
export interface Pass {
  id: string;
  type: 'day_use' | 'mensalista' | 'evento' | 'credito';
  partner: string;
  participantName: string;
  participantEmail: string;
  purchaseDate: string;
  validDate?: string;
  status: 'usado' | 'futuro' | 'cancelado';
  price: number;
  validUntil?: string;
  usedAt?: string;
  createdAt: string;
}

export interface PassesFilters {
  type: string;
  partner: string;
  status: string;
  startDate?: Date;
  endDate?: Date;
}

export interface PassesStats {
  futuros: number;
  usados: number;
  total: number;
}
