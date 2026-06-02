'use client';

import React from 'react';
import {
  FolderKanban,
  Link2,
  FileText,
  PenSquare,
  LayoutDashboard,
  LucideIcon,
} from 'lucide-react';

import { cn } from '@/lib/utils';

type Section = 'projects' | 'socials' | 'cv' | 'blog';

const navItems: { id: Section; label: string; icon: LucideIcon }[] = [
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'socials', label: 'Social Links', icon: Link2 },
  { id: 'cv', label: 'CV / Resume', icon: FileText },
  { id: 'blog', label: 'Blog Posts', icon: PenSquare },
];

interface AdminSidebarProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
}

export function AdminSidebar({ activeSection, onSectionChange }: AdminSidebarProps) {
  return (
    <aside className="flex flex-col h-screen w-[240px] bg-[hsl(var(--sidebar))] border-r border-[hsl(var(--sidebar-border))]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-[hsl(var(--sidebar-border))]">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[hsl(var(--admin-primary))] text-[hsl(var(--admin-primary-foreground))] shrink-0">
          <LayoutDashboard className="w-4 h-4" />
        </div>

        <span className="font-semibold text-sm tracking-tight text-[hsl(var(--sidebar-foreground))]">
          Portfolio Admin
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                'flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-[hsl(var(--admin-primary))] text-[hsl(var(--admin-primary-foreground))] shadow-sm'
                  : 'text-[hsl(var(--sidebar-foreground))] hover:bg-[hsl(var(--sidebar-accent))]',
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
