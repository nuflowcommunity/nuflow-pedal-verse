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
      cart_items: {
        Row: {
          created_at: string
          id: string
          product_id: string
          quantity: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          quantity?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          quantity?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      entities: {
        Row: {
          created_at: string | null
          id: string
          name: string
          partner_id: string | null
          price: number | null
          status: Database["public"]["Enums"]["entity_status"] | null
          type: Database["public"]["Enums"]["entity_type"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          partner_id?: string | null
          price?: number | null
          status?: Database["public"]["Enums"]["entity_status"] | null
          type: Database["public"]["Enums"]["entity_type"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          partner_id?: string | null
          price?: number | null
          status?: Database["public"]["Enums"]["entity_status"] | null
          type?: Database["public"]["Enums"]["entity_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "entities_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      entity_credits: {
        Row: {
          expiry_date: string | null
          id: string
          total_credits: number | null
          used_credits: number | null
          validation_status:
            | Database["public"]["Enums"]["validation_status"]
            | null
        }
        Insert: {
          expiry_date?: string | null
          id: string
          total_credits?: number | null
          used_credits?: number | null
          validation_status?:
            | Database["public"]["Enums"]["validation_status"]
            | null
        }
        Update: {
          expiry_date?: string | null
          id?: string
          total_credits?: number | null
          used_credits?: number | null
          validation_status?:
            | Database["public"]["Enums"]["validation_status"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "entity_credits_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
        ]
      }
      entity_day_use: {
        Row: {
          access_date: string | null
          id: string
          valid_for: string | null
        }
        Insert: {
          access_date?: string | null
          id: string
          valid_for?: string | null
        }
        Update: {
          access_date?: string | null
          id?: string
          valid_for?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "entity_day_use_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
        ]
      }
      entity_events: {
        Row: {
          capacity: number | null
          date: string | null
          description: string | null
          id: string
          location: string | null
          registrations: number | null
        }
        Insert: {
          capacity?: number | null
          date?: string | null
          description?: string | null
          id: string
          location?: string | null
          registrations?: number | null
        }
        Update: {
          capacity?: number | null
          date?: string | null
          description?: string | null
          id?: string
          location?: string | null
          registrations?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "entity_events_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
        ]
      }
      entity_subscriptions: {
        Row: {
          duration: string | null
          id: string
          included_credits: number | null
          renewal_date: string | null
        }
        Insert: {
          duration?: string | null
          id: string
          included_credits?: number | null
          renewal_date?: string | null
        }
        Update: {
          duration?: string | null
          id?: string
          included_credits?: number | null
          renewal_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "entity_subscriptions_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
        ]
      }
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
      favorites: {
        Row: {
          created_at: string
          id: string
          product_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_accounts: {
        Row: {
          balance: number | null
          created_at: string | null
          currency: string | null
          id: string
          is_active: boolean | null
          name: string
          type: string
        }
        Insert: {
          balance?: number | null
          created_at?: string | null
          currency?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          type: string
        }
        Update: {
          balance?: number | null
          created_at?: string | null
          currency?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          type?: string
        }
        Relationships: []
      }
      financial_transactions: {
        Row: {
          amount: number
          category: string | null
          created_at: string | null
          created_by: string | null
          date: string
          description: string
          entity_id: string | null
          id: string
          partner_id: string | null
          type: Database["public"]["Enums"]["transaction_category"]
        }
        Insert: {
          amount: number
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          date: string
          description: string
          entity_id?: string | null
          id?: string
          partner_id?: string | null
          type: Database["public"]["Enums"]["transaction_category"]
        }
        Update: {
          amount?: number
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          date?: string
          description?: string
          entity_id?: string | null
          id?: string
          partner_id?: string | null
          type?: Database["public"]["Enums"]["transaction_category"]
        }
        Relationships: [
          {
            foreignKeyName: "financial_transactions_entity_id_fkey"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financial_transactions_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      marketing_campaigns: {
        Row: {
          budget: number | null
          clicks: number | null
          conversions: number | null
          created_at: string | null
          created_by: string | null
          end_date: string | null
          id: string
          impressions: number | null
          name: string
          spent: number | null
          start_date: string | null
          status: Database["public"]["Enums"]["campaign_status"] | null
          target_audience: Json | null
          type: Database["public"]["Enums"]["campaign_type"]
          updated_at: string | null
        }
        Insert: {
          budget?: number | null
          clicks?: number | null
          conversions?: number | null
          created_at?: string | null
          created_by?: string | null
          end_date?: string | null
          id?: string
          impressions?: number | null
          name: string
          spent?: number | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["campaign_status"] | null
          target_audience?: Json | null
          type: Database["public"]["Enums"]["campaign_type"]
          updated_at?: string | null
        }
        Update: {
          budget?: number | null
          clicks?: number | null
          conversions?: number | null
          created_at?: string | null
          created_by?: string | null
          end_date?: string | null
          id?: string
          impressions?: number | null
          name?: string
          spent?: number | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["campaign_status"] | null
          target_audience?: Json | null
          type?: Database["public"]["Enums"]["campaign_type"]
          updated_at?: string | null
        }
        Relationships: []
      }
      marketing_metrics: {
        Row: {
          campaign_id: string | null
          clicks: number | null
          conversions: number | null
          cost: number | null
          created_at: string | null
          date: string
          id: string
          impressions: number | null
          revenue: number | null
        }
        Insert: {
          campaign_id?: string | null
          clicks?: number | null
          conversions?: number | null
          cost?: number | null
          created_at?: string | null
          date: string
          id?: string
          impressions?: number | null
          revenue?: number | null
        }
        Update: {
          campaign_id?: string | null
          clicks?: number | null
          conversions?: number | null
          cost?: number | null
          created_at?: string | null
          date?: string
          id?: string
          impressions?: number | null
          revenue?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "marketing_metrics_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "marketing_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string | null
          from_user_id: string | null
          id: string
          is_read: boolean | null
          subject: string | null
          to_user_id: string | null
          type: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          from_user_id?: string | null
          id?: string
          is_read?: boolean | null
          subject?: string | null
          to_user_id?: string | null
          type?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          from_user_id?: string | null
          id?: string
          is_read?: boolean | null
          subject?: string | null
          to_user_id?: string | null
          type?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          buyer_id: string
          created_at: string
          id: string
          notes: string | null
          payment_method: string | null
          payment_status: string | null
          product_id: string
          quantity: number
          seller_id: string
          shipping_address: Json | null
          shipping_cost: number | null
          status: string
          total_amount: number
          tracking_code: string | null
          updated_at: string
        }
        Insert: {
          buyer_id: string
          created_at?: string
          id?: string
          notes?: string | null
          payment_method?: string | null
          payment_status?: string | null
          product_id: string
          quantity?: number
          seller_id: string
          shipping_address?: Json | null
          shipping_cost?: number | null
          status?: string
          total_amount: number
          tracking_code?: string | null
          updated_at?: string
        }
        Update: {
          buyer_id?: string
          created_at?: string
          id?: string
          notes?: string | null
          payment_method?: string | null
          payment_status?: string | null
          product_id?: string
          quantity?: number
          seller_id?: string
          shipping_address?: Json | null
          shipping_cost?: number | null
          status?: string
          total_amount?: number
          tracking_code?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      partners: {
        Row: {
          created_at: string | null
          description: string | null
          email: string | null
          id: string
          logo_url: string | null
          name: string
          phone: string | null
          status: Database["public"]["Enums"]["entity_status"] | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          email?: string | null
          id?: string
          logo_url?: string | null
          name: string
          phone?: string | null
          status?: Database["public"]["Enums"]["entity_status"] | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          email?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          phone?: string | null
          status?: Database["public"]["Enums"]["entity_status"] | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      password_reset_logs: {
        Row: {
          email: string
          id: string
          ip_address: unknown | null
          requested_at: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          email: string
          id?: string
          ip_address?: unknown | null
          requested_at?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          email?: string
          id?: string
          ip_address?: unknown | null
          requested_at?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      product_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          parent_id: string | null
          slug: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          parent_id?: string | null
          slug: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          parent_id?: string | null
          slug?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      product_images: {
        Row: {
          created_at: string
          id: string
          image_url: string
          is_primary: boolean | null
          product_id: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          is_primary?: boolean | null
          product_id: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          is_primary?: boolean | null
          product_id?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_reviews: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          product_id: string
          rating: number
          updated_at: string
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          product_id: string
          rating: number
          updated_at?: string
          user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          product_id?: string
          rating?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          brand: string
          category: string
          city: string | null
          color: string | null
          condition: string
          created_at: string
          description: string | null
          featured: boolean | null
          id: string
          location: string
          material: string | null
          original_price: number | null
          price: number
          seller_id: string
          short_description: string | null
          size: string | null
          state: string | null
          status: string
          subcategory: string | null
          title: string
          updated_at: string
          views: number | null
          weight: string | null
          year: number | null
        }
        Insert: {
          brand: string
          category: string
          city?: string | null
          color?: string | null
          condition?: string
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          location: string
          material?: string | null
          original_price?: number | null
          price: number
          seller_id: string
          short_description?: string | null
          size?: string | null
          state?: string | null
          status?: string
          subcategory?: string | null
          title: string
          updated_at?: string
          views?: number | null
          weight?: string | null
          year?: number | null
        }
        Update: {
          brand?: string
          category?: string
          city?: string | null
          color?: string | null
          condition?: string
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          location?: string
          material?: string | null
          original_price?: number | null
          price?: number
          seller_id?: string
          short_description?: string | null
          size?: string | null
          state?: string | null
          status?: string
          subcategory?: string | null
          title?: string
          updated_at?: string
          views?: number | null
          weight?: string | null
          year?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          first_name: string | null
          id: string
          last_name: string | null
          location: string | null
          phone: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          location?: string | null
          phone?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          location?: string | null
          phone?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      sales: {
        Row: {
          amount: number
          created_at: string | null
          entity_id: string | null
          id: string
          payment_method: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          entity_id?: string | null
          id?: string
          payment_method?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          entity_id?: string | null
          id?: string
          payment_method?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_entity_id_fkey"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
        ]
      }
      wishlist_items: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          product_id: string
          wishlist_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          product_id: string
          wishlist_id: string
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          product_id?: string
          wishlist_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlist_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wishlist_items_wishlist_id_fkey"
            columns: ["wishlist_id"]
            isOneToOne: false
            referencedRelation: "wishlists"
            referencedColumns: ["id"]
          },
        ]
      }
      wishlist_shares: {
        Row: {
          access_level: string
          created_at: string
          id: string
          shared_by_user_id: string
          shared_with_user_id: string | null
          wishlist_id: string
        }
        Insert: {
          access_level?: string
          created_at?: string
          id?: string
          shared_by_user_id: string
          shared_with_user_id?: string | null
          wishlist_id: string
        }
        Update: {
          access_level?: string
          created_at?: string
          id?: string
          shared_by_user_id?: string
          shared_with_user_id?: string | null
          wishlist_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlist_shares_wishlist_id_fkey"
            columns: ["wishlist_id"]
            isOneToOne: false
            referencedRelation: "wishlists"
            referencedColumns: ["id"]
          },
        ]
      }
      wishlists: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_public: boolean
          is_shared: boolean
          name: string
          share_token: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          is_shared?: boolean
          name?: string
          share_token?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          is_shared?: boolean
          name?: string
          share_token?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_share_token: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_entity_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          total_entities: number
          active_entities: number
          pending_entities: number
          cancelled_entities: number
          total_revenue: number
        }[]
      }
      get_marketing_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          total_campaigns: number
          active_campaigns: number
          total_budget: number
          total_spent: number
          total_impressions: number
          total_clicks: number
          total_conversions: number
        }[]
      }
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
      request_password_reset: {
        Args: { email_address: string }
        Returns: Json
      }
    }
    Enums: {
      campaign_status: "ativa" | "pausada" | "finalizada" | "rascunho"
      campaign_type: "google_ads" | "meta_ads" | "email" | "social_media"
      entity_status: "ativo" | "pendente" | "cancelado"
      entity_type: "evento" | "mensalidade" | "dayUse" | "credito"
      event_category: "MTB" | "Speed" | "Gravel" | "Urbano" | "Outro"
      event_status: "active" | "cancelled" | "completed" | "draft"
      transaction_category: "receita" | "despesa" | "transferencia"
      validation_status: "validated" | "pending" | "failed"
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
      campaign_status: ["ativa", "pausada", "finalizada", "rascunho"],
      campaign_type: ["google_ads", "meta_ads", "email", "social_media"],
      entity_status: ["ativo", "pendente", "cancelado"],
      entity_type: ["evento", "mensalidade", "dayUse", "credito"],
      event_category: ["MTB", "Speed", "Gravel", "Urbano", "Outro"],
      event_status: ["active", "cancelled", "completed", "draft"],
      transaction_category: ["receita", "despesa", "transferencia"],
      validation_status: ["validated", "pending", "failed"],
    },
  },
} as const
