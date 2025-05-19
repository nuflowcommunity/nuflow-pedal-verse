
// Define the types for events
export interface Event {
  id: string;
  title: string;
  image?: string;
  image_url?: string;
  date: string;
  location: string;
  price: string;
  category: string;
  status?: string;
  description?: string;
  organizer?: string;
  time?: string;
  distance?: string;
  elevation?: string;
  difficulty?: string;
  maxParticipants?: number;
  registeredParticipants?: number;
  includes?: string[];
  requirements?: string[];
  meetingPoint?: string;
  googleMapsUrl?: string;
  images?: string[];
}

// Type for event incluído na database do Supabase
export interface SupabaseEvent {
  id: string;
  title: string;
  image_url?: string;
  date: Date;
  location: string;
  price: number;
  category: string;
  status: string;
  description?: string;
  short_description?: string;
  organizer?: string;
  distance?: string;
  elevation?: string;
  difficulty?: string;
  max_participants?: number;
  meeting_point?: string;
  google_maps_url?: string;
  city?: string;
  state?: string;
  created_at: Date;
  updated_at: Date;
  created_by?: string;
  end_date?: Date;
}

// Converter Supabase Event to UI Event
export const mapSupabaseEventToEvent = (event: SupabaseEvent): Event => {
  // Format date as "DD MMM, YYYY"
  const date = new Date(event.date);
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const formattedDate = `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
  
  // Format time if end_date exists
  let time;
  if (event.end_date) {
    const startTime = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const endTime = new Date(event.end_date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    time = `${startTime} - ${endTime}`;
  }
  
  // Format price to Brazilian currency
  const formattedPrice = event.price ? `R$ ${event.price.toFixed(2).replace('.', ',')}` : 'Gratuito';
  
  return {
    id: event.id,
    title: event.title,
    image: event.image_url,
    image_url: event.image_url,
    date: formattedDate,
    location: event.location,
    price: formattedPrice,
    category: event.category,
    status: event.status,
    description: event.description,
    organizer: event.organizer,
    time: time,
    distance: event.distance,
    elevation: event.elevation,
    difficulty: event.difficulty,
    maxParticipants: event.max_participants,
    meetingPoint: event.meeting_point,
    googleMapsUrl: event.google_maps_url
  };
};
