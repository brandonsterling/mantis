import { useQuery } from "@tanstack/react-query";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

export function useApplications(options) {
  const user = useUser();
  const supabase = useSupabaseClient();
  const applications = useQuery(
    ["applications", user?.id],
    async () => {
      const { data, error } = await supabase
        .from("applications")
        .select()
        .eq("user_id", user?.id);

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
    applications,
  };
}
