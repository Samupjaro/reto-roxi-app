import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

const LoadingScreen = ({ onComplete }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-200 via-rose-300 to-purple-200 flex items-center justify-center z-50">
      <motion.div
        className="text-center"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
      >
        <motion.div
          className="relative mx-auto mb-6"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Heart className="w-24 h-24 text-pink-500 mx-auto" />
          <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 animate-pulse" />
          <Sparkles className="absolute -bottom-2 -left-2 w-6 h-6 text-yellow-400 animate-bounce" />
        </motion.div>
        <motion.h1
          className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          ¡Bienvenida a Reto de Roxi!
        </motion.h1>
        <motion.p
          className="text-pink-700 font-medium"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Preparando la magia... ✨
        </motion.p>
        <motion.button
          onClick={onComplete}
          className="mt-8 px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          ¡Empezar el Retoo
        </motion.button>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;