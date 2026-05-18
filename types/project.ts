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
