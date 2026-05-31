'use client';

import React, { useState, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import TiptapImage from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Minus,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Highlighter,
  Link as LinkIcon,
  Image as ImageIcon,
  Eye,
  Edit3,
  Send,
  Save,
  X,
  Type,
  LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Toggle } from '@/components/ui/toggle';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type ViewMode = 'write' | 'preview' | 'split';

export function BlogEditor() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('write');
  const [isPublishing, setIsPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageDialogOpen, setImageDialogOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder: 'Start writing your blog post...',
      }),
      Highlight.configure({
        multicolor: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      TiptapImage.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'cursor-pointer',
        },
      }),
      TextStyle,
      Color,
    ],
    content: '',
    editorProps: {
      attributes: {
        class:
          'tiptap-editor min-h-[400px] max-w-none px-6 py-4 focus:outline-none text-base leading-relaxed',
      },
    },
  });

  const addTag = () => {
    const trimmed = tagInput.trim().toLowerCase();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsPublishing(false);
    setPublished(true);
    setTimeout(() => setPublished(false), 3000);
  };

  const setLink = useCallback(() => {
    if (!editor) return;
    if (linkUrl === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
    }
    setLinkDialogOpen(false);
    setLinkUrl('');
  }, [editor, linkUrl]);

  const addImage = useCallback(() => {
    if (!editor || !imageUrl) return;
    editor.chain().focus().setImage({ src: imageUrl }).run();
    setImageDialogOpen(false);
    setImageUrl('');
  }, [editor, imageUrl]);

  const renderToolbar = () => {
    if (!editor) return null;

    return (
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b bg-muted/30">
        {/* Undo / Redo */}
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          icon={Undo}
          tooltip="Undo"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          icon={Redo}
          tooltip="Redo"
        />

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Headings */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive('heading', { level: 1 })}
          icon={Heading1}
          tooltip="Heading 1"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive('heading', { level: 2 })}
          icon={Heading2}
          tooltip="Heading 2"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive('heading', { level: 3 })}
          icon={Heading3}
          tooltip="Heading 3"
        />

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Text Formatting */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          icon={Bold}
          tooltip="Bold"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          icon={Italic}
          tooltip="Italic"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive('underline')}
          icon={UnderlineIcon}
          tooltip="Underline"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive('strike')}
          icon={Strikethrough}
          tooltip="Strikethrough"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          active={editor.isActive('code')}
          icon={Code}
          tooltip="Code"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          active={editor.isActive('highlight')}
          icon={Highlighter}
          tooltip="Highlight"
        />

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Lists */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
          icon={List}
          tooltip="Bullet List"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
          icon={ListOrdered}
          tooltip="Ordered List"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive('blockquote')}
          icon={Quote}
          tooltip="Block Quote"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          icon={Minus}
          tooltip="Horizontal Rule"
        />

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Alignment */}
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          active={editor.isActive({ textAlign: 'left' })}
          icon={AlignLeft}
          tooltip="Align Left"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          active={editor.isActive({ textAlign: 'center' })}
          icon={AlignCenter}
          tooltip="Align Center"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          active={editor.isActive({ textAlign: 'right' })}
          icon={AlignRight}
          tooltip="Align Right"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          active={editor.isActive({ textAlign: 'justify' })}
          icon={AlignJustify}
          tooltip="Justify"
        />

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Link & Image */}
        <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
          <DialogTrigger asChild>
            <ToolbarButton
              onClick={() => {
                const prevLink = editor.getAttributes('link').href || '';
                setLinkUrl(prevLink);
              }}
              active={editor.isActive('link')}
              icon={LinkIcon}
              tooltip="Insert Link"
            />
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Insert Link</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    setLink();
                  }
                }}
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setLinkDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={setLink}>Insert</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
          <DialogTrigger asChild>
            <ToolbarButton
              onClick={() => setImageUrl('')}
              icon={ImageIcon}
              tooltip="Insert Image"
            />
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Insert Image</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input
                placeholder="https://example.com/image.png"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addImage();
                  }
                }}
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setImageDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={addImage}>Insert</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  const renderPreview = () => {
    const html = editor?.getHTML() || '';

    if (!title && html === '<p></p>') {
      return (
        <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-muted-foreground">
          <Eye className="w-12 h-12 mb-3 opacity-30" />
          <p className="text-sm">Nothing to preview yet</p>
          <p className="text-xs mt-1">Start writing to see a live preview</p>
        </div>
      );
    }

    return (
      <article className="max-w-3xl mx-auto px-6 py-8">
        {title && <h1 className="text-3xl font-bold tracking-tight mb-4">{title}</h1>}
        {description && <p className="text-lg text-muted-foreground mb-6">{description}</p>}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    );
  };

  const wordCount = editor
    ? editor
        .getText()
        .split(/\s+/)
        .filter((w) => w.length > 0).length
    : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Write Blog Post</h2>
        <p className="text-muted-foreground mt-1">
          Create and publish blog posts with a rich text editor.
        </p>
      </div>

      {published && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-800 text-sm font-medium flex items-center gap-2">
          <Send className="w-4 h-4" />
          Blog post published successfully!
        </div>
      )}

      {/* Title & Description */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="blog-title" className="text-sm font-medium">
              Post Title *
            </Label>
            <Input
              id="blog-title"
              placeholder="Enter your blog post title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg font-semibold"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="blog-desc" className="text-sm font-medium">
              Short Description
            </Label>
            <Textarea
              id="blog-desc"
              placeholder="A brief summary of your blog post (used for SEO and previews)..."
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Tags</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a tag (e.g. blockchain, tutorial)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <Button
                type="button"
                variant="secondary"
                onClick={addTag}
                disabled={!tagInput.trim()}
              >
                Add
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="pl-2.5 pr-1 py-1">
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-1 p-0.5 rounded-full hover:bg-destructive/20 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Editor Card */}
      <Card className="overflow-hidden">
        {/* View Mode Tabs */}
        <div className="flex items-center justify-between border-b px-4 py-2 bg-muted/20">
          <div className="flex items-center gap-1">
            <Button
              variant={viewMode === 'write' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('write')}
              className="gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Write
            </Button>
            <Button
              variant={viewMode === 'preview' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('preview')}
              className="gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              Preview
            </Button>
            <Button
              variant={viewMode === 'split' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('split')}
              className="gap-1.5"
            >
              <Type className="w-3.5 h-3.5" />
              Split
            </Button>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>{wordCount} words</span>
            <span>&middot;</span>
            <span>{readTime} min read</span>
          </div>
        </div>

        {/* Editor / Preview Content */}
        {viewMode === 'write' && (
          <>
            {renderToolbar()}
            <EditorContent editor={editor} />
          </>
        )}

        {viewMode === 'preview' && <div className="min-h-[500px] border-t">{renderPreview()}</div>}

        {viewMode === 'split' && (
          <div className="grid grid-cols-2 divide-x min-h-[500px]">
            <div>
              {renderToolbar()}
              <EditorContent editor={editor} />
            </div>
            <div className="overflow-y-auto bg-muted/10">{renderPreview()}</div>
          </div>
        )}
      </Card>

      {/* Publish Actions */}
      <div className="flex items-center gap-4">
        <Button
          onClick={handlePublish}
          disabled={isPublishing || !title.trim()}
          className="bg-[hsl(var(--admin-primary))] hover:bg-[hsl(var(--admin-primary))]/90 text-[hsl(var(--admin-primary-foreground))] px-8"
        >
          {isPublishing ? (
            <>
              <span className="animate-spin mr-2 inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
              Publishing...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Publish
            </>
          )}
        </Button>
        <Button variant="outline" disabled={!title.trim()}>
          <Save className="w-4 h-4 mr-2" />
          Save Draft
        </Button>
      </div>
    </div>
  );
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  icon: Icon,
  tooltip,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  icon: LucideIcon;
  tooltip: string;
}) {
  return (
    <Toggle
      size="sm"
      pressed={active}
      onPressedChange={onClick}
      disabled={disabled}
      aria-label={tooltip}
      className="h-8 w-8 p-0 data-[state=on]:bg-[hsl(var(--admin-primary))] data-[state=on]:text-[hsl(var(--admin-primary-foreground))]"
    >
      <Icon className="w-4 h-4" />
    </Toggle>
  );
}
