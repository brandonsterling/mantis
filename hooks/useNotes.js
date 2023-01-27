import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

export function useNotes(options) {
  const user = useUser();
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClient();

  const notes = useQuery(
    ["notes", user?.id],
    async () => {
      const { data, error } = await supabaseClient
        .from("notes")
        .select(
          `
        *
      `
        )
        .order("createdAt", { ascending: true });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    { ...options, enabled: !!user?.id }
  );
  return {
    notes,
  };
}
