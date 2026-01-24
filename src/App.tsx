import { GlassPillNav } from './components/GlassPillNav';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Impact } from './components/Impact';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <GlassPillNav />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Impact />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
