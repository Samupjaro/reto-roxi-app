import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, Cat } from 'lucide-react';

const Tile = ({ row, col, isRevealed, isNext, onClick, size = 'normal' }) => {
  const sizeClass = size === 'extra-large' 
    ? 'min-w-[18vw] min-h-[18vw] sm:min-w-[120px] sm:min-h-[120px] md:min-w-[150px] md:min-h-[150px] lg:min-w-[180px] lg:min-h-[180px]' 
    : 'min-w-[100px] min-h-[100px]';

  return (
    <motion.div
      className={`relative bg-gradient-to-br from-pink-200/90 to-rose-300/90 border-4 sm:border-6 border-pink-400/60 rounded-2xl sm:rounded-3xl cursor-pointer flex items-center justify-center transition-all duration-500 shadow-2xl ${sizeClass} kitty-tile ${
        isRevealed 
          ? 'bg-transparent border-transparent shadow-none' 
          : isNext 
            ? 'border-yellow-500/90 bg-gradient-to-br from-yellow-100/95 to-pink-100/95 shadow-yellow-400 ring-4 sm:ring-8 ring-yellow-300/60 animate-bounce-slow' 
            : 'hover:border-rose-600/90 hover:shadow-3xl hover:scale-105'
      }`}
      onClick={onClick}
      initial={false}
      whileHover={!isRevealed && !!onClick ? { scale: 1.05, rotate: 2 } : {}} // Menos exagerado en móvil
      whileTap={!isRevealed && !!onClick ? { scale: 0.95 } : {}}
      style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
    >
      {!isRevealed ? (
        <motion.div
          className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-pink-300/95 to-rose-400/95 flex flex-col items-center justify-center backdrop-blur-lg ${sizeClass} relative`}
          style={{ backfaceVisibility: 'hidden' }}
          animate={isNext ? { scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] } : {}} // Suavizar en móvil
          transition={{ duration: 2, repeat: Infinity }}
        >
          {/* Bigotitos Kitty adaptados */}
          <motion.div 
            className="absolute top-[20%] w-full flex justify-between px-2 sm:px-4"
            animate={{ rotate: [0, 1, -1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-2 h-0.5 sm:w-3 sm:h-1 bg-black rounded-full transform rotate-5"></div>
            <div className="w-2 h-0.5 sm:w-3 sm:h-1 bg-black rounded-full transform -rotate-5"></div>
          </motion.div>
          
          {/* Ojos simplices escalados */}
          <motion.div 
            className="my-1 sm:my-2 flex gap-2 sm:gap-4"
            animate={{ y: [0, -1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-4 h-4 sm:w-6 sm:h-6 bg-black rounded-full"></div>
            <div className="w-4 h-4 sm:w-6 sm:h-6 bg-black rounded-full"></div>
          </motion.div>
          
          {isNext ? (
            <Star className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 text-yellow-500 animate-ping" />
          ) : (
            <Sparkles className="w-6 h-6 sm:w-10 sm:h-10 md:w-14 md:h-14 text-pink-500 animate-pulse" />
          )}
          
          {/* Nariz y boca simpática */}
          <div className="flex flex-col items-center mt-1 sm:mt-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-pink-600 rounded-full mb-0.5 sm:mb-1"></div>
            <div className="w-1.5 h-0.5 sm:w-2 sm:h-1 bg-black rounded-full transform rotate-[-10deg]"></div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-emerald-200/80 to-green-200/80 rounded-2xl sm:rounded-3xl flex items-center justify-center relative"
          style={{ 
            backfaceVisibility: 'hidden', 
            transform: 'rotateY(180deg)',
            boxShadow: 'inset 0 0 40px rgba(34, 197, 94, 0.5)' 
          }}
          animate={{ rotateY: [180, 360] }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <Cat className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 text-emerald-600 animate-bounce" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default Tile;