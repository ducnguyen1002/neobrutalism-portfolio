-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.profile (
  id smallint NOT NULL DEFAULT 1,
  full_name text NOT NULL,
  title text,
  bio text,
  avatar_url text,
  email text,
  phone text,
  github text,
  linkedin text,
  website text,
  location text,
  resume_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT profile_pkey PRIMARY KEY (id)
);
CREATE TABLE public.skills (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  icon text,
  level smallint,
  category text,
  sort_order integer DEFAULT 0,
  CONSTRAINT skills_pkey PRIMARY KEY (id)
);
CREATE TABLE public.projects (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  slug text UNIQUE,
  title text NOT NULL,
  short_description text,
  content text,
  cover_image text,
  gallery jsonb,
  github_url text,
  live_url text,
  featured boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT projects_pkey PRIMARY KEY (id)
);
CREATE TABLE public.comments (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  project_id bigint,
  name text NOT NULL,
  email text NOT NULL,
  avatar_url text,
  content text NOT NULL,
  is_approved boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT comments_pkey PRIMARY KEY (id),
  CONSTRAINT comments_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id)
);
CREATE TABLE public.reactions (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  project_id bigint,
  name text,
  email text,
  avatar_url text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT reactions_pkey PRIMARY KEY (id),
  CONSTRAINT reactions_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id)
);
CREATE TABLE public.project_tags (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  project_id bigint,
  tag text,
  CONSTRAINT project_tags_pkey PRIMARY KEY (id),
  CONSTRAINT project_tags_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id)
);
CREATE TABLE public.contact_messages (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  is_read boolean DEFAULT false,
  CONSTRAINT contact_messages_pkey PRIMARY KEY (id)
);
CREATE TABLE public.page_views (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  project_id bigint,
  ip_address inet,
  user_agent text,
  viewed_at timestamp with time zone DEFAULT now(),
  CONSTRAINT page_views_pkey PRIMARY KEY (id),
  CONSTRAINT page_views_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id)
);