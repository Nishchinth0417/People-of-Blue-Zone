import React, { useState } from 'react';
import { GameView, TimeOfDay, CharacterProfile, WellbeingStats, LocationInfo, ChoiceOption } from './types';
import { VILLAGE_LOCATIONS, STORY_TIMELINE } from './data/storylineData';
import { TimeProgressHUD } from './components/TimeProgressHUD';
import { VillageMap } from './components/VillageMap';
import { CharacterCreator } from './components/CharacterCreator';
import { DialogueModal } from './components/DialogueModal';
import { WellbeingReport } from './components/WellbeingReport';
import { RealBlueZonesMap } from './components/RealBlueZonesMap';
import { UrbanPlanningExplorer } from './components/UrbanPlanningExplorer';
import { soundManager } from './utils/audio';
import { 
  Sparkles, 
  Globe2, 
  Layers, 
  ArrowRight, 
  Heart, 
  Volume2, 
  VolumeX, 
  Footprints, 
  Users, 
  Salad
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const INITIAL_STATS: WellbeingStats = {
  movement: 50,
  social: 50,
  purpose: 50,
  food: 50,
  happiness: 50,
  stress: 25,
  community: 50,
};

const DEFAULT_CHARACTER: CharacterProfile = {
  name: 'Matteo',
  avatarId: 'matteo',
  genderOrStyle: 'elder_man',
  ikigaiFocus: 'The Mountain Herbalist & Walker',
  motto: 'Walk every slope, harvest wild herbs, and greet every neighbour.',
};

export default function App() {
  const [currentView, setCurrentView] = useState<GameView>('welcome');
  const [character, setCharacter] = useState<CharacterProfile>(DEFAULT_CHARACTER);
  const [currentTime, setCurrentTime] = useState<TimeOfDay>('07:00');
  const [stats, setStats] = useState<WellbeingStats>(INITIAL_STATS);
  const [currentLocationId, setCurrentLocationId] = useState<string>('house');
  const [showUrbanLens, setShowUrbanLens] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(soundManager.getMuted());
  const [choiceHistory, setChoiceHistory] = useState<ChoiceOption[]>([]);

  const currentEvent = STORY_TIMELINE.find((e) => e.time === currentTime);
  const activeLocation = VILLAGE_LOCATIONS.find((l) => l.id === currentLocationId) || VILLAGE_LOCATIONS[0];

  const handleStartGame = () => {
    soundManager.playStepSound();
    setCurrentView('character_create');
  };

  const handleCharacterCreated = (profile: CharacterProfile) => {
    setCharacter(profile);
    setStats(INITIAL_STATS);
    setCurrentTime('07:00');
    setCurrentLocationId('house');
    setChoiceHistory([]);
    setCurrentView('village_sim');
  };

  const handleToggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const handleToggleUrbanLens = () => {
    soundManager.playStepSound();
    setShowUrbanLens(!showUrbanLens);
  };

  const handleSelectLocation = (loc: LocationInfo) => {
    setCurrentLocationId(loc.id);
  };

  const handleMakeChoice = (choice: ChoiceOption) => {
    soundManager.playChoiceChime();
    setChoiceHistory((prev) => [...prev, choice]);

    setStats((prev) => ({
      movement: Math.max(0, Math.min(100, prev.movement + (choice.statEffects.movement || 0))),
      social: Math.max(0, Math.min(100, prev.social + (choice.statEffects.social || 0))),
      purpose: Math.max(0, Math.min(100, prev.purpose + (choice.statEffects.purpose || 0))),
      food: Math.max(0, Math.min(100, prev.food + (choice.statEffects.food || 0))),
      happiness: Math.max(0, Math.min(100, prev.happiness + (choice.statEffects.happiness || 0))),
      stress: Math.max(0, Math.min(100, prev.stress + (choice.statEffects.stress || 0))),
      community: Math.max(0, Math.min(100, prev.community + (choice.statEffects.community || 0))),
    }));

    const currentIndex = STORY_TIMELINE.findIndex((e) => e.time === currentTime);
    if (currentIndex < STORY_TIMELINE.length - 1) {
      const nextEvent = STORY_TIMELINE[currentIndex + 1];
      setCurrentTime(nextEvent.time);
      setCurrentLocationId(nextEvent.locationId);
    } else {
      setTimeout(() => {
        setCurrentView('wellbeing_report');
      }, 500);
    }
  };

  const handleRestart = () => {
    soundManager.playStepSound();
    setStats(INITIAL_STATS);
    setCurrentTime('07:00');
    setCurrentLocationId('house');
    setChoiceHistory([]);
    setCurrentView('character_create');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] font-sans flex flex-col selection:bg-[#C27D56] selection:text-[#FDFBF7]">
      
      {/* Simulation HUD */}
      {currentView === 'village_sim' && (
        <TimeProgressHUD
          currentTime={currentTime}
          stats={stats}
          isMuted={isMuted}
          showUrbanLens={showUrbanLens}
          onToggleMute={handleToggleMute}
          onToggleUrbanLens={handleToggleUrbanLens}
        />
      )}

      {/* Main View Router */}
      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          
          {/* WELCOME / COVER VIEW */}
          {currentView === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex items-center justify-center p-4 sm:p-8"
            >
              <div className="max-w-4xl w-full bg-white border border-[#1A1A1A] shadow-sm p-8 sm:p-14 text-center space-y-8">
                
                {/* Issue Header Tag */}
                <div className="flex justify-between items-center border-b border-[#1A1A1A] pb-3 text-[10px] uppercase tracking-[0.25em] font-bold text-[#1A1A1A]/60 font-sans">
                  <span>Interactive Life Simulation</span>
                  <span>Field Edition · 2026</span>
                </div>

                {/* Main Title */}
                <div className="space-y-3 pt-2">
                  <h1 className="serif text-5xl sm:text-7xl font-light italic text-[#1A1A1A] tracking-tight leading-none">
                    Live Like a Blue Zone
                  </h1>
                  <p className="text-base sm:text-lg text-[#1A1A1A]/75 max-w-2xl mx-auto font-sans leading-relaxed font-normal">
                    Experience a day in a Mediterranean and Okinawan longevity village. Make everyday choices, walk steep lanes, savor whole plant foods, and discover how environments shape human vitality.
                  </p>
                </div>

                {/* 4 Feature Highlights in Editorial Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left pt-2">
                  <div className="bg-[#FDFBF7] p-4 border border-[#1A1A1A] space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#5A5A40] block font-sans">Pillar I</span>
                    <h4 className="serif text-lg italic text-[#1A1A1A]">Natural Movement</h4>
                    <p className="text-xs text-[#1A1A1A]/60 font-sans">Steep village lanes & garden tasks</p>
                  </div>
                  <div className="bg-[#FDFBF7] p-4 border border-[#1A1A1A] space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#C27D56] block font-sans">Pillar II</span>
                    <h4 className="serif text-lg italic text-[#1A1A1A]">Moai & Belonging</h4>
                    <p className="text-xs text-[#1A1A1A]/60 font-sans">Piazza games & mutual aid</p>
                  </div>
                  <div className="bg-[#FDFBF7] p-4 border border-[#1A1A1A] space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#5A5A40] block font-sans">Pillar III</span>
                    <h4 className="serif text-lg italic text-[#1A1A1A]">Hara Hachi Bu</h4>
                    <p className="text-xs text-[#1A1A1A]/60 font-sans">Plant-slant & 80% satiety</p>
                  </div>
                  <div className="bg-[#FDFBF7] p-4 border border-[#1A1A1A] space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A] block font-sans">Pillar IV</span>
                    <h4 className="serif text-lg italic text-[#1A1A1A]">Urban Design</h4>
                    <p className="text-xs text-[#1A1A1A]/60 font-sans">Walkable built environments</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={handleStartGame}
                    className="w-full sm:w-auto px-8 py-4 bg-[#1A1A1A] text-[#FDFBF7] text-xs uppercase font-bold tracking-[0.2em] hover:bg-[#C27D56] transition-colors cursor-pointer flex items-center justify-center gap-3 shadow-xs"
                  >
                    <span>Begin Your Day (07:00 AM)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => { soundManager.playStepSound(); setCurrentView('world_map'); }}
                    className="w-full sm:w-auto px-6 py-4 border border-[#1A1A1A] text-[#1A1A1A] text-xs uppercase font-bold tracking-[0.2em] hover:bg-[#FDFBF7] transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Globe2 className="w-4 h-4 text-[#C27D56]" />
                    <span>Explore 5 Real Blue Zones</span>
                  </button>
                </div>

                {/* Sound Indicator */}
                <div className="flex items-center justify-center gap-2 text-xs text-[#1A1A1A]/60 pt-2 border-t border-[#1A1A1A]/10">
                  <button
                    type="button"
                    onClick={handleToggleMute}
                    className="flex items-center gap-1.5 hover:text-[#1A1A1A] transition-colors cursor-pointer font-sans"
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#C27D56]" />}
                    <span>{isMuted ? 'Sound Muted' : 'Acoustic Soundscape Enabled'}</span>
                  </button>
                </div>

              </div>
            </motion.div>
          )}

          {/* CHARACTER CREATION VIEW */}
          {currentView === 'character_create' && (
            <motion.div
              key="character_create"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              <CharacterCreator onComplete={handleCharacterCreated} />
            </motion.div>
          )}

          {/* MAIN VILLAGE SIMULATION VIEW */}
          {currentView === 'village_sim' && (
            <motion.div
              key="village_sim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-6"
            >
              {/* Map Container */}
              <div className="space-y-2">
                <div className="flex items-center justify-between px-1 border-b border-[#1A1A1A]/20 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#C27D56] animate-pulse" />
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/70 font-sans">
                      Village of Ikaria & Olea · Active Environment
                    </span>
                  </div>
                  <span className="serif text-sm italic text-[#1A1A1A]/70">
                    Click locations on map or choose actions below
                  </span>
                </div>

                <VillageMap
                  locations={VILLAGE_LOCATIONS}
                  currentLocationId={currentLocationId}
                  currentTime={currentTime}
                  character={character}
                  activeEventLocationId={currentEvent?.locationId}
                  showUrbanLens={showUrbanLens}
                  onSelectLocation={handleSelectLocation}
                />
              </div>

              {/* Story Dialogue & Choices Modal */}
              {currentEvent && (
                <DialogueModal
                  event={currentEvent}
                  location={activeLocation}
                  onMakeChoice={handleMakeChoice}
                />
              )}

              {/* Bottom Editorial Dossier Ribbon */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 border border-[#1A1A1A] text-xs">
                <div className="flex items-center gap-2 text-[#1A1A1A]/70 font-sans">
                  <Heart className="w-3.5 h-3.5 text-[#C27D56]" />
                  <span>Resident Profile: <strong className="text-[#1A1A1A]">{character.name}</strong> ({character.ikigaiFocus})</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => { soundManager.playStepSound(); setCurrentView('urban_lens'); }}
                    className="px-3 py-1.5 border border-[#1A1A1A] text-[10px] uppercase font-bold tracking-widest text-[#5A5A40] hover:bg-[#5A5A40] hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Layers className="w-3 h-3" />
                    <span>Urban Planning Deep Dive</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { soundManager.playStepSound(); setCurrentView('world_map'); }}
                    className="px-3 py-1.5 border border-[#1A1A1A] text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FDFBF7] transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Globe2 className="w-3 h-3 text-[#C27D56]" />
                    <span>5 Real Blue Zones</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* WELLBEING REPORT VIEW */}
          {currentView === 'wellbeing_report' && (
            <motion.div
              key="wellbeing_report"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              <WellbeingReport
                character={character}
                stats={stats}
                onExploreWorldMap={() => { soundManager.playStepSound(); setCurrentView('world_map'); }}
                onExploreUrbanLens={() => { soundManager.playStepSound(); setCurrentView('urban_lens'); }}
                onPlayAgain={handleRestart}
              />
            </motion.div>
          )}

          {/* 5 REAL BLUE ZONES WORLD MAP VIEW */}
          {currentView === 'world_map' && (
            <motion.div
              key="world_map"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              <RealBlueZonesMap
                onBackToGame={() => { soundManager.playStepSound(); setCurrentView('village_sim'); }}
                onOpenUrbanPlanning={() => { soundManager.playStepSound(); setCurrentView('urban_lens'); }}
              />
            </motion.div>
          )}

          {/* URBAN PLANNING VIEW */}
          {currentView === 'urban_lens' && (
            <motion.div
              key="urban_lens"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              <UrbanPlanningExplorer
                onBackToGame={() => { soundManager.playStepSound(); setCurrentView('village_sim'); }}
                onOpenWorldMap={() => { soundManager.playStepSound(); setCurrentView('world_map'); }}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1A1A1A]/20 bg-[#FDFBF7] text-[#1A1A1A]/60 text-xs py-4 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 font-sans">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Live Like a Blue Zone</span>
            <span>·</span>
            <span>An Editorial Life Simulation</span>
          </div>
          <span className="text-[10px] uppercase tracking-wider">
            Built with Cormorant Garamond & Inter · Inspired by Dan Buettner
          </span>
        </div>
      </footer>

    </div>
  );
}
