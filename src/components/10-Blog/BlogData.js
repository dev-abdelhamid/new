export const blogCategories = [
  { 
    id: 'programming',
    name: 'البرمجة والتطوير',
    nameEn: 'Programming & Development' 
  },
  { 
    id: 'design', 
    name: 'التصميم والواجهات',
    nameEn: 'Design & UI/UX' 
  },
  { 
    id: 'marketing', 
    name: 'التسويق الرقمي',
    nameEn: 'Digital Marketing' 
  },
  { 
    id: 'business', 
    name: 'حلول الأعمال',
    nameEn: 'Business Solutions' 
  },
  { 
    id: 'ai', 
    name: 'الذكاء الاصطناعي',
    nameEn: 'Artificial Intelligence' 
  },
  { 
    id: 'tutorials', 
    name: 'الدروس التعليمية',
    nameEn: 'Tutorials' 
  }
];

export const blogTags = {
  ar: [
    'تطوير الويب',
    'تطبيقات الموبايل',
    'تجربة المستخدم',
    'التسويق الإلكتروني',
    'الأعمال الرقمية',
    'برمجة',
    'تصميم',
    'ذكاء اصطناعي',
    'SEO',
    'استراتيجيات رقمية'
  ],
  en: [
    'Web Development',
    'Mobile Apps',
    'User Experience',
    'Digital Marketing',
    'Digital Business',
    'Programming',
    'Design',
    'AI',
    'SEO',
    'Digital Strategy'
  ]
};

export const articles = [
  {
    id: 1,
    title: "كيف تبني هوية رقمية قوية لشركتك؟",
    titleEn: "How to Build a Strong Digital Identity for Your Company?",
    excerpt: "دليل شامل لبناء هوية رقمية مميزة تساعد شركتك على النمو في العالم الرقمي...",
    excerptEn: "A comprehensive guide to building a distinctive digital identity that helps your company grow in the digital world...",
    content: {
      ar: `
        <h2>أهمية الهوية الرقمية</h2>
        <p>في العصر الرقمي الحالي، أصبحت الهوية الرقمية عنصراً أساسياً في نجاح الشركات...</p>
      `,
      en: `
        <h2>The Importance of Digital Identity</h2>
        <p>In today's digital age, digital identity has become essential for business success...</p>
      `
    },
    date: "2024-01-15",
    category: "التسويق",
    categoryEn: " Marketing",
    readTime: 8,
    views: 1200,
    tags: {
      ar: ["التسويق الإلكتروني", "الأعمال الرقمية"],
      en: ["Digital Marketing", "Digital Business"]
    },
    thumbnail: "/assets/19790.jpg",
    heroImage: "/assets/19790.jpg",
    slug: "building-strong-digital-identity",
    author: {
      name: "سارة أحمد",
      nameEn: "Sarah Ahmed",
      role: "خبيرة تسويق رقمي",
      roleEn: "Digital Marketing Expert",
      avatar: "/assets/authors/sarah.jpg",
      bio: "خبيرة في التسويق الرقمي وبناء الهويات الرقمية للشركات",
      bioEn: "Expert in digital marketing and building digital identities for companies",
      social: {
        twitter: "https://twitter.com/sarah",
        linkedin: "https://linkedin.com/in/sarah"
      }
    }
  },
  // Add similar structure for other articles...
];

export const featuredArticles = articles.slice(0, 6);
