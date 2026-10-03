import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BackgroundTransitionProps {
  className?: string;
  autoCycle?: boolean;
  cycleInterval?: number; // milliseconds
}

export const BackgroundTransition: React.FC<BackgroundTransitionProps> = ({
  className = '',
  autoCycle = true,
  cycleInterval = 6000,
}) => {
  // stage: 1 = Logo only ("dots"), 2 = Introducing + Characters squad
  const [stage, setStage] = useState<1 | 2>(1);

  useEffect(() => {
    // Initial reveal transition from stage 1 to stage 2
    const initialTimer = setTimeout(() => {
      setStage(2);
    }, 2200);

    if (!autoCycle) {
      return () => clearTimeout(initialTimer);
    }

    // Continuous smooth transition cycle
    const interval = setInterval(() => {
      setStage((prev) => (prev === 1 ? 2 : 1));
    }, cycleInterval);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [autoCycle, cycleInterval]);

  return (
    <div className={`relative w-full h-full overflow-hidden select-none pointer-events-none ${className}`}>
      {/* Stage 1: Just "dots" logo on black */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center sm:bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/dots-stage1.png')`,
        }}
        initial={{ opacity: 1 }}
        animate={{ opacity: stage === 1 ? 1 : 0 }}
        transition={{ duration: 1.8, ease: 'easeInOut' }}
      />

      {/* Stage 2: "INTRODUCING dots" with 4 furry characters peeking */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center sm:bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/dots-stage2.png')`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: stage === 2 ? 1 : 0 }}
        transition={{ duration: 1.8, ease: 'easeInOut' }}
      />

      {/* Subtle vignette & contrast gradient overlay to ensure UI readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-[#090b10]/40 to-[#090b10]/85" />
    </div>
  );
};
