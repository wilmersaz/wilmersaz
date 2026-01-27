import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface Project {
  title: string;
  description: string;
  image: string;
  tech: string[];
  color: string;
  demoUrl?: string;
  githubUrl?: string;
}

const ProjectWizard: React.FC = () => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const projects: Project[] = [
    {
      title: t.projectTitle16,
      description: t.projectDescription16,
      image: 'https://images.stockcake.com/public/f/e/1/fe1c2fbb-4fc9-49b6-9727-82eaaca5d6bd/package-transfer-moment-stockcake.jpg',
      tech: ['C#', '.Net Core 9', 'Angular', 'PostgreSQL'],
      color: 'from-blue-500 to-cyan-500',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      title: t.projectTitle15,
      description: t.projectDescription15,
      image: 'https://images.stockcake.com/public/2/4/a/24a4e89f-26bd-4064-9e97-01c58721f532/truck-loading-dock-stockcake.jpg',
      tech: ['C#', '.Net Core 9', 'Angular', 'PostgreSQL'],
      color: 'from-cyan-500 to-teal-500',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      title: t.projectTitle14,
      description: t.projectDescription14,
      image: 'https://images.stockcake.com/public/a/7/9/a792f68f-df70-4f2d-ba64-5cb2754dfc1a/robot-coding-intensely-stockcake.jpg',
      tech: ['Python', 'FastAPI', 'Selenium', 'PostgreSQL'],
      color: 'from-teal-500 to-emerald-500',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      title: t.projectTitle13,
      description: t.projectDescription13,
      image: 'https://images.stockcake.com/public/0/4/7/047a59bb-40fd-4155-aa76-5cc42d118d2d/hiring-sign-displayed-stockcake.jpg',
      tech: ['PHP', 'Laravel', 'Alpine.js', 'Livewire', 'MySQL'],
      color: 'from-teal-500 to-cyan-500',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      title: t.projectTitle12,
      description: t.projectDescription12,
      image: 'https://images.stockcake.com/public/f/e/b/febf23d1-f7b0-4540-9ae1-b7d27ad79ede/cozy-studio-living-stockcake.jpg',
      tech: ['PHP', 'Laravel', 'Vue.js', 'MySQL'],
      color: 'from-cyan-500 to-blue-500',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      title: t.projectTitle11,
      description: t.projectDescription11,
      image: 'https://images.stockcake.com/public/4/0/2/402e691b-2358-4dc0-8357-b57dd21ffc4e/innovation-in-action-stockcake.jpg',
      tech: ['PHP', 'Laravel', 'jQuery', 'MySQL'],
      color: 'from-blue-500 to-cyan-500',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      title: t.projectTitle10,
      description: t.projectDescription10,
      image: 'https://images.stockcake.com/public/b/8/0/b80c8f46-626c-4ae2-a1f4-df1f5dd4fb0e/organized-deadline-planning-stockcake.jpg',
      tech: ['PHP', 'Laravel', 'Vue.js', 'MySQL'],
      color: 'from-cyan-500 to-teal-500',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      title: t.projectTitle9,
      description: t.projectDescription9,
      image: 'https://images.stockcake.com/public/0/d/7/0d749e10-d9de-4b53-8010-60bd7d644ca9/financial-elements-intersect-stockcake.jpg',
      tech: ['PHP', 'Laravel', 'jQuery', 'MySQL'],
      color: 'from-teal-500 to-emerald-500',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      title: t.projectTitle8,
      description: t.projectDescription8,
      image: 'https://images.stockcake.com/public/d/9/3/d9370026-f332-46a5-963c-67836f337ce4/organized-productivity-workspace-stockcake.jpg',
      tech: ['PHP', 'Laravel', 'jQuery', 'MySQL'],
      color: 'from-teal-500 to-cyan-500',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      title: t.projectTitle7,
      description: t.projectDescription7,
      image: 'https://images.stockcake.com/public/e/a/1/ea1e7a0d-f163-4f23-8efd-6568c750991b/digital-meets-traditional-stockcake.jpg',
      tech: ['PHP', 'Laravel', 'jQuery', 'MySQL'],
      color: 'from-cyan-500 to-blue-500',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      title: t.projectTitle6,
      description: t.projectDescription6,
      image: 'https://images.stockcake.com/public/e/2/6/e2625ac6-5467-40fc-a19c-9afedee30c5d/magnetic-data-flow-stockcake.jpg',
      tech: ['PHP', 'Laravel', 'jQuery', 'MySQL'],
      color: 'from-blue-500 to-cyan-500',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      title: t.projectTitle5,
      description: t.projectDescription5,
      image: 'https://images.stockcake.com/public/6/c/9/6c93e907-e2f3-4c99-bf3c-0f6092a9a57f/warehouse-inventory-management-stockcake.jpg',
      tech: ['PHP', 'Laravel', 'jQuery', 'MySQL'],
      color: 'from-cyan-500 to-teal-500',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      title: t.projectTitle4,
      description: t.projectDescription4,
      image: 'https://images.stockcake.com/public/0/f/b/0fb792b8-f5b7-498c-9219-51bc01d302f4/warehouse-inventory-check-stockcake.jpg',
      tech: ['PHP', 'Laravel', 'jQuery', 'MySQL'],
      color: 'from-teal-500 to-emerald-500',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      title: t.projectTitle3,
      description: t.projectDescription3,
      image: 'https://images.stockcake.com/public/3/a/8/3a842923-b2bc-44b9-a6c2-aba85a294633/productivity-enhanced-workspace-stockcake.jpg',
      tech: ['PHP', 'Laravel', 'JavaScript', 'MySQL'],
      color: 'from-teal-500 to-cyan-500',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      title: t.projectTitle2,
      description: t.projectDescription2,
      image: 'https://images.stockcake.com/public/e/f/8/ef8a90d4-8714-4e69-9725-9e7de3789d3a/analyzing-brain-data-stockcake.jpg',
      tech: ['PHP', 'Laravel', 'jQuery', 'MySQL'],
      color: 'from-cyan-500 to-blue-500',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      title: t.projectTitle1,
      description: t.projectDescription1,
      image: 'https://images.stockcake.com/public/7/0/c/70cb0fe7-0696-4211-9e15-7627cd350427/medical-team-meeting-stockcake.jpg',
      tech: ['PHP', 'Laravel', 'jQuery', 'MySQL'],
      color: 'from-blue-500 to-cyan-500',
      demoUrl: '#',
      githubUrl: '#'
    }
  ];

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  // Auto-play functionality
  React.useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(nextStep, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay, nextStep]);

  const currentProject = projects[currentStep];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Wizard Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
            {t.portfolioTitle}
          </h2>
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 transition-colors"
            title={isAutoPlay ? t.pauseWizard : t.resumeWizard}
          >
            {isAutoPlay ? <Pause size={20} /> : <Play size={20} />}
          </button>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center space-x-3 mb-8">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToStep(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? 'bg-gradient-to-r from-blue-500 to-teal-500 scale-125'
                  : 'bg-slate-600 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>

        {/* Step Counter */}
        <div className="text-gray-400 text-sm">
          {currentStep + 1} / {projects.length}
        </div>
      </div>

      {/* Project Content */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/50 backdrop-blur-sm border border-slate-700">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
          {/* Project Image */}
          <div className="relative overflow-hidden">
            <img
              src={currentProject.image}
              alt={currentProject.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-transparent to-transparent lg:hidden"></div>

            {/* Mobile overlay content */}
            <div className="absolute bottom-4 left-4 lg:hidden">
              <div className="flex space-x-2">
                {currentProject.tech.slice(0, 2).map((tech, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 bg-gradient-to-r ${currentProject.color} text-white text-sm rounded-full font-medium`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="space-y-6">
              {/* Title */}
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                {currentProject.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 text-lg leading-relaxed">
                {currentProject.description}
              </p>

              {/* Technologies */}
              <div className="space-y-3">
                <h4 className="text-xl font-semibold text-white">{t.technologies}:</h4>
                <div className="flex flex-wrap gap-2">
                  {currentProject.tech.map((tech, index) => (
                    <span
                      key={index}
                      className={`px-4 py-2 bg-gradient-to-r ${currentProject.color} text-white text-sm rounded-full font-medium hover:scale-105 transition-transform`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              {/* <div className="flex space-x-4 pt-4">
                <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-teal-700 transition-all transform hover:scale-105">
                  <span>{t.viewProject}</span>
                  <ExternalLink size={16} />
                </button>
              </div> */}
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevStep}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-slate-900/80 backdrop-blur-sm text-white p-3 rounded-full hover:bg-slate-800 transition-all hover:scale-110 border border-slate-700"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={nextStep}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-slate-900/80 backdrop-blur-sm text-white p-3 rounded-full hover:bg-slate-800 transition-all hover:scale-110 border border-slate-700"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default ProjectWizard;