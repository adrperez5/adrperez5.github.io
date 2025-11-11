import Head from 'next/head';
import Bio from '@/components/Bio';
import Skills from '@/components/Skills';
import Proficiencies from '@/components/Proficiencies';
import Certificates from '@/components/Certificates';
import Interests from '@/components/Interests';
import homeData from '@/data/home.json';
import styles from '@/styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>{`Home`}</title>
        <meta name="description" content={homeData.bio.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={`${homeData.bio.name} | ${homeData.bio.title}`} />
        <meta property="og:description" content={homeData.bio.description} />
      </Head>

      <div className={styles.homeContainer}>
        <Bio bio={homeData.bio} />
        <Skills skills={homeData.skills} />
        <Proficiencies proficiencies={homeData.proficiencies} />
        <Certificates certificates={homeData.certificates} />
        <Interests interests={homeData.interests} />
      </div>
    </>
  );
}
