import { RichTextEditor } from "@mantine/tiptap";
import { useEditor, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useCallback, useEffect } from "react";
import { Button, Group, Loader } from "@mantine/core";
import { useRouter } from "next/router";
import { useDebouncedState } from "@mantine/hooks";
import { templates } from "../../constants/templates";

function StoryRTE({ content, setValue, story, updateStory, ...props }) {
  const editor = useEditor({
    extensions: [StarterKit, Placeholder.configure({ placeholder: "" })],
    content: content,

    // onUpdate: ({ editor }) => {

    //   const html = editor.getHTML();
    //   setValue(html);
    // },
  });

  return (
    <>
      <RichTextEditor editor={editor} {...props}>
        <RichTextEditor.Toolbar>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content sx={{ minHeight: "150px" }} />
        <Group position="right">
          <Button
            size="sm"
            variant="subtle"
            m="sm"
            onClick={() => {
              editor.commands.setContent(templates["star"]);
            }}
          >
            + Add template
          </Button>
        </Group>
      </RichTextEditor>
      <Button
        mt="md"
        onClick={() =>
          updateStory.mutate({
            id: story.id,
            story: { ...story, content: editor.getHTML() },
          })
        }
      >
        Save
      </Button>
    </>
  );
}
export { StoryRTE };
