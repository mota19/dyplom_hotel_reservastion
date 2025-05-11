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
          star_rating: number | null
          type_id: number
          updated_at: string | null
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
          star_rating?: number | null
          type_id: number
          updated_at?: string | null
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
          star_rating?: number | null
          type_id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "accommodations_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "accommodation_types"
            referencedColumns: ["id"]
          },
        ]
      }
      cabins: {
        Row: {
          amenities: string | null
          cabin_size: string | null
          created_at: string | null
          id: number
          number_of_beds: number | null
          updated_at: string | null
        }
        Insert: {
          amenities?: string | null
          cabin_size?: string | null
          created_at?: string | null
          id: number
          number_of_beds?: number | null
          updated_at?: string | null
        }
        Update: {
          amenities?: string | null
          cabin_size?: string | null
          created_at?: string | null
          id?: number
          number_of_beds?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cabins_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "accommodations"
            referencedColumns: ["id"]
          },
        ]
      }
      hotels: {
        Row: {
          created_at: string | null
          has_gym: boolean | null
          has_swimming_pool: boolean | null
          id: number
          restaurant_name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          has_gym?: boolean | null
          has_swimming_pool?: boolean | null
          id: number
          restaurant_name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          has_gym?: boolean | null
          has_swimming_pool?: boolean | null
          id?: number
          restaurant_name?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hotels_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "accommodations"
            referencedColumns: ["id"]
          },
        ]
      }
      motels: {
        Row: {
          created_at: string | null
          has_parking: boolean | null
          has_pet_friendly: boolean | null
          has_wifi: boolean | null
          id: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          has_parking?: boolean | null
          has_pet_friendly?: boolean | null
          has_wifi?: boolean | null
          id: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          has_parking?: boolean | null
          has_pet_friendly?: boolean | null
          has_wifi?: boolean | null
          id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "motels_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "accommodations"
            referencedColumns: ["id"]
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
          phone_number: string | null
          role: string | null
        }
        Insert: {
          birthday?: string | null
          country?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          phone_number?: string | null
          role?: string | null
        }
        Update: {
          birthday?: string | null
          country?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone_number?: string | null
          role?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
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
