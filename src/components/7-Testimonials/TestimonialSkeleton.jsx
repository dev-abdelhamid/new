const TestimonialSkeleton = ({ isDarkMode, isRTL }) => {
    return (
      <div className={`
        w-full h-[400px] max-w-2xl mx-auto rounded-2xl
        ${isDarkMode ? 'bg-gray-900' : 'bg-white'}
        shadow-lg border border-opacity-20
        ${isDarkMode ? 'border-blue-400' : 'border-blue-200'}
        p-6 animate-pulse
      `}>
        <div className={`flex items-start gap-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className="w-28 h-28 rounded-xl bg-gray-700" />
          <div className={`flex flex-col gap-3 ${isRTL ? 'items-end' : 'items-start'}`}>
            <div className="h-8 w-48 bg-gray-700 rounded" />
            <div className="h-4 w-32 bg-gray-700 rounded" />
          </div>
        </div>
        
        <div className="mt-8 space-y-3">
          <div className="h-4 bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-700 rounded w-5/6" />
          <div className="h-4 bg-gray-700 rounded w-4/6" />
        </div>
  
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex justify-between pt-4 border-t border-gray-700">
            <div className="h-4 w-24 bg-gray-700 rounded" />
            <div className="h-4 w-24 bg-gray-700 rounded" />
          </div>
        </div>
      </div>
    );
  };
  
  export default TestimonialSkeleton;
  