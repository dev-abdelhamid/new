const ProjectCardSkeleton = () => (
    <div className="relative h-[480px] w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
      <div className="animate-pulse">
        {/* Image skeleton */}
        <div className="h-[240px] bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600" />
        
        {/* Content skeleton */}
        <div className="p-6 space-y-4">
          {/* Title skeleton */}
          <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg w-3/4 mx-auto" />
          
          {/* Description skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded w-full" />
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded w-5/6" />
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded w-4/6" />
          </div>
  
          {/* Tools skeleton */}
          <div className="flex flex-wrap gap-2 justify-center mt-6">
            {[1, 2, 3].map((i) => (
              <div 
                key={i}
                className="h-8 w-24 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full"
              />
            ))}
          </div>
  
          {/* Button skeleton */}
          <div className="flex justify-center mt-8">
            <div className="h-10 w-40 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl opacity-50" />
          </div>
        </div>
      </div>
    </div>
  );

export default ProjectCardSkeleton;
  