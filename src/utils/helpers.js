export const generateTileKey = (row, col) => `${row}-${col}`;

export const isTileRevealed = (revealedTiles, row, col) => revealedTiles.some(([r, c]) => r === row && c === col);

export const saveProgress = (revealedTiles, currentChallenge) => {
  localStorage.setItem('roxiProgress', JSON.stringify({ revealedTiles, currentChallenge }));
};

export const loadProgress = () => {
  try {
    const saved = localStorage.getItem('roxiProgress');
    return saved ? JSON.parse(saved) : { revealedTiles: [], currentChallenge: 0 };
  } catch (e) {
    console.warn('Error cargando progreso, iniciando nuevo:', e);
    return { revealedTiles: [], currentChallenge: 0 };
  }
};

export const loadDailyAttempts = () => {
  try {
    const today = new Date().toDateString();
    const saved = localStorage.getItem('roxiDailyAttempts');
    if (!saved) return { count: 0, exceeded: false };

    const data = JSON.parse(saved);
    if (data.date !== today) {
      localStorage.removeItem('roxiDailyAttempts');
      return { count: 0, exceeded: false };
    }
    return { count: data.count, exceeded: data.count >= 5 };
  } catch (e) {
    return { count: 0, exceeded: false };
  }
};

export const saveDailyAttempt = (newCount) => {
  const today = new Date().toDateString();
  localStorage.setItem('roxiDailyAttempts', JSON.stringify({ date: today, count: newCount }));
};

export const playSound = (type, isMuted) => {
  if (isMuted) return;
  try {
    const audio = new Audio(`/sounds/${type}.mp3`);
    audio.volume = 0.6;
    audio.play().catch(() => {});
  } catch (e) {
    // Silencioso si no hay audio
  }
};

export const triggerConfetti = (duration = 5000) => {
  for (let i = 0; i < 50; i++) {
    const confettiPiece = document.createElement('div');
    confettiPiece.innerHTML = '🎀✨⭐';
    confettiPiece.style.cssText = `
      position: fixed; left: ${Math.random() * 100}vw; top: -10px; width: 10px; height: 10px; 
      pointer-events: none; z-index: 9999; font-size: 12px; animation: confetti-fall ${3 + Math.random() * 2}s linear infinite;
      transform: rotate(${Math.random() * 360}deg);
      color: ${['#ff69b4', '#ffd700', '#ff1493', '#dda0dd'][Math.floor(Math.random() * 4)]};
    `;
    document.body.appendChild(confettiPiece);
    setTimeout(() => confettiPiece.remove(), duration);
  }
};