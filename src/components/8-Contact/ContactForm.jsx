import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { formFields } from "../../config/contactConfig";
import { useFormLogic } from "../../hooks/useFormLogic";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../Context/ThemeContext";

const ContactForm = () => {
  const { t, i18n } = useTranslation();
  const { isDarkMode } = useTheme();
  const isRTL = i18n.language === 'ar';
  
  const {
    formData,
    errors,
    isSubmitting,
    formStatus,
    handleChange,
    handleSubmit
  } = useFormLogic();

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`lg:col-span-2 ${isDarkMode ? "bg-gray-950/80" : "bg-white/90"}
        p-8 rounded-2xl border ${isDarkMode ? "border-gray-800" : "border-gray-200"}
        shadow-xl space-y-6 backdrop-blur-sm ${isRTL ? 'rtl' : 'ltr'}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formFields.inputs.map((field, index) => {
          const Icon = Icons[field.icon];
          return (
            <div key={index} className="relative">
              <Icon 
                className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5`} 
              />
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                dir={isRTL ? 'rtl' : 'ltr'}
                required
                placeholder={t(`contact.${field.name}Placeholder`)}
                className={`w-full bg-transparent ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'}
                  py-3.5 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition-all duration-300 outline-none
                  ${isDarkMode ? "border-gray-800 text-white placeholder-gray-500" : "border-gray-200 text-gray-900 placeholder-gray-400"}
                  ${errors[field.name] ? 'border-red-500' : ''}`}
              />
              {errors[field.name] && (
                <p className={`text-red-500 text-sm mt-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {errors[field.name]}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="relative">
        <Icons.MessageSquare 
          className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-6 text-gray-500 w-5 h-5`} 
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          dir={isRTL ? 'rtl' : 'ltr'}
          required
          rows={4}
          placeholder={t("contact.detailsPlaceholder")}
          className={`w-full bg-transparent ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'}
            py-3.5 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-all duration-300 outline-none resize-none
            ${isDarkMode ? "border-gray-800 text-white placeholder-gray-500" : "border-gray-200 text-gray-900 placeholder-gray-400"}`}
        />
      </div>

      <div className="flex justify-center mt-8">
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="py-4 px-8 md:px-16 rounded-2xl text-white font-medium
            bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90
            transition-all duration-200 flex items-center justify-center gap-3
            disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin">
                <Icons.Send className="w-5 h-5" />
              </span>
              {t("contact.sending")}
            </>
          ) : (
            <>
              <Icons.Send className="w-5 h-5" />
              {t("contact.sendMessage")}
            </>
          )}
        </motion.button>
      </div>

      {formStatus && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center mt-6 ${
            formStatus === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {t(`contact.${formStatus}Message`)}
        </motion.p>
      )}
    </motion.form>
  );
};

export default ContactForm;
