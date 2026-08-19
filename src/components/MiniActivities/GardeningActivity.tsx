import React, { useState } from 'react';
import { Award, Droplets, Scissors, Check } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface PlotItem {
  id: number;
  plantName: string;
  stage: 'dry' | 'growing' | 'ripe' | 'harvested';
  icon: string;
  benefit: string;
}

interface Props {
  onComplete: (bonus: number) => void;
}

export const GardeningActivity: React.FC<Props> = ({ onComplete }) => {
  const [plots, setPlots] = useState<PlotItem[]>([
    { id: 1, plantName: 'San Marzano Tomatoes', stage: 'ripe', icon: '🍅', benefit: 'High in lycopene' },
    { id: 2, plantName: 'Ancient Fava Beans', stage: 'ripe', icon: '🫘', benefit: 'Nitrogen-fixing plant protein' },
    { id: 3, plantName: 'Mountain Oregano', stage: 'growing', icon: '🌿', benefit: 'Potent antimicrobial phenols' },
    { id: 4, plantName: 'Purple Sweet Potato', stage: 'ripe', icon: '🍠', benefit: 'Complex slow-burn fuel' },
    { id: 5, plantName: 'Tuscan Lacinato Kale', stage: 'growing', icon: '🥬', benefit: 'High vitamin K & calcium' },
    { id: 6, plantName: 'Greek Rosemary', stage: 'ripe', icon: '🌱', benefit: 'Carnosic acid brain protector' }
  ]);

  const [harvestCount, setHarvestCount] = useState<number>(0);
  const [tool, setTool] = useState<'water' | 'prune' | 'harvest'>('harvest');

  const handleInteract = (plot: PlotItem) => {
    soundManager.playStepSound();
    if (plot.stage === 'harvested') return;

    if (tool === 'harvest' && plot.stage === 'ripe') {
      soundManager.playChoiceChime();
      setPlots(plots.map(p => p.id === plot.id ? { ...p, stage: 'harvested' } : p));
      setHarvestCount(prev => prev + 1);
    } else if (tool === 'water' && plot.stage === 'growing') {
      soundManager.playBirdChirp();
      setPlots(plots.map(p => p.id === plot.id ? { ...p, stage: 'ripe' } : p));
    } else if (tool === 'prune') {
      soundManager.playStepSound();
      setPlots(plots.map(p => p.id === plot.id ? { ...p, stage: 'ripe' } : p));
    }
  };

  const isFinished = harvestCount >= 3;

  return (
    <div className="bg-white text-[#1A1A1A] p-6 border border-[#1A1A1A] max-w-xl mx-auto my-2 shadow-xs">
      <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3 mb-4">
        <div>
          <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#5A5A40] block font-sans">
            Everyday Movement & Stewardship
          </span>
          <h3 className="serif text-2xl font-light italic text-[#1A1A1A]">Community Allotment</h3>
        </div>
        <div className="text-right">
          <span className="text-[9px] uppercase tracking-widest font-mono text-[#5A5A40] font-bold">
            Harvested: {harvestCount} / 3
          </span>
        </div>
      </div>

      {/* Tool Selector */}
      <div className="flex items-center gap-2 mb-4 font-sans">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A]/60">Tool:</span>
        <button
          type="button"
          onClick={() => { setTool('harvest'); soundManager.playStepSound(); }}
          className={`px-3 py-1 text-[10px] uppercase font-bold tracking-widest border transition-all cursor-pointer ${
            tool === 'harvest' ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white border-[#1A1A1A]/20 hover:border-[#1A1A1A]'
          }`}
        >
          Basket
        </button>
        <button
          type="button"
          onClick={() => { setTool('water'); soundManager.playStepSound(); }}
          className={`px-3 py-1 text-[10px] uppercase font-bold tracking-widest border transition-all cursor-pointer ${
            tool === 'water' ? 'bg-[#5A5A40] text-white border-[#5A5A40]' : 'bg-white border-[#1A1A1A]/20 hover:border-[#1A1A1A]'
          }`}
        >
          Watering Can
        </button>
        <button
          type="button"
          onClick={() => { setTool('prune'); soundManager.playStepSound(); }}
          className={`px-3 py-1 text-[10px] uppercase font-bold tracking-widest border transition-all cursor-pointer ${
            tool === 'prune' ? 'bg-[#C27D56] text-white border-[#C27D56]' : 'bg-white border-[#1A1A1A]/20 hover:border-[#1A1A1A]'
          }`}
        >
          Pruning Shears
        </button>
      </div>

      {/* Garden Plots Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-5">
        {plots.map((plot) => (
          <button
            key={plot.id}
            type="button"
            onClick={() => handleInteract(plot)}
            className={`p-3 border flex flex-col items-center justify-center text-center transition-all cursor-pointer relative ${
              plot.stage === 'harvested'
                ? 'bg-[#FDFBF7] border-[#1A1A1A]/10 opacity-50'
                : plot.stage === 'ripe'
                ? 'bg-[#E2D1C3]/30 border-[#1A1A1A] hover:bg-[#E2D1C3]/60'
                : 'bg-white border-[#1A1A1A]/20 hover:border-[#1A1A1A]'
            }`}
          >
            <span className="text-2xl mb-1 select-none">
              {plot.stage === 'harvested' ? '🧺' : plot.icon}
            </span>
            <p className="text-xs font-serif italic text-[#1A1A1A] line-clamp-1">{plot.plantName}</p>
            <span className="text-[9px] uppercase font-bold tracking-wider text-[#5A5A40] mt-0.5 font-sans">
              {plot.stage === 'harvested' ? 'Harvested' : plot.stage === 'ripe' ? 'Ready to pick' : 'Needs water'}
            </span>
            {plot.stage === 'harvested' && (
              <div className="absolute top-1.5 right-1.5 bg-[#5A5A40] text-white p-0.5 rounded-full">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-[#1A1A1A] pt-4 font-sans">
        <p className="text-[11px] text-[#1A1A1A]/70 italic serif">
          Squatting, soil microbiome exposure & natural sunlight cultivate vitality.
        </p>
        <button
          type="button"
          disabled={!isFinished}
          onClick={() => {
            soundManager.playChoiceChime();
            onComplete(18);
          }}
          className="px-5 py-2.5 bg-[#1A1A1A] text-[#FDFBF7] hover:bg-[#C27D56] text-[10px] uppercase font-bold tracking-[0.2em] transition-all cursor-pointer disabled:opacity-40"
        >
          Complete Care
        </button>
      </div>
    </div>
  );
};
