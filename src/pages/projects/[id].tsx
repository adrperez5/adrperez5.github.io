import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import type { Project } from '@/types/portfolio';
import styles from '@/styles/ProjectDetail.module.css';

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <>
      <Head>
        <title>{`${project.title}`}</title>
        <meta name="description" content={project.details.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={project.title} />
        <meta property="og:description" content={project.details.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.projectDetailContainer}>
          {/* Breadcrumb navigation */}
          <nav className={styles.breadcrumb}>
            <Link href="/projects">← Back to Projects</Link>
          </nav>

          {/* Project header */}
          <header className={styles.projectHeader}>
            {project.featured && <span className={styles.featuredBadge}>Featured</span>}
            <h1>{project.title}</h1>
            <p className={styles.projectSummary}>{project.summary}</p>
          </header>

          {/* Tech stack */}
          <section className={styles.section}>
            <h2>Tech Stack</h2>
            <div className={styles.techStack}>
              {project.details.techStack.map((tech) => (
                <span key={tech} className={styles.techTag}>
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Description */}
          <section className={styles.section}>
            <h2>Overview</h2>
            <p className={styles.description}>{project.details.description}</p>
          </section>

          {/* Architecture */}
          {project.details.architecture && (
            <section className={styles.section}>
              <h2>Architecture</h2>
              <p className={styles.description}>{project.details.architecture}</p>
            </section>
          )}

          {/* Screenshots */}
          {project.details.images && project.details.images.length > 0 && (
            <section className={styles.section}>
              <h2>Screenshots</h2>
              <div className={styles.imagesGrid}>
                {project.details.images.map((image, index) => (
                  <div key={index} className={styles.imageWrapper}>
                    <ImagePlaceholder
                      src={image}
                      alt={`${project.title} screenshot ${index + 1}`}
                      height={300}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Code examples */}
          {project.details.codeExamples && project.details.codeExamples.length > 0 && (
            <section className={styles.section}>
              <h2>Code Examples</h2>
              <div className={styles.codeExamples}>
                {project.details.codeExamples.map((example, index) => (
                  <div key={index} className={styles.codeExample}>
                    <h3 className={styles.codeTitle}>{example.title}</h3>
                    <div className={styles.codeBlock}>
                      <pre>
                        <code>{example.code}</code>
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Links */}
          {(project.details.liveUrl || project.details.repoUrl) && (
            <section className={styles.section}>
              <h2>Links</h2>
              <div className={styles.projectLinks}>
                {project.details.liveUrl && (
                  <a
                    href={project.details.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.projectLink}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    View Live Demo
                  </a>
                )}
                {project.details.repoUrl && (
                  <a
                    href={project.details.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.projectLink} ${styles.secondary}`}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                    View Source Code
                  </a>
                )}
              </div>
            </section>
          )}
        </div>
    </>
  );
}

/**
 * Generate static paths for all projects at build time
 * This creates a separate HTML file for each project
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const data = await import('@/data/projects.json').then((mod) => mod.default);

  // Generate path for each project
  const paths = data.map((project) => ({
    params: { id: project.id },
  }));

  return {
    paths,
    fallback: false, // 404 for any non-existent project ID
  };
};

/**
 * Load specific project data at build time
 * Only loads necessary data for this project
 */
export const getStaticProps: GetStaticProps<ProjectDetailProps> = async (context) => {
  const { id } = context.params!;

  const data = await import('@/data/projects.json').then((mod) => mod.default);

  const project = data.find((p) => p.id === id);

  // Should never happen due to getStaticPaths, but TypeScript safety
  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      project,
    },
  };
};
