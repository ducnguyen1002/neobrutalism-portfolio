// Database types matching the Supabase schema

export interface Profile {
  id: number;
  full_name: string;
  title: string | null;
  bio: string | null;
  avatar_url: string | null;
  email: string | null;
  phone: string | null;
  github: string | null;
  linkedin: string | null;
  website: string | null;
  location: string | null;
  resume_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: number;
  name: string;
  icon: string | null;
  level: number | null;
  category: string | null;
  sort_order: number;
}

export interface ProjectTag {
  id: number;
  project_id: number;
  tag: string;
}

export interface Project {
  id: number;
  slug: string | null;
  title: string;
  short_description: string | null;
  content: string | null;
  cover_image: string | null;
  gallery: string[] | null;
  github_url: string | null;
  live_url: string | null;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  project_tags?: ProjectTag[];
}

export interface Comment {
  id: number;
  project_id: number;
  name: string;
  email: string;
  avatar_url: string | null;
  content: string;
  is_approved: boolean;
  created_at: string;
}

export interface Reaction {
  id: number;
  project_id: number;
  name: string | null;
  email: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface ContactMessage {
  id?: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  created_at?: string;
  is_read?: boolean;
}
