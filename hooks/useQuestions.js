import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { supabase } from "../api";

export function useQuestions(options) {
  const user = useUser();
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClient();

  const questions = useQuery(
    ["questions", user?.id],
    async () => {
      const { data, error } = await supabaseClient
        .from("questions")
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
    questions,
  };
}
