'use client';

import React from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { ProjectProvider } from '@/context/project-context';
import { ReviewProvider } from '@/context/review-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <ProjectProvider>
        <ReviewProvider>{children}</ReviewProvider>
      </ProjectProvider>
    </ThemeProvider>
  );
}
