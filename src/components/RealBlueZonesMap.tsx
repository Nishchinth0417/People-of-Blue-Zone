import React, { useState } from 'react';
import { BLUE_ZONE_REGIONS, POWER_9_PRINCIPLES } from '../data/blueZonesData';
import { BlueZoneRegion } from '../types';
import { 
  Globe2, 
  MapPin, 
  Sparkles, 
  ArrowLeft, 
  Layers, 
  Quote
} from 'lucide-react';
import { soundManager } from '../utils/audio';

interface Props {
  onBackToGame: () => void;
  onOpenUrbanPlanning: () => void;
}

export const RealBlueZonesMap: React.FC<Props> = ({
  onBackToGame,
  onOpenUrbanPlanning
}) => {
  const [selectedZone, setSelectedZone] = useState<BlueZoneRegion>(BLUE_ZONE_REGIONS[0]);
  const [activeTab, setActiveTab] = useState<'zones' | 'power9'>('zones');
  const [selectedPrinciple, setSelectedPrinciple] = useState(POWER_9_PRINCIPLES[0]);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 bg-white p-6 sm:p-8 border border-[#1A1A1A] shadow-sm">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#1A1A1A]/60 block font-sans">
            Global Geographic Field Guide
          </span>
          <h1 className="serif text-3xl sm:text-5xl font-light italic text-[#1A1A1A] mt-1">
            The Five Real Blue Zones
          </h1>
          <p className="text-sm text-[#1A1A1A]/70 mt-1 max-w-2xl font-sans">
            Regions where people reach age 100 at up to 10 times greater rates than in the rest of the developed world.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={onOpenUrbanPlanning}
            className="flex-1 sm:flex-none px-4 py-2.5 border border-[#1A1A1A] text-[#5A5A40] text-[10px] uppercase font-bold tracking-widest hover:bg-[#5A5A40] hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Urban Lens</span>
          </button>
          <button
            type="button"
            onClick={onBackToGame}
            className="flex-1 sm:flex-none px-5 py-2.5 bg-[#1A1A1A] text-[#FDFBF7] text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-[#C27D56] transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Village</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#1A1A1A] gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('zones')}
          className={`px-6 py-3 text-[10px] uppercase font-bold tracking-[0.2em] border-t border-l border-r border-[#1A1A1A] -mb-[1px] transition-all cursor-pointer ${
            activeTab === 'zones'
              ? 'bg-white text-[#1A1A1A] border-b-white'
              : 'bg-[#FDFBF7] text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
          }`}
        >
          1. Geographic Atlas (5 Zones)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('power9')}
          className={`px-6 py-3 text-[10px] uppercase font-bold tracking-[0.2em] border-t border-l border-r border-[#1A1A1A] -mb-[1px] transition-all cursor-pointer ${
            activeTab === 'power9'
              ? 'bg-white text-[#1A1A1A] border-b-white'
              : 'bg-[#FDFBF7] text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
          }`}
        >
          2. The Power 9® Principles
        </button>
      </div>

      {/* VIEW 1: ZONES MAP */}
      {activeTab === 'zones' && (
        <div className="space-y-6">
          {/* Global SVG Map Canvas */}
          <div className="relative w-full aspect-[2/1] min-h-[300px] bg-[#E2D1C3]/30 border border-[#1A1A1A] overflow-hidden shadow-sm">
            <svg className="w-full h-full" viewBox="0 0 1000 500" preserveAspectRatio="none">
              <rect width="1000" height="500" fill="#FDFBF7" />
              
              {/* World Map Land Mass Silhouettes */}
              <path
                d="M 120,90 Q 220,70 300,100 T 260,240 T 150,220 Z M 200,260 Q 280,280 270,420 T 190,380 Z M 480,80 Q 560,70 600,140 T 520,180 Z M 480,190 Q 580,220 560,390 T 460,320 Z M 600,80 Q 820,70 880,180 T 720,240 T 620,180 Z M 760,300 Q 860,290 850,420 T 740,380 Z"
                fill="#EDE6DE"
                stroke="#1A1A1A"
                strokeWidth="1"
                strokeOpacity="0.3"
              />

              {/* Equator & Latitudinal Grid Lines */}
              <line x1="0" y1="250" x2="1000" y2="250" stroke="#1A1A1A" strokeWidth="0.5" strokeDasharray="6 6" opacity="0.2" />
              <line x1="500" y1="0" x2="500" y2="500" stroke="#1A1A1A" strokeWidth="0.5" strokeDasharray="6 6" opacity="0.2" />

              {/* Interactive Zone Markers */}
              {BLUE_ZONE_REGIONS.map((zone) => {
                const isSelected = selectedZone.id === zone.id;
                const coords: Record<string, { cx: number; cy: number }> = {
                  okinawa: { cx: 810, cy: 195 },
                  sardinia: { cx: 505, cy: 165 },
                  ikaria: { cx: 540, cy: 175 },
                  nicoya: { cx: 245, cy: 245 },
                  loma_linda: { cx: 175, cy: 165 },
                };
                const pos = coords[zone.id] || { cx: 500, cy: 250 };

                return (
                  <g
                    key={zone.id}
                    className="cursor-pointer"
                    onClick={() => {
                      soundManager.playStepSound();
                      setSelectedZone(zone);
                    }}
                  >
                    {isSelected && (
                      <circle cx={pos.cx} cy={pos.cy} r="18" fill="none" stroke="#C27D56" strokeWidth="1.5" className="animate-ping" opacity="0.6" />
                    )}
                    <circle
                      cx={pos.cx}
                      cy={pos.cy}
                      r={isSelected ? "9" : "6"}
                      fill={isSelected ? "#C27D56" : "#5A5A40"}
                      stroke="#1A1A1A"
                      strokeWidth="1.5"
                    />
                    <text
                      x={pos.cx}
                      y={pos.cy - 12}
                      textAnchor="middle"
                      fill="#1A1A1A"
                      fontSize="10"
                      fontFamily="Inter, sans-serif"
                      fontWeight="bold"
                      letterSpacing="0.1em"
                    >
                      {zone.name.toUpperCase()}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Detailed Zone Card */}
          <div className="bg-white border border-[#1A1A1A] p-6 sm:p-10 shadow-sm space-y-6">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-[#1A1A1A] pb-4 gap-2">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#5A5A40] block font-sans">
                  {zoneCountryLabel(selectedZone.country)} · Longevity Hotspot
                </span>
                <h2 className="serif text-3xl sm:text-4xl font-light italic text-[#1A1A1A] mt-0.5">
                  {selectedZone.name}
                </h2>
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A]/60 font-sans">
                {selectedZone.tagline}
              </span>
            </div>

            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed font-sans">
              {selectedZone.landscapeDescription}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              
              {/* Longevity Secrets */}
              <div className="bg-[#FDFBF7] p-5 border border-[#1A1A1A] space-y-2">
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#C27D56] block font-sans">
                  Longevity Secrets
                </span>
                <ul className="text-xs text-[#1A1A1A]/80 space-y-1.5 font-sans">
                  {selectedZone.coreSecrets.map((s, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#C27D56] mt-1.5 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Staple Foods */}
              <div className="bg-[#FDFBF7] p-5 border border-[#1A1A1A] space-y-2">
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#5A5A40] block font-sans">
                  Dietary Staples
                </span>
                <ul className="text-xs text-[#1A1A1A]/80 space-y-1.5 font-sans">
                  {selectedZone.dietStaples.map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#5A5A40] mt-1.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cultural Concept */}
              <div className="bg-[#FDFBF7] p-5 border border-[#1A1A1A] space-y-2">
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A] block font-sans">
                  Key Cultural Principle
                </span>
                <p className="serif text-lg italic text-[#1A1A1A] leading-snug">
                  "{selectedZone.culturalPractice}"
                </p>
              </div>

            </div>

            {/* Quote */}
            {selectedZone.quote && (
              <div className="p-4 bg-[#E2D1C3]/20 border-l-2 border-[#C27D56] italic serif text-lg text-[#1A1A1A]">
                {selectedZone.quote}
              </div>
            )}

          </div>
        </div>
      )}

      {/* VIEW 2: POWER 9 PRINCIPLES */}
      {activeTab === 'power9' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* List of 9 Principles */}
          <div className="space-y-2">
            {POWER_9_PRINCIPLES.map((p, idx) => {
              const isSelected = selectedPrinciple.id === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    soundManager.playStepSound();
                    setSelectedPrinciple(p);
                  }}
                  className={`w-full text-left p-4 border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#1A1A1A] ring-1 ring-[#1A1A1A] shadow-xs'
                      : 'bg-[#FDFBF7] border-[#1A1A1A]/20 hover:border-[#1A1A1A]'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#5A5A40] font-sans">
                      Principle #{idx + 1}
                    </span>
                  </div>
                  <h4 className="serif text-xl font-light italic text-[#1A1A1A] mt-1">{p.title}</h4>
                </button>
              );
            })}
          </div>

          {/* Principle Detail Sheet */}
          <div className="lg:col-span-2 bg-white border border-[#1A1A1A] p-6 sm:p-10 shadow-sm space-y-6">
            
            <div className="border-b border-[#1A1A1A] pb-4">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#C27D56] block font-sans">
                Power 9 Pillar
              </span>
              <h3 className="serif text-3xl sm:text-4xl font-light italic text-[#1A1A1A] mt-1">
                {selectedPrinciple.title}
              </h3>
            </div>

            <p className="text-base text-[#1A1A1A]/85 font-sans leading-relaxed">
              {selectedPrinciple.summary}
            </p>

            <div className="bg-[#FDFBF7] p-6 border border-[#1A1A1A] space-y-2">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#5A5A40] block font-sans">
                Everyday Practice in Blue Zones
              </span>
              <p className="serif text-lg italic text-[#1A1A1A] leading-relaxed">
                "{selectedPrinciple.examples}"
              </p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};

function zoneCountryLabel(country: string) {
  return country;
}
