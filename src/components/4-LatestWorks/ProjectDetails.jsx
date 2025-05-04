import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../Context/ThemeContext';
import { projects } from '../4-LatestWorks/projectsData';

import {
  HeroSection,
  NavigationTabs,
  OverviewSection,
  FeaturesSection,
  TechnicalSection,
  ProcessSection,
  RelatedProjects,
  CallToAction
} from './Sections';
import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';


const ProjectDetails = () => {
  const { id } = useParams();

  const { i18n } = useTranslation();
  const { isDarkMode } = useTheme();
  const currentLang = i18n.language;
  const [activeSection, setActiveSection] = useState('overview');

  // const project = projects.find(p => p.id === id);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    // Fetch data from the API with Axios
    const headers = {
      'Accept-Language': `${i18n.language}`, // Change language dynamically based on state
    };
    axios.get(`${API_BASE_URL}/project/${id}`
      , {
        headers: headers,
      }).then(response => {
        setData(response.data.data);  // Set the response data to state
        setLoading(false);  // Set loading to false

      })
      .catch(error => {
        setError(error);  // Handle any errors
        console.error('Error fetching data:', error);
        setLoading(false)
      });

  }, []);  // Run this effect whenever the `language` changes

  const project = data;
  if (!project) {
    return <div>Project not found</div>;
  }

  const sections = [
    { id: 'overview', label: currentLang === 'ar' ? 'نظرة عامة' : 'Overview' },
    { id: 'features', label: currentLang === 'ar' ? 'المميزات' : 'Features' },
    { id: 'technical', label: currentLang === 'ar' ? 'التفاصيل التقنية' : 'Technical Details' },
    { id: 'process', label: currentLang === 'ar' ? 'مراحل التطوير' : 'Development Process' }
  ];

  return (
    <>
      {
        loading ? "loading ..." :
          <div className={`min-h-screen mt-20 font-[cairo] ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <HeroSection project={project} currentLang={currentLang} isDarkMode={isDarkMode} />

            <NavigationTabs
              sections={sections}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              isDarkMode={isDarkMode}
            />

            <div className="container mx-auto px-4 py-12">
              {activeSection === 'overview' && (
                <OverviewSection project={project} currentLang={currentLang} isDarkMode={isDarkMode} />
              )}
               {activeSection === 'features' && (
                <FeaturesSection project={project} currentLang={currentLang} isDarkMode={isDarkMode} />
              )}
              {activeSection === 'technical' && (
                <TechnicalSection project={project} currentLang={currentLang} isDarkMode={isDarkMode} />
              )}
             {activeSection === 'process' && (
                <ProcessSection project={project} currentLang={currentLang} isDarkMode={isDarkMode} />
              )} 
            </div>

            {/* <CallToAction
              project={project}
              currentLang={currentLang}
              isDarkMode={isDarkMode}
            />

            <RelatedProjects
              currentProject={project}
              projects={projects}
              currentLang={currentLang}
              isDarkMode={isDarkMode}
            /> */}


          </div>
      }
    </>
  );
};

export default ProjectDetails;
