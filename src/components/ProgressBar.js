import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const ProgressBar = ({ progress, total }) => {
  const percentage = (progress / total) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 mb-8 overflow-hidden shadow-inner">
      <motion.div
        className="bg-gradient-to-r from-pink-500 to-rose-500 h-4 rounded-full relative"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-white drop-shadow-md">{progress}/{total}</span>
        </div>
        {percentage === 100 && (
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-yellow-400 to-pink-400 flex items-center justify-center"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Heart className="w-3 h-3 text-white animate-pulse" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ProgressBar;