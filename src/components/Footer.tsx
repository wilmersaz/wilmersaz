import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

interface FooterTranslations {
  heroTitle: string;
  footerTagline: string;
  allRightsReserved: string;
}

interface FooterProps {
  t: FooterTranslations;
}

const Footer: React.FC<FooterProps> = ({ t }) => (
  <footer className="bg-slate-900 border-t border-slate-800 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent mb-4">
          {t.heroTitle}
        </div>
        <p className="text-gray-400 mb-6">{t.footerTagline}</p>
        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com/wilmersaz/"
            target="_blank"
            className="text-gray-400 hover:text-blue-400 transition-colors"
            rel="noopener noreferrer"
          >
            <Github size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/wilmersanchez/"
            target="_blank"
            className="text-gray-400 hover:text-teal-400 transition-colors"
            rel="noopener noreferrer"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="mailto:ingwilmersanchezsaez@gmail.com"
            className="text-gray-400 hover:text-cyan-400 transition-colors"
          >
            <Mail size={24} />
          </a>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-800 text-sm text-gray-500">
          © {new Date().getFullYear()} {t.heroTitle}. {t.allRightsReserved}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
