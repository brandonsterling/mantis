import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

export const useNote = (id) => {
  const user = useUser();
  const queryClient = useQueryClient();
  const supabase = useSupabaseClient();

  const note = useQuery(
    ["note", id],
    async () => {
      const { data, error } = await supabase
        .from("notes")
        .select(
          `
        *,
        applications (*)
      `
        )
        .eq("id", id)
        .limit(1)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    {
      initialData: () => {
        if (id) {
          const res = queryClient
            .getQueryData(["notes", user?.id])
            ?.find((note) => note.id == id);

          return res;
        }
      },
      enabled: !!id && !!user?.id,
    }
  );

  const create = useMutation(
    async ({ note, appId }) => {
      const noteWithUser = {
        ...note,
        user_id: user?.id,
        application_id: appId,
      };
      const { data, error } = await supabase
        .from("notes")
        .insert(noteWithUser)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return { data, appId };
    },

    {
      onSuccess: (result) => {
        const { appId, data } = result;

        queryClient.setQueryData(["notes", user?.id], (previousCache) => [
          ...previousCache,
          data,
        ]);
      },
    }
  );

  const update = useMutation(
    async ({ id, note }) => {
      const { data, error } = await supabase
        .from("notes")
        .update(note)
        .eq("id", id);

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    {
      onMutate: async ({ id, note }) => {
        const prevNote = queryClient.getQueryData(["note", id]);
        const updatedNote = {
          ...prevNote,
          ...note,
        };

        queryClient.setQueryData(["note", id], updatedNote);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["notes", user?.id]);
        // queryClient.invalidateQueries(["applications", user?.id]);
      },
    }
  );
  return {
    note,
    create,
    update,
  };
};
