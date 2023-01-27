import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

export const useApplications = () => {
  const user = useUser();
  const supabase = useSupabaseClient();

  return useQuery(
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
    { enabled: !!user?.id }
  );
};

export const useApplication = (id) => {
  const user = useUser();
  const queryClient = useQueryClient();
  const supabase = useSupabaseClient();

  const application = useQuery(
    ["application", id],
    async () => {
      const { data, error } = await supabase
        .from("applications")
        .select(
          `
        *,
        stories (*),
        tasks (*),
        questions(*),
        notes (*)
      `
        )
        .eq("id", id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      // const { Story: stories, ...otherProps } = data;
      // const newData = { stories, ...otherProps };
      //
      return data;
    },
    {
      enabled: !!id,
      // initialData: () => {
      //   return queryClient
      //     .getQueryData(["applications", user?.id])
      //     ?.find((app) => app.id === id);
      // },
    }
  );

  const create = useMutation(
    async (application) => {
      const appWithUser = { ...application, user_id: user?.id };

      const description = application.description;

      if (description.replace(/(\r\n|\n|\r)/gm, "").length < 10) {
        appWithUser = {
          ...app,
          keywords: "",
        };
      } else {
        const response = await fetch("/api/openai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ description }),
        });
        const res = await response.json();
        const cleanText = res.result.replace(/(\r\n|\n|\r)/gm, "");

        appWithUser = {
          ...appWithUser,
          keywords: cleanText,
        };
      }

      const { data, error } = await supabase
        .from("applications")
        .insert(appWithUser)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },

    {
      onSuccess: (data) => {
        queryClient.setQueryData(
          ["applications", user?.id],
          (previousCache) => [...previousCache, data]
        );
      },
    }
  );

  const update = useMutation(
    async ({ appId, app }) => {
      const description = app.description;

      if (description.replace(/(\r\n|\n|\r)/gm, "").length < 10) {
        app = {
          ...app,
          keywords: "",
        };
      } else {
        const response = await fetch("/api/openai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ description }),
        });
        const res = await response.json();
        const cleanText = res.result.replace(/(\r\n|\n|\r)/gm, "");

        app = {
          ...app,
          keywords: cleanText,
        };
      }

      const { data, error } = await supabase
        .from("applications")
        .update(app)
        .eq("id", appId);

      if (error) {
        throw new Error(error.message);
      }

      return { data, appId };
    },

    {
      // onMutate: async ({ appId, app }) => {
      //   const prevApp = queryClient.getQueryData(["application", appId]);
      //   const updatedApp = {
      //     ...prevApp,
      //     ...app,
      //   };

      //   queryClient.setQueryData(["application", { appId }], updatedApp);
      // },

      onMutate: async ({ appId, app }) => {
        queryClient.setQueryData(["application", appId], (oldData) => {
          return { ...oldData, ...app };
        });
        // // queryClient.setQueryData(
        // //   ["application", { appId }],
        // //   (previousCache) => [...previousCache, ...app]
        // // );
        // const prevApp = queryClient.getQueryData(["application", appId]);
        //
        // const updatedApp = {
        //   ...prevApp,
        //   ...app,
        // };

        // queryClient.setQueryData(["application", appId], updatedApp);

        queryClient.setQueriesData(
          ["applications", user?.id],
          (applications) => {
            const previousApps = applications.filter(({ id }) => appId !== id);
            return [...previousApps, app];
          }
        );
      },

      onSuccess: ({ appId, data }) => {
        queryClient.invalidateQueries(["application", appId]);
        // queryClient.invalidateQueries(["applications", user?.id]);
      },
    }
  );
  return {
    application,
    create,
    update,
  };
};
