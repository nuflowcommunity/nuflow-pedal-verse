// Event category type that matches the database enum
export type EventCategory = "MTB" | "Speed" | "Gravel" | "Urbano" | "Outro";

// Event status type
export type EventStatus = "active" | "cancelled" | "completed" | "draft";

// Export format type
export type ExportFormat = 'csv' | 'pdf' | 'xlsx';

// Sort options type
export type SortOption = "date-asc" | "date-desc" | "price-asc" | "price-desc" | "name-asc" | "name-desc" | "popularity" | "";
