export const contactInfo = [
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
];

export const socialLinks = [
  {
    icon: 'Facebook',
    platform: 'Facebook',
    color: "text-blue-500",
    link: "https://facebook.com/subcodeco",
    hoverColor: "hover:bg-gradient-to-br hover:from-blue-400 hover:to-blue-600",
    gradient: "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600",
    animation: "hover:rotate-12 transition-all duration-300"
  },
  {
    icon: 'Instagram',
    platform: 'Instagram',
    color: "text-pink-500",
    link: "https://www.instagram.com/subcodeco/",
    hoverColor: "hover:bg-gradient-to-tr hover:from-pink-500 hover:via-purple-500 hover:to-yellow-500",
    gradient: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500",
    animation: "hover:-rotate-12 transition-all duration-300"
  },
  {
    icon: 'Twitter',
    platform: 'Twitter',
    color: "text-sky-500",
    link: "https://x.com/SubCodeCo",
    hoverColor: "hover:bg-gradient-to-r hover:from-sky-400 hover:to-sky-600",
    gradient: "bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600",
    animation: "hover:rotate-12 transition-all duration-300"
  },
  {
    icon: 'Linkedin',
    platform: 'LinkedIn',
    color: "text-blue-600",
    link: "https://www.linkedin.com/in/subcode/",
    hoverColor: "hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-700",
    gradient: "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700",
    animation: "hover:-rotate-12 transition-all duration-300"
  }
];


export const formFields = {
  inputs: [
    {
      name: 'name',
      type: 'text',
      icon: 'User',
      validation: {
        pattern: {
          ar: /^[\u0600-\u06FF\s]+$/,
          en: /^[a-zA-Z\s]+$/
        }
      }
    },
    {
      name: 'email',
      type: 'email', 
      icon: 'Mail',
      validation: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      }
    },
    {
      name: 'phone',
      type: 'tel',
      icon: 'Phone',
      validation: {
        pattern: /^\+?[0-9]{8,}$/
      }
    },
    {
      name: 'subject',
      type: 'text',
      icon: 'Briefcase'
    }
  ]
};
