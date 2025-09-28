import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import GameBoard from './components/GameBoard';
import ChallengeModal from './components/ChallengeModal';
import ProgressBar from './components/ProgressBar';
import CompletionScreen from './components/CompletionScreen';
import SoundToggle from './components/SoundToggle';
import { initialChallenges, gameConfig } from './utils/gameData';
import { generateTileKey, isTileRevealed, saveProgress, loadProgress, playSound, loadDailyAttempts, saveDailyAttempt } from './utils/helpers';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [revealedTiles, setRevealedTiles] = useState([]);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [showChallenge, setShowChallenge] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [challenges, setChallenges] = useState(initialChallenges);
  const [dailyAttempts, setDailyAttempts] = useState(0);
  const [maxAttemptsReached, setMaxAttemptsReached] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const progress = revealedTiles.length;
  const totalTiles = gameConfig.totalTiles;
  const currentNextTile = challenges[currentChallenge]?.revealedTile || null;
  const MAX_ATTEMPTS = 5;

  useEffect(() => {
    const savedProgress = loadProgress();
    const attempts = loadDailyAttempts();
    setDailyAttempts(attempts.count);
    setMaxAttemptsReached(attempts.exceeded);

    if (savedProgress && savedProgress.revealedTiles && savedProgress.revealedTiles.length > 0) {
      setRevealedTiles(savedProgress.revealedTiles);
      setCurrentChallenge(savedProgress.currentChallenge);
      if (savedProgress.revealedTiles.length === totalTiles) {
        setCompleted(true);
      }
    }

    if (attempts.exceeded) {
      setErrorMessage('¡Has excedido los 5 intentos fallidos de hoy! Vuelve mañana para más diversión. 💕😻');
    }

    playSound('start', isMuted);
  }, [isMuted]);

  useEffect(() => {
    saveProgress(revealedTiles, currentChallenge);
    if (progress === totalTiles && !completed) {
      setCompleted(true);
      playSound('win', isMuted);
    }
  }, [revealedTiles, currentChallenge, completed, isMuted]);

  const handleStart = () => {
    setIsLoading(false);
    playSound('start', isMuted);
  };

  const handleTileClick = (clickedRow, clickedCol) => {
    if (currentChallenge >= totalTiles || completed || maxAttemptsReached) return;
    if (currentNextTile && clickedRow === currentNextTile[0] && clickedCol === currentNextTile[1]) {
      setShowChallenge(true);
    } else {
      playSound('error', isMuted);
      setErrorMessage('¡Toca solo la pieza brillante! 😹 Inténtalo de nuevo.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const handleChallengeComplete = (revealedTile) => {
    setRevealedTiles(prev => [...prev, revealedTile]);
    setCurrentChallenge(prev => prev + 1);
    setShowChallenge(false);
    setErrorMessage('');
    playSound('reveal', isMuted);
  };

  const handleChallengeFail = () => {
    const newAttempts = dailyAttempts + 1;
    setDailyAttempts(newAttempts);
    saveDailyAttempt(newAttempts);

    if (newAttempts >= MAX_ATTEMPTS) {
      setMaxAttemptsReached(true);
      setShowChallenge(false);
      setErrorMessage(`¡Ups! Has fallado ${newAttempts} veces hoy. Límite de ${MAX_ATTEMPTS} alcanzado. ¡Vuelve mañana, Roxi te espera! 😿💖`);
    } else {
      setErrorMessage(`¡Respuesta incorrecta! Te quedan ${MAX_ATTEMPTS - newAttempts} intentos hoy. ¡Sigue intentándolo! 😺`);
      playSound('error', isMuted);
      setTimeout(() => setErrorMessage(''), 4000);
    }
  };

  const handleChallengeClose = () => {
    setShowChallenge(false);
  };

  const handleSoundToggle = () => {
    setIsMuted(prev => !prev);
    if (!isMuted) {
      playSound('toggle', false);
    }
  };

  const handleRestart = () => {
    setRevealedTiles([]);
    setCurrentChallenge(0);
    setCompleted(false);
    setDailyAttempts(0);
    setMaxAttemptsReached(false);
    localStorage.removeItem('roxiProgress');
    localStorage.removeItem('roxiDailyAttempts');
    setErrorMessage('');
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleStart} />;
  }

  if (completed) {
    return <CompletionScreen onRestart={handleRestart} />;
  }

  return (
    <div className="min-h-screen py-8 px-4 flex flex-col items-center relative bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 kitty-bg">
      <SoundToggle isMuted={isMuted} onToggle={handleSoundToggle} />

      <motion.h1
        className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-8 text-center drop-shadow-lg relative"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Reto de Roxi 😻👑
        <motion.div 
          className="absolute top-[-20%] left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, -5, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🎀
        </motion.div>
      </motion.h1>

      <ProgressBar progress={progress} total={totalTiles} />

      <GameBoard
        revealedTiles={revealedTiles}
        backgroundImage={gameConfig.backgroundImage}
        onTileClick={handleTileClick}
        currentNextTile={currentNextTile}
      />

      {errorMessage && (
        <motion.p 
          className="mt-4 text-center text-yellow-600 font-semibold px-4 bg-yellow-100 rounded-2xl py-4 border border-yellow-300 shadow-md"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {errorMessage}
        </motion.p>
      )}

      {!maxAttemptsReached && currentNextTile && (
        <motion.p 
          className="mt-8 text-center text-gray-600 font-bold text-xl px-4 bg-pink-100/50 rounded-2xl py-4 border border-pink-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Reto {currentChallenge + 1}/16: Toca la pieza en fila {currentNextTile[0] + 1}, columna {currentNextTile[1] + 1} (Quedan {MAX_ATTEMPTS - dailyAttempts} intentos hoy) 😸
        </motion.p>
      )}

      {maxAttemptsReached && (
        <motion.div 
          className="mt-12 text-center px-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="text-red-600 font-bold text-2xl mb-6">¡Límite diario alcanzado! 😿</p>
          <motion.button
            onClick={handleRestart}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            Reiniciar y Volver Mañana 🎀
          </motion.button>
        </motion.div>
      )}

      {showChallenge && currentChallenge < challenges.length && !maxAttemptsReached && (
        <ChallengeModal
          challenge={challenges[currentChallenge]}
          onComplete={handleChallengeComplete}
          onFail={handleChallengeFail}
          onClose={handleChallengeClose}
          isMuted={isMuted}
          attemptsLeft={MAX_ATTEMPTS - dailyAttempts}
        />
      )}
    </div>
  );
};

export default App;