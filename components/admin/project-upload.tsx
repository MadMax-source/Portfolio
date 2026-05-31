'use client';
import { useProjects } from '@/context/project-context';

import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  GripVertical,
  Upload,
  X,
  ExternalLink,
  Github,
  Link as LinkIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const categories = [
  { value: 'blockchain', label: 'Blockchain' },
  { value: 'devops', label: 'DevOps' },
  { value: 'ethical-hacking', label: 'Ethical Hacking' },
  { value: 'ai', label: 'AI / Machine Learning' },
  { value: 'web2', label: 'Web2 / Full Stack' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'other', label: 'Other' },
];

interface Feature {
  id: string;
  text: string;
}

interface TechItem {
  id: string;
  name: string;
}

interface ProjectFormData {
  title: string;
  description: string;
  longDescription: string;
  category: string;
  technologies: TechItem[];
  liveUrl: string;
  githubUrl: string;
  features: Feature[];
  challenges: string;
  duration: string;
  role: string;
  imageFile: File | null;
  imagePreview: string;
}

const initialFormData: ProjectFormData = {
  title: '',
  description: '',
  longDescription: '',
  category: '',
  technologies: [],
  liveUrl: '',
  githubUrl: '',
  features: [],
  challenges: '',
  duration: '',
  role: '',
  imageFile: null,
  imagePreview: '',
};

export function ProjectUpload() {
  const [form, setForm] = useState<ProjectFormData>(initialFormData);
  const [techInput, setTechInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { createProject, loading } = useProjects();
  const [uploadedTitle, setUploadedTitle] = useState('');

  const updateField = <K extends keyof ProjectFormData>(key: K, value: ProjectFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const addTechnology = () => {
    const trimmed = techInput.trim();
    if (trimmed && !form.technologies.some((t) => t.name === trimmed)) {
      updateField('technologies', [
        ...form.technologies,
        { id: crypto.randomUUID(), name: trimmed },
      ]);
      setTechInput('');
    }
  };

  const removeTechnology = (id: string) => {
    updateField(
      'technologies',
      form.technologies.filter((t) => t.id !== id),
    );
  };

  const addFeature = () => {
    updateField('features', [...form.features, { id: crypto.randomUUID(), text: '' }]);
  };

  const updateFeature = (id: string, text: string) => {
    updateField(
      'features',
      form.features.map((f) => (f.id === id ? { ...f, text } : f)),
    );
  };

  const removeFeature = (id: string) => {
    updateField(
      'features',
      form.features.filter((f) => f.id !== id),
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateField('imageFile', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField('imagePreview', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    updateField('imageFile', null);
    updateField('imagePreview', '');
  };

  /*
  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate upload
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };
  */

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      /*
      await createProject({
        title: form.title,
        description: form.description,
        longDescription: form.longDescription,
        category: form.category,

        technologies: form.technologies,

        liveUrl: form.liveUrl,
        githubUrl: form.githubUrl,

        features: form.features,

        challenges: form.challenges,
        duration: form.duration,
        role: form.role,

        imagePreview: form.imagePreview,
      });

    

      setSubmitted(true);

      setForm(initialFormData);

      setTimeout(() => {
        setSubmitted(false);
      }, 3000);


      */
      await createProject({
        title: form.title,
        description: form.description,
        longDescription: form.longDescription,
        category: form.category,

        technologies: form.technologies,

        liveUrl: form.liveUrl,
        githubUrl: form.githubUrl,

        features: form.features,

        challenges: form.challenges,
        duration: form.duration,
        role: form.role,

        imagePreview: form.imagePreview,
      });

      setUploadedTitle(form.title);
      setSubmitted(true);

      setForm(initialFormData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Upload Project</h2>
        <p className="text-muted-foreground mt-1">Add a new project to your portfolio showcase.</p>
      </div>

      <div className="grid gap-8">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g. DeFi Exchange Platform"
                  value={form.title}
                  onChange={(e) => updateField('title', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={form.category} onValueChange={(v) => updateField('category', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortDesc">Short Description *</Label>
              <Input
                id="shortDesc"
                placeholder="A brief one-line summary of the project"
                value={form.description}
                onChange={(e) => updateField('description', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="longDesc">Full Description *</Label>
              <Textarea
                id="longDesc"
                placeholder="Detailed description of the project, its purpose, and what it does..."
                rows={5}
                value={form.longDescription}
                onChange={(e) => updateField('longDescription', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Project Image */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Project Image</CardTitle>
          </CardHeader>
          <CardContent>
            {form.imagePreview ? (
              <div className="relative group rounded-lg overflow-hidden border">
                <img src={form.imagePreview} alt="Preview" className="w-full h-48 object-cover" />
                <button
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:border-[hsl(var(--admin-primary))] hover:bg-[hsl(var(--sidebar-accent))] transition-colors">
                <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">Click to upload project image</span>
                <span className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </CardContent>
        </Card>

        {/* Technologies */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Technologies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="e.g. React, Solidity, Hardhat"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTechnology();
                  }
                }}
              />
              <Button
                type="button"
                variant="secondary"
                onClick={addTechnology}
                disabled={!techInput.trim()}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.technologies.map((tech) => (
                <Badge key={tech.id} variant="secondary" className="pl-2.5 pr-1 py-1 text-sm">
                  {tech.name}
                  <button
                    onClick={() => removeTechnology(tech.id)}
                    className="ml-1 p-0.5 rounded-full hover:bg-destructive/20 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Links */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="liveUrl" className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5" />
                Live URL
              </Label>
              <Input
                id="liveUrl"
                placeholder="https://your-project.com"
                value={form.liveUrl}
                onChange={(e) => updateField('liveUrl', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="githubUrl" className="flex items-center gap-2">
                <Github className="w-3.5 h-3.5" />
                GitHub URL
              </Label>
              <Input
                id="githubUrl"
                placeholder="https://github.com/user/repo"
                value={form.githubUrl}
                onChange={(e) => updateField('githubUrl', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Key Features</CardTitle>
            <Button type="button" variant="outline" size="sm" onClick={addFeature}>
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              Add Feature
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {form.features.length === 0 && (
              <p className="text-sm text-muted-foreground py-4 text-center">
                No features added yet. Click &quot;Add Feature&quot; to start.
              </p>
            )}
            {form.features.map((feature, index) => (
              <div key={feature.id} className="flex items-center gap-2">
                <GripVertical className="w-4 h-4 text-muted-foreground shrink-0 cursor-grab" />
                <span className="text-sm text-muted-foreground w-6 shrink-0">{index + 1}.</span>
                <Input
                  placeholder="Describe a key feature..."
                  value={feature.text}
                  onChange={(e) => updateFeature(feature.id, e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFeature(feature.id)}
                  className="shrink-0 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Additional Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Additional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  placeholder="e.g. 4 months"
                  value={form.duration}
                  onChange={(e) => updateField('duration', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Your Role</Label>
                <Input
                  id="role"
                  placeholder="e.g. Lead Developer"
                  value={form.role}
                  onChange={(e) => updateField('role', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="challenges">Challenges & Solutions</Label>
              <Textarea
                id="challenges"
                placeholder="What challenges did you face and how did you solve them?"
                rows={4}
                value={form.challenges}
                onChange={(e) => updateField('challenges', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex items-center gap-4 pt-2">
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[hsl(var(--admin-primary))] hover:bg-[hsl(var(--admin-primary))]/90 text-[hsl(var(--admin-primary-foreground))] px-8"
          >
            {loading ? (
              <>
                <span className="animate-spin mr-2 inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload Project
              </>
            )}
          </Button>
          <Button variant="outline" onClick={() => setForm(initialFormData)} disabled={loading}>
            Reset Form
          </Button>
        </div>
      </div>
      <Dialog open={submitted} onOpenChange={setSubmitted}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>🎉 Project Uploaded Successfully</DialogTitle>

            <DialogDescription>
              "{uploadedTitle}" has been uploaded and saved successfully.
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-end">
            <Button onClick={() => setSubmitted(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
