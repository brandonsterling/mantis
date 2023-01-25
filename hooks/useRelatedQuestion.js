import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

export function useRelatedQuestion(question_id) {
  const user = useUser();
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();

  const relatedApps = useQuery(
    ["_application_to_question", question_id],
    async () => {
      const { data, error } = await supabase
        .from("_application_to_question")
        .select(
          `*,
        
        applications (*)
        `
        )
        .eq("question_id", question_id);

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    {
      enabled: !!question_id,
    }
  );

  const update = useMutation(
    async ({ question_id, application_id, relatedData }) => {
      const { data, error } = await supabase
        .from("_application_to_question")
        .update(relatedData)
        .eq("question_id", question_id, "application_id", application_id);

      if (error) {
        throw new Error(error.message);
      }
      return data;
    }
  );

  const addLink = useMutation(
    async ({ question_id, appId }) => {
      const newLink = { question_id: question_id, application_id: appId };
      const { data, error } = await supabase
        .from("_application_to_question")
        .insert(newLink)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    {
      onMutate: async ({ question_id, appId }) => {
        await queryClient.cancelQueries({
          queryKey: ["_application_to_question", question_id],
        });

        queryClient.setQueryData(
          ["_application_to_question", question_id],
          (old) => [...old, { application_id: appId, question_id: question_id }]
        );
      },
      onSuccess: (data) => {
        queryClient.setQueryData(
          ["_application_to_question", question_id],
          (old) =>
            old.map((related) =>
              related.question_id == data.question_id &&
              related.application_id == data.application_id
                ? data
                : related
            )
        );
      },
    }
  );

  const removeLink = useMutation(
    async ({ question_id, appId }) => {
      console.log(question_id);
      const { data, error } = await supabase
        .from("_application_to_question")
        .delete()
        .match({ question_id: question_id, application_id: appId });

      if (error) {
        throw new Error(error.message);
      }
      return question_id;
    },

    {
      onMutate: async ({ question_id, appId }) => {
        await queryClient.cancelQueries({
          queryKey: ["_application_to_question", question_id],
        });
        queryClient.setQueryData(
          ["_application_to_question", question_id],
          (old) => old.filter((relation) => relation.application_id !== appId)
        );
      },
    }
  );

  return {
    relatedApps,
    update,
    addLink,
    removeLink,
  };
}
