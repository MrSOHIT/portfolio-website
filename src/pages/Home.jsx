import { useEffect, useRef } from 'react';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Projects from '../sections/Projects';
import Contact from '../sections/Contact';

const Home = ({ scrollTo }) => {
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    if (scrollTo) {
      const scrollOptions = {
        behavior: 'smooth',
        block: 'start',
      };

      setTimeout(() => {
        switch (scrollTo) {
          case 'about':
            aboutRef.current?.scrollIntoView(scrollOptions);
            break;
          case 'skills':
            skillsRef.current?.scrollIntoView(scrollOptions);
            break;
          case 'projects':
            projectsRef.current?.scrollIntoView(scrollOptions);
            break;
          case 'contact':
            contactRef.current?.scrollIntoView(scrollOptions);
            break;
          default:
            window.scrollTo(0, 0);
            break;
        }
      }, 100);
    }
  }, [scrollTo]);

  return (
    <div>
      <Hero />
      <div ref={aboutRef}>
        <About />
      </div>
      <div ref={skillsRef}>
        <Skills />
      </div>
      <div ref={projectsRef}>
        <Projects />
      </div>
      <div ref={contactRef}>
        <Contact />
      </div>
    </div>
  );
};

export default Home;