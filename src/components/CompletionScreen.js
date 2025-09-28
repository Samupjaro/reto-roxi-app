import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Gift } from 'lucide-react';
import { triggerConfetti } from '../utils/helpers';

const CompletionScreen = ({ onRestart }) => {
  React.useEffect(() => {
    triggerConfetti();
  }, []);

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-pink-200 to-rose-300 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="text-center bg-white/95 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full shadow-2xl border border-pink-200">
        <motion.div
          className="mx-auto mb-6"
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, type: 'spring' }}
        >
          <Trophy className="w-24 h-24 text-yellow-500 mx-auto" />
        </motion.div>
        <h1 className="text-3xl font-bold text-pink-600 mb-4">Lo lograsteees!!</h1>
        <p className="text-gray-700 mb-6">Ahora Pasame el codigo y reclama tu regalitoo</p>
        
        <div className="bg-gradient-to-r from-yellow-100 to-pink-100 p-6 rounded-2xl mb-6">
          <Gift className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <div className="space-y-2">
            <h3 className="font-bold text-yellow-700">Cupón</h3>
            <p className="text-sm text-yellow-600">ROXILAMASLINDADELMUNDOYDELUNIVERSO</p>
            <p className="text-xs text-gray-500">Válido por 10 días</p>
          </div>
        </div>

        <motion.button
          onClick={onRestart}
          className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Jugar de Nuevo
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CompletionScreen;