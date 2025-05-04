

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
      },
      aspectRatio: {
        '4/5': '4 / 5',
      },

      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        tajawal: ['Tajawal', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],

      
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      
      animation: {
        'pulse-border': 'pulse-border 6s ease-in-out infinite',
        blob: 'blob 7s infinite',
        float: 'float 15s infinite',
        pulse: 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        wave: 'wave 10s ease-in-out infinite',
        sparkle: 'sparkle 2s ease-in-out infinite',
        fly: 'fly 0.6s ease-in-out infinite alternate',
        morph: 'morph 8s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'glow-pulse-light': 'glow-pulse-light 3s ease-in-out infinite',
        'glow-pulse-dark': 'glow-pulse-dark 3s ease-in-out infinite',
        'glow-pulse-very-dark': 'glow-pulse-very-dark 3s ease-in-out infinite',
        'glow-pulse-very-dark-2': 'glow-pulse-very-dark-2 3s ease-in-out infinite',


      },
      keyframes: {
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        float: {
          '0%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(180deg)' },
          '100%': { transform: 'translateY(0) rotate(360deg)' },
        },
        'grid-flow': {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-20px) scale(1.02)' }
        },
        'grid-flow-light': {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-20px) scale(1.02)' }
        },
        'glow-pulse': {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 0.6 }
        },
        'glow-pulse-light': {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 0.5 }
        },
        'core-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: 0.3 },
          '50%': { transform: 'scale(1.1)', opacity: 0.5 }
        },
        'core-pulse-light': {
          '0%, 100%': { transform: 'scale(1)', opacity: 0.4 },
          '50%': { transform: 'scale(1.1)', opacity: 0.6 }
        }
      },
    
      boxShadow: {
        'inner-lg': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        'glow': '0 0 15px rgb(var(--primary-500) / 0.5)',
        'glow-lg': '0 0 25px rgb(var(--primary-500) / 0.5)',
      },
      dropShadow: {
        'glow': '0 0 1em rgba(var(--primary-500) / 0.5)',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionDuration: {
        '2000': '2000ms',
        '3000': '3000ms',
      },
      scale: {
        '175': '1.75',
        '200': '2',
      },
      zIndex: {
        '60': '60',
        '70': '70',
      },
      screens: {
        'xs': '400px',  
        'sm': '640px',
        'md': '868px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [
    
  ],
};
