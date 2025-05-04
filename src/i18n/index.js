import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './translations/en';
import { ar } from './translations/ar';

// استرجاع اللغة المخزنة أو ضبط اللغة الافتراضية كالعربية
const savedLanguage = localStorage.getItem('language') || 'ar';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en,
      ar,
    },
    lng: savedLanguage, // استخدم اللغة المخزنة أو العربية كافتراضية
    fallbackLng: 'ar', // اللغة الافتراضية في حال حدوث خطأ
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false, // لمنع التأخير عند تحميل الترجمات
    },
  });

// تخزين اللغة وضبط اتجاه الصفحة عند تغيير اللغة
i18n.on('languageChanged', (lng) => {
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  localStorage.setItem('language', lng); // تخزين اللغة الجديدة
});

// ضبط اتجاه الصفحة عند التحميل الأول
document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';

export default i18n;
