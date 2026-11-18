import React from 'react';
import { Eye } from 'lucide-react';
import { CVData } from '../../types/cv';

interface CVDocumentProps {
  data: CVData;
}

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex items-center gap-2 pb-1.5 border-b-2 border-[#0071E3]/25 mb-3">
    <span className="w-1.5 h-3.5 rounded-full bg-[#0071E3] shrink-0" />
    <h2 className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#0071E3]">
      {title}
    </h2>
  </div>
);

export const CVDocument: React.FC<CVDocumentProps> = ({ data }) => {
  const contactItems = [
    data.email,
    data.phone,
    data.location,
    data.github,
    data.linkedin,
    data.website
  ].filter((item) => item && item.trim() !== '');

  const validSkills = data.skills.filter((s) => s.category.trim() || s.items.trim());
  const validExp = data.experience.filter((e) => e.role.trim() || e.company.trim() || e.bullets.trim());
  const validProj = data.projects.filter((p) => p.name.trim() || p.description.trim());
  const validEdu = data.education.filter((ed) => ed.degree.trim() || ed.school.trim());

  return (
    <section id="preview-panel" className="lg:col-span-7 xl:col-span-7 print-container">
      <div className="sticky top-[73px] space-y-4">
        {/* Preview Meta Bar */}
        <div className="no-print flex items-center justify-between px-2">
          <span className="text-xs font-medium text-[#86868B] flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" /> Live A4 Document Preview (2-Page Clean Layout)
          </span>
          <span className="text-[11px] font-mono text-[#86868B] bg-white px-2.5 py-0.5 rounded-full border border-black/5 shadow-2xs">
            Single-Column ATS Standard
          </span>
        </div>

        {/* CONTAINER HOLDING THE TWO CLEAN A4 PAGES */}
        <div id="cv-paper" className="space-y-6 print:space-y-0">
          
          {/* ========================================================= */}
          {/* PAGE 1: Profile, Summary, Technical & Language Skills & Experience */}
          {/* ========================================================= */}
          <div
            id="cv-page-1"
            className="cv-page bg-white rounded-2xl sm:rounded-[24px] shadow-paper border border-black/5 p-7 sm:p-10 min-h-[1050px] text-[#1D1D1F] flex flex-col justify-between transition-all"
          >
            <div className="space-y-5">
              {/* Header */}
              <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-5 pb-5 border-b border-neutral-200">
                <div className="space-y-1.5 flex-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1D1D1F]">
                    {data.name.trim() || 'Your Name'}
                  </h1>
                  <p className="text-[15px] font-semibold text-[#0071E3] tracking-tight">
                    {data.title.trim() || 'Software Engineer'}
                  </p>

                  {/* Contacts Row */}
                  <div className="pt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-600">
                    {contactItems.length > 0 ? (
                      contactItems.map((item, idx) => (
                        <React.Fragment key={idx}>
                          <span>{item.trim()}</span>
                          {idx < contactItems.length - 1 && (
                            <span className="text-neutral-300">•</span>
                          )}
                        </React.Fragment>
                      ))
                    ) : (
                      <span className="text-neutral-400 italic">
                        email@domain.com • Location • github.com/username
                      </span>
                    )}
                  </div>
                </div>

                {/* Profile Portrait */}
                {data.showPhoto && data.photo && (
                  <div className="shrink-0">
                    <img
                      src={data.photo}
                      alt="Profile"
                      className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl object-cover border border-neutral-200 shadow-2xs"
                    />
                  </div>
                )}
              </header>

              {/* Professional Summary */}
              <section>
                <SectionHeader title="Professional Summary" />
                {data.summary && data.summary.trim() ? (
                  <p className="text-[13px] leading-relaxed text-neutral-700 whitespace-pre-line">
                    {data.summary}
                  </p>
                ) : (
                  <p className="text-[13px] leading-relaxed text-neutral-400 italic">
                    Write a concise summary highlighting your software engineering stack, system architecture experience, and measurable impact.
                  </p>
                )}
              </section>

              {/* Technical and Language Skills (Clean proportional 2-column alignment) */}
              <section>
                <SectionHeader title="Technical and Language Skills" />
                {validSkills.length > 0 ? (
                  <div className="space-y-2 text-[13px]">
                    {validSkills.map((s, idx) => (
                      <div
                        key={s.id || idx}
                        className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-3 items-baseline py-0.5"
                      >
                        <span className="sm:col-span-4 font-bold text-[#1D1D1F] tracking-tight">
                          {s.category || 'Skills'}:
                        </span>
                        <span className="sm:col-span-8 text-neutral-700 leading-relaxed">
                          {s.items}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-neutral-400 italic text-xs">
                    Add your programming languages, frameworks, and cloud tools on the left.
                  </p>
                )}
              </section>

              {/* Work Experience */}
              <section>
                <SectionHeader title="Work Experience" />
                {validExp.length > 0 ? (
                  <div className="space-y-4">
                    {validExp.map((exp, idx) => {
                      const bullets = exp.bullets
                        .split('\n')
                        .map((line) => line.replace(/^[•\-\*]\s*/, '').trim())
                        .filter(Boolean);

                      return (
                        <div key={exp.id || idx} className="space-y-1.5 cv-item-block">
                          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                            <div className="flex items-baseline gap-2 flex-wrap">
                              <span className="font-bold text-[14px] text-[#1D1D1F]">
                                {exp.role || 'Software Engineer'}
                              </span>
                              {exp.company && (
                                <span className="text-[#0071E3] font-semibold text-[13.5px]">
                                  @{exp.company}
                                </span>
                              )}
                            </div>
                            <div className="text-xs font-mono text-neutral-500 shrink-0">
                              {exp.period}
                              {exp.location ? ` • ${exp.location}` : ''}
                            </div>
                          </div>
                          {bullets.length > 0 && (
                            <ul className="list-disc list-outside ml-4 space-y-1 text-[13px] text-neutral-700 leading-relaxed pt-0.5">
                              {bullets.map((b, bIdx) => (
                                <li key={bIdx}>{b}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-neutral-400 italic text-xs">
                    Your work history and quantified engineering achievements will appear here.
                  </p>
                )}
              </section>
            </div>

            {/* Page 1 Footer indicator */}
            <div className="no-print pt-6 mt-6 border-t border-black/5 flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span>{data.name || 'CV Studio'} • Page 1 of 2</span>
              <span>Continues on Page 2 →</span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* PAGE 2: Projects (At start of page!) & Education         */}
          {/* ========================================================= */}
          <div
            id="cv-page-2"
            className="cv-page bg-white rounded-2xl sm:rounded-[24px] shadow-paper border border-black/5 p-7 sm:p-10 min-h-[1050px] text-[#1D1D1F] flex flex-col justify-between transition-all"
          >
            <div className="space-y-6">
              {/* Header on Page 2 for context & ATS continuity */}
              <div className="pb-3 border-b border-neutral-200 flex items-baseline justify-between">
                <div>
                  <span className="text-sm font-bold text-[#1D1D1F]">
                    {data.name.trim() || 'Your Name'}
                  </span>
                  <span className="text-xs text-neutral-500 font-medium ml-2">
                    — {data.title.trim() || 'Software Engineer'}
                  </span>
                </div>
                <span className="text-xs font-mono text-neutral-400">
                  {data.email || ''}
                </span>
              </div>

              {/* Projects (Renamed to 'Projects' and starts at the top of Page 2) */}
              <section>
                <SectionHeader title="Projects" />
                {validProj.length > 0 ? (
                  <div className="space-y-4">
                    {validProj.map((proj, idx) => (
                      <div key={proj.id || idx} className="space-y-1 cv-item-block">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <div className="flex items-baseline gap-2.5 flex-wrap">
                            <span className="font-bold text-[13.5px] text-[#1D1D1F]">
                              {proj.name}
                            </span>
                            {proj.tech && (
                              <span className="text-[11px] font-mono text-[#0071E3] bg-[#0071E3]/8 border border-[#0071E3]/20 px-2 py-0.5 rounded-md">
                                {proj.tech}
                              </span>
                            )}
                          </div>
                          {proj.link && (
                            <span className="text-xs text-neutral-500 font-mono">{proj.link}</span>
                          )}
                        </div>
                        {proj.description && (
                          <p className="text-[13px] text-neutral-700 leading-relaxed">
                            {proj.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-neutral-400 italic text-xs">
                    Your featured engineering projects will appear here at the top of Page 2.
                  </p>
                )}
              </section>

              {/* Education & Certifications */}
              <section>
                <SectionHeader title="Education & Certifications" />
                {validEdu.length > 0 ? (
                  <div className="space-y-3">
                    {validEdu.map((ed, idx) => (
                      <div
                        key={ed.id || idx}
                        className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-[13px] cv-item-block"
                      >
                        <div>
                          <span className="font-bold text-[#1D1D1F]">{ed.degree}</span>
                          {ed.school && (
                            <span className="text-neutral-600 font-medium"> — {ed.school}</span>
                          )}
                          {ed.details && (
                            <span className="text-neutral-500 text-xs block sm:inline sm:ml-2">
                              ({ed.details})
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-mono text-neutral-500 shrink-0">
                          {ed.period}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-neutral-400 italic text-xs">
                    Add your degree or technical certifications.
                  </p>
                )}
              </section>
            </div>

            {/* Page 2 Footer indicator */}
            <div className="no-print pt-6 mt-6 border-t border-black/5 flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span>{data.name || 'CV Studio'} • Page 2 of 2</span>
              <span>End of Document</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
