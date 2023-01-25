import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

export const useQuestion = (id) => {
  const user = useUser();
  const queryClient = useQueryClient();
  const supabase = useSupabaseClient();

  const question = useQuery(
    ["question", id],
    async () => {
      const { data, error } = await supabase
        .from("questions")
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
            .getQueryData(["questions", user?.id])
            ?.find((question) => question.id == id);

          return res;
        }
      },
      enabled: !!id && !!user?.id,
    }
  );

  const create = useMutation(
    async ({ question, appId }) => {
      const questionWithUser = { ...question, user_id: user?.id };
      const { data, error } = await supabase
        .from("questions")
        .insert(questionWithUser)
        .select()
        .single();

      if (appId) {
        await supabase
          .from("_application_to_question")
          .insert({ question_id: data.id, application_id: appId });
      }
      if (error) {
        throw new Error(error.message);
      }
      return { data, appId };
    },

    {
      onSuccess: (result) => {
        const { appId, data } = result;

        queryClient.setQueryData(["questions", user?.id], (previousCache) => [
          ...previousCache,
          data,
        ]);
        if (appId) {
          console.log(appId);
        }
      },
    }
  );

  const update = useMutation(
    async ({ id, questionData }) => {
      const { data, error } = await supabase
        .from("questions")
        .update(questionData)
        .eq("id", id);

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    {
      onMutate: async ({ id, questionData }) => {
        const prevQuestion = queryClient.getQueryData(["question", id]);
        const updatedQuestion = {
          ...prevQuestion,
          ...questionData,
        };

        queryClient.setQueryData(["question", id], updatedQuestion);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["questions", user?.id]);
        // queryClient.invalidateQueries(["applications", user?.id]);
      },
    }
  );
  return {
    question,
    create,
    update,
  };
};
