import { CVData } from '../types/cv';

export function calculateATSScore(data: CVData): number {
  let score = 40; // Base score for single-column semantic hierarchy & standard ATS fonts

  if (data.name.trim()) score += 8;
  if (data.email.trim() && data.phone.trim()) score += 10;
  if (data.github.trim() || data.linkedin.trim() || data.website.trim()) score += 7;
  if (data.summary.trim().length > 40) score += 10;
  if (data.skills.some(s => s.items.trim().length > 5)) score += 10;
  if (data.experience.some(e => e.role.trim() && e.bullets.trim().length > 30)) score += 10;
  if (data.education.some(ed => ed.degree.trim())) score += 5;

  return Math.min(100, score);
}
