import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

const SoundToggle = ({ isMuted, onToggle }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.log("El navegador bloqueó la reproducción automática:", err);
        });
      }
    }
  }, [isMuted]);

  return (
    <>
      {/* Botón */}
      <motion.button
        onClick={onToggle}
        className="fixed top-4 right-4 p-3 bg-pink-100 rounded-full hover:bg-pink-200 transition-colors z-10 shadow-lg border border-pink-200"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-gray-500" />
        ) : (
          <Volume2 className="w-5 h-5 text-pink-500" />
        )}
      </motion.button>

      {/* Audio oculto */}
      <audio ref={audioRef} loop src="/music.mp3" />
    </>
  );
};

export default SoundToggle;
