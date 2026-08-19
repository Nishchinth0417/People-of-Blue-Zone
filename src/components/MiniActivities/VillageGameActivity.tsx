import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface DominoTile {
  id: number;
  left: number;
  right: number;
  played: boolean;
}

interface Props {
  onComplete: (bonus: number) => void;
}

export const VillageGameActivity: React.FC<Props> = ({ onComplete }) => {
  const [boardTiles, setBoardTiles] = useState<{ left: number; right: number }[]>([
    { left: 4, right: 6 },
    { left: 6, right: 2 }
  ]);

  const [playerHand, setPlayerHand] = useState<DominoTile[]>([
    { id: 1, left: 2, right: 5, played: false },
    { id: 2, left: 3, right: 4, played: false },
    { id: 3, left: 5, right: 5, played: false },
    { id: 4, left: 1, right: 4, played: false }
  ]);

  const [score, setScore] = useState<number>(0);
  const [dialogue, setDialogue] = useState<string>('Pietro laughs: "Play your tile, my friend! Let us see if your mind is as sharp as your appetite!"');

  const playTile = (tile: DominoTile) => {
    soundManager.playChoiceChime();
    setBoardTiles([...boardTiles, { left: tile.left, right: tile.right }]);
    setPlayerHand(playerHand.map(t => t.id === tile.id ? { ...t, played: true } : t));
    setScore(prev => prev + 1);

    if (score + 1 >= 2) {
      setDialogue('Lucia claps her hands: "Magnifico! A masterful play! Nothing keeps the mind young like good company and friendly games!"');
    } else {
      setDialogue('Pietro scratches his chin smiling: "Oho! A clever tactical move! Well played!"');
    }
  };

  const isCompleted = score >= 2;

  return (
    <div className="bg-white text-[#1A1A1A] p-6 border border-[#1A1A1A] max-w-xl mx-auto my-2 shadow-xs">
      <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3 mb-4">
        <div>
          <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#5A5A40] block font-sans">
            Social Moai & Cognitive Agility
          </span>
          <h3 className="serif text-2xl font-light italic text-[#1A1A1A]">Piazza Dominoes</h3>
        </div>
        <span className="text-[9px] uppercase font-mono tracking-widest text-[#C27D56] font-bold">
          Round: {score} / 2
        </span>
      </div>

      {/* Villagers commentary */}
      <div className="bg-[#FDFBF7] p-4 border border-[#1A1A1A] mb-4 flex items-start gap-3">
        <span className="text-xl">👴</span>
        <div>
          <p className="serif text-base italic text-[#1A1A1A]">"{dialogue}"</p>
          <span className="text-[9px] uppercase tracking-wider text-[#1A1A1A]/60 mt-1 block font-sans">
            — Pietro (89) & Lucia (84), lifelong village friends
          </span>
        </div>
      </div>

      {/* Domino Table Board */}
      <div className="bg-[#E2D1C3]/30 border border-[#1A1A1A] p-4 mb-4 flex items-center justify-center gap-2 min-h-[64px] overflow-x-auto">
        {boardTiles.map((tile, idx) => (
          <div key={idx} className="bg-white text-[#1A1A1A] px-3 py-1.5 font-mono font-bold text-xs border border-[#1A1A1A] flex items-center gap-1 shadow-xs">
            <span>{tile.left}</span>
            <span className="text-[#1A1A1A]/40">|</span>
            <span>{tile.right}</span>
          </div>
        ))}
      </div>

      {/* Player's Hand */}
      <div className="mb-4">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A]/60 block font-sans mb-2">
          Your Tiles in Hand:
        </span>
        <div className="flex flex-wrap gap-2">
          {playerHand.map((tile) => (
            <button
              key={tile.id}
              disabled={tile.played}
              type="button"
              onClick={() => playTile(tile)}
              className={`px-4 py-2 font-mono text-xs font-bold border transition-all flex items-center gap-1.5 ${
                tile.played 
                  ? 'bg-[#FDFBF7] text-[#1A1A1A]/30 border-[#1A1A1A]/20 cursor-not-allowed'
                  : 'bg-white hover:bg-[#E2D1C3]/40 text-[#1A1A1A] border-[#1A1A1A] cursor-pointer'
              }`}
            >
              <span>{tile.left}</span>
              <span className="text-[#C27D56]">|</span>
              <span>{tile.right}</span>
              {tile.played && <Check className="w-3 h-3 text-[#1A1A1A]/40 ml-1" />}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-[#1A1A1A] pt-4 flex items-center justify-between font-sans">
        <p className="text-[11px] text-[#1A1A1A]/70 italic serif">
          Shared games stimulate neural plasticity and release stress-reducing oxytocin.
        </p>
        <button
          type="button"
          disabled={!isCompleted}
          onClick={() => {
            soundManager.playChoiceChime();
            onComplete(20);
          }}
          className="px-5 py-2.5 bg-[#1A1A1A] text-[#FDFBF7] hover:bg-[#C27D56] text-[10px] uppercase font-bold tracking-[0.2em] transition-all cursor-pointer disabled:opacity-40"
        >
          Celebrate Match
        </button>
      </div>
    </div>
  );
};
