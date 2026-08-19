import React, { useEffect } from 'react';
import { WellbeingStats, CharacterProfile } from '../types';
import { 
  Footprints, 
  Users, 
  Sparkles, 
  Salad, 
  Smile, 
  ShieldAlert, 
  HeartHandshake, 
  Globe2, 
  Layers, 
  RotateCcw, 
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  character: CharacterProfile;
  stats: WellbeingStats;
  onExploreWorldMap: () => void;
  onExploreUrbanLens: () => void;
  onPlayAgain: () => void;
}

export const WellbeingReport: React.FC<Props> = ({
  character,
  stats,
  onExploreWorldMap,
  onExploreUrbanLens,
  onPlayAgain
}) => {
  useEffect(() => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#C27D56', '#5A5A40', '#E2D1C3', '#1A1A1A']
      });
    } catch {
      // safe fallback
    }
  }, []);

  const overallScore = Math.round(
    (stats.movement + stats.social + stats.purpose + stats.food + stats.happiness + (100 - stats.stress) + stats.community) / 7
  );

  const getProfileArchetype = (s: WellbeingStats) => {
    if (s.social >= 75 && s.community >= 75) return {
      title: 'The Piazza Pillar & Moai Guardian',
      desc: 'Your day was anchored in vibrant human connections, shared games, and intergenerational mutual aid.'
    };
    if (s.movement >= 75 && s.food >= 75) return {
      title: 'The Terraced Hillside Naturalist',
      desc: 'Steep cobblestones, whole plant foods, and effortless daily movement defined your high-vitality day.'
    };
    if (s.purpose >= 75) return {
      title: 'The Purpose-Driven Artisan (Ikigai Bearer)',
      desc: 'You woke with a clear reason for being, contributing craftsmanship and guidance to the next generation.'
    };
    return {
      title: 'The Harmonious Centenarian',
      desc: 'A beautifully balanced life with gentle movement, garden nutrition, low stress, and deep social warmth.'
    };
  };

  const archetype = getProfileArchetype(stats);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      
      {/* Editorial Report Sheet */}
      <div className="bg-white border border-[#1A1A1A] p-6 sm:p-12 shadow-sm space-y-8">
        
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-[#1A1A1A] pb-6 gap-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#1A1A1A]/60 block font-sans">
              Daily Ledger · Longevity Dossier
            </span>
            <h1 className="serif text-4xl sm:text-5xl font-light italic text-[#1A1A1A]">
              Wellbeing Assessment
            </h1>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A]/60 block font-sans">
              Vitality Index
            </span>
            <div className="serif text-3xl italic text-[#C27D56] font-normal">
              {overallScore} <span className="text-base text-[#1A1A1A]/50">/ 100</span>
            </div>
          </div>
        </header>

        {/* Resident Summary Banner */}
        <div className="bg-[#FDFBF7] p-6 border border-[#1A1A1A] space-y-2">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#5A5A40] block font-sans">
            Archetype Classification
          </span>
          <h3 className="serif text-2xl sm:text-3xl font-light italic text-[#1A1A1A]">
            {archetype.title}
          </h3>
          <p className="text-sm text-[#1A1A1A]/75 font-sans leading-relaxed">
            {archetype.desc}
          </p>
        </div>

        {/* 7 Core Dimensions (Editorial 2px Bars) */}
        <div className="space-y-4">
          <h2 className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#1A1A1A] border-b border-[#1A1A1A]/10 pb-2 font-sans">
            Seven Pillars of Village Vitality
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 pt-2">
            
            {/* Movement */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A]/80 font-sans">
                <span>Natural Movement</span>
                <span>{stats.movement}</span>
              </div>
              <div className="h-[2px] w-full bg-[#1A1A1A]/10">
                <div className="h-full bg-[#5A5A40]" style={{ width: `${stats.movement}%` }} />
              </div>
              <span className="text-[10px] text-[#1A1A1A]/50 font-serif italic block">Steep village lanes & garden tasks</span>
            </div>

            {/* Social */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A]/80 font-sans">
                <span>Social Moai Bonds</span>
                <span>{stats.social}</span>
              </div>
              <div className="h-[2px] w-full bg-[#1A1A1A]/10">
                <div className="h-full bg-[#C27D56]" style={{ width: `${stats.social}%` }} />
              </div>
              <span className="text-[10px] text-[#1A1A1A]/50 font-serif italic block">Piazza games & shared afternoon conversation</span>
            </div>

            {/* Purpose */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A]/80 font-sans">
                <span>Ikigai (Purpose)</span>
                <span>{stats.purpose}</span>
              </div>
              <div className="h-[2px] w-full bg-[#1A1A1A]/10">
                <div className="h-full bg-[#1A1A1A]" style={{ width: `${stats.purpose}%` }} />
              </div>
              <span className="text-[10px] text-[#1A1A1A]/50 font-serif italic block">Active contribution to village life</span>
            </div>

            {/* Food */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A]/80 font-sans">
                <span>Nourishment & 80% Rule</span>
                <span>{stats.food}</span>
              </div>
              <div className="h-[2px] w-full bg-[#1A1A1A]/10">
                <div className="h-full bg-[#5A5A40]" style={{ width: `${stats.food}%` }} />
              </div>
              <span className="text-[10px] text-[#1A1A1A]/50 font-serif italic block">Plant-slant legumes, greens & olive oil</span>
            </div>

            {/* Joy */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A]/80 font-sans">
                <span>Joy & Serenity</span>
                <span>{stats.happiness}</span>
              </div>
              <div className="h-[2px] w-full bg-[#1A1A1A]/10">
                <div className="h-full bg-[#C27D56]" style={{ width: `${stats.happiness}%` }} />
              </div>
              <span className="text-[10px] text-[#1A1A1A]/50 font-serif italic block">Unrushed lifestyle and daily laughter</span>
            </div>

            {/* Stress (Calm) */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A]/80 font-sans">
                <span>Downshift / Stress Relief</span>
                <span>{100 - stats.stress}</span>
              </div>
              <div className="h-[2px] w-full bg-[#1A1A1A]/10">
                <div className="h-full bg-[#5A5A40]" style={{ width: `${100 - stats.stress}%` }} />
              </div>
              <span className="text-[10px] text-[#1A1A1A]/50 font-serif italic block">Midday rest and herbal tea wind-down</span>
            </div>

          </div>
        </div>

        {/* Editorial Journal Quote */}
        <div className="pt-6 border-t border-[#1A1A1A]/10 space-y-2">
          <p className="serif text-xl italic text-[#1A1A1A] leading-relaxed">
            "The secret of the centenarians isn't a miraculous pill or strict gym regimen. It is an environment where the healthiest choices are the easiest, most joyful everyday rituals."
          </p>
          <p className="text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A]/60 font-sans">
            — Dan Buettner, The Blue Zones
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-[#1A1A1A] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onPlayAgain}
            className="w-full sm:w-auto px-6 py-3 border border-[#1A1A1A] text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FDFBF7] transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Relive A New Day</span>
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={onExploreUrbanLens}
              className="w-full sm:w-auto px-6 py-3 border border-[#1A1A1A] text-[10px] uppercase font-bold tracking-widest text-[#5A5A40] hover:bg-[#5A5A40] hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Urban Planning Matrix</span>
            </button>

            <button
              type="button"
              onClick={onExploreWorldMap}
              className="w-full sm:w-auto px-8 py-3 bg-[#1A1A1A] text-[#FDFBF7] text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-[#C27D56] transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Explore 5 Real Blue Zones</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
