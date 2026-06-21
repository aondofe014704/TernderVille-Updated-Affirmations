"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { useEffect, useCallback } from "react";
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  List, ListOrdered, Heading2, Heading3,
  Link as LinkIcon, Undo, Redo,
} from "lucide-react";
import { cn } from "@/lib/cn";

interface RichEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function RichEditor({ value, onChange, placeholder, disabled }: RichEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank",
          class: "text-orange-600 underline",
        },
      }),
    ],
    content: value || "",
    editable: !disabled,
    immediatelyRender: false, // SSR-safe
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-sm sm:prose-base max-w-none focus:outline-none min-h-[200px] p-4",
          "prose-headings:font-bold prose-headings:text-gray-900",
          "prose-p:my-2 prose-p:text-gray-700",
          "prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline",
          "prose-strong:text-gray-900 prose-strong:font-semibold",
          "prose-ul:my-2 prose-ol:my-2",
        ),
      },
    },
  });

  // Sync external value changes (e.g., when initial loads after mount)
  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (value !== current && value !== undefined) {
      editor.commands.setContent(value, false);
    }
  }, [value, editor]);

  if (!editor) {
    return (
      <div className="border border-gray-300 rounded-md bg-gray-50 min-h-[260px] flex items-center justify-center text-sm text-gray-500">
        Loading editor...
      </div>
    );
  }

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden bg-white focus-within:ring-2 focus-within:ring-orange-500/40 focus-within:border-orange-400">
      <Toolbar editor={editor} disabled={disabled} />
      <div className="bg-white">
        {!editor.getText() && placeholder && (
          <div className="absolute pointer-events-none text-gray-400 px-4 py-2 text-sm">
            {placeholder}
          </div>
        )}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

function Toolbar({ editor, disabled }: { editor: Editor; disabled?: boolean }) {
  const promptForLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL (must start with http://, https://, mailto:, or tel:)", previousUrl ?? "https://");

    if (url === null) return;        // cancelled
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    // Basic validation
    if (!/^(https?:\/\/|mailto:|tel:)/i.test(url)) {
      alert("URL must start with http://, https://, mailto:, or tel:");
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const buttons: Array<{
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    isActive?: () => boolean;
    onClick: () => void;
    disabled?: boolean;
  }> = [
    { icon: Bold, label: "Bold", isActive: () => editor.isActive("bold"), onClick: () => editor.chain().focus().toggleBold().run() },
    { icon: Italic, label: "Italic", isActive: () => editor.isActive("italic"), onClick: () => editor.chain().focus().toggleItalic().run() },
    { icon: UnderlineIcon, label: "Underline", isActive: () => editor.isActive("underline"), onClick: () => editor.chain().focus().toggleUnderline().run() },
    { icon: Strikethrough, label: "Strikethrough", isActive: () => editor.isActive("strike"), onClick: () => editor.chain().focus().toggleStrike().run() },
    { icon: Heading2, label: "Heading 2", isActive: () => editor.isActive("heading", { level: 2 }), onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
    { icon: Heading3, label: "Heading 3", isActive: () => editor.isActive("heading", { level: 3 }), onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run() },
    { icon: List, label: "Bullet list", isActive: () => editor.isActive("bulletList"), onClick: () => editor.chain().focus().toggleBulletList().run() },
    { icon: ListOrdered, label: "Numbered list", isActive: () => editor.isActive("orderedList"), onClick: () => editor.chain().focus().toggleOrderedList().run() },
    { icon: LinkIcon, label: "Link", isActive: () => editor.isActive("link"), onClick: promptForLink },
    { icon: Undo, label: "Undo", onClick: () => editor.chain().focus().undo().run(), disabled: !editor.can().undo() },
    { icon: Redo, label: "Redo", onClick: () => editor.chain().focus().redo().run(), disabled: !editor.can().redo() },
  ];

  return (
    <div className="flex flex-wrap gap-0.5 p-2 border-b border-gray-200 bg-gray-50">
      {buttons.map((b, i) => {
        const Icon = b.icon;
        const active = b.isActive?.() ?? false;
        const isDisabled = disabled || b.disabled;
        return (
          <button
            key={i}
            type="button"
            onClick={b.onClick}
            disabled={isDisabled}
            aria-label={b.label}
            title={b.label}
            className={cn(
              "h-8 w-8 inline-flex items-center justify-center rounded transition-colors",
              isDisabled ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:bg-gray-200",
              active && !isDisabled && "bg-orange-100 text-orange-700",
            )}
          >
            <Icon className="w-4 h-4" />
          </button>
        );
      })}
    </div>
  );
}
