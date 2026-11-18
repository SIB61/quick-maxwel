"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  Pilcrow,
  List,
  ListOrdered,
  Quote,
  Code,
  FileCode,
  Link2,
  Unlink,
  Minus,
  Undo2,
  Redo2,
  RemoveFormatting,
} from "lucide-react";
import { markdownToHtml } from "@/lib/rich-text";

interface RichTextEditorProps {
  id?: string;
  name: string;
  defaultValue?: string | null;
  placeholder?: string;
  minHeight?: string;
  required?: boolean;
  className?: string;
  onChange?: (html: string) => void;
}

export function RichTextEditor({
  id,
  name,
  defaultValue = "",
  placeholder = "Design and format your content visually using toolbar buttons...",
  minHeight = "240px",
  required = false,
  className = "",
  onChange,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [htmlValue, setHtmlValue] = useState("");
  const [activeFormats, setActiveFormats] = useState<{ [key: string]: boolean }>({});
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const isInitialized = useRef(false);

  // Initialize content on mount with markdown conversion if needed
  useEffect(() => {
    if (!isInitialized.current && editorRef.current) {
      const initialHtml = defaultValue ? markdownToHtml(defaultValue) : "";
      editorRef.current.innerHTML = initialHtml;
      setHtmlValue(initialHtml);
      isInitialized.current = true;
    }
  }, [defaultValue]);

  // Synchronize internal state with onChange and hidden field
  const updateContent = useCallback(() => {
    if (!editorRef.current) return;
    const currentHtml = editorRef.current.innerHTML;
    // Normalize empty content
    const cleaned =
      currentHtml === "<p><br></p>" || currentHtml === "<br>" || currentHtml === "<p></p>"
        ? ""
        : currentHtml;
    setHtmlValue(cleaned);
    if (onChange) {
      onChange(cleaned);
    }
  }, [onChange]);

  // Query active formats (bold, italic, lists, etc.) on cursor movements
  const checkActiveFormats = useCallback(() => {
    if (typeof document === "undefined") return;
    try {
      setActiveFormats({
        bold: document.queryCommandState("bold"),
        italic: document.queryCommandState("italic"),
        underline: document.queryCommandState("underline"),
        strikeThrough: document.queryCommandState("strikeThrough"),
        insertUnorderedList: document.queryCommandState("insertUnorderedList"),
        insertOrderedList: document.queryCommandState("insertOrderedList"),
      });
    } catch {
      // Ignored for non-supported selection states
    }
  }, []);

  const executeCommand = (command: string, value: string | undefined = undefined) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    document.execCommand(command, false, value);
    updateContent();
    checkActiveFormats();
  };

  const applyHeading = (level: "h1" | "h2" | "h3" | "p") => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    const tag = level === "p" ? "<p>" : `<${level}>`;
    document.execCommand("formatBlock", false, tag);
    updateContent();
  };

  const handleApplyLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editorRef.current) return;
    editorRef.current.focus();
    if (linkUrl.trim()) {
      let url = linkUrl.trim();
      if (!/^https?:\/\//i.test(url) && !url.startsWith("/") && !url.startsWith("#")) {
        url = `https://${url}`;
      }
      document.execCommand("createLink", false, url);
      updateContent();
    }
    setLinkUrl("");
    setIsLinkDialogOpen(false);
  };

  return (
    <div className={`w-full rounded-2xl border border-zinc-800 bg-zinc-950/90 shadow-inner flex flex-col focus-within:border-emerald-500/50 transition-colors ${className}`}>
      {/* Visual Editor Toolbar */}
      <div className="flex items-center gap-1 p-2.5 bg-zinc-900/90 border-b border-zinc-800/90 rounded-t-2xl overflow-x-auto scrollbar-none flex-wrap">
        {/* Headings */}
        <div className="flex items-center gap-1 pr-2 border-r border-zinc-800">
          <button
            type="button"
            title="Normal Paragraph"
            onClick={() => applyHeading("p")}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <Pilcrow className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Heading 1"
            onClick={() => applyHeading("h1")}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer font-bold"
          >
            <Heading1 className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Heading 2"
            onClick={() => applyHeading("h2")}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer font-bold"
          >
            <Heading2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Heading 3"
            onClick={() => applyHeading("h3")}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer font-bold"
          >
            <Heading3 className="h-4 w-4" />
          </button>
        </div>

        {/* Inline Formatting */}
        <div className="flex items-center gap-1 px-2 border-r border-zinc-800">
          <button
            type="button"
            title="Bold"
            onClick={() => executeCommand("bold")}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              activeFormats.bold ? "bg-emerald-500/20 text-emerald-400" : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <Bold className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Italic"
            onClick={() => executeCommand("italic")}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              activeFormats.italic ? "bg-emerald-500/20 text-emerald-400" : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <Italic className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Underline"
            onClick={() => executeCommand("underline")}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              activeFormats.underline ? "bg-emerald-500/20 text-emerald-400" : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <Underline className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Strikethrough"
            onClick={() => executeCommand("strikeThrough")}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              activeFormats.strikeThrough ? "bg-emerald-500/20 text-emerald-400" : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <Strikethrough className="h-4 w-4" />
          </button>
        </div>

        {/* Lists & Quotes */}
        <div className="flex items-center gap-1 px-2 border-r border-zinc-800">
          <button
            type="button"
            title="Bullet List"
            onClick={() => executeCommand("insertUnorderedList")}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              activeFormats.insertUnorderedList ? "bg-emerald-500/20 text-emerald-400" : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <List className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Numbered List"
            onClick={() => executeCommand("insertOrderedList")}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              activeFormats.insertOrderedList ? "bg-emerald-500/20 text-emerald-400" : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <ListOrdered className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Quote"
            onClick={() => executeCommand("formatBlock", "<blockquote>")}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <Quote className="h-4 w-4" />
          </button>
        </div>

        {/* Code & Divider */}
        <div className="flex items-center gap-1 px-2 border-r border-zinc-800">
          <button
            type="button"
            title="Code Block"
            onClick={() => executeCommand("formatBlock", "<pre>")}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <FileCode className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Horizontal Divider"
            onClick={() => executeCommand("insertHorizontalRule")}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <Minus className="h-4 w-4" />
          </button>
        </div>

        {/* Links */}
        <div className="flex items-center gap-1 px-2 border-r border-zinc-800">
          <button
            type="button"
            title="Insert Link"
            onClick={() => setIsLinkDialogOpen(true)}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <Link2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Remove Link"
            onClick={() => executeCommand("unlink")}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <Unlink className="h-4 w-4" />
          </button>
        </div>

        {/* History & Clear */}
        <div className="flex items-center gap-1 pl-2">
          <button
            type="button"
            title="Undo"
            onClick={() => executeCommand("undo")}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <Undo2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Redo"
            onClick={() => executeCommand("redo")}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <Redo2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Clear Formatting"
            onClick={() => executeCommand("removeFormat")}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <RemoveFormatting className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Inline Link Modal Dialog */}
      {isLinkDialogOpen && (
        <div className="p-3 bg-zinc-900 border-b border-zinc-800 flex items-center gap-2">
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="Enter URL (e.g. https://example.com)..."
            autoFocus
            className="flex-1 h-9 px-3 rounded-lg bg-zinc-950 border border-zinc-700 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <button
            type="button"
            onClick={handleApplyLink}
            className="h-9 px-3.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-semibold cursor-pointer"
          >
            Add Link
          </button>
          <button
            type="button"
            onClick={() => {
              setIsLinkDialogOpen(false);
              setLinkUrl("");
            }}
            className="h-9 px-3 rounded-lg border border-zinc-700 hover:bg-zinc-800 text-xs text-zinc-300 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Editable Visual Content Area */}
      <div
        ref={editorRef}
        id={id}
        contentEditable
        onInput={updateContent}
        onKeyUp={checkActiveFormats}
        onMouseUp={checkActiveFormats}
        data-placeholder={placeholder}
        style={{ minHeight }}
        className="p-4 sm:p-5 text-zinc-100 focus:outline-none overflow-y-auto leading-relaxed prose prose-invert max-w-none prose-headings:font-bold prose-headings:text-zinc-100 prose-headings:tracking-tight prose-a:text-emerald-400 prose-blockquote:border-l-2 prose-blockquote:border-emerald-500/60 prose-blockquote:pl-4 prose-blockquote:italic prose-pre:bg-zinc-950/80 prose-pre:border prose-pre:border-zinc-800 prose-pre:p-3 prose-pre:rounded-xl empty:before:content-[attr(data-placeholder)] empty:before:text-zinc-600 empty:before:pointer-events-none empty:before:text-sm"
      />

      {/* Hidden input synchronized with FormData for standard Server Actions */}
      <input type="hidden" name={name} value={htmlValue} required={required} />
    </div>
  );
}
