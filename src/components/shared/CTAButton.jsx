import PropTypes from 'prop-types';

const CTAButton = ({ children, size = 'sm',  className = '', ...props }) => {
  const sizes = {
    xs: 'min-w-[90px] min-h-[18px] text-xs px-3 py-2',
    sm: 'min-w-[100px] min-h-[16px] text-sm px-3 py-2',
    lg: 'min-w-[100px] min-h-[20px] text-md px-3 py-2',
    md: 'min-w-[100px] min-h-[12px] text-sm px-3 py-2',
  }

  return (
    <button
      className={`
        relative
        cursor-pointer
        font-medium
        rounded-xl
        transition-all
        duration-500
        bg-[length:280%_auto]
        bg-gradient-to-r
        from-[#1e88e5]
        via-[#47b8ff]
        to-[#1e88e5]
        hover:bg-[right_top]
        hover:scale-[1.02]
        hover:shadow-[0px_0px_20px_rgba(71,184,255,0.5),0px_5px_5px_-1px_rgba(58,125,233,0.25),inset_4px_4px_8px_rgba(175,230,255,0.5),inset_-4px_-4px_8px_rgba(19,95,216,0.35)]
        text-white
        dark:text-gray-100
        shadow-[0px_0px_20px_rgba(71,184,255,0.5),0px_5px_5px_-1px_rgba(58,125,233,0.25),inset_4px_4px_8px_rgba(175,230,255,0.5),inset_-4px_-4px_8px_rgba(19,95,216,0.35)]
        border 
        border-gray-200
        hover:border-gray-300
        active:scale-[0.98]
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

CTAButton.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'md' , 'lg']),
  variant: PropTypes.string,
  className: PropTypes.string,
};

export default CTAButton