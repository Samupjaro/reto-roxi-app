import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';
import { playSound } from '../utils/helpers';

const ChallengeModal = ({ challenge, onComplete, onFail, onClose, isMuted, attemptsLeft }) => {
  const [userInput, setUserInput] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [errorFeedback, setErrorFeedback] = useState('');

  const handleSubmit = () => {
    const result = challenge.type === 'code' 
      ? userInput.toLowerCase().trim() === challenge.code.toLowerCase().trim()
      : selectedOption === challenge.correct;

    setIsCorrect(result);
    setSubmitted(true);

    if (result) {
      playSound('success', isMuted);
      setTimeout(() => {
        onComplete(challenge.revealedTile);
      }, 1500);
    } else {
      setErrorFeedback('¡Ups! Respuesta incorrecta. Revisa y prueba de nuevo.');
      playSound('error', isMuted);
      setTimeout(() => {
        onFail();
        setSubmitted(false);
        setErrorFeedback('');
        setUserInput('');
        setSelectedOption(null);
        setIsCorrect(null);
      }, 2500);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-40 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white/95 backdrop-blur-2xl rounded-3xl p-6 md:p-8 max-w-lg w-full relative shadow-2xl border-2 border-pink-200"
          initial={{ scale: 0.9, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 50, opacity: 0 }}
          transition={{ type: 'spring', bounce: 0.4 }}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-pink-500 transition-all p-1 rounded-full hover:bg-pink-100"
            aria-label="Cerrar reto"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-pink-600 mb-2">¡Reto {challenge.id}/16! ✨</h2>
            <p className="text-gray-700 font-medium text-lg">{challenge.prompt}</p>
            {attemptsLeft < 5 && (
              <p className="text-xs text-yellow-600 mt-2">Te quedan {attemptsLeft} intentos hoy</p>
            )}
          </div>

          {submitted && isCorrect === true ? (
            <motion.div
              className="text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <CheckCircle2 className="w-16 h-16 md:w-20 md:h-20 text-green-500 mx-auto mb-4 animate-bounce" />
              <p className="text-2xl text-green-600 font-bold">¡Excelente! Revelando pieza...</p>
            </motion.div>
          ) : submitted && isCorrect === false ? (
            <motion.div
              className="text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <AlertCircle className="w-16 h-16 md:w-20 md:h-20 text-red-500 mx-auto mb-4 animate-shake" />
              <p className="text-2xl text-red-600 font-bold mb-2">{errorFeedback}</p>
              <p className="text-red-500">¡Inténtalo una vez más!</p>
            </motion.div>
          ) : (
            <>
              {challenge.type === 'code' ? (
                <motion.input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="w-full p-4 md:p-5 border-2 border-pink-200 rounded-2xl text-center font-semibold text-lg focus:outline-none focus:ring-4 focus:ring-pink-400 focus:border-pink-500 transition-all bg-pink-50"
                  placeholder="Escribe tu respuesta aquí..."
                  autoFocus
                  whileFocus={{ scale: 1.02 }}
                />
              ) : (
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {challenge.options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setSelectedOption(index)}
                      className={`w-full p-4 md:p-5 rounded-2xl text-left transition-all text-lg font-medium ${
                        selectedOption === index
                          ? 'bg-pink-200 border-2 border-pink-500 shadow-lg bg-gradient-to-r from-pink-100 to-rose-100'
                          : 'bg-gray-50 border border-gray-200 hover:bg-pink-50 hover:border-pink-300'
                      }`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              )}
              <motion.button
                onClick={handleSubmit}
                disabled={(challenge.type === 'code' && !userInput.trim()) || (challenge.type === 'quiz' && selectedOption === null)}
                className="mt-6 w-full py-4 md:py-5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:hover:shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                ¡Verificar Respuesta!
              </motion.button>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChallengeModal;