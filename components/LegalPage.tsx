
import React, { useEffect } from 'react';
import { LegalPageContent } from '../types';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface LegalPageProps {
  content: LegalPageContent;
  homeLabel: string;
  homeUrl: string;
}

const LegalPage: React.FC<LegalPageProps> = ({ content, homeLabel, homeUrl }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link to={homeUrl} className="inline-flex items-center text-brand-blue hover:text-blue-700 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {homeLabel}
          </Link>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-brand-blue px-8 py-10 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{content.title}</h1>
            <p className="text-blue-100 opacity-90 font-medium">{content.effectiveDate}</p>
          </div>

          <div className="p-8 md:p-12 space-y-10">
            {content.sections.map((section, index) => (
              <section key={index} className="scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  {section.title}
                </h2>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  <p>{section.content}</p>
                  {section.list && (
                    <ul className="list-disc pl-6 space-y-2 mt-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                      {section.list.map((item, i) => (
                        <li key={i} className="text-gray-700">{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
        
        <div className="mt-12 text-center text-gray-500 text-sm">
           &copy; {new Date().getFullYear()} Wanky Academy.
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
