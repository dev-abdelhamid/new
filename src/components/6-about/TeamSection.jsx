import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../Context/ThemeContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

const translations = {
  team: {
    title: {
      en: "Our Team",
      ar: "فريق العمل"
    },
    subtitle: {
      en: "Combining passion and expertise to shape the digital future",
      ar: "نجمع بين الشغف والخبرة لنصنع المستقبل الرقمي"
    }
  }
};

const TeamCard = ({ member, index, isDarkMode }) => (
  <motion.div
    className="group relative h-[450px]"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
  >
    <div className={`relative w-full h-full overflow-hidden rounded-2xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} hover:shadow-2xl transition-all duration-500`}>
      <div className="h-full">
        <img 
          src={member.image} 
          alt={member.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/95 via-blue-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
      
      <div className="absolute inset-x-0 bottom-0 p-6 transform translate-y-[calc(100%-100px)] group-hover:translate-y-0 transition-all duration-500">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold text-white">
              {member.name}
            </h3>
          </div>
          
          <p className="text-lg font-medium text-blue-200">
            {member.jobTitle}
          </p>
          
          <motion.p 
            className="text-sm leading-relaxed text-blue-100/90 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 line-clamp-3 group-hover:line-clamp-none"
          >
            {member.description}
          </motion.p>
        </div>
      </div>
    </div>
  </motion.div>
);

TeamCard.propTypes = {
  member: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    jobTitle: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  currentLang: PropTypes.string.isRequired
};

export default function TeamSection() {
  const { i18n } = useTranslation();
  const { isDarkMode } = useTheme();
  const currentLang = i18n.language;
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get('https://backend.subcodeco.com/api/team', {
          headers: { 'Accept-Language': currentLang }
        });
        setTeamMembers(response.data.data);
      } catch (error) {
        console.error('Error fetching team:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [currentLang]);

  if (loading) return null;

  return (
    <section className={`py-20 ${isDarkMode ? 'bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-gradient-to-b from-white to-blue-50'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
            {translations.team.title[currentLang]}
          </h2>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {translations.team.subtitle[currentLang]}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <TeamCard 
              key={member.id} 
              member={member} 
              index={index}
              isDarkMode={isDarkMode}
              currentLang={currentLang}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
