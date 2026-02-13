// components/rich-text-editor.tsx
// "use client";

// import { forwardRef, useEffect, useState } from "react";
// import { EditorContent, useEditor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Image from "@tiptap/extension-image";
// import Link from "@tiptap/extension-link";
// import Underline from "@tiptap/extension-underline";

// import { Button } from "@/components/ui/button";
// import {
//   Bold,
//   Italic,
//   Underline as UnderlineIcon,
//   List,
//   ListOrdered,
//   Image as ImageIcon,
//   Link as LinkIcon,
//   Code,
//   Heading1,
//   Heading2,
//   Heading3,
//   File,
// } from "lucide-react";

// export const RichTextEditor = forwardRef<
//   HTMLDivElement,
//   {
//     value?: string;
//     onChange?: (value: string) => void;
//     placeholder?: string;
//   }
// >(({ value, onChange, placeholder }, ref) => {
//   const [mounted, setMounted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const editor = useEditor({
//     immediatelyRender: false,
//     extensions: [
//       StarterKit,
//       Underline,
//       Image.configure({
//         inline: false,
//         allowBase64: false,
//       }),
//       Link.configure({
//         openOnClick: false,
//       }),
//     ],
//     content: value || "",
//     onUpdate({ editor }) {
//       onChange?.(editor.getHTML());
//     },
//     editorProps: {
//       attributes: {
//         class:
//           "prose prose-sm sm:prose lg:prose-lg max-w-none p-4 focus:outline-none",
//       },
//     },
//   });

//   useEffect(() => {
//     setMounted(true);
//     return () => editor?.destroy();
//   }, [editor]);

//   useEffect(() => {
//     if (editor && value !== editor.getHTML()) {
//       editor.commands.setContent(value || "");
//     }
//   }, [value, editor]);

//   if (!mounted || !editor) return null;

//   const handleImageUpload = async (file: File) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       const res = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) throw new Error("Upload failed");

//       const data = await res.json();
//       editor.chain().focus().setImage({ src: data.url }).run();
//     } catch (err) {
//       console.error(err);
//       setError("Gagal mengupload gambar");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFileUpload = async (file: File) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       const res = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       editor
//         .chain()
//         .focus()
//         .setLink({ href: data.url, target: "_blank" })
//         .insertContent(file.name)
//         .run();
//     } catch (err) {
//       console.error(err);
//       setError("Gagal upload file");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="border rounded-md flex flex-col max-h-[500px]">
//       {/* Toolbar - fixed di atas */}
//       <div className="flex flex-wrap gap-1 p-2 border-b bg-muted sticky top-0 z-10">
//         <Button
//           size="icon"
//           variant="ghost"
//           onClick={() => editor.chain().focus().toggleBold().run()}
//           className={editor.isActive("bold") ? "bg-muted-foreground/20" : ""}
//         >
//           <Bold size={16} />
//         </Button>

//         <Button
//           size="icon"
//           variant="ghost"
//           onClick={() => editor.chain().focus().toggleItalic().run()}
//           className={editor.isActive("italic") ? "bg-muted-foreground/20" : ""}
//         >
//           <Italic size={16} />
//         </Button>

//         <Button
//           size="icon"
//           variant="ghost"
//           onClick={() => editor.chain().focus().toggleUnderline().run()}
//           className={
//             editor.isActive("underline") ? "bg-muted-foreground/20" : ""
//           }
//         >
//           <UnderlineIcon size={16} />
//         </Button>

//         <div className="w-px h-6 bg-border mx-1" />

//         <Button
//           size="icon"
//           variant="ghost"
//           onClick={() => editor.chain().focus().toggleBulletList().run()}
//           className={
//             editor.isActive("bulletList") ? "bg-muted-foreground/20" : ""
//           }
//         >
//           <List size={16} />
//         </Button>

//         <Button
//           size="icon"
//           variant="ghost"
//           onClick={() => editor.chain().focus().toggleOrderedList().run()}
//           className={
//             editor.isActive("orderedList") ? "bg-muted-foreground/20" : ""
//           }
//         >
//           <ListOrdered size={16} />
//         </Button>

//         <div className="w-px h-6 bg-border mx-1" />

//         <Button
//           size="icon"
//           variant="ghost"
//           onClick={() => editor.chain().focus().setHeading({ level: 1 }).run()}
//           className={
//             editor.isActive("heading", { level: 1 })
//               ? "bg-muted-foreground/20"
//               : ""
//           }
//         >
//           <Heading1 size={16} />
//         </Button>

//         <Button
//           size="icon"
//           variant="ghost"
//           onClick={() => editor.chain().focus().setHeading({ level: 2 }).run()}
//           className={
//             editor.isActive("heading", { level: 2 })
//               ? "bg-muted-foreground/20"
//               : ""
//           }
//         >
//           <Heading2 size={16} />
//         </Button>

//         <Button
//           size="icon"
//           variant="ghost"
//           onClick={() => editor.chain().focus().setHeading({ level: 3 }).run()}
//           className={
//             editor.isActive("heading", { level: 3 })
//               ? "bg-muted-foreground/20"
//               : ""
//           }
//         >
//           <Heading3 size={16} />
//         </Button>

//         <div className="w-px h-6 bg-border mx-1" />

//         <Button
//           size="icon"
//           variant="ghost"
//           onClick={() => {
//             const input = document.createElement("input");
//             input.type = "file";
//             input.accept = "image/*";
//             input.onchange = (e: any) => {
//               const file = e.target.files?.[0];
//               if (file) handleImageUpload(file);
//             };
//             input.click();
//           }}
//         >
//           <ImageIcon size={16} />
//         </Button>

//         <Button
//           size="icon"
//           variant="ghost"
//           onClick={() => {
//             const input = document.createElement("input");
//             input.type = "file";
//             input.accept = ".pdf,.doc,.docx";
//             input.onchange = (e: any) => {
//               const file = e.target.files?.[0];
//               if (file) handleFileUpload(file);
//             };
//             input.click();
//           }}
//         >
//           <File size={16} />
//         </Button>

//         <Button
//           size="icon"
//           variant="ghost"
//           onClick={() => editor.chain().focus().toggleCode().run()}
//           className={editor.isActive("code") ? "bg-muted-foreground/20" : ""}
//         >
//           <Code size={16} />
//         </Button>
//       </div>

//       {loading && (
//         <div className="text-sm p-2 text-center bg-blue-50 text-blue-600">
//           Mengupload...
//         </div>
//       )}

//       {error && (
//         <div className="text-sm p-2 text-center text-red-500 bg-red-50">
//           {error}
//         </div>
//       )}

//       {/* Editor Content dengan scroll */}
//       <div className="overflow-y-auto flex-1 min-h-[200px] max-h-[400px]">
//         <EditorContent ref={ref} editor={editor} />
//       </div>
//     </div>
//   );
// });

// RichTextEditor.displayName = "RichTextEditor";

// components/rich-text-editor.tsx
// components/rich-text-editor.tsx
"use client";

import {
  forwardRef,
  useEffect,
  useState,
  useCallback,
  useImperativeHandle,
} from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";

import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Image as ImageIcon,
  Link as LinkIcon,
  Code,
  Heading1,
  Heading2,
  Heading3,
  File,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Loader2,
  Video,
  FileText,
} from "lucide-react";

// Expose methods via ref
export interface RichTextEditorRef {
  getValue: () => string;
  setValue: (value: string) => void;
}

export const RichTextEditor = forwardRef<
  RichTextEditorRef,
  {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
  }
>(({ value, onChange, placeholder }, ref) => {
  const [mounted, setMounted] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadType, setUploadType] = useState<string | null>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Image.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: {
          class: "rounded-lg max-w-full h-auto my-4",
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: placeholder || "Tulis konten di sini...",
      }),
    ],
    content: value || "",
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg max-w-none p-4 focus:outline-none min-h-[250px]",
      },
    },
  });

  // Expose methods to parent via ref
  useImperativeHandle(ref, () => ({
    getValue: () => editor?.getHTML() || "",
    setValue: (newValue: string) => {
      if (editor && newValue !== editor.getHTML()) {
        editor.commands.setContent(newValue);
      }
    },
  }));

  useEffect(() => {
    setMounted(true);
    return () => editor?.destroy();
  }, [editor]);

  // Sync external value - hanya jika berbeda untuk avoid loop
  useEffect(() => {
    if (editor && value !== undefined && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  // Upload handler
  const handleUpload = useCallback(
    async (file: File, type: "image" | "video" | "document") => {
      setUploading(true);
      setUploadType(type);

      try {
        const formData = new FormData();
        formData.append("file", file);

        console.log("Uploading file:", file.name, file.type, file.size);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        console.log("Upload response:", data);

        if (!res.ok) {
          throw new Error(data.error || "Upload failed");
        }

        if (!editor) return;

        if (type === "image") {
          editor
            .chain()
            .focus()
            .setImage({
              src: data.url,
              alt: file.name,
            })
            .run();
        } else if (type === "video") {
          const videoHtml = `
            <div class="my-4 rounded-lg overflow-hidden bg-black">
              <video controls class="w-full max-h-[500px]">
                <source src="${data.url}" type="${file.type}" />
                Browser Anda tidak mendukung video tag.
              </video>
            </div>
            <p class="text-sm text-gray-500 text-center">${file.name}</p>
          `;
          editor.chain().focus().insertContent(videoHtml).run();
        } else {
          const icon = getFileIcon(file.name);
          const docHtml = `
            <div class="my-4 p-4 bg-gray-50 border rounded-lg flex items-center gap-4">
              <div class="text-3xl">${icon}</div>
              <div class="flex-1 min-w-0">
                <a href="${data.url}" target="_blank" class="text-blue-600 hover:underline font-medium block truncate">
                  ${file.name}
                </a>
                <p class="text-xs text-gray-500">${data.sizeFormatted || formatFileSize(file.size)}</p>
              </div>
              <a href="${data.url}" target="_blank" download class="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 whitespace-nowrap">
                Download
              </a>
            </div>
          `;
          editor.chain().focus().insertContent(docHtml).run();
        }
      } catch (err: any) {
        console.error("Upload error:", err);
        alert(err.message || "Gagal mengupload file");
      } finally {
        setUploading(false);
        setUploadType(null);
      }
    },
    [editor],
  );

  // Trigger file input
  const triggerUpload = (type: "image" | "video" | "document") => {
    const input = document.createElement("input");
    input.type = "file";

    if (type === "image") {
      input.accept = "image/*";
      input.multiple = true;
    } else if (type === "video") {
      input.accept = "video/*";
    } else {
      input.accept = ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar,.txt";
    }

    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (!files) return;

      Array.from(files).forEach((file) => {
        handleUpload(file, type);
      });
    };

    input.click();
  };

  if (!mounted || !editor) {
    return (
      <div className="border rounded-md p-8 flex items-center justify-center text-gray-400 min-h-[250px]">
        Loading editor...
      </div>
    );
  }

  return (
    <div className="border rounded-md flex flex-col bg-white shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-gray-50">
        {/* Text Formatting */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="Bold"
        >
          <Bold size={16} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="Italic"
        >
          <Italic size={16} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
          title="Underline"
        >
          <UnderlineIcon size={16} />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Headings */}
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          active={editor.isActive("heading", { level: 1 })}
          title="Heading 1"
        >
          <Heading1 size={16} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          active={editor.isActive("heading", { level: 2 })}
          title="Heading 2"
        >
          <Heading2 size={16} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          active={editor.isActive("heading", { level: 3 })}
          title="Heading 3"
        >
          <Heading3 size={16} />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Lists */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="Bullet List"
        >
          <List size={16} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title="Numbered List"
        >
          <ListOrdered size={16} />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Alignment */}
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          active={editor.isActive({ textAlign: "left" })}
          title="Align Left"
        >
          <AlignLeft size={16} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          active={editor.isActive({ textAlign: "center" })}
          title="Align Center"
        >
          <AlignCenter size={16} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          active={editor.isActive({ textAlign: "right" })}
          title="Align Right"
        >
          <AlignRight size={16} />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Media Uploads */}
        <ToolbarButton
          onClick={() => triggerUpload("image")}
          disabled={uploading}
          title="Upload Gambar"
        >
          {uploading && uploadType === "image" ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <ImageIcon size={16} />
          )}
        </ToolbarButton>

        <ToolbarButton
          onClick={() => triggerUpload("video")}
          disabled={uploading}
          title="Upload Video"
        >
          {uploading && uploadType === "video" ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Video size={16} />
          )}
        </ToolbarButton>

        <ToolbarButton
          onClick={() => triggerUpload("document")}
          disabled={uploading}
          title="Upload PDF/Dokumen"
        >
          {uploading && uploadType === "document" ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <FileText size={16} />
          )}
        </ToolbarButton>

        <ToolbarButton
          onClick={() => {
            const url = window.prompt("Masukkan URL:");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          title="Insert Link"
        >
          <LinkIcon size={16} />
        </ToolbarButton>
      </div>

      {/* Editor Content */}
      <div className="overflow-y-auto max-h-[500px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
});

RichTextEditor.displayName = "RichTextEditor";

// Helper Components
function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`
        p-2 rounded-md transition-all duration-200
        ${
          active
            ? "bg-blue-600 text-white shadow-md"
            : "hover:bg-gray-200 text-gray-700"
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      {children}
    </button>
  );
}

// Helper Functions
function getFileIcon(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase();
  const icons: Record<string, string> = {
    pdf: "📄",
    doc: "📝",
    docx: "📝",
    xls: "📊",
    xlsx: "📊",
    ppt: "📽️",
    pptx: "📽️",
    zip: "🗜️",
    rar: "🗜️",
    txt: "📃",
  };
  return icons[ext || ""] || "📎";
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
