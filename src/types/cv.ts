export interface SkillCategory {
  id: number;
  category: string;
  items: string;
}

export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string;
}

export interface ProjectItem {
  id: number;
  name: string;
  tech: string;
  link: string;
  description: string;
}

export interface EducationItem {
  id: number;
  degree: string;
  school: string;
  period: string;
  details: string;
}

export interface CVData {
  showPhoto: boolean;
  photo: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  website: string;
  summary: string;
  skills: SkillCategory[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
}
