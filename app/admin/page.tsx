'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { AdminSidebar } from '@/components/admin/admin-sidebar';

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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
      <AdminSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-8 py-8">{renderContent()}</div>
      </main>
    </div>
  );
}
