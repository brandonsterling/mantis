import { useQuery } from "@tanstack/react-query";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { filterStories } from "../utils/transform";

export function useStories(options) {
  const user = useUser();
  const supabase = useSupabaseClient();

  const stories = useQuery(
    ["stories", user?.id],
    async () => {
      const { data, error } = await supabase
        .from("stories")
        .select(
          `
     *,
      user ( id, email ),
      applications (*)
    `
        )
        .order("createdAt", { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    {
      ...options,
      enabled: !!user?.id,
    }
  );
  return {
    stories,
  };
}
