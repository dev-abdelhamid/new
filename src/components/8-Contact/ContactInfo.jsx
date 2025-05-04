import { color, motion } from "framer-motion";
import * as Icons from "lucide-react";
import { contactInfo } from "../../config/contactConfig";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../Context/ThemeContext";
import SocialLinks from "../shared/SocialLinks";
import axios from "axios";
import { API_BASE_URL } from "../../apiConfig";
import { useEffect, useState } from "react";
import parse from 'html-react-parser';
import Skeleton from "react-loading-skeleton";
const ContactInfo = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const [data, setData] = useState([]);
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(true);

  const [contactInfo, setContactInfo] = useState([
    {
      icon: 'Phone',
      color: "blue",
      text: "+966 123 456 789",
      link: "tel:+966123456789",
      subtextKey: "contact.available24/7"
    },
    {
      icon: 'Mail',
      color: "blue",
      text: "info@subcodeco.com",
      link: "mailto:info@subcodeco.com",
      subtextKey: "contact.quickResponse"
    },
    {
      icon: 'MapPin',
      color: "blue",
      textKey: ["contact.location", "contact.location2"]
    }
  ]);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API_BASE_URL}/contact-us-inforamation`, {
          headers: { 'Accept-Language': i18n.language }
        });
        const contactData = data.data;
        // const location = parse(contactData.location);
        setData([
          { icon: 'Phone', color: "blue", text: contactData.mobile, link: `tel:${contactData.phone}`, subtextKey: contactData.textMobile },
          { icon: 'Mail', color: "blue", text: contactData.email, link: `mailto:${contactData.email}`, subtextKey: contactData.textEmail },
          { icon: 'MapPin', color: "blue", textKey: [ contactData.location,null] },
        ]);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };

    getData();
  }, [i18n.language]);
  console.log(data);



  return (
    <>
      {
        loading ? <Skeleton count={3} /> :
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {data.map((item, index) => {
              const Icon = Icons[item.icon];
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className={`flex items-start gap-4 p-5 rounded-xl transition-all duration-300
            ${isDarkMode ? 'bg-gray-900/50 hover:bg-gray-800/50' : 'bg-gray-50 hover:bg-gray-100'}
            border ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
                >
                  <div className={`p-3 rounded-xl bg-blue-500/20 text-blue-500`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    {item.link ? (
                      <div>
                        <a href={item.link} className={`font-medium hover:underline ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {item.text}
                        </a>
                        <p className={`text-sm mt-1 ${isDarkMode ? "text-white" : "text-black"} `}>{t(item.subtextKey)}</p>
                      </div>
                    ) : (
                      <div>
                        {Array.isArray(item.textKey) ? (
                          <div className="space-y-1">
                            <h4 className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                              {parse(item.textKey[0])}
                            </h4>
                            
                          </div>
                        ) : (
                          <>
                            <h4 className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                              {item.textKey ? t(item.textKey) : item.text}
                            </h4>
                            <p className="text-gray-500 text-sm mt-1">{t(item.subtextKey)}</p>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
            <SocialLinks />
          </motion.div>
      }
    </>
  );
};

export default ContactInfo;
