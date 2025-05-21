export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      event_images: {
        Row: {
          created_at: string
          event_id: string
          id: string
          image_url: string
          is_primary: boolean | null
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: string
          image_url: string
          is_primary?: boolean | null
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          image_url?: string
          is_primary?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "event_images_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_inclusions: {
        Row: {
          created_at: string
          description: string
          event_id: string
          id: string
        }
        Insert: {
          created_at?: string
          description: string
          event_id: string
          id?: string
        }
        Update: {
          created_at?: string
          description?: string
          event_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_inclusions_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_registrations: {
        Row: {
          created_at: string
          event_id: string
          id: string
          payment_id: string | null
          payment_status: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: string
          payment_id?: string | null
          payment_status?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          payment_id?: string | null
          payment_status?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_requirements: {
        Row: {
          created_at: string
          description: string
          event_id: string
          id: string
        }
        Insert: {
          created_at?: string
          description: string
          event_id: string
          id?: string
        }
        Update: {
          created_at?: string
          description?: string
          event_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_requirements_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          category: Database["public"]["Enums"]["event_category"]
          city: string | null
          created_at: string
          created_by: string | null
          date: string
          description: string | null
          difficulty: string | null
          distance: string | null
          elevation: string | null
          end_date: string | null
          google_maps_url: string | null
          id: string
          image_url: string | null
          location: string
          max_participants: number | null
          meeting_point: string | null
          organizer: string | null
          price: number | null
          short_description: string | null
          state: string | null
          status: Database["public"]["Enums"]["event_status"]
          title: string
          updated_at: string
        }
        Insert: {
          category: Database["public"]["Enums"]["event_category"]
          city?: string | null
          created_at?: string
          created_by?: string | null
          date: string
          description?: string | null
          difficulty?: string | null
          distance?: string | null
          elevation?: string | null
          end_date?: string | null
          google_maps_url?: string | null
          id?: string
          image_url?: string | null
          location: string
          max_participants?: number | null
          meeting_point?: string | null
          organizer?: string | null
          price?: number | null
          short_description?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["event_status"]
          title: string
          updated_at?: string
        }
        Update: {
          category?: Database["public"]["Enums"]["event_category"]
          city?: string | null
          created_at?: string
          created_by?: string | null
          date?: string
          description?: string | null
          difficulty?: string | null
          distance?: string | null
          elevation?: string | null
          end_date?: string | null
          google_maps_url?: string | null
          id?: string
          image_url?: string | null
          location?: string
          max_participants?: number | null
          meeting_point?: string | null
          organizer?: string | null
          price?: number | null
          short_description?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["event_status"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          first_name: string | null
          id: string
          last_name: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_past_events: {
        Args: Record<PropertyKey, never>
        Returns: {
          category: Database["public"]["Enums"]["event_category"]
          city: string | null
          created_at: string
          created_by: string | null
          date: string
          description: string | null
          difficulty: string | null
          distance: string | null
          elevation: string | null
          end_date: string | null
          google_maps_url: string | null
          id: string
          image_url: string | null
          location: string
          max_participants: number | null
          meeting_point: string | null
          organizer: string | null
          price: number | null
          short_description: string | null
          state: string | null
          status: Database["public"]["Enums"]["event_status"]
          title: string
          updated_at: string
        }[]
      }
      get_upcoming_events: {
        Args: Record<PropertyKey, never>
        Returns: {
          category: Database["public"]["Enums"]["event_category"]
          city: string | null
          created_at: string
          created_by: string | null
          date: string
          description: string | null
          difficulty: string | null
          distance: string | null
          elevation: string | null
          end_date: string | null
          google_maps_url: string | null
          id: string
          image_url: string | null
          location: string
          max_participants: number | null
          meeting_point: string | null
          organizer: string | null
          price: number | null
          short_description: string | null
          state: string | null
          status: Database["public"]["Enums"]["event_status"]
          title: string
          updated_at: string
        }[]
      }
    }
    Enums: {
      event_category: "MTB" | "Speed" | "Gravel" | "Urbano" | "Outro"
      event_status: "active" | "cancelled" | "completed" | "draft"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      event_category: ["MTB", "Speed", "Gravel", "Urbano", "Outro"],
      event_status: ["active", "cancelled", "completed", "draft"],
    },
  },
} as const
