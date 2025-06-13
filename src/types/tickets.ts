
export interface TicketType {
  id: string;
  name: string;
  price: number;
  description?: string;
  available: boolean;
  maxQuantity?: number;
}

export interface PurchaseData {
  eventId: string;
  ticketTypeId: string;
  couponCode?: string;
  finalPrice: number;
  discount: number;
}
