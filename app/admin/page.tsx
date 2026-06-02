'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const ProjectUpload = dynamic(
  () => import('@/components/admin/project-upload').then((m) => ({ default: m.ProjectUpload })),
  { ssr: false },
);
const SocialLinks = dynamic(
  () => import('@/components/admin/social-links').then((m) => ({ default: m.SocialLinks })),
  { ssr: false },
);
const CVUpload = dynamic(
  () => import('@/components/admin/cv-upload').then((m) => ({ default: m.CVUpload })),
  { ssr: false },
);
const BlogEditor = dynamic(
  () => import('@/components/admin/blog-editor').then((m) => ({ default: m.BlogEditor })),
  { ssr: false },
);

type Section = 'projects' | 'socials' | 'cv' | 'blog';

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState<Section>('projects');
  //const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'projects':
        return <ProjectUpload />;
      case 'socials':
        return <SocialLinks />;
      case 'cv':
        return <CVUpload />;
      case 'blog':
        return <BlogEditor />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <AdminSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      </div>

      <main className="flex-1 overflow-y-auto">
        {/* Mobile Header */}
        <div className="md:hidden sticky top-0 z-50 bg-background border-b p-4 flex items-center">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button className="p-2 rounded-lg border">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>

            <SheetContent side="left" className="p-0 w-64">
              <AdminSidebar
                activeSection={activeSection}
                onSectionChange={(section) => {
                  setActiveSection(section);
                  setMobileOpen(false);
                }}
              />
            </SheetContent>
          </Sheet>

          <h1 className="ml-4 font-semibold">Admin Panel</h1>
        </div>

        <div className="max-w-4xl mx-auto p-4 md:p-8">{renderContent()}</div>
      </main>
    </div>
  );
}
