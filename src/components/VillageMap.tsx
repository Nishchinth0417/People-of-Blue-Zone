import React, { useState, useEffect, useRef } from 'react';
import { LocationInfo, TimeOfDay, CharacterProfile } from '../types';
import { 
  Home, 
  Footprints, 
  Users, 
  ShoppingBag, 
  Sprout, 
  Coffee, 
  Trees, 
  Hammer, 
  Compass, 
  Layers, 
  MapPin
} from 'lucide-react';
import { soundManager } from '../utils/audio';

interface Props {
  locations: LocationInfo[];
  currentLocationId: string;
  currentTime: TimeOfDay;
  character: CharacterProfile;
  activeEventLocationId?: string;
  showUrbanLens: boolean;
  onSelectLocation: (loc: LocationInfo) => void;
}

export const VillageMap: React.FC<Props> = ({
  locations,
  currentLocationId,
  currentTime,
  character,
  activeEventLocationId,
  showUrbanLens,
  onSelectLocation
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  const currentLocation = locations.find(l => l.id === currentLocationId) || locations[0];
  const [playerPos, setPlayerPos] = useState<{ x: number; y: number }>({
    x: currentLocation.x,
    y: currentLocation.y
  });
  const [isWalking, setIsWalking] = useState<boolean>(false);
  const [facing, setFacing] = useState<'left' | 'right'>('right');

  useEffect(() => {
    const targetLoc = locations.find(l => l.id === currentLocationId);
    if (targetLoc) {
      if (targetLoc.x < playerPos.x) setFacing('left');
      if (targetLoc.x > playerPos.x) setFacing('right');
      setIsWalking(true);
      soundManager.playStepSound();
      
      const timer = setTimeout(() => {
        setPlayerPos({ x: targetLoc.x, y: targetLoc.y });
        setIsWalking(false);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [currentLocationId, locations]);

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapContainerRef.current) return;
    const rect = mapContainerRef.current.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    let closestLoc = locations[0];
    let minDist = 999;
    locations.forEach(loc => {
      const dist = Math.hypot(loc.x - clickX, loc.y - clickY);
      if (dist < minDist) {
        minDist = dist;
        closestLoc = loc;
      }
    });

    if (minDist < 14) {
      onSelectLocation(closestLoc);
    } else {
      if (clickX < playerPos.x) setFacing('left');
      else setFacing('right');
      setIsWalking(true);
      soundManager.playStepSound();
      setPlayerPos({ x: Math.max(8, Math.min(92, clickX)), y: Math.max(12, Math.min(88, clickY)) });
      setTimeout(() => setIsWalking(false), 400);
    }
  };

  const isNight = currentTime === '21:00' || currentTime === '22:00';
  const isSunset = currentTime === '17:30' || currentTime === '19:30';

  const getLocationIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home': return <Home className="w-3.5 h-3.5" />;
      case 'Footprints': return <Footprints className="w-3.5 h-3.5" />;
      case 'Users': return <Users className="w-3.5 h-3.5" />;
      case 'ShoppingBag': return <ShoppingBag className="w-3.5 h-3.5" />;
      case 'Sprout': return <Sprout className="w-3.5 h-3.5" />;
      case 'Coffee': return <Coffee className="w-3.5 h-3.5" />;
      case 'Trees': return <Trees className="w-3.5 h-3.5" />;
      case 'Hammer': return <Hammer className="w-3.5 h-3.5" />;
      default: return <MapPin className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="relative w-full aspect-[16/9] min-h-[380px] max-h-[580px] bg-[#E2D1C3]/30 rounded-3xl overflow-hidden border border-[#1A1A1A]/20 shadow-sm select-none group">
      
      {/* 2.5D Illustrated Editorial Map Canvas */}
      <div 
        ref={mapContainerRef}
        onClick={handleMapClick}
        className="relative w-full h-full cursor-crosshair overflow-hidden"
        style={{
          backgroundColor: '#FDFBF7'
        }}
      >
        {/* SVG Decorative Architectural & Nature Vector */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1000 600">
          <defs>
            <linearGradient id="editorialSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isNight ? "#1C1C24" : isSunset ? "#F6D2BA" : "#EBF3F5"} />
              <stop offset="100%" stopColor={isNight ? "#2D2B38" : isSunset ? "#E8AA87" : "#FDFBF7"} />
            </linearGradient>
            <linearGradient id="editorialSea" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isNight ? "#141C28" : "#89A7B1"} />
              <stop offset="100%" stopColor={isNight ? "#1E293B" : "#B6CCD3"} />
            </linearGradient>
            <pattern id="dotGrid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.8" fill="#1A1A1A" opacity="0.12" />
            </pattern>
          </defs>

          {/* Sky & Horizon */}
          <rect x="0" y="0" width="1000" height="200" fill="url(#editorialSky)" />
          
          {/* Subtle Grid Texture */}
          <rect x="0" y="0" width="1000" height="600" fill="url(#dotGrid)" />

          {/* Distant Aegean / Mediterranean Sea */}
          <path d="M0,120 Q250,105 500,118 T1000,110 L1000,200 L0,200 Z" fill="url(#editorialSea)" opacity="0.85" />
          
          {/* Distant Island Silhouette */}
          <path d="M720,115 Q780,95 860,110 T940,112 L940,125 L720,125 Z" fill={isNight ? "#1A1A1A" : "#6E8891"} opacity="0.7" />

          {/* Village Hillsides & Terraces */}
          <path d="M0,190 Q300,165 600,185 T1000,170 L1000,600 L0,600 Z" fill="#E2D1C3" opacity="0.45" />
          <path d="M0,250 Q450,220 850,260 L1000,280 L1000,600 L0,600 Z" fill="#FDFBF7" />

          {/* Editorial Cobblestone Pedestrian Network */}
          <path 
            d="M 180,440 Q 250,380 350,340 T 520,290 T 740,210 M 350,340 L 420,200 M 520,290 L 650,370 M 650,370 L 820,450 M 180,440 L 250,170" 
            stroke="#1A1A1A" 
            strokeWidth="32" 
            strokeOpacity="0.08"
            strokeLinecap="round" 
            strokeLinejoin="round" 
            fill="none" 
          />
          <path 
            d="M 180,440 Q 250,380 350,340 T 520,290 T 740,210 M 350,340 L 420,200 M 520,290 L 650,370 M 650,370 L 820,450 M 180,440 L 250,170" 
            stroke="#1A1A1A" 
            strokeWidth="1.5" 
            strokeDasharray="6 4"
            strokeOpacity="0.4"
            strokeLinecap="round" 
            strokeLinejoin="round" 
            fill="none" 
          />

          {/* Urban Planning Layer: Walkable network active highlight */}
          {showUrbanLens && (
            <path 
              d="M 180,440 Q 250,380 350,340 T 520,290 T 740,210 M 350,340 L 420,200 M 520,290 L 650,370 M 650,370 L 820,450 M 180,440 L 250,170" 
              stroke="#5A5A40" 
              strokeWidth="12" 
              strokeDasharray="8 6"
              strokeOpacity="0.75"
              strokeLinecap="round" 
              fill="none" 
            />
          )}

          {/* Olive Groves (Olive green circles with ink outlines) */}
          <circle cx="700" cy="180" r="20" fill="#5A5A40" stroke="#1A1A1A" strokeWidth="1" opacity="0.85" />
          <circle cx="735" cy="170" r="26" fill="#5A5A40" stroke="#1A1A1A" strokeWidth="1" opacity="0.9" />
          <circle cx="775" cy="185" r="18" fill="#5A5A40" stroke="#1A1A1A" strokeWidth="1" opacity="0.8" />

          {/* Cypress / Hillside Trees */}
          <polygon points="850,400 835,460 865,460" fill="#5A5A40" stroke="#1A1A1A" strokeWidth="1" />
          <polygon points="880,420 868,470 892,470" fill="#5A5A40" stroke="#1A1A1A" strokeWidth="1" />

          {/* Central Piazza Stone Fountain */}
          <circle cx="520" cy="290" r="32" fill="#E2D1C3" stroke="#1A1A1A" strokeWidth="1.5" />
          <circle cx="520" cy="290" r="14" fill="#89A7B1" stroke="#1A1A1A" strokeWidth="1" />
        </svg>

        {/* Ambient Day / Sunset / Night Lighting Tint */}
        {isNight ? (
          <div className="absolute inset-0 bg-[#1A1A1A]/40 pointer-events-none transition-all duration-700" />
        ) : isSunset ? (
          <div className="absolute inset-0 bg-[#C27D56]/15 pointer-events-none transition-all duration-700" />
        ) : null}

        {/* Interactive Location Markers with Editorial Typography */}
        {locations.map((loc) => {
          const isSelected = loc.id === currentLocationId;
          const isTargetEvent = loc.id === activeEventLocationId;

          // Rotation variations for editorial authenticity
          const rotationClass = 
            loc.id === 'house' ? '-rotate-1' :
            loc.id === 'market' ? 'rotate-2' :
            loc.id === 'garden' ? '-rotate-1' :
            loc.id === 'cafe' ? 'rotate-1' :
            loc.id === 'square' ? 'rotate-0' :
            loc.id === 'trail' ? 'rotate-2' : '-rotate-2';

          return (
            <div
              key={loc.id}
              style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
              onClick={(e) => {
                e.stopPropagation();
                soundManager.playStepSound();
                onSelectLocation(loc);
              }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group/marker cursor-pointer ${rotationClass}`}
            >
              {/* Active Story Pulse */}
              {isTargetEvent && (
                <span className="absolute -inset-2.5 rounded-none border border-[#C27D56] animate-ping pointer-events-none" />
              )}

              {/* Marker Card */}
              <div
                className={`flex items-center gap-2 px-3 py-1.5 border transition-all duration-200 shadow-xs ${
                  isSelected
                    ? 'bg-[#1A1A1A] text-[#FDFBF7] border-[#1A1A1A] scale-105 shadow-md'
                    : isTargetEvent
                    ? 'bg-[#C27D56] text-white border-[#1A1A1A] scale-105'
                    : 'bg-white text-[#1A1A1A] border-[#1A1A1A] hover:bg-[#FDFBF7] hover:border-[#1A1A1A]'
                }`}
              >
                <span className={`${isSelected ? 'text-[#C27D56]' : 'text-[#5A5A40]'}`}>
                  {getLocationIcon(loc.iconName)}
                </span>
                <span className="text-[10px] uppercase tracking-widest font-bold whitespace-nowrap">
                  {loc.name.split(' ')[0]}
                </span>
              </div>
            </div>
          );
        })}

        {/* Animated Resident Character Marker */}
        <div
          style={{
            left: `${playerPos.x}%`,
            top: `${playerPos.y}%`,
            transition: isWalking ? 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none'
          }}
          className="absolute -translate-x-1/2 -translate-y-full z-30 pointer-events-none"
        >
          <div className="flex flex-col items-center">
            <span className="mb-1 px-2 py-0.5 bg-[#5A5A40] text-[#FDFBF7] text-[9px] uppercase tracking-widest font-bold border border-[#1A1A1A] shadow-xs">
              {character.name}
            </span>
            
            <div className={`w-10 h-10 rounded-full bg-white border border-[#1A1A1A] flex items-center justify-center text-lg shadow-sm ${facing === 'left' ? '-scale-x-100' : 'scale-x-100'} ${isWalking ? 'animate-bounce' : ''}`}>
              {character.genderOrStyle === 'elder_woman' ? '👵' :
               character.genderOrStyle === 'artisan' ? '🧔' :
               character.genderOrStyle === 'sage' ? '🧙‍♂️' : '👴'}
            </div>
          </div>
        </div>

        {/* Urban Planning Legend Callout */}
        {showUrbanLens && (
          <div className="absolute bottom-4 left-4 bg-white/95 border border-[#1A1A1A] p-4 text-xs text-[#1A1A1A] shadow-md max-w-xs z-30">
            <div className="flex items-center gap-1.5 font-bold uppercase tracking-widest text-[10px] text-[#5A5A40] mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>Urban Planning Layer</span>
            </div>
            <p className="serif text-sm italic text-[#1A1A1A]/80 leading-snug">
              Continuous cobblestone alleys and shaded piazzas make walking the unconscious path of least resistance.
            </p>
          </div>
        )}

        {/* Editorial Fast Travel Navigation (Bottom Right) */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-white/95 border border-[#1A1A1A] p-1.5 z-30 overflow-x-auto max-w-[65%] sm:max-w-none shadow-xs">
          <span className="text-[9px] uppercase font-bold tracking-widest text-[#1A1A1A]/50 px-2 font-sans">
            Explore:
          </span>
          {locations.map(loc => (
            <button
              key={loc.id}
              type="button"
              onClick={() => {
                soundManager.playStepSound();
                onSelectLocation(loc);
              }}
              className={`px-2.5 py-1 text-[10px] uppercase font-bold tracking-widest transition-all cursor-pointer ${
                loc.id === currentLocationId
                  ? 'bg-[#1A1A1A] text-[#FDFBF7]'
                  : 'text-[#1A1A1A] hover:bg-[#E2D1C3]/60'
              }`}
            >
              {loc.name.split(' ')[0]}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
