import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

export const useStory = (storyId) => {
  const user = useUser();
  const queryClient = useQueryClient();
  const supabase = useSupabaseClient();

  const story = useQuery(
    ["story", storyId],
    async () => {
      const { data, error } = await supabase
        .from("stories")
        .select(
          `
        *,
        applications (*)
      `
        )
        .eq("id", storyId)
        .limit(1)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    {
      initialData: () => {
        if (storyId) {
          const res = queryClient
            .getQueryData(["stories", user?.id])
            ?.find((story) => story.id == storyId);

          return res;
        }
      },
      refetchOnReconnect: false,
      enabled: !!storyId && !!user?.id,
    }
  );

  const create = useMutation(
    async (story) => {
      const storyWithUser = { ...story, user_id: user?.id };
      const { data, error } = await supabase
        .from("stories")
        .insert(storyWithUser)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },

    {
      onSuccess: (data) => {
        queryClient.setQueryData(["stories", user?.id], (previousCache) => [
          ...previousCache,
          data,
        ]);
      },
    }
  );

  const update = useMutation(
    async ({ id, storyData }) => {
      const { data, error } = await supabase
        .from("stories")
        .update(storyData)
        .eq("id", id);

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    {
      onMutate: async ({ id, storyData }) => {
        const prevStory = queryClient.getQueryData(["story", id]);
        const updatedStory = {
          ...prevStory,
          ...storyData,
        };

        queryClient.setQueryData(["story", id], updatedStory);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["stories", user?.id]);
        // queryClient.invalidateQueries(["applications", user?.id]);
      },
    }
  );

  const relatedApps = useQuery(
    ["_application_to_story", storyId],
    async () => {
      const { data, error } = await supabase
        .from("_application_to_story")
        .select(
          `*,
        
        applications (*)
        `
        )
        .eq("story_id", storyId);

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    {
      enabled: !!storyId,
    }
  );

  const addLink = useMutation(
    async ({ storyId, appId }) => {
      const newLink = { story_id: storyId, application_id: appId };
      const { data, error } = await supabase
        .from("_application_to_story")
        .insert(newLink)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    {
      onMutate: async ({ storyId, appId }) => {
        await queryClient.cancelQueries({
          queryKey: ["_application_to_story", storyId],
        });

        queryClient.setQueryData(["_application_to_story", storyId], (old) => [
          ...old,
          { application_id: appId, story_id: storyId },
        ]);
      },
      onSuccess: (data) => {
        queryClient.setQueryData(["_application_to_story", storyId], (old) =>
          old.map((related) =>
            related.story_id == data.story_id &&
            related.application_id == data.application_id
              ? data
              : related
          )
        );
      },
    }
  );

  const removeLink = useMutation(
    async ({ storyId, appId }) => {
      const { data, error } = await supabase
        .from("_application_to_story")
        .delete()
        .match({ story_id: storyId, application_id: appId });

      if (error) {
        throw new Error(error.message);
      }
      return storyId;
    },

    {
      onMutate: async ({ storyId, appId }) => {
        await queryClient.cancelQueries({
          queryKey: ["_application_to_story", storyId],
        });
        queryClient.setQueryData(["_application_to_story", storyId], (old) =>
          old.filter((relation) => relation.application_id !== appId)
        );
      },
      // const oldStory = queryClient.getQueryData(["story", storyId]);
      // const linkedApps = oldStory.applications.filter(
      //   (app) => app.id !== appId
      // );

      // const optimisticStory = { ...oldStory, applications: linkedApps };

      // // queryClient.setQueryData(["story", storyId], optimisticStory);
      // queryClient.setQueryData(["story", storyId], (old) => [

      //   ...old,
      //   {
      //     applications:linkedApps
      //   },
      // ]);

      // onSuccess: (data) => {
      //   queryClient.invalidateQueries(["story", data]);
      // },
    }
  );

  return {
    story,
    create,
    update,
    relatedApps,
    addLink,
    removeLink,
  };
};
