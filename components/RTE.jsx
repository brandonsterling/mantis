import { RichTextEditor } from "@mantine/tiptap";
import { useEditor, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";
import { Button, Group } from "@mantine/core";
import { templates } from "../constants/templates";
import AddTemplate from "../features/stories/components/AddTemplate";

function RTE({
  selected,
  content,
  form,
  fieldName,
  template,
  editable = true,
  ...props
}) {
  const editor = useEditor({
    editable: editable,
    extensions: [
      StarterKit,
      // Placeholder.configure({ placeholder: "This is placeholder" }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      form.setFieldValue(fieldName, editor.getHTML());
    },
  });

  const Template = template;

  useEffect(() => {
    editor?.commands.setContent(content);
  }, [selected, content]);

  return (
    <RichTextEditor {...props} editor={editor}>
      {editor && (
        <BubbleMenu editor={editor}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
          </RichTextEditor.ControlsGroup>
        </BubbleMenu>
      )}
      <RichTextEditor.Content />
      {template && <Template editor={editor} />}
    </RichTextEditor>
  );
}
export { RTE };
