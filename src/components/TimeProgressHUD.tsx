import React from 'react';
import { TimeOfDay, WellbeingStats } from '../types';
import { 
  Sun, 
  Moon, 
  Volume2, 
  VolumeX, 
  Footprints, 
  Users, 
  Sparkles, 
  Salad, 
  Smile, 
  ShieldAlert, 
  HeartHandshake, 
  Layers
} from 'lucide-react';

interface Props {
  currentTime: TimeOfDay;
  stats: WellbeingStats;
  isMuted: boolean;
  showUrbanLens: boolean;
  onToggleMute: () => void;
  onToggleUrbanLens: () => void;
}

const TIMELINE_STEPS: { time: TimeOfDay; label: string }[] = [
  { time: '07:00', label: 'Dawn Awakening' },
  { time: '08:00', label: 'Breakfast' },
  { time: '09:30', label: 'Village Walk' },
  { time: '11:00', label: 'Purpose Task' },
  { time: '13:00', label: 'Midday Meal' },
  { time: '15:00', label: 'Free Time & Rest' },
  { time: '17:30', label: 'Piazza Gathering' },
  { time: '19:30', label: 'Sunset Dinner' },
  { time: '21:00', label: 'Evening Reflection' },
  { time: '22:00', label: 'Night Slumber' },
];

export const TimeProgressHUD: React.FC<Props> = ({
  currentTime,
  stats,
  isMuted,
  showUrbanLens,
  onToggleMute,
  onToggleUrbanLens
}) => {
  const currentIndex = TIMELINE_STEPS.findIndex(s => s.time === currentTime);
  const currentStep = TIMELINE_STEPS[currentIndex] || TIMELINE_STEPS[0];
  const isNight = currentTime === '21:00' || currentTime === '22:00';

  return (
    <header className="bg-[#FDFBF7] border-b border-[#1A1A1A] text-[#1A1A1A] px-4 sm:px-8 py-3.5 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Editorial Time & Current Objective */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 border border-[#1A1A1A] bg-[#FDFBF7] flex items-center justify-center text-[#1A1A1A]">
              {isNight ? <Moon className="w-4 h-4 text-[#5A5A40]" /> : <Sun className="w-4 h-4 text-[#C27D56]" />}
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A]/60 block font-sans">
                Life Simulation · {currentTime}
              </span>
              <h2 className="serif text-xl sm:text-2xl font-light italic text-[#1A1A1A] leading-tight">
                {currentStep.label}
              </h2>
            </div>
          </div>

          {/* Timeline Phase Indicator */}
          <div className="hidden xl:flex items-center gap-1 border-l border-[#1A1A1A]/20 pl-4">
            <span className="text-[9px] uppercase tracking-[0.15em] font-bold text-[#1A1A1A]/50 mr-2">Phase</span>
            {TIMELINE_STEPS.map((step, idx) => {
              const isPast = idx < currentIndex;
              const isCurrent = idx === currentIndex;
              return (
                <div
                  key={step.time}
                  title={`${step.time} · ${step.label}`}
                  className={`h-1.5 transition-all ${
                    isCurrent
                      ? 'w-6 bg-[#C27D56]'
                      : isPast
                      ? 'w-2 bg-[#5A5A40]'
                      : 'w-2 bg-[#1A1A1A]/15'
                  }`}
                />
              );
            })}
          </div>

          {/* Controls: Audio & Urban Lens */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleMute}
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              className="p-2 border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FDFBF7] text-[#1A1A1A] transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 opacity-40" /> : <Volume2 className="w-3.5 h-3.5 text-[#C27D56]" />}
            </button>

            <button
              type="button"
              onClick={onToggleUrbanLens}
              title="Toggle Urban Planning Analysis"
              className={`px-3 py-1.5 border border-[#1A1A1A] text-[10px] uppercase font-bold tracking-widest transition-all cursor-pointer flex items-center gap-1.5 ${
                showUrbanLens
                  ? 'bg-[#5A5A40] text-[#FDFBF7]'
                  : 'bg-[#FDFBF7] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FDFBF7]'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span className="hidden sm:inline">Urban Lens</span>
            </button>
          </div>
        </div>

        {/* Right: Editorial Live Wellbeing Meters */}
        <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          
          {/* Movement */}
          <div className="bg-[#FDFBF7] border border-[#1A1A1A] px-2.5 py-1 min-w-[76px] flex flex-col justify-between" title="Movement: Natural physical activity">
            <div className="flex justify-between items-center text-[9px] uppercase tracking-wider font-bold text-[#1A1A1A]/70 mb-0.5">
              <span>Move</span>
              <span className="font-mono text-[10px] text-[#1A1A1A]">{stats.movement}</span>
            </div>
            <div className="h-[2px] w-full bg-[#1A1A1A]/10">
              <div className="h-full bg-[#5A5A40] transition-all duration-500" style={{ width: `${Math.min(stats.movement, 100)}%` }} />
            </div>
          </div>

          {/* Social */}
          <div className="bg-[#FDFBF7] border border-[#1A1A1A] px-2.5 py-1 min-w-[76px] flex flex-col justify-between" title="Social Connection: Moai bonds">
            <div className="flex justify-between items-center text-[9px] uppercase tracking-wider font-bold text-[#1A1A1A]/70 mb-0.5">
              <span>Social</span>
              <span className="font-mono text-[10px] text-[#1A1A1A]">{stats.social}</span>
            </div>
            <div className="h-[2px] w-full bg-[#1A1A1A]/10">
              <div className="h-full bg-[#C27D56] transition-all duration-500" style={{ width: `${Math.min(stats.social, 100)}%` }} />
            </div>
          </div>

          {/* Purpose */}
          <div className="bg-[#FDFBF7] border border-[#1A1A1A] px-2.5 py-1 min-w-[76px] flex flex-col justify-between" title="Purpose: Ikigai & Plan de Vida">
            <div className="flex justify-between items-center text-[9px] uppercase tracking-wider font-bold text-[#1A1A1A]/70 mb-0.5">
              <span>Purpose</span>
              <span className="font-mono text-[10px] text-[#1A1A1A]">{stats.purpose}</span>
            </div>
            <div className="h-[2px] w-full bg-[#1A1A1A]/10">
              <div className="h-full bg-[#1A1A1A] transition-all duration-500" style={{ width: `${Math.min(stats.purpose, 100)}%` }} />
            </div>
          </div>

          {/* Food */}
          <div className="bg-[#FDFBF7] border border-[#1A1A1A] px-2.5 py-1 min-w-[76px] flex flex-col justify-between" title="Nourishment: Plant-slant & 80% rule">
            <div className="flex justify-between items-center text-[9px] uppercase tracking-wider font-bold text-[#1A1A1A]/70 mb-0.5">
              <span>Food</span>
              <span className="font-mono text-[10px] text-[#1A1A1A]">{stats.food}</span>
            </div>
            <div className="h-[2px] w-full bg-[#1A1A1A]/10">
              <div className="h-full bg-[#5A5A40] transition-all duration-500" style={{ width: `${Math.min(stats.food, 100)}%` }} />
            </div>
          </div>

          {/* Joy */}
          <div className="bg-[#FDFBF7] border border-[#1A1A1A] px-2.5 py-1 min-w-[76px] flex flex-col justify-between" title="Happiness & Serenity">
            <div className="flex justify-between items-center text-[9px] uppercase tracking-wider font-bold text-[#1A1A1A]/70 mb-0.5">
              <span>Joy</span>
              <span className="font-mono text-[10px] text-[#1A1A1A]">{stats.happiness}</span>
            </div>
            <div className="h-[2px] w-full bg-[#1A1A1A]/10">
              <div className="h-full bg-[#C27D56] transition-all duration-500" style={{ width: `${Math.min(stats.happiness, 100)}%` }} />
            </div>
          </div>

          {/* Stress */}
          <div className="bg-[#FDFBF7] border border-[#1A1A1A] px-2.5 py-1 min-w-[76px] flex flex-col justify-between" title="Stress Strain (Lower is calmer)">
            <div className="flex justify-between items-center text-[9px] uppercase tracking-wider font-bold text-[#1A1A1A]/70 mb-0.5">
              <span>Stress</span>
              <span className="font-mono text-[10px] text-[#1A1A1A]">{stats.stress}</span>
            </div>
            <div className="h-[2px] w-full bg-[#1A1A1A]/10">
              <div className="h-full bg-[#1A1A1A]/60 transition-all duration-500" style={{ width: `${Math.min(stats.stress, 100)}%` }} />
            </div>
          </div>

          {/* Civic */}
          <div className="bg-[#FDFBF7] border border-[#1A1A1A] px-2.5 py-1 min-w-[76px] flex flex-col justify-between" title="Community Belonging">
            <div className="flex justify-between items-center text-[9px] uppercase tracking-wider font-bold text-[#1A1A1A]/70 mb-0.5">
              <span>Civic</span>
              <span className="font-mono text-[10px] text-[#1A1A1A]">{stats.community}</span>
            </div>
            <div className="h-[2px] w-full bg-[#1A1A1A]/10">
              <div className="h-full bg-[#5A5A40] transition-all duration-500" style={{ width: `${Math.min(stats.community, 100)}%` }} />
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};
