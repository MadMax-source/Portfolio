'use client';

import React, { useState, useRef } from 'react';
import {
  Upload,
  FileText,
  X,
  Download,
  Eye,
  Trash2,
  File,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface CVFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: string;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export function CVUpload() {
  const [cvFile, setCvFile] = useState<CVFile | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (
      file.type !== 'application/pdf' &&
      file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 20) {
      await new Promise((r) => setTimeout(r, 200));
      setUploadProgress(i);
    }

    setCvFile({
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toISOString(),
    });

    setIsUploading(false);
    setUploadProgress(100);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const removeCV = () => {
    setCvFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">CV / Resume</h2>
        <p className="text-muted-foreground mt-1">
          Upload and manage your curriculum vitae or resume.
        </p>
      </div>

      {saved && cvFile && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-800 text-sm font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          CV uploaded successfully!
        </div>
      )}

      {/* Current CV */}
      {cvFile && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              Current CV
              <Badge variant="secondary" className="text-xs font-normal">
                Active
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-4 rounded-lg border bg-card">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[hsl(var(--admin-primary))]/10 shrink-0">
                <FileText className="w-6 h-6 text-[hsl(var(--admin-primary))]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{cvFile.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {formatFileSize(cvFile.size)} &middot; Uploaded{' '}
                  {new Date(cvFile.uploadDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button variant="outline" size="sm">
                  <Eye className="w-3.5 h-3.5 mr-1.5" />
                  Preview
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  Download
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={removeCV}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{cvFile ? 'Replace CV' : 'Upload CV'}</CardTitle>
        </CardHeader>
        <CardContent>
          {isUploading ? (
            <div className="space-y-3 p-8">
              <div className="flex items-center gap-3">
                <span className="animate-spin inline-block w-5 h-5 border-2 border-[hsl(var(--admin-primary))] border-t-transparent rounded-full" />
                <span className="text-sm font-medium">Uploading...</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-xs text-muted-foreground">{uploadProgress}% complete</p>
            </div>
          ) : (
            <div
              onDrop={onDrop}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              className={`flex flex-col items-center justify-center w-full h-52 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                isDragging
                  ? 'border-[hsl(var(--admin-primary))] bg-[hsl(var(--admin-primary))]/5'
                  : 'hover:border-[hsl(var(--admin-primary))] hover:bg-[hsl(var(--sidebar-accent))]'
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-10 h-10 text-muted-foreground mb-3" />
              <span className="text-sm font-medium text-muted-foreground">
                Drag & drop your CV here
              </span>
              <span className="text-xs text-muted-foreground mt-1">or click to browse</span>
              <span className="text-xs text-muted-foreground mt-3">PDF or DOCX up to 10MB</span>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx"
                onChange={onFileChange}
                className="hidden"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-green-600" />
              PDF format is recommended for consistent formatting across devices
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-green-600" />
              Keep your CV concise - ideally 1-2 pages
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-green-600" />
              Uploading a new CV will replace the existing one
            </li>
            <li className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
              Only PDF and DOCX formats are supported
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
