
export interface EventTicketType {
  id: string;
  event_id: string;
  name: string;
  description?: string;
  price: number;
  quantity_available?: number;
  quantity_sold: number;
  sale_start_date?: string;
  sale_end_date?: string;
  max_installments: number;
  access_count: number;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface EventDocument {
  id: string;
  name: string;
  url: string;
  type: 'presentation' | 'sponsor_logo' | 'supporter_logo' | 'other';
}

export interface ExtendedEventForManagement {
  id: string;
  title: string;
  description?: string;
  short_description?: string;
  image_url?: string;
  date: string;
  end_date?: string;
  location: string;
  city?: string;
  state?: string;
  price?: number;
  category: string;
  status: 'draft' | 'pending' | 'active' | 'approved' | 'rejected' | 'cancelled' | 'completed';
  max_participants?: number;
  created_at: string;
  updated_at: string;
  created_by?: string;
  approved_by?: string;
  approved_at?: string;
  rejection_reason?: string;
  admin_notes?: string;
  organizer?: string;
  distance?: string;
  elevation?: string;
  difficulty?: string;
  meeting_point?: string;
  google_maps_url?: string;
  event_type: string;
  partner_name?: string;
  documents: EventDocument[];
  terms_text?: string;
  experience_text?: string;
  group_purchase_enabled: boolean;
  cloned_from_id?: string;
  ticket_types?: EventTicketType[];
}

export interface EventFormData {
  // Informações gerais
  title: string;
  description: string;
  short_description: string;
  image_url?: string;
  event_type: string;
  category: string;
  
  // Local
  location: string;
  city: string;
  state: string;
  meeting_point?: string;
  google_maps_url?: string;
  
  // Datas
  date: string;
  end_date?: string;
  
  // Ingressos
  ticket_types: Omit<EventTicketType, 'id' | 'event_id' | 'created_at' | 'updated_at'>[];
  
  // Configurações
  max_participants?: number;
  difficulty?: string;
  distance?: string;
  elevation?: string;
  
  // Documentos
  documents: EventDocument[];
  
  // Textos extras
  terms_text?: string;
  experience_text?: string;
  group_purchase_enabled: boolean;
  
  // Organizador
  organizer?: string;
  partner_name?: string;
}
