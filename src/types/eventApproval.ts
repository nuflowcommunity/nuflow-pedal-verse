
export type EventStatus = 'draft' | 'pending' | 'active' | 'approved' | 'rejected' | 'cancelled' | 'completed';

export type QuestionType = 'text' | 'textarea' | 'select' | 'radio' | 'checkbox';

export interface EventPaymentSettings {
  id: string;
  event_id: string;
  max_installments: number;
  min_installment_amount?: number;
  allow_installments: boolean;
  created_at: string;
  updated_at: string;
}

export interface EventCustomQuestion {
  id: string;
  event_id: string;
  question_text: string;
  question_type: QuestionType;
  is_required: boolean;
  sort_order: number;
  placeholder_text?: string;
  created_at: string;
  updated_at: string;
  options?: EventQuestionOption[];
}

export interface EventQuestionOption {
  id: string;
  question_id: string;
  option_text: string;
  option_value: string;
  sort_order: number;
  created_at: string;
}

export interface EventRegistrationAnswer {
  id: string;
  registration_id: string;
  question_id: string;
  answer_text?: string;
  selected_options?: any;
  created_at: string;
}

export interface EventNotification {
  id: string;
  event_id: string;
  user_id: string;
  notification_type: 'approved' | 'rejected' | 'edited';
  message: string;
  is_read: boolean;
  created_at: string;
}

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

export interface ExtendedEvent {
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
  status: EventStatus;
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
  
  // Novos campos
  event_type: string;
  partner_name?: string;
  documents: EventDocument[];
  terms_text?: string;
  experience_text?: string;
  group_purchase_enabled: boolean;
  cloned_from_id?: string;
  
  // Relacionamentos
  payment_settings?: EventPaymentSettings;
  custom_questions?: EventCustomQuestion[];
  ticket_types?: EventTicketType[];
}

export interface EventApprovalAction {
  eventId: string;
  action: 'approve' | 'reject';
  reason?: string;
  adminNotes?: string;
}
