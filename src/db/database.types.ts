export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
    graphql_public: {
        Tables: Record<never, never>;
        Views: Record<never, never>;
        Functions: {
            graphql: {
                Args: {
                    extensions?: Json;
                    operationName?: string;
                    query?: string;
                    variables?: Json;
                };
                Returns: Json;
            };
        };
        Enums: Record<never, never>;
        CompositeTypes: Record<never, never>;
    };
    public: {
        Tables: {
            exercise_attempts: {
                Row: {
                    created_at: string;
                    duration_ms: number;
                    id: string;
                    is_correct: boolean;
                    mode: Database["public"]["Enums"]["app_exercise_mode"];
                    session_id: string;
                    tooltips_count: number;
                    user_id: string;
                };
                Insert: {
                    created_at?: string;
                    duration_ms: number;
                    id?: string;
                    is_correct: boolean;
                    mode: Database["public"]["Enums"]["app_exercise_mode"];
                    session_id: string;
                    tooltips_count?: number;
                    user_id: string;
                };
                Update: {
                    created_at?: string;
                    duration_ms?: number;
                    id?: string;
                    is_correct?: boolean;
                    mode?: Database["public"]["Enums"]["app_exercise_mode"];
                    session_id?: string;
                    tooltips_count?: number;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "exercise_attempts_session_id_fkey";
                        columns: ["session_id"];
                        isOneToOne: false;
                        referencedRelation: "sessions";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "exercise_attempts_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "profiles";
                        referencedColumns: ["id"];
                    },
                ];
            };
            notation_to_symbol_attempts: {
                Row: {
                    attempt_id: string;
                    input_chord_symbol: string;
                    target_notation_hash: string;
                };
                Insert: {
                    attempt_id: string;
                    input_chord_symbol: string;
                    target_notation_hash: string;
                };
                Update: {
                    attempt_id?: string;
                    input_chord_symbol?: string;
                    target_notation_hash?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "notation_to_symbol_attempts_attempt_id_fkey";
                        columns: ["attempt_id"];
                        isOneToOne: true;
                        referencedRelation: "exercise_attempts";
                        referencedColumns: ["id"];
                    },
                ];
            };
            profiles: {
                Row: {
                    created_at: string;
                    id: string;
                    is_active: boolean | null;
                    updated_at: string;
                    username: string | null;
                };
                Insert: {
                    created_at?: string;
                    id: string;
                    is_active?: boolean | null;
                    updated_at?: string;
                    username?: string | null;
                };
                Update: {
                    created_at?: string;
                    id?: string;
                    is_active?: boolean | null;
                    updated_at?: string;
                    username?: string | null;
                };
                Relationships: [];
            };
            session_presets: {
                Row: {
                    config: Json;
                    created_at: string;
                    id: string;
                    name: string;
                    user_id: string;
                };
                Insert: {
                    config: Json;
                    created_at?: string;
                    id?: string;
                    name: string;
                    user_id: string;
                };
                Update: {
                    config?: Json;
                    created_at?: string;
                    id?: string;
                    name?: string;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "session_presets_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "profiles";
                        referencedColumns: ["id"];
                    },
                ];
            };
            sessions: {
                Row: {
                    config_snapshot: Json;
                    ended_at: string | null;
                    id: string;
                    started_at: string;
                    user_id: string;
                };
                Insert: {
                    config_snapshot: Json;
                    ended_at?: string | null;
                    id?: string;
                    started_at?: string;
                    user_id: string;
                };
                Update: {
                    config_snapshot?: Json;
                    ended_at?: string | null;
                    id?: string;
                    started_at?: string;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "sessions_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "profiles";
                        referencedColumns: ["id"];
                    },
                ];
            };
            symbol_to_keyboard_attempts: {
                Row: {
                    attempt_id: string;
                    pressed_keys: Json;
                    target_chord_symbol: string;
                };
                Insert: {
                    attempt_id: string;
                    pressed_keys: Json;
                    target_chord_symbol: string;
                };
                Update: {
                    attempt_id?: string;
                    pressed_keys?: Json;
                    target_chord_symbol?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "symbol_to_keyboard_attempts_attempt_id_fkey";
                        columns: ["attempt_id"];
                        isOneToOne: true;
                        referencedRelation: "exercise_attempts";
                        referencedColumns: ["id"];
                    },
                ];
            };
            user_difficult_chords: {
                Row: {
                    chord_identifier: string;
                    created_at: string;
                    id: string;
                    is_manual: boolean | null;
                    user_id: string;
                };
                Insert: {
                    chord_identifier: string;
                    created_at?: string;
                    id?: string;
                    is_manual?: boolean | null;
                    user_id: string;
                };
                Update: {
                    chord_identifier?: string;
                    created_at?: string;
                    id?: string;
                    is_manual?: boolean | null;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "user_difficult_chords_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "profiles";
                        referencedColumns: ["id"];
                    },
                ];
            };
        };
        Views: {
            user_global_stats: {
                Row: {
                    avg_reaction_time: number | null;
                    correct_attempts: number | null;
                    last_activity_at: string | null;
                    total_attempts: number | null;
                    user_id: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "exercise_attempts_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "profiles";
                        referencedColumns: ["id"];
                    },
                ];
            };
        };
        Functions: Record<never, never>;
        Enums: {
            app_clef_type: "treble" | "bass";
            app_exercise_mode: "symbol_to_keyboard" | "notation_to_symbol";
        };
        CompositeTypes: Record<never, never>;
    };
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
    DefaultSchemaTableNameOrOptions extends
        | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
        | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals;
    }
        ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
              DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
        : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
}
    ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
          DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
          Row: infer R;
      }
        ? R
        : never
    : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
      ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
            Row: infer R;
        }
          ? R
          : never
      : never;

export type TablesInsert<
    DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals;
    }
        ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Insert: infer I;
      }
        ? I
        : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
      ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
            Insert: infer I;
        }
          ? I
          : never
      : never;

export type TablesUpdate<
    DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals;
    }
        ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Update: infer U;
      }
        ? U
        : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
      ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
            Update: infer U;
        }
          ? U
          : never
      : never;

export type Enums<
    DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
    EnumName extends DefaultSchemaEnumNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals;
    }
        ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
        : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
}
    ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
      ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
      : never;

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"] | { schema: keyof DatabaseWithoutInternals },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals;
    }
        ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
        : never = never,
> = PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
}
    ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
      ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
      : never;

export const Constants = {
    graphql_public: {
        Enums: {},
    },
    public: {
        Enums: {
            app_clef_type: ["treble", "bass"],
            app_exercise_mode: ["symbol_to_keyboard", "notation_to_symbol"],
        },
    },
} as const;
