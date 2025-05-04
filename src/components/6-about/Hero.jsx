import { motion } from 'framer-motion'
import { useTheme } from '../../Context/ThemeContext'
import { useTranslation } from 'react-i18next'
import { ArrowDown } from 'lucide-react'

export const Hero = () => {
  const { isDarkMode } = useTheme()
  const {  i18n } = useTranslation()
  const currentLang = i18n.language

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.outerHeight,
      behavior: 'smooth'
    })
  }

  const arrowVariants = {
    animate: {
      y: [0, 10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const generateRandomMovement = () => ({
    x: [
      Math.random() * -100,
      Math.random() * 100,
      Math.random() * -100
    ],
    y: [
      Math.random() * -100,
      Math.random() * 100,
      Math.random() * -100
    ],
    rotate: [0, Math.random() * 360, 0],
    scale: [1, Math.random() * 0.5 + 1, 1],
    opacity: [0.2, 0.6, 0.2]
  })

  const content = {
    about: {
      en: "About",
      ar: "نبذه عن"
    },
    description: {
      en: "We create advanced digital solutions that exceed expectations and build a bright technical future",
      ar: "نبتكر حلولاً رقمية متقدمة تتجاوز التوقعات وتصنع مستقبلاً تقنياً مشرقاً"
    },
    learnMore: {
      en: "Learn More",
      ar: "اعرف اكثر"
    }
  }

  return (
    <section className="relative flex align-center  items-center justify-center max-h-[60vh]">
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0">
          <div className={`absolute inset-0 bg-[url('/tech-grid.svg')] `}>
            <motion.div
              className="w-full h-full"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: isDarkMode ? [0.05, 0.08, 0.05] : [0.1, 0.15, 0.1]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1.5 h-1.5 rounded-full ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-blue-400 to-cyan-400'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-600'
              }`}
              animate={generateRandomMovement()}
              transition={{
                duration: Math.random() * 8 + 5,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto mt-12 px-4 sm:px-6 h-screen flex items-center justify-center">
        <div className="text-center max-w-4xl">
          <motion.div
            className="mb-7"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative inline-block">
              <motion.div
                className={`absolute -inset-4 blur-xl rounded-full ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-blue-600 to-red-300 opacity-55'
                    : 'bg-gradient-to-r from-blue-400 to-red-200 opacity-75'
                }`}
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <h1 className={`relative text-2xl sm:text-4xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`}>
                {content.about[currentLang]}
              </h1>
              <h1 className="relative text-4xl sm:text-6xl font-bold text-blue-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                SubCode
              </h1>
            </div>
          </motion.div>

          <motion.p
            className="text-lg sm:text-xl leading-relaxed mb-8 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {content.description[currentLang]}
          </motion.p>

          <motion.div
            className="flex justify-center flex-col gap-2 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <motion.button
              className={`px-6 py-1.5 mx-auto border-1 rounded-full text-white bg-blue-600 transition-all text-base sm:text-lg font-bold ${
                isDarkMode 
                  ? 'border-blue-500 text-blue-100 hover:bg-blue-600'
                  : 'border-blue-400 text-blue-800 hover:bg-blue-400'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {content.learnMore[currentLang]}
            </motion.button>

            <motion.div
              className="flex justify-center cursor-pointer"
              variants={arrowVariants}
              animate="animate"
              onClick={handleScrollDown}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Scroll down"
              >
                <ArrowDown className="w-6 h-6 text-white" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
