import React, { useState, useEffect } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Phone, MapPin, Code, User, Send, Menu, X, Calendar, Award, Star } from 'lucide-react';
import { useLanguage } from './contexts/LanguageContext';
import LanguageToggle from './components/LanguageToggle';
import ProjectWizard from './components/ProjectWizard';

function App() {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Get all sections
      const sections = ['home', 'about', 'skills', 'education', 'certifications', 'portfolio', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for better UX

      // Find which section is currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Set initial active section
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      {/* Language Toggle */}
      <LanguageToggle />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              WS
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'education', 'certifications', 'portfolio', 'experience', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-colors hover:text-blue-400 ${
                    activeSection === item ? 'text-blue-400' : 'text-gray-300'
                  }`}
                >
                  {t[item as keyof typeof t] as string}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-slate-800 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['home', 'about', 'skills', 'education', 'certifications', 'portfolio', 'experience', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left px-3 py-2 text-base font-medium capitalize hover:text-blue-400 hover:bg-slate-800 rounded-md transition-colors"
                >
                  {t[item as keyof typeof t] as string}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up">
            <h1 className="text-6xl sm:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-teal-400 bg-clip-text text-transparent">
              {t.heroTitle}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {t.heroSubtitle}
            </p>
            <p className="text-lg text-gray-400 mb-12 max-w-xl mx-auto">
              {t.heroDescription}
            </p>
            <div className="flex justify-center space-x-6 mb-12">
              <a href="https://github.com/wilmersaz/" target='_blank' className="p-3 bg-slate-800 rounded-full hover:bg-blue-600 transition-colors hover:scale-110 transform">
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/wilmersaz/" target='_blank' className="p-3 bg-slate-800 rounded-full hover:bg-cyan-600 transition-colors hover:scale-110 transform">
                <Linkedin size={24} />
              </a>
              <a href="mailto:ingwilmersanchezsaez@gmail.com" className="p-3 bg-slate-800 rounded-full hover:bg-teal-600 transition-colors hover:scale-110 transform">
                <Mail size={24} />
              </a>
            </div>
            <button
              onClick={() => scrollToSection('about')}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full text-white font-semibold hover:from-blue-700 hover:to-teal-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
            >
              {t.discoverWork}
              <ChevronDown className="ml-2 animate-bounce" size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              {t.aboutTitle}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t.aboutSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
                <User className="text-blue-400 mb-4" size={32} />
                <h3 className="text-2xl font-bold mb-4 text-white">{t.myJourney}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {t.myJourneyText}
                </p>
              </div>

              <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
                <Code className="text-teal-400 mb-4" size={32} />
                <h3 className="text-2xl font-bold mb-4 text-white">{t.philosophy}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {t.philosophyText}
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-teal-600 rounded-2xl p-1">
                <div className="bg-slate-900 rounded-2xl p-8 h-full">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400 mb-2">200+</div>
                      <div className="text-sm text-gray-300">{t.projectsCompleted}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-teal-400 mb-2">7+</div>
                      <div className="text-sm text-gray-300">{t.yearsExperience}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-cyan-400 mb-2">100+</div>
                      <div className="text-sm text-gray-300">{t.happyClients}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-emerald-400 mb-2">15+</div>
                      <div className="text-sm text-gray-300">{t.technologies}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              {t.skillsTitle}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t.skillsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { category: t.frontend, skills: ['Angular', 'JavaScript', 'jQuery', 'TypeScript', 'React.js', 'Vue.js', 'Alpine.js', 'React Native', 'Livewire', 'Vite', 'VitePress', 'Google Apps Script', 'HTML', 'CSS', 'Bootstrap', 'Tailwind'], color: 'from-blue-500 to-cyan-500' },
              { category: t.backend, skills: ['PHP', 'Laravel', 'C#', '.NET Core', 'Python', 'Visual Basic'], color: 'from-teal-500 to-emerald-500' },
              { category: t.databases, skills: ['MySQL', 'PostgreSQL', 'SQL Server', 'Oracle PL/SQL', 'SQLite'], color: 'from-cyan-500 to-cyan-500' },
              { category: t.toolsCloud, skills: ['Google Cloud Platform', 'Azure DevOps', 'Docker', 'GitHub', 'GitLab', 'Bitbucket', 'Visual Studio Code', 'Sublime Text'], color: 'from-cyan-500 to-blue-500' },
              { category: t.others, skills: ['Linux Server','Selenium', 'FastAPI', 'VBScript','Postman','EchoAPI', 'MarkDown',  'Advanced Excel'], color: 'from-teal-500 to-cyan-500' },
            ].map((category, index) => (
              <div key={index} className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-blue-500/50 transition-all hover:transform hover:scale-105">
                <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center mb-6`}>
                  <Code className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-6 text-white">{category.category}</h3>
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center justify-between">
                      <span className="text-gray-300">{skill}</span>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} className="text-yellow-500 fill-current" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              {t.educationTitle}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t.educationSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                level: t.professional,
                degree: t.systemsEngineering,
                institution: t.systemsEngineeringInstitution,
                year: '2023 - 2025',
                description: t.systemsEngineeringDescription,
                icon: '🎓',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                level: t.technologist,
                degree: t.softwareDevelopment,
                institution: t.softwareDevelopmentInstitution,
                year: '2020 - 2022',
                description: t.softwareDevelopmentDescription,
                icon: '💻',
                color: 'from-teal-500 to-emerald-500'
              },
              {
                level: t.technical,
                degree: t.computerSystems,
                institution: t.computerSystemsInstitution,
                year: '2008 - 2010',
                description: t.computerSystemsDescription,
                icon: '🔧',
                color: 'from-cyan-500 to-blue-500'
              }
            ].map((education, index) => (
              <div key={index} className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-blue-500/50 transition-all hover:transform hover:scale-105 group">
                <div className={`w-16 h-16 bg-gradient-to-br ${education.color} rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform`}>
                  {education.icon}
                </div>
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 bg-gradient-to-r ${education.color} text-white text-sm rounded-full font-semibold mb-3`}>
                    {education.level}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">{education.degree}</h3>
                  <p className="text-purple-400 font-medium mb-2">{education.institution}</p>
                  <p className="text-gray-400 text-sm mb-4">{education.year}</p>
                </div>
                <p className="text-gray-300 leading-relaxed">{education.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              {t.certificationsTitle}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t.certificationsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'ENGLISH DOES WORK - LEVEL 5',
                provider: 'SENA',
                date: '2024',
                type: t.certification,
                level: t.levelFundamental,
                color: 'from-blue-600 to-teal-600',
                icon: (
                <img
                src="https://img.icons8.com/ios7/200/FFFFFF/google-translate.png"
                alt="Language"
                className="w-8 h-8"
                />
              ),
              },
              {
                title: 'ENGLISH DOES WORK - LEVEL 2',
                provider: 'SENA',
                date: '2024',
                type: t.certification,
                level: t.levelFundamental,
                color: 'from-teal-500 to-cyan-500',
                icon: (
                <img
                src="https://img.icons8.com/ios7/200/FFFFFF/google-translate.png"
                alt="Language"
                className="w-8 h-8"
                />
              ),
              },
              {
                title: 'ENGLISH DOES WORK - LEVEL 1',
                provider: 'SENA',
                date: '2024',
                type: t.certification,
                level: t.levelFundamental,
                color: 'from-teal-500 to-blue-500',
                icon: (
                <img
                src="https://img.icons8.com/ios7/200/FFFFFF/google-translate.png"
                alt="Language"
                className="w-8 h-8"
                />
              ),
              },
              {
                title: 'ENGLISH DOES WORK - LEVEL 4',
                provider: 'SENA',
                date: '2023',
                type: t.certification,
                level: t.levelFundamental,
                color: 'from-teal-500 to-blue-500',
                icon: (
                <img
                src="https://img.icons8.com/ios7/200/FFFFFF/google-translate.png"
                alt="Language"
                className="w-8 h-8"
                />
              ),
              },
              {
                title: 'ENGLISH DOES WORK - LEVEL 3',
                provider: 'SENA',
                date: '2023',
                type: t.certification,
                level: t.levelFundamental,
                color: 'from-cyan-500 to-teal-500',
                icon: (
                <img
                src="https://img.icons8.com/ios7/200/FFFFFF/google-translate.png"
                alt="Language"
                className="w-8 h-8"
                />
              ),
              },
              {
                title: 'Aprende SCRUM',
                provider: 'Linkedin learning',
                date: '2022',
                type: t.certification,
                level: t.levelFundamental,
                color: 'from-blue-600 to-teal-600',
                icon: (
                <img
                src="https://img.icons8.com/ios7/200/FFFFFF/google-translate.png"
                alt="Language"
                className="w-8 h-8"
                />
              ),
              },
              {
                title: 'Fundamentos del desarrollo web: Full Stack o Front-End',
                provider: 'Linkedin learning',
                date: '2022',
                type: t.certification,
                level: t.levelFundamental,
                color: 'from-blue-600 to-teal-600',
                icon: (
                <img
                src="https://skillmea.cz/rails/active_storage/blobs/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWxoTXpFMk9UUTJZeTAyWm1JMUxUUTVOMll0WW1GalpTMWtOVFZpWWpsaE56UmpZemNHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--a3a1901580816fd47ce864dc5c1172022dfed63e/html.png"
                alt="Language"
                className="w-8 h-8"
                />
              ),
              },
              {
                title: 'React + Rredux',
                provider: 'SOLOLEARN',
                date: '2022',
                type: t.certification,
                level: t.levelIntermediate,
                color: 'from-teal-500 to-cyan-500',
                icon: (
                <img
                src="https://img.icons8.com/ios11/200/FFFFFF/react.png"
                alt="Language"
                className="w-8 h-8"
                />
                )
              },
              {
                title: 'Curso de Jquery',
                provider: 'SOLOLEARN',
                date: '2022',
                type: t.course,
                level: t.levelIntermediate,
                color: 'from-teal-500 to-blue-500',
                icon: (
                <img
                src="https://icon-library.com/images/jquery-icon-png/jquery-icon-png-21.jpg"
                alt="Language"
                className="w-8 h-8"
                />
              ),
              },
              {
                title: 'Diseño de sitios web con VUE',
                provider: 'SENA',
                date: '2021',
                type: t.certification,
                level: t.levelExpert,
                color: 'from-teal-500 to-blue-500',
                icon: (
                <img
                src="https://img.icons8.com/win10/512/FFFFFF/vuetify.png"
                alt="Language"
                className="w-8 h-8"
                />
                )
              },
              {
                title: 'Desarrollo de habilidades digitales para la gestión de la información',
                provider: 'SENA',
                date: '2021',
                type: t.certification,
                level: t.levelFundamental,
                color: 'from-cyan-500 to-teal-500',
                icon: (
                <img
                src="https://dba24.com.ar/wp-content/uploads/2023/10/image-30.png"
                alt="Language"
                className="w-8 h-8"
                />
                )
              },
              {
                title: 'Desarrollo de habilidades digitales para la construcción de contenido digital',
                provider: 'SENA',
                date: '2021',
                type: t.certification,
                level: t.levelFundamental,
                color: 'from-blue-600 to-teal-600',
                icon: (
                <img
                src="https://dba24.com.ar/wp-content/uploads/2023/10/image-30.png"
                alt="Language"
                className="w-8 h-8"
                />
                )
              },
              {
                title: 'Aplicaciones web con PHP y MySQL',
                provider: 'SENA',
                date: '2021',
                type: t.certification,
                level: t.levelExpert,
                color: 'from-blue-600 to-teal-600',
                icon: (
                <img
                src="https://img.icons8.com/ios_filled/512/FFFFFF/php-logo.png"
                alt="Language"
                className="w-8 h-8"
                />
                )
              },
              {
                title: 'Diplomado en programación en PHP',
                provider: 'Politécnico de Colombia',
                date: '2020',
                type: t.course,
                level: t.levelIntermediate,
                color: 'from-teal-500 to-cyan-500',
                icon: (
                <img
                src="https://img.icons8.com/ios_filled/512/FFFFFF/php-logo.png"
                alt="Language"
                className="w-8 h-8"
                />
                )
              },
              {
                title: 'Curso fundamental de SQL',
                provider: 'SOLOLEARN',
                date: '2020',
                type: t.course,
                level: t.levelFundamental,
                color: 'from-teal-500 to-blue-500',
                icon: (
                <img
                src="https://img.icons8.com/m_sharp/512/FFFFFF/mysql-logo.png"
                alt="Language"
                className="w-8 h-8"
                />
                )
              },
              {
                title: 'Curso de PHP',
                provider: 'SOLOLEARN',
                date: '2020',
                type: t.course,
                level: t.levelFundamental,
                color: 'from-teal-500 to-blue-500',
                icon: (
                <img
                src="https://img.icons8.com/ios_filled/512/FFFFFF/php-logo.png"
                alt="Language"
                className="w-8 h-8"
                />
                )
              },
              {
                title: 'Curso de Javascript',
                provider: 'SOLOLEARN',
                date: '2019',
                type: t.course,
                level: t.levelFundamental,
                color: 'from-cyan-500 to-teal-500',
                icon: (
                <img
                src="https://img.icons8.com/ios_filled/512/FFFFFF/javascript.png"
                alt="Language"
                className="w-8 h-8"
                />
                )
              },
              {
                title: 'Curso de fundamentos CSS',
                provider: 'SOLOLEARN',
                date: '2019',
                type: t.course,
                level: t.levelFundamental,
                color: 'from-blue-600 to-teal-600',
                icon: (
                <img
                src="https://img.icons8.com/ios_filled/512/FFFFFF/css3.png"
                alt="Language"
                className="w-8 h-8"
                />
                )
              },
              {
                title: 'Curso de fundamentos HTML',
                provider: 'SOLOLEARN',
                date: '2019',
                type: t.course,
                level: t.levelFundamental,
                color: 'from-blue-600 to-teal-600',
                icon: (
                <img
                src="https://img.icons8.com/ios_filled/512/FFFFFF/html-5.png"
                alt="Language"
                className="w-8 h-8"
                />
                )
              },
              {
                title: 'Interactuar con clientes desde el enfoque estratégico de servicio',
                provider: 'SENA',
                date: '2018',
                type: t.certification,
                level: t.levelExpert,
                color: 'from-teal-500 to-cyan-500',
                icon: (
                <img
                src="https://aymasesoriasempresariales.com/wp-content/uploads/2023/08/atencion-al-cliente.png"
                alt="Language"
                className="w-8 h-8"
                />
                )
              },
              {
                title: 'Introducción al desarrollo web',
                provider: 'Google activate',
                date: '2017',
                type: t.certification,
                level: t.levelFundamental,
                color: 'from-teal-500 to-blue-500',
                icon: (
                <img
                src="https://skillmea.cz/rails/active_storage/blobs/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWxoTXpFMk9UUTJZeTAyWm1JMUxUUTVOMll0WW1GalpTMWtOVFZpWWpsaE56UmpZemNHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--a3a1901580816fd47ce864dc5c1172022dfed63e/html.png"
                alt="Language"
                className="w-8 h-8"
                />
                )
              },
              {
                title: 'Arquitectura de computadores',
                provider: 'SENA',
                date: '2017',
                type: t.certification,
                level: t.levelFundamental,
                color: 'from-teal-500 to-blue-500',
                icon: (
                <img
                src="https://cdn-icons-png.flaticon.com/512/2587/2587912.png"
                alt="Language"
                className="w-8 h-8"
                />
                )
              }
            ].map((cert, index) => (
              <div key={index} className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-purple-500/50 transition-all hover:transform hover:scale-105 group">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${cert.color} rounded-lg flex items-center justify-center text-xl group-hover:scale-110 transition-transform`}>
                    {cert.icon}
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 bg-gradient-to-r ${cert.color} text-white text-xs rounded-full font-semibold`}>
                      {cert.type}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {cert.title}
                </h3>

                <div className="space-y-2 mb-4">
                  <p className="text-purple-400 font-medium text-sm">{cert.provider}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">{cert.date}</span>
                    <span className={`px-2 py-1 bg-slate-800 text-xs rounded-full ${
                      cert.level === t.levelExpert ? 'text-teal-400' :
                      cert.level === t.levelIntermediate ? 'text-blue-400' :
                      cert.level === t.levelFundamental ? 'text-cyan-400' :
                      'text-teal-400'
                    }`}>
                      {cert.level}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-slate-800 rounded-full h-2">
                    <div className={`h-2 bg-gradient-to-r ${cert.color} rounded-full transition-all duration-1000 group-hover:w-full ${
                      cert.level === t.levelExpert ? 'w-full' :
                      cert.level === t.levelIntermediate ? 'w-4/5' :
                      cert.level === t.levelFundamental ? 'w-3/4' :
                      'w-2/3'
                    }`}></div>
                  </div>
                  <Award className="text-yellow-500" size={16} />
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '15+', label: t.certifications, color: 'text-blue-400' },
              { number: '20+', label: t.coursesCompleted, color: 'text-teal-400' },
              { number: '2000+', label: t.studyHours, color: 'text-cyan-400' },
              { number: '8+', label: t.certifiedTechnologies, color: 'text-emerald-400' }
            ].map((stat, index) => (
              <div key={index} className="text-center bg-slate-900/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.number}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20">
      <ProjectWizard />
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              {t.experienceTitle}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t.experienceSubtitle}
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-blue-500 to-teal-500"></div>

            <div className="space-y-12">
              {[
                {
                  year: `2024 - ${t.present}`,
                  position: t.experienceoccupation5,
                  company: t.experienceCompany5,
                  description: t.experienceDescription5
                },
                {
                  year: '2022 - 2024',
                  position: t.experienceoccupation4,
                  company: t.experienceCompany4,
                  description: t.experienceDescription4
                },
                {
                  year: '2021 - 2022',
                  position: t.experienceoccupation3,
                  company: t.experienceCompany3,
                  description: t.experienceDescription3
                },
                {
                  year: '2020 - 2021',
                  position: t.experienceoccupation2,
                  company: t.experienceCompany2,
                  description: t.experienceDescription2
                },
                {
                  year: '2014 - 2020',
                  position: t.experienceoccupation1,
                  company: t.experienceCompany1,
                  description: t.experienceDescription1
                }
              ].map((exp, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all">
                      <div className="flex items-center mb-4">
                        <Calendar className="text-blue-400 mr-3" size={20} />
                        <span className="text-blue-400 font-semibold">{exp.year}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-white">{exp.position}</h3>
                      <p className="text-gray-300 font-medium mb-3">{exp.company}</p>
                      <p className="text-gray-400">{exp.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              {t.contactTitle}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t.contactSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
                <h3 className="text-2xl font-bold mb-6 text-white">{t.letsConnect}</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Mail className="text-blue-400" size={24} />
                    <span className="text-gray-300">ingwilmersanchezsaez@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Phone className="text-teal-400" size={24} />
                    <span className="text-gray-300">+57 (300) 693-4822</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <MapPin className="text-cyan-400" size={24} />
                    <span className="text-gray-300">{t.availableWorldwide}</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
                <h3 className="text-2xl font-bold mb-6 text-white">{t.followMe}</h3>
                <div className="flex space-x-4">
                  <a href="https://github.com/wilmersaz/" target='_blank' className="p-3 bg-slate-800 rounded-full hover:bg-blue-600 transition-colors">
                    <Github size={24} />
                  </a>
                  <a href="https://www.linkedin.com/in/wilmersanchez/" target='_blank' className="p-3 bg-slate-800 rounded-full hover:bg-cyan-600 transition-colors">
                    <Linkedin size={24} />
                  </a>
                  <a href="mailto:ingwilmersanchezsaez@gmail.com" className="p-3 bg-slate-800 rounded-full hover:bg-teal-600 transition-colors">
                    <Mail size={24} />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              <form className="space-y-6" action="https://formsubmit.co/8b49e71d469dfc28b279d4f6bfd6d310" method="POST">
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="https://wilmersaz.github.io/wilmersaz/#contact" />
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t.name}</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                    name="name"
                    placeholder={t.yourName}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t.email}</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                    name="email"
                    placeholder={t.yourEmail}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t.message}</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                    name="message"
                    placeholder={t.tellMeAboutProject}
                  ></textarea>
                </div>
                <button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-teal-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2" type="submit">
                  <span>{t.sendMessage}</span>
                  <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent mb-4">
              {t.heroTitle}
            </div>
            <p className="text-gray-400 mb-6">{t.footerTagline}</p>
            <div className="flex justify-center space-x-6">
              <a href="https://github.com/wilmersaz/" target='_blank' className="text-gray-400 hover:text-blue-400 transition-colors">
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/wilmersanchez/" target='_blank' className="text-gray-400 hover:text-teal-400 transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="mailto:ingwilmersanchezsaez@gmail.com" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Mail size={24} />
              </a>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-800 text-sm text-gray-500">
              © 2025 {t.heroTitle}. {t.allRightsReserved}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;