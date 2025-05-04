import { memo } from 'react';
import { useTheme } from '../../Context/ThemeContext';

const CornerLights = memo(function EnhancedLuminousBackground() {
  const { isDarkMode } = useTheme();

  return (
    <div className="absolute h-full  inset-0 -z-10 overflow-hidden">
      {/* Base Layer */}
      <div className={`
        absolute inset-0
        ${isDarkMode ? 'bg-slate-950' : 'bg-slate-100/90'}
        transition-colors duration-700
      `} />

      {/* Primary Light Sources */}
      <div className={`
        absolute -top-[15%] -left-[5%] w-[85vw] h-[85vh]
        rounded-[60%] blur-[140px] transform-gpu
        ${isDarkMode 
          ? 'bg-indigo-600/15' 
          : 'bg-gradient-to-br from-blue-400/30 via-sky-400/25 to-indigo-300/20'}
        mix-blend-normal
      `} />

      <div className={`
        absolute top-[25%] -right-[10%] w-[90vw] h-[90vh]
        rounded-[60%] blur-[160px] transform-gpu
        ${isDarkMode 
          ? 'bg-violet-500/10' 
          : 'bg-gradient-to-bl from-violet-300/25 via-purple-300/20 to-fuchsia-200/15'}
        mix-blend-normal
      `} />

      {/* Secondary Light Sources */}
      <div className={`
        absolute -bottom-[5%] left-[15%] w-[80vw] h-[80vh]
        rounded-[55%] blur-[130px] transform-gpu
        ${isDarkMode 
          ? 'bg-violet-500/20' 
          : 'bg-gradient-to-tr from-purple-500/35  to-blue-200/15'}
        mix-blend-normal
      `} />

      <div className={`
        absolute top-[35%] left-[30%] w-[50vw] h-[50vh]
        rounded-full blur-[120px] transform-gpu
        ${isDarkMode 
          ? 'bg-purple-500/10' 
          : 'bg-gradient-to-r from-pink-300/20 via-rose-300/15 to-red-200/10'}
        mix-blend-normal
      `} />

      {/* Accent Lights */}
      <div className={`
        absolute top-[5%] right-[20%] w-[55vw] h-[55vh]
        rounded-full blur-[150px] transform-gpu
        ${isDarkMode 
          ? 'bg-blue-500/10' 
          : 'bg-gradient-to-l from-blue-300/20 via-sky-300/15 to-indigo-200/10'}
        mix-blend-normal
      `} />


    
    </div>
  );
});

export default CornerLights;
