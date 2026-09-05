import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Code,
  User,
  Send,
  Calendar,
  Award,
  Star,
} from "lucide-react";
import { useLanguage } from "./hooks/useLanguage";
import LanguageToggle from "./components/LanguageToggle";
import ProjectWizard from "./components/ProjectWizard";
import Header from "./components/Header";
import Footer from "./components/Footer";

function GithubIcon() {
  return (
    <svg
      className="w-6 h-6"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg
      className="w-6 h-6"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z"
        clipRule="evenodd"
      />
      <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      className="w-6 h-6"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
        d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
      />
    </svg>
  );
}

function App() {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("home");

  const formRef = useRef<HTMLFormElement>(null);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const isFormValid =
    formValues.name.trim() !== "" &&
    formValues.email.trim() !== "" &&
    formValues.message.trim() !== "";

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid || !formRef.current) {
      return;
    }

    // Form is valid - proceed with submission
    formRef.current.submit();
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Get all sections
      const sections = [
        "home",
        "about",
        "skills",
        "education",
        "certifications",
        "portfolio",
        "experience",
        "contact",
      ];
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

    window.addEventListener("scroll", handleScroll);

    // Set initial active section
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      {/* Logo a la izquierda */}
      <div className="fixed top-4 left-4 z-[60] text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
        WS
      </div>
      {/* Header (nav) */}
      <Header
        t={t}
        activeSection={activeSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollToSection={scrollToSection}
      />
      {/* Language Toggle */}
      <LanguageToggle />

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center"
      >
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
              <a
                href="https://github.com/wilmersaz/"
                target="_blank"
                className="p-3 bg-slate-800 rounded-full hover:bg-blue-600 transition-colors hover:scale-110 transform"
              >
                <GithubIcon />
              </a>
              <a
                href="https://www.linkedin.com/in/wilmersaz/"
                target="_blank"
                className="p-3 bg-slate-800 rounded-full hover:bg-cyan-600 transition-colors hover:scale-110 transform"
              >
                <LinkedinIcon />
              </a>
              <a
                href="mailto:ingwilmersanchezsaez@gmail.com"
                className="p-3 bg-slate-800 rounded-full hover:bg-teal-600 transition-colors hover:scale-110 transform"
              >
                <EmailIcon />
              </a>
            </div>
            <button
              onClick={() => scrollToSection("about")}
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
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {t.myJourney}
                </h3>
                <p className="text-gray-300 leading-relaxed text-justify">
                  {t.myJourneyText}
                </p>
              </div>

              <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
                <Code className="text-teal-400 mb-4" size={32} />
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {t.philosophy}
                </h3>
                <p className="text-gray-300 leading-relaxed text-justify">
                  {t.philosophyText}
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-teal-600 rounded-2xl p-1">
                <div className="bg-slate-900 rounded-2xl p-8 h-full">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400 mb-2">
                        200+
                      </div>
                      <div className="text-sm text-gray-300">
                        {t.projectsCompleted}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-teal-400 mb-2">
                        7+
                      </div>
                      <div className="text-sm text-gray-300">
                        {t.yearsExperience}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-cyan-400 mb-2">
                        100+
                      </div>
                      <div className="text-sm text-gray-300">
                        {t.happyClients}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-emerald-400 mb-2">
                        15+
                      </div>
                      <div className="text-sm text-gray-300">
                        {t.technologies}
                      </div>
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
              {
                category: t.frontend,
                skills: [
                  "Angular",
                  "JavaScript",
                  "jQuery",
                  "TypeScript",
                  "React.js",
                  "Vue.js",
                  "Alpine.js",
                  "React Native",
                  "Livewire",
                  "Vite",
                  "VitePress",
                  "Google Apps Script",
                  "HTML",
                  "CSS",
                  "Bootstrap",
                  "Tailwind",
                ],
                color: "from-blue-500 to-cyan-500",
              },
              {
                category: t.backend,
                skills: [
                  "PHP",
                  "Laravel",
                  "C#",
                  ".NET Core",
                  "Python",
                  "Visual Basic",
                ],
                color: "from-teal-500 to-emerald-500",
              },
              {
                category: t.databases,
                skills: [
                  "MySQL",
                  "PostgreSQL",
                  "SQL Server",
                  "Oracle PL/SQL",
                  "SQLite",
                ],
                color: "from-cyan-500 to-cyan-500",
              },
              {
                category: t.toolsCloud,
                skills: [
                  "Google Cloud Platform",
                  "Azure DevOps",
                  "Docker",
                  "GitHub",
                  "GitLab",
                  "Bitbucket",
                  "Visual Studio Code",
                  "Sublime Text",
                ],
                color: "from-cyan-500 to-blue-500",
              },
              {
                category: t.others,
                skills: [
                  "Linux Server",
                  "Selenium",
                  "FastAPI",
                  "VBScript",
                  "Postman",
                  "EchoAPI",
                  "MarkDown",
                  "Advanced Excel",
                ],
                color: "from-teal-500 to-cyan-500",
              },
            ].map((category, index) => (
              <div
                key={index}
                className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-blue-500/50 transition-all hover:transform hover:scale-105"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center mb-6`}
                >
                  <Code className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-6 text-white">
                  {category.category}
                </h3>
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-300">{skill}</span>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className="text-yellow-500 fill-current"
                          />
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
                year: "2023 - 2025",
                description: t.systemsEngineeringDescription,
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 80 80"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20.672 37.557a8 8 0 0 0-.38 2.443v9.442a8 8 0 0 0 6.431 7.844l12 2.4a8 8 0 0 0 3.138 0l12-2.4a8 8 0 0 0 6.431-7.844V40c0-.917-.154-1.798-.438-2.618l-19.537 6.513a1 1 0 0 1-.633 0z" />
                      <path d="M39.684 20.105a1 1 0 0 1 .632 0l32.838 10.946c.912.304.912 1.594 0 1.898L40.316 43.895a1 1 0 0 1-.632 0L6.846 32.949c-.911-.304-.911-1.594 0-1.898z" />
                      <path d="m39 31l-22.923 6.55A7 7 0 0 0 11 44.28v6.22m0 0L10 62m1-11.5L12 62" />
                    </g>
                  </svg>
                ),
                color: "from-blue-500 to-cyan-500",
              },
              {
                level: t.technologist,
                degree: t.softwareDevelopment,
                institution: t.softwareDevelopmentInstitution,
                year: "2020 - 2022",
                description: t.softwareDevelopmentDescription,
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M39.571 33.53H8.43a2.93 2.93 0 0 1-2.93-2.927V10.475a2.93 2.93 0 0 1 2.929-2.928H39.57a2.93 2.93 0 0 1 2.93 2.928v20.128a2.93 2.93 0 0 1-2.93 2.927m-11.585 0v2.86c0 2.861 5.14 4.063 5.14 4.063h-18.25s5.102-1.202 5.102-4.062v-2.86M5.5 29.2h37"
                    />
                  </svg>
                ),
                color: "from-teal-500 to-emerald-500",
              },
              {
                level: t.technical,
                degree: t.computerSystems,
                institution: t.computerSystemsInstitution,
                year: "2008 - 2010",
                description: t.computerSystemsDescription,
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M39.23 26q.13-.995.14-2a17 17 0 0 0-.14-2l4.33-3.39a1 1 0 0 0 .25-1.31l-4.1-7.11a1 1 0 0 0-1.25-.44l-5.11 2.06a15.7 15.7 0 0 0-3.46-2l-.77-5.43a1 1 0 0 0-1-.86H19.9a1 1 0 0 0-1 .86l-.77 5.43a15.4 15.4 0 0 0-3.46 2L9.54 9.75a1 1 0 0 0-1.25.44l-4.1 7.11a1 1 0 0 0 .25 1.31L8.76 22a17 17 0 0 0-.14 2q.01 1.005.14 2l-4.32 3.39a1 1 0 0 0-.25 1.31l4.1 7.11a1 1 0 0 0 1.25.44l5.11-2.06a15.7 15.7 0 0 0 3.46 2l.77 5.43a1 1 0 0 0 1 .86h8.2a1 1 0 0 0 1-.86l.77-5.43a15.4 15.4 0 0 0 3.46-2l5.11 2.06a1 1 0 0 0 1.25-.44l4.1-7.11a1 1 0 0 0-.25-1.31z"
                    />
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.055 30.074q5.363-5.483 10.8-10.894c-.256-1.303.156-2.768 1.277-3.554a3.5 3.5 0 0 1 2.84-.561c-.64.732-1.576 1.303-1.82 2.288c-.26 1.252 1.162 2.362 2.324 1.861c.755-.422 1.289-1.15 1.924-1.729c.429 1.663-.562 3.558-2.232 4.043c-.624.416-1.502-.126-2.029.246l-10.97 10.67a1.59 1.59 0 0 1-2.113-2.369zm10.661-5.08l5.06 5.152c.316.316.494.746.494 1.194h0a1.688 1.688 0 0 1-2.883 1.193l-5.121-5.129m-2.365-3.27c-1.298-1.26-2.548-2.573-3.888-3.788c-.85-.466-1.935.365-1.735 1.304c.04.375-.422.543-.612.823l-.733.738l-2.433-2.432l1.368-1.37c.83.232 1.795-.486 1.601-1.382c-.075-.372.417-.537.6-.815c.893-.88 1.774-1.907 3.083-2.12c1.111-.268 2.36-.086 3.303.567c-.207.53-.717.475-1.18.466c-1.107.02-2.24.467-2.983 1.297c1.673 1.765 3.421 3.46 5.134 5.187"
                    />
                  </svg>
                ),
                color: "from-cyan-500 to-blue-500",
              },
            ].map((education, index) => (
              <div
                key={index}
                className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-blue-500/50 transition-all hover:transform hover:scale-105 group"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${education.color} rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform`}
                >
                  {education.icon}
                </div>
                <div className="mb-4">
                  <span
                    className={`inline-block px-3 py-1 bg-gradient-to-r ${education.color} text-white text-sm rounded-full font-semibold mb-3`}
                  >
                    {education.level}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {education.degree}
                  </h3>
                  <p className="text-purple-400 font-medium mb-2">
                    {education.institution}
                  </p>
                  <p className="text-gray-400 text-sm mb-4">{education.year}</p>
                </div>
                <p className="text-gray-300 leading-relaxed text-justify">
                  {education.description}
                </p>
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
                title: "ENGLISH DOES WORK - LEVEL 7",
                provider: "SENA",
                date: "2026",
                type: t.certification,
                level: t.levelFundamental,
                color: "from-blue-600 to-teal-600",
                icon: (
                  <img
                    src="https://img.icons8.com/ios7/200/FFFFFF/google-translate.png"
                    alt="Language"
                    className="w-8 h-8"
                  />
                ),
              },
              {
                title: "ENGLISH DOES WORK - LEVEL 6",
                provider: "SENA",
                date: "2026",
                type: t.certification,
                level: t.levelFundamental,
                color: "from-blue-600 to-teal-600",
                icon: (
                  <img
                    src="https://img.icons8.com/ios7/200/FFFFFF/google-translate.png"
                    alt="Language"
                    className="w-8 h-8"
                  />
                ),
              },
              {
                title: "ENGLISH DOES WORK - LEVEL 5",
                provider: "SENA",
                date: "2024",
                type: t.certification,
                level: t.levelFundamental,
                color: "from-blue-600 to-teal-600",
                icon: (
                  <img
                    src="https://img.icons8.com/ios7/200/FFFFFF/google-translate.png"
                    alt="Language"
                    className="w-8 h-8"
                  />
                ),
              },
              {
                title: "ENGLISH DOES WORK - LEVEL 2",
                provider: "SENA",
                date: "2024",
                type: t.certification,
                level: t.levelFundamental,
                color: "from-teal-500 to-cyan-500",
                icon: (
                  <img
                    src="https://img.icons8.com/ios7/200/FFFFFF/google-translate.png"
                    alt="Language"
                    className="w-8 h-8"
                  />
                ),
              },
              {
                title: "ENGLISH DOES WORK - LEVEL 1",
                provider: "SENA",
                date: "2024",
                type: t.certification,
                level: t.levelFundamental,
                color: "from-teal-500 to-blue-500",
                icon: (
                  <img
                    src="https://img.icons8.com/ios7/200/FFFFFF/google-translate.png"
                    alt="Language"
                    className="w-8 h-8"
                  />
                ),
              },
              {
                title: "ENGLISH DOES WORK - LEVEL 4",
                provider: "SENA",
                date: "2023",
                type: t.certification,
                level: t.levelFundamental,
                color: "from-teal-500 to-blue-500",
                icon: (
                  <img
                    src="https://img.icons8.com/ios7/200/FFFFFF/google-translate.png"
                    alt="Language"
                    className="w-8 h-8"
                  />
                ),
              },
              {
                title: "ENGLISH DOES WORK - LEVEL 3",
                provider: "SENA",
                date: "2023",
                type: t.certification,
                level: t.levelFundamental,
                color: "from-cyan-500 to-teal-500",
                icon: (
                  <img
                    src="https://img.icons8.com/ios7/200/FFFFFF/google-translate.png"
                    alt="Language"
                    className="w-8 h-8"
                  />
                ),
              },
              {
                title: "Aprende SCRUM",
                provider: "Linkedin learning",
                date: "2022",
                type: t.certification,
                level: t.levelFundamental,
                color: "from-blue-600 to-teal-600",
                icon: (
                  <img
                    src="https://img.icons8.com/ios7/200/FFFFFF/google-translate.png"
                    alt="Language"
                    className="w-8 h-8"
                  />
                ),
              },
              {
                title: "Fundamentos del desarrollo web: Full Stack o Front-End",
                provider: "Linkedin learning",
                date: "2022",
                type: t.certification,
                level: t.levelFundamental,
                color: "from-blue-600 to-teal-600",
                icon: (
                  <img
                    src="https://skillmea.cz/rails/active_storage/blobs/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWxoTXpFMk9UUTJZeTAyWm1JMUxUUTVOMll0WW1GalpTMWtOVFZpWWpsaE56UmpZemNHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--a3a1901580816fd47ce864dc5c1172022dfed63e/html.png"
                    alt="Language"
                    className="w-8 h-8"
                  />
                ),
              },
              {
                title: "React + Rredux",
                provider: "SOLOLEARN",
                date: "2022",
                type: t.certification,
                level: t.levelIntermediate,
                color: "from-teal-500 to-cyan-500",
                icon: (
                  <img
                    src="https://img.icons8.com/ios11/200/FFFFFF/react.png"
                    alt="Language"
                    className="w-8 h-8"
                  />
                ),
              },
              {
                title: "Curso de Jquery",
                provider: "SOLOLEARN",
                date: "2022",
                type: t.certification,
                level: t.levelIntermediate,
                color: "from-teal-500 to-blue-500",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32px"
                    height="32px"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <circle cx="16" cy="16" r="14" fill="#ffffff" />
                    <path
                      d="M22.6573 13.4211C23.9143 13.4211 25.0652 13.0019 25.955 12.3066C25.0312 13.5238 23.5007 14.3196 21.7689 14.3196C18.9477 14.3196 16.6607 12.2077 16.6607 9.60256C16.6607 8.1581 17.3638 6.86527 18.4712 6C17.8901 6.76568 17.5491 7.6981 17.5491 8.70407C17.5491 11.3092 19.8361 13.4211 22.6573 13.4211Z"
                      fill="#78CFF5"
                    />
                    <path
                      d="M25.9064 16.6586C24.5512 17.7216 22.7968 18.3628 20.8805 18.3628C16.5874 18.3628 13.1071 15.1447 13.1071 11.1749C13.1071 9.63522 13.6307 8.20859 14.5221 7.03894C12.8413 8.35742 11.7745 10.3248 11.7745 12.5226C11.7745 16.4924 15.2548 19.7106 19.5479 19.7106C22.176 19.7106 24.4994 18.5047 25.9064 16.6586Z"
                      fill="#78CFF5"
                    />
                    <path
                      d="M26 20.7701C24.0689 22.6129 21.3937 23.7538 18.4375 23.7538C12.5497 23.7538 7.77678 19.2283 7.77678 13.6458C7.77678 11.8768 8.25603 10.214 9.09813 8.76767C7.18322 10.595 6 13.1125 6 15.892C6 21.4745 10.7729 26 16.6607 26C20.6827 26 24.1846 23.8881 26 20.7701Z"
                      fill="#78CFF5"
                    />
                  </svg>
                ),
              },
              {
                title: "Diseño de sitios web con VUE",
                provider: "SENA",
                date: "2021",
                type: t.certification,
                level: t.levelExpert,
                color: "from-teal-500 to-blue-500",
                icon: (
                  <img
                    src="https://img.icons8.com/win10/512/FFFFFF/vuetify.png"
                    alt="Language"
                    className="w-8 h-8"
                  />
                ),
              },
              {
                title:
                  "Desarrollo de habilidades digitales para la gestión de la información",
                provider: "SENA",
                date: "2021",
                type: t.certification,
                level: t.levelFundamental,
                color: "from-cyan-500 to-teal-500",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="34px"
                    height="34px"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M14.6144 7.19994c.3479.48981.5999 1.15357.5999 1.80006 0 1.6569-1.3432 3-3 3-1.6569 0-3.00004-1.3431-3.00004-3 0-.67539.22319-1.29865.59983-1.80006M6.21426 6v4m0-4 6.00004-3 6 3-6 2-2.40021-.80006M6.21426 6l3.59983 1.19994M6.21426 19.8013v-2.1525c0-1.6825 1.27251-3.3075 2.95093-3.6488l3.04911 2.9345 3-2.9441c1.7026.3193 3 1.9596 3 3.6584v2.1525c0 .6312-.5373 1.1429-1.2 1.1429H7.41426c-.66274 0-1.2-.5117-1.2-1.1429Z"
                    />
                  </svg>
                ),
              },
              {
                title:
                  "Desarrollo de habilidades digitales para la construcción de contenido digital",
                provider: "SENA",
                date: "2021",
                type: t.certification,
                level: t.levelFundamental,
                color: "from-blue-600 to-teal-600",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="34px"
                    height="34px"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M14.6144 7.19994c.3479.48981.5999 1.15357.5999 1.80006 0 1.6569-1.3432 3-3 3-1.6569 0-3.00004-1.3431-3.00004-3 0-.67539.22319-1.29865.59983-1.80006M6.21426 6v4m0-4 6.00004-3 6 3-6 2-2.40021-.80006M6.21426 6l3.59983 1.19994M6.21426 19.8013v-2.1525c0-1.6825 1.27251-3.3075 2.95093-3.6488l3.04911 2.9345 3-2.9441c1.7026.3193 3 1.9596 3 3.6584v2.1525c0 .6312-.5373 1.1429-1.2 1.1429H7.41426c-.66274 0-1.2-.5117-1.2-1.1429Z"
                    />
                  </svg>
                ),
              },
              {
                title: "Aplicaciones web con PHP y MySQL",
                provider: "SENA",
                date: "2021",
                type: t.certification,
                level: t.levelExpert,
                color: "from-blue-600 to-teal-600",
                icon: (
                  <img
                    src="https://img.icons8.com/ios_filled/512/FFFFFF/php-logo.png"
                    alt="Language"
                    className="w-8 h-8"
                  />
                ),
              },
              {
                title: "Diplomado en programación en PHP",
                provider: "Politécnico de Colombia",
                date: "2020",
                type: t.course,
                level: t.levelIntermediate,
                color: "from-teal-500 to-cyan-500",
                icon: (
                  <img
                    src="https://img.icons8.com/ios_filled/512/FFFFFF/php-logo.png"
                    alt="Language"
                    className="w-8 h-8"
                  />
                ),
              },
              {
                title: "Curso fundamental de SQL",
                provider: "SOLOLEARN",
                date: "2020",
                type: t.course,
                level: t.levelFundamental,
                color: "from-teal-500 to-blue-500",
                icon: (
                  <img
                    src="https://img.icons8.com/m_sharp/512/FFFFFF/mysql-logo.png"
                    alt="Language"
                    className="w-8 h-8"
                  />
                ),
              },
              {
                title: "Curso de PHP",
                provider: "SOLOLEARN",
                date: "2020",
                type: t.course,
                level: t.levelFundamental,
                color: "from-teal-500 to-blue-500",
                icon: (
                  <img
                    src="https://img.icons8.com/ios_filled/512/FFFFFF/php-logo.png"
                    alt="Language"
                    className="w-8 h-8"
                  />
                ),
              },
              {
                title: "Curso de Javascript",
                provider: "SOLOLEARN",
                date: "2019",
                type: t.course,
                level: t.levelFundamental,
                color: "from-cyan-500 to-teal-500",
                icon: (
                  <img
                    src="https://img.icons8.com/ios_filled/512/FFFFFF/javascript.png"
                    alt="Language"
                    className="w-8 h-8"
                  />
                ),
              },
              {
                title: "Curso de fundamentos CSS",
                provider: "SOLOLEARN",
                date: "2019",
                type: t.course,
                level: t.levelFundamental,
                color: "from-blue-600 to-teal-600",
                icon: (
                  <img
                    src="https://img.icons8.com/ios_filled/512/FFFFFF/css3.png"
                    alt="Language"
                    className="w-8 h-8"
                  />
                ),
              },
              {
                title: "Curso de fundamentos HTML",
                provider: "SOLOLEARN",
                date: "2019",
                type: t.course,
                level: t.levelFundamental,
                color: "from-blue-600 to-teal-600",
                icon: (
                  <img
                    src="https://img.icons8.com/ios_filled/512/FFFFFF/html-5.png"
                    alt="Language"
                    className="w-8 h-8"
                  />
                ),
              },
              {
                title:
                  "Interactuar con clientes desde el enfoque estratégico de servicio",
                provider: "SENA",
                date: "2018",
                type: t.certification,
                level: t.levelExpert,
                color: "from-teal-500 to-cyan-500",
                icon: (
                  <img
                    src="https://aymasesoriasempresariales.com/wp-content/uploads/2023/08/atencion-al-cliente.png"
                    alt="Language"
                    className="w-8 h-8"
                  />
                ),
              },
              {
                title: "Introducción al desarrollo web",
                provider: "Google activate",
                date: "2017",
                type: t.certification,
                level: t.levelFundamental,
                color: "from-teal-500 to-blue-500",
                icon: (
                  <img
                    src="https://skillmea.cz/rails/active_storage/blobs/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWxoTXpFMk9UUTJZeTAyWm1JMUxUUTVOMll0WW1GalpTMWtOVFZpWWpsaE56UmpZemNHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--a3a1901580816fd47ce864dc5c1172022dfed63e/html.png"
                    alt="Language"
                    className="w-8 h-8"
                  />
                ),
              },
              {
                title: "Arquitectura de computadores",
                provider: "SENA",
                date: "2017",
                type: t.certification,
                level: t.levelFundamental,
                color: "from-teal-500 to-blue-500",
                icon: (
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2587/2587912.png"
                    alt="Language"
                    className="w-8 h-8"
                  />
                ),
              },
            ].map((cert, index) => (
              <div
                key={index}
                className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-purple-500/50 transition-all hover:transform hover:scale-105 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${cert.color} rounded-lg flex items-center justify-center text-xl group-hover:scale-110 transition-transform`}
                  >
                    {cert.icon}
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block px-2 py-1 bg-gradient-to-r ${cert.color} text-white text-xs rounded-full font-semibold`}
                    >
                      {cert.type}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {cert.title}
                </h3>

                <div className="space-y-2 mb-4">
                  <p className="text-purple-400 font-medium text-sm">
                    {cert.provider}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">{cert.date}</span>
                    <span
                      className={`px-2 py-1 bg-slate-800 text-xs rounded-full ${
                        cert.level === t.levelExpert
                          ? "text-teal-400"
                          : cert.level === t.levelIntermediate
                            ? "text-blue-400"
                            : cert.level === t.levelFundamental
                              ? "text-cyan-400"
                              : "text-teal-400"
                      }`}
                    >
                      {cert.level}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-slate-800 rounded-full h-2">
                    <div
                      className={`h-2 bg-gradient-to-r ${cert.color} rounded-full transition-all duration-1000 group-hover:w-full ${
                        cert.level === t.levelExpert
                          ? "w-full"
                          : cert.level === t.levelIntermediate
                            ? "w-4/5"
                            : cert.level === t.levelFundamental
                              ? "w-3/4"
                              : "w-2/3"
                      }`}
                    ></div>
                  </div>
                  <Award className="text-yellow-500" size={16} />
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                number: "15+",
                label: t.certifications,
                color: "text-blue-400",
              },
              {
                number: "20+",
                label: t.coursesCompleted,
                color: "text-teal-400",
              },
              { number: "2000+", label: t.studyHours, color: "text-cyan-400" },
              {
                number: "8+",
                label: t.certifiedTechnologies,
                color: "text-emerald-400",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center bg-slate-900/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
              >
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                  {stat.number}
                </div>
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

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line - hidden on mobile */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-blue-500 to-teal-500 hidden md:block"></div>

            <div className="space-y-12">
              {[
                {
                  year: t.experienceoccupationtime5,
                  position: t.experienceoccupation5,
                  company: t.experienceCompany5,
                  description: t.experienceDescription5,
                },
                {
                  year: t.experienceoccupationtime4,
                  position: t.experienceoccupation4,
                  company: t.experienceCompany4,
                  description: t.experienceDescription4,
                },
                {
                  year: t.experienceoccupationtime3,
                  position: t.experienceoccupation3,
                  company: t.experienceCompany3,
                  description: t.experienceDescription3,
                },
                {
                  year: t.experienceoccupationtime2,
                  position: t.experienceoccupation2,
                  company: t.experienceCompany2,
                  description: t.experienceDescription2,
                },
                {
                  year: t.experienceoccupationtime1,
                  position: t.experienceoccupation1,
                  company: t.experienceCompany1,
                  description: t.experienceDescription1,
                },
              ].map((exp, index) => (
                <div key={index} className="relative">
                  {/* Mobile layout - single column */}
                  <div className="md:hidden">
                    <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all mx-4">
                      <div className="flex items-center mb-4">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full mr-3"></div>
                        <span className="text-blue-400 font-semibold text-sm">
                          {exp.year}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-white leading-tight">
                        {exp.position}
                      </h3>
                      <p className="text-gray-300 font-medium mb-3 text-sm">
                        {exp.company}
                      </p>
                      <ul className="text-gray-400 text-sm leading-relaxed space-y-2">
                        {exp.description.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Desktop layout - alternating sides */}
                  <div
                    className={`hidden md:flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`w-1/2 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}
                    >
                      <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all">
                        <div className="flex items-center mb-4">
                          <Calendar className="text-blue-400 mr-3" size={20} />
                          <span className="text-blue-400 font-semibold">
                            {exp.year}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white">
                          {exp.position}
                        </h3>
                        <ul className="text-gray-400 space-y-2 text-justify">
                          {exp.description.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start">
                              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {/* Timeline dot - desktop only */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full"></div>
                  </div>
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
                <h3 className="text-2xl font-bold mb-6 text-white">
                  {t.letsConnect}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Mail className="text-blue-400" size={24} />
                    <span className="text-gray-300">
                      ingwilmersanchezsaez@gmail.com
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Phone className="text-teal-400" size={24} />
                    <span className="text-gray-300">+57 (300) 693-4822</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <MapPin className="text-cyan-400" size={24} />
                    <span className="text-gray-300">
                      {t.availableWorldwide}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
                <h3 className="text-2xl font-bold mb-6 text-white">
                  {t.followMe}
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/wilmersaz/"
                    target="_blank"
                    className="p-3 bg-slate-800 rounded-full hover:bg-blue-600 transition-colors"
                  >
                    <GithubIcon />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/wilmersanchez/"
                    target="_blank"
                    className="p-3 bg-slate-800 rounded-full hover:bg-cyan-600 transition-colors"
                  >
                    <LinkedinIcon />
                  </a>
                  <a
                    href="mailto:ingwilmersanchezsaez@gmail.com"
                    className="p-3 bg-slate-800 rounded-full hover:bg-teal-600 transition-colors"
                  >
                    <EmailIcon />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              <form
                className="space-y-6"
                action="https://formsubmit.co/8b49e71d469dfc28b279d4f6bfd6d310"
                method="POST"
                onSubmit={handleFormSubmit}
              >
                <input type="hidden" name="_captcha" value="false" />
                <input
                  type="hidden"
                  name="_next"
                  value="https://wilmersaz.github.io/wilmersaz/#contact"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t.name}
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none ${isFormValid ? "focus:border-blue-500" : "focus:border-gray-600"} text-white`}
                    name="name"
                    placeholder={t.yourName}
                    onChange={(e) =>
                      setFormValues((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t.email}
                  </label>
                  <input
                    type="email"
                    className={`w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none ${isFormValid ? "focus:border-blue-500" : "focus:border-gray-600"} text-white`}
                    name="email"
                    placeholder={t.yourEmail}
                    onChange={(e) =>
                      setFormValues((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t.message}
                  </label>
                  <textarea
                    rows={4}
                    className={`w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none ${isFormValid ? "focus:border-blue-500" : "focus:border-gray-600"} text-white`}
                    name="message"
                    placeholder={t.tellMeAboutProject}
                    onChange={(e) =>
                      setFormValues((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                  ></textarea>
                </div>
                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all transform ${
                    isFormValid
                      ? "bg-gradient-to-r from-blue-600 to-teal-600 text-white hover:from-blue-700 hover:to-teal-700 hover:scale-105 shadow-lg cursor-pointer"
                      : "bg-slate-700 text-gray-400 cursor-not-allowed"
                  }`}
                  type="submit"
                  disabled={!isFormValid}
                >
                  <span>{t.sendMessage}</span>
                  <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer t={t} />
    </div>
  );
}

export default App;
