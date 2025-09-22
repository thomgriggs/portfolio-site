import { Hero } from '../components/Hero';
import { Currently } from '../components/Currently';
import { AlwaysLearning } from '../components/AlwaysLearning';
import { PersonalProjects } from '../components/PersonalProjects';
import { Projects } from '../components/Projects';
import { Skills } from '../components/Skills';
import { Contact } from '../components/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Currently />
      <AlwaysLearning />
      <PersonalProjects />
      <Projects />
      <Skills />
      <Contact />
    </>
  );
}