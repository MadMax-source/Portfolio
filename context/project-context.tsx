// context/project-context.tsx

'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface Feature {
  _id: string;
  text: string;
}

export interface TechItem {
  id: string;
  name: string;
}

export interface Project {
  _id?: string;

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

  imageUrl: string;
  imagePublicId?: string;

  createdAt?: string;
  updatedAt?: string;
}

interface ProjectContextType {
  projects: Project[];

  loading: boolean;

  createProject: (projectData: any) => Promise<void>;

  fetchProjects: () => Promise<void>;

  deleteProject: (id: string) => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);

  const [loading, setLoading] = useState(false);

  // FETCH PROJECTS
  const fetchProjects = async () => {
    try {
      setLoading(true);

      const res = await fetch('/api/projects');

      const data = await res.json();

      if (data.success) {
        setProjects(data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // CREATE PROJECT
  const createProject = async (projectData: any) => {
    try {
      setLoading(true);

      const res = await fetch('/api/projects', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(projectData),
      });

      const data = await res.json();

      if (data.success) {
        setProjects((prev) => [data.data, ...prev]);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // DELETE PROJECT
  const deleteProject = async (id: string) => {
    try {
      setLoading(true);

      await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      setProjects((prev) => prev.filter((project) => project._id !== id));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        createProject,
        fetchProjects,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error('useProjects must be used inside ProjectProvider');
  }

  return context;
}
