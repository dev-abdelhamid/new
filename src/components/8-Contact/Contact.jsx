import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../Context/ThemeContext";
import CornerLights from "../0-Background/CornerLights";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

const Contact = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  return (
    <section id="contact" className="py-16 md:py-24 cairo relative bg-transparent overflow-hidden">
      <div className="absolute inset-0 opacity-50">
        <CornerLights />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            {t("contact.title")}
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '4rem' }}
            transition={{ duration: 0.6 }}
            className="h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full mb-4"
          />
          <p className={`max-w-2xl mx-auto ${isDarkMode ? "text-white" : "text-black"}`}>
            {t("contact.description")}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          <ContactInfo />
          <ContactForm />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20" />
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
