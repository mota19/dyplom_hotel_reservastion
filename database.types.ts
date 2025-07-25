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
      accommodation_amenities: {
        Row: {
          accommodation_id: number
          amenity_id: number
        }
        Insert: {
          accommodation_id: number
          amenity_id: number
        }
        Update: {
          accommodation_id?: number
          amenity_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "accommodation_amenities_accommodation_id_fkey"
            columns: ["accommodation_id"]
            isOneToOne: false
            referencedRelation: "accommodations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accommodation_amenities_accommodation_id_fkey"
            columns: ["accommodation_id"]
            isOneToOne: false
            referencedRelation: "booking_details"
            referencedColumns: ["accommodation_id"]
          },
          {
            foreignKeyName: "accommodation_amenities_amenity_id_fkey"
            columns: ["amenity_id"]
            isOneToOne: false
            referencedRelation: "amenities"
            referencedColumns: ["id"]
          },
        ]
      }
      accommodation_types: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      accommodations: {
        Row: {
          city: string | null
          country: string | null
          created_at: string | null
          description: string | null
          id: number
          image: string | null
          latitude: number | null
          longitude: number | null
          name: string
          pricePerNight: number | null
          reveiws: number | null
          star_rating: number | null
          type_id: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          image?: string | null
          latitude?: number | null
          longitude?: number | null
          name: string
          pricePerNight?: number | null
          reveiws?: number | null
          star_rating?: number | null
          type_id: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          city?: string | null
          country?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          image?: string | null
          latitude?: number | null
          longitude?: number | null
          name?: string
          pricePerNight?: number | null
          reveiws?: number | null
          star_rating?: number | null
          type_id?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "accommodations_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "accommodation_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "booking_details"
            referencedColumns: ["guest_id"]
          },
          {
            foreignKeyName: "fk_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "booking_details"
            referencedColumns: ["owner_id"]
          },
          {
            foreignKeyName: "fk_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      amenities: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      bed_types: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          created_at: string | null
          end_date: string
          id: number
          numberOfGuests: number | null
          room_id: number | null
          start_date: string
          status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          end_date: string
          id?: number
          numberOfGuests?: number | null
          room_id?: number | null
          start_date: string
          status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          end_date?: string
          id?: number
          numberOfGuests?: number | null
          room_id?: number | null
          start_date?: string
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "booking_details"
            referencedColumns: ["room_id"]
          },
          {
            foreignKeyName: "bookings_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "user_rooms_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "booking_details"
            referencedColumns: ["guest_id"]
          },
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "booking_details"
            referencedColumns: ["owner_id"]
          },
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      room_beds: {
        Row: {
          bed_count: number
          bed_type_id: number
          room_id: number
        }
        Insert: {
          bed_count: number
          bed_type_id: number
          room_id: number
        }
        Update: {
          bed_count?: number
          bed_type_id?: number
          room_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "room_beds_bed_type_id_fkey"
            columns: ["bed_type_id"]
            isOneToOne: false
            referencedRelation: "bed_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "room_beds_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "booking_details"
            referencedColumns: ["room_id"]
          },
          {
            foreignKeyName: "room_beds_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "room_beds_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "user_rooms_view"
            referencedColumns: ["id"]
          },
        ]
      }
      rooms: {
        Row: {
          accommodation_id: number
          capacity: number | null
          description: string | null
          discount: number | null
          id: number
          image: string | null
          name: string | null
          pricepernight: number | null
          room_type: string | null
          sqm: number | null
        }
        Insert: {
          accommodation_id: number
          capacity?: number | null
          description?: string | null
          discount?: number | null
          id?: number
          image?: string | null
          name?: string | null
          pricepernight?: number | null
          room_type?: string | null
          sqm?: number | null
        }
        Update: {
          accommodation_id?: number
          capacity?: number | null
          description?: string | null
          discount?: number | null
          id?: number
          image?: string | null
          name?: string | null
          pricepernight?: number | null
          room_type?: string | null
          sqm?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "rooms_accommodation_id_fkey"
            columns: ["accommodation_id"]
            isOneToOne: false
            referencedRelation: "accommodations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rooms_accommodation_id_fkey"
            columns: ["accommodation_id"]
            isOneToOne: false
            referencedRelation: "booking_details"
            referencedColumns: ["accommodation_id"]
          },
        ]
      }
      users: {
        Row: {
          birthday: string | null
          country: string | null
          first_name: string | null
          id: string
          last_name: string | null
          nationality: string | null
          phone_number: string | null
          profile_image: string | null
          role: string | null
        }
        Insert: {
          birthday?: string | null
          country?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          nationality?: string | null
          phone_number?: string | null
          profile_image?: string | null
          role?: string | null
        }
        Update: {
          birthday?: string | null
          country?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          nationality?: string | null
          phone_number?: string | null
          profile_image?: string | null
          role?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      booking_details: {
        Row: {
          accommodation_id: number | null
          accommodation_name: string | null
          booking_id: number | null
          end_date: string | null
          guest_email: string | null
          guest_id: string | null
          guest_name: string | null
          guest_phone: string | null
          numberOfGuests: number | null
          owner_email: string | null
          owner_id: string | null
          owner_name: string | null
          owner_phone: string | null
          pricepernight: number | null
          room_id: number | null
          room_name: string | null
          start_date: string | null
          status: string | null
        }
        Relationships: []
      }
      user_rooms_view: {
        Row: {
          accommodation_id: number | null
          accommodationname: string | null
          capacity: number | null
          description: string | null
          discount: number | null
          id: number | null
          image: string | null
          name: string | null
          owner_id: string | null
          pricepernight: number | null
          room_type: string | null
          sqm: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_user"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "booking_details"
            referencedColumns: ["guest_id"]
          },
          {
            foreignKeyName: "fk_user"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "booking_details"
            referencedColumns: ["owner_id"]
          },
          {
            foreignKeyName: "fk_user"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rooms_accommodation_id_fkey"
            columns: ["accommodation_id"]
            isOneToOne: false
            referencedRelation: "accommodations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rooms_accommodation_id_fkey"
            columns: ["accommodation_id"]
            isOneToOne: false
            referencedRelation: "booking_details"
            referencedColumns: ["accommodation_id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      type_accomodations:
        | "hotel"
        | "apartment"
        | "hostel"
        | "cabin"
        | "motel"
        | "resort"
        | "villa"
        | "guesthouse"
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
      type_accomodations: [
        "hotel",
        "apartment",
        "hostel",
        "cabin",
        "motel",
        "resort",
        "villa",
        "guesthouse",
      ],
    },
  },
} as const
