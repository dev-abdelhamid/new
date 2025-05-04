import { memo } from 'react';
import CornerLights from './CornerLights';
import FloatingSquares from './FloatingSquare';

const BackgroundEffects = memo(function BackgroundEffects() {

  return (
    <div 
      className={`absolute  h-full inset-0  w-full z-10`}
      style={{
        contain: 'layout paint size',
        willChange: 'transform',
        transform: 'translate3d(0,0,0)',
        backfaceVisibility: 'hidden',
        perspective: 500
      }}
    >
      <CornerLights />
      <FloatingSquares />
    </div>
  );
});

BackgroundEffects.displayName = 'BackgroundEffects';

export default BackgroundEffects;
