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
//     immediatelyRender: false, // ⬅️ WAJIB UNTUK NEXT 13+
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
//           "prose prose-sm sm:prose lg:prose-lg max-w-none p-4 min-h-[300px] focus:outline-none",
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

//   /* ================= IMAGE UPLOAD ================= */

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

//   /* ================= FILE UPLOAD ================= */

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

//   /* ================= UI ================= */

//   return (
//     <div className="border rounded-md">
//       <div className="flex flex-wrap gap-1 p-2 border-b bg-muted">
//         <Button
//           size="icon"
//           variant="ghost"
//           onClick={() => editor.chain().focus().toggleBold().run()}
//         >
//           <Bold size={16} />
//         </Button>

//         <Button
//           size="icon"
//           variant="ghost"
//           onClick={() => editor.chain().focus().toggleItalic().run()}
//         >
//           <Italic size={16} />
//         </Button>

//         <Button
//           size="icon"
//           variant="ghost"
//           onClick={() => editor.chain().focus().toggleUnderline().run()}
//         >
//           <UnderlineIcon size={16} />
//         </Button>

//         <Button
//           size="icon"
//           variant="ghost"
//           onClick={() => editor.chain().focus().toggleBulletList().run()}
//         >
//           <List size={16} />
//         </Button>

//         <Button
//           size="icon"
//           variant="ghost"
//           onClick={() => editor.chain().focus().toggleOrderedList().run()}
//         >
//           <ListOrdered size={16} />
//         </Button>

//         <Button
//           size="icon"
//           variant="ghost"
//           onClick={() => editor.chain().focus().setHeading({ level: 1 }).run()}
//         >
//           <Heading1 size={16} />
//         </Button>

//         <Button
//           size="icon"
//           variant="ghost"
//           onClick={() => editor.chain().focus().setHeading({ level: 2 }).run()}
//         >
//           <Heading2 size={16} />
//         </Button>

//         <Button
//           size="icon"
//           variant="ghost"
//           onClick={() => editor.chain().focus().setHeading({ level: 3 }).run()}
//         >
//           <Heading3 size={16} />
//         </Button>

//         <Button
//           size="icon"
//           variant="ghost"
//           onClick={() => {
//             const input = document.createElement("input");
//             input.type = "file";
//             input.accept = "image/*";
//             input.onchange = (e: any) => handleImageUpload(e.target.files[0]);
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
//             input.onchange = (e: any) => handleFileUpload(e.target.files[0]);
//             input.click();
//           }}
//         >
//           <File size={16} />
//         </Button>

//         <Button
//           size="icon"
//           variant="ghost"
//           onClick={() => editor.chain().focus().toggleCode().run()}
//         >
//           <Code size={16} />
//         </Button>
//       </div>

//       {loading && <div className="text-sm p-2 text-center">Mengupload...</div>}

//       {error && (
//         <div className="text-sm p-2 text-center text-red-500">{error}</div>
//       )}

//       <EditorContent ref={ref} editor={editor} />
//     </div>
//   );
// });

// RichTextEditor.displayName = "RichTextEditor";

// components/rich-text-editor.tsx
"use client";

import { forwardRef, useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";

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
} from "lucide-react";

export const RichTextEditor = forwardRef<
  HTMLDivElement,
  {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
  }
>(({ value, onChange, placeholder }, ref) => {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      Image.configure({
        inline: false,
        allowBase64: false,
      }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: value || "",
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg max-w-none p-4 focus:outline-none",
      },
    },
  });

  useEffect(() => {
    setMounted(true);
    return () => editor?.destroy();
  }, [editor]);

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!mounted || !editor) return null;

  const handleImageUpload = async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      editor.chain().focus().setImage({ src: data.url }).run();
    } catch (err) {
      console.error(err);
      setError("Gagal mengupload gambar");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      editor
        .chain()
        .focus()
        .setLink({ href: data.url, target: "_blank" })
        .insertContent(file.name)
        .run();
    } catch (err) {
      console.error(err);
      setError("Gagal upload file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-md flex flex-col max-h-[500px]">
      {/* Toolbar - fixed di atas */}
      <div className="flex flex-wrap gap-1 p-2 border-b bg-muted sticky top-0 z-10">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-muted-foreground/20" : ""}
        >
          <Bold size={16} />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-muted-foreground/20" : ""}
        >
          <Italic size={16} />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={
            editor.isActive("underline") ? "bg-muted-foreground/20" : ""
          }
        >
          <UnderlineIcon size={16} />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive("bulletList") ? "bg-muted-foreground/20" : ""
          }
        >
          <List size={16} />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive("orderedList") ? "bg-muted-foreground/20" : ""
          }
        >
          <ListOrdered size={16} />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().setHeading({ level: 1 }).run()}
          className={
            editor.isActive("heading", { level: 1 })
              ? "bg-muted-foreground/20"
              : ""
          }
        >
          <Heading1 size={16} />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().setHeading({ level: 2 }).run()}
          className={
            editor.isActive("heading", { level: 2 })
              ? "bg-muted-foreground/20"
              : ""
          }
        >
          <Heading2 size={16} />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().setHeading({ level: 3 }).run()}
          className={
            editor.isActive("heading", { level: 3 })
              ? "bg-muted-foreground/20"
              : ""
          }
        >
          <Heading3 size={16} />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        <Button
          size="icon"
          variant="ghost"
          onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = (e: any) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(file);
            };
            input.click();
          }}
        >
          <ImageIcon size={16} />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = ".pdf,.doc,.docx";
            input.onchange = (e: any) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(file);
            };
            input.click();
          }}
        >
          <File size={16} />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? "bg-muted-foreground/20" : ""}
        >
          <Code size={16} />
        </Button>
      </div>

      {loading && (
        <div className="text-sm p-2 text-center bg-blue-50 text-blue-600">
          Mengupload...
        </div>
      )}

      {error && (
        <div className="text-sm p-2 text-center text-red-500 bg-red-50">
          {error}
        </div>
      )}

      {/* Editor Content dengan scroll */}
      <div className="overflow-y-auto flex-1 min-h-[200px] max-h-[400px]">
        <EditorContent ref={ref} editor={editor} />
      </div>
    </div>
  );
});

RichTextEditor.displayName = "RichTextEditor";
