import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { generateTileKey, isTileRevealed } from '../utils/helpers';
import Tile from './Tile';

const GameBoard = ({ revealedTiles, backgroundImage, onTileClick, currentNextTile }) => {
  const gridSize = 4;

  return (
    <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-3xl overflow-hidden w-full max-w-6xl mx-auto border-8 md:border-8 border-pink-300/50 my-12 md:my-12 kitty-border">
      <img
        src={backgroundImage}
        alt="Imagen misteriosa de Roxi"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        style={{ filter: 'blur(4px)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-rose-400/20 kitty-overlay" />
      
      <div 
        className="relative grid grid-cols-4 gap-2 sm:gap-3 md:gap-6 p-4 sm:p-6 md:p-12 aspect-square w-full max-h-[50vh] sm:max-h-[60vh] md:max-h-[800px]" 
        style={{ gridTemplateRows: 'repeat(4, 1fr)' }}
      >
        {Array.from({ length: gridSize * gridSize }, (_, index) => {
          const row = Math.floor(index / gridSize);
          const col = index % gridSize;
          const key = generateTileKey(row, col);
          const isRevealed = isTileRevealed(revealedTiles, row, col);
          const isNext = currentNextTile && row === currentNextTile[0] && col === currentNextTile[1];

          return (
            <Tile
              key={key}
              row={row}
              col={col}
              isRevealed={isRevealed}
              isNext={isNext}
              onClick={!isRevealed && isNext ? () => onTileClick(row, col) : undefined}
              size="extra-large"
            />
          );
        })}
      </div>

      {currentNextTile && (
        <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-pink-400 text-black px-8 py-4 rounded-2xl text-lg font-bold shadow-2xl flex items-center gap-3 border-4 border-yellow-300/50"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Sparkles className="w-6 h-6 animate-spin" />
          ¡Toca esta pieza para el reto! 😻
        </motion.div>
      )}
    </div>
  );
};

export default GameBoard;