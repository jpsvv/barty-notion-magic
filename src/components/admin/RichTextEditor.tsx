import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExt from "@tiptap/extension-link";
import ImageExt from "@tiptap/extension-image";
import { Bold, Italic, List, ListOrdered, Quote, Code, Link2, Image as ImgIcon, Heading2, Heading3, Undo, Redo, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadMedia } from "@/lib/siteContent";
import { toast } from "sonner";
import { useEffect } from "react";

interface Props {
  value: string;
  onChange: (html: string) => void;
}

const RichTextEditor = ({ value, onChange }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      LinkExt.configure({ openOnClick: false, autolink: true }),
      ImageExt.configure({ inline: false }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none min-h-[400px] p-4 focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (!editor) return null;

  const addLink = () => {
    const url = window.prompt("URL do link:");
    if (!url) return;
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const addImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        const url = await uploadMedia(file, "blog");
        editor.chain().focus().setImage({ src: url, alt: file.name }).run();
      } catch (e) {
        toast.error("Falha no upload: " + (e as Error).message);
      }
    };
    input.click();
  };

  const insertHtml = () => {
    const html = window.prompt("Cole o código HTML:");
    if (!html) return;
    editor.chain().focus().insertContent(html).run();
  };

  const btnCls = (active: boolean) =>
    `p-1.5 rounded hover:bg-muted ${active ? "bg-muted text-primary" : "text-muted-foreground"}`;

  return (
    <div className="border border-border rounded-md bg-background">
      <div className="flex flex-wrap gap-0.5 p-2 border-b border-border">
        <button type="button" className={btnCls(editor.isActive("heading", { level: 2 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 className="w-4 h-4" /></button>
        <button type="button" className={btnCls(editor.isActive("heading", { level: 3 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 className="w-4 h-4" /></button>
        <span className="w-px bg-border mx-1" />
        <button type="button" className={btnCls(editor.isActive("bold"))} onClick={() => editor.chain().focus().toggleBold().run()}><Bold className="w-4 h-4" /></button>
        <button type="button" className={btnCls(editor.isActive("italic"))} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic className="w-4 h-4" /></button>
        <span className="w-px bg-border mx-1" />
        <button type="button" className={btnCls(editor.isActive("bulletList"))} onClick={() => editor.chain().focus().toggleBulletList().run()}><List className="w-4 h-4" /></button>
        <button type="button" className={btnCls(editor.isActive("orderedList"))} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered className="w-4 h-4" /></button>
        <button type="button" className={btnCls(editor.isActive("blockquote"))} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote className="w-4 h-4" /></button>
        <button type="button" className={btnCls(editor.isActive("codeBlock"))} onClick={() => editor.chain().focus().toggleCodeBlock().run()}><Code className="w-4 h-4" /></button>
        <span className="w-px bg-border mx-1" />
        <button type="button" className={btnCls(editor.isActive("link"))} onClick={addLink}><Link2 className="w-4 h-4" /></button>
        <button type="button" className={btnCls(false)} onClick={addImage}><ImgIcon className="w-4 h-4" /></button>
        <button type="button" className={btnCls(false)} onClick={insertHtml} title="Inserir HTML"><Code2 className="w-4 h-4" /></button>
        <span className="flex-1" />
        <button type="button" className={btnCls(false)} onClick={() => editor.chain().focus().undo().run()}><Undo className="w-4 h-4" /></button>
        <button type="button" className={btnCls(false)} onClick={() => editor.chain().focus().redo().run()}><Redo className="w-4 h-4" /></button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
