export type ProjectCategory = 'blockchain' | 'devops' | 'ethical-hacking' | 'ai' | 'web2';

export interface TechItem {
  id: string;
  name: string;
}

export interface Feature {
  _id: string;
  text: string;
}

export interface Project {
  _id?: string;

  title: string;
  description: string;
  longDescription: string;

  category: ProjectCategory;

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

/*
export type ProjectCategory = 'blockchain' | 'devops' | 'ethical-hacking' | 'ai' | 'web2'

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  category: ProjectCategory
  technologies: string[]
  image: string
  liveUrl?: string
  githubUrl?: string
  features: string[]
  challenges: string
  duration: string
  role: string
}

*/
