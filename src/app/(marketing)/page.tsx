import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { BlogSection } from "@/components/sections/blog-section";
import { ContactSection } from "@/components/sections/contact-section";

import { getPublishedProjects } from "@/actions/project.actions";
import { getPublishedBlogs } from "@/actions/blog.actions";
import { getSkills } from "@/actions/skill.actions";
import { getExperiences } from "@/actions/experience.actions";
import { getEducation } from "@/actions/education.actions";
import { getSettings } from "@/actions/settings.actions";

export const revalidate = 30; // ISR cache revalidation

/**
 * Landing page — dynamically loads real projects, blogs, skills,
 * experience, and education records from the database.
 */
export default async function HomePage() {
  const [
    projects,
    blogs,
    skills,
    experiences,
    educations,
    settings,
  ] = await Promise.all([
    getPublishedProjects(),
    getPublishedBlogs(),
    getSkills(),
    getExperiences(),
    getEducation(),
    getSettings(),
  ]);

  const latestProject = projects.length > 0 ? projects[0] : null;

  return (
    <>
      <HeroSection
        projectCount={projects.length}
        settings={settings}
        latestProject={latestProject}
      />
      <AboutSection
        experiences={experiences}
        educations={educations}
        settings={settings}
      />
      <SkillsSection skills={skills} />
      <ProjectsSection projects={projects} />
      <BlogSection blogs={blogs} />
      <ContactSection settings={settings} />
    </>
  );
}
