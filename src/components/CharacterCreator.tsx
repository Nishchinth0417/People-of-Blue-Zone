import React, { useState } from 'react';
import { CharacterProfile } from '../types';
import { Sparkles, ArrowRight, UserCheck, Heart } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface Props {
  onComplete: (profile: CharacterProfile) => void;
}

const PRESET_CHARACTERS: CharacterProfile[] = [
  {
    name: 'Matteo',
    avatarId: 'matteo',
    genderOrStyle: 'elder_man',
    ikigaiFocus: 'The Mountain Forager & Walker',
    motto: 'Walk every slope, harvest wild herbs, and greet every neighbour.',
  },
  {
    name: 'Elena',
    avatarId: 'elena',
    genderOrStyle: 'elder_woman',
    ikigaiFocus: 'The Community Hearth Cook',
    motto: 'Food prepared with patience and shared in laughter heals the heart.',
  },
  {
    name: 'Kenji',
    avatarId: 'kenji',
    genderOrStyle: 'artisan',
    ikigaiFocus: 'The Piazza Carpenter & Mentor',
    motto: 'To work with wood and pass tradecraft to youth gives each day dignity.',
  },
  {
    name: 'Sophia',
    avatarId: 'sophia',
    genderOrStyle: 'sage',
    ikigaiFocus: 'The Olive Grove Caretaker',
    motto: 'Nurture the soil, pour morning tea, and listen to the village breeze.',
  },
];

export const CharacterCreator: React.FC<Props> = ({ onComplete }) => {
  const [selectedChar, setSelectedChar] = useState<CharacterProfile>(PRESET_CHARACTERS[0]);
  const [customName, setCustomName] = useState<string>(PRESET_CHARACTERS[0].name);

  const handleSelect = (char: CharacterProfile) => {
    soundManager.playStepSound();
    setSelectedChar(char);
    setCustomName(char.name);
  };

  const handleConfirm = () => {
    soundManager.playChoiceChime();
    onComplete({
      ...selectedChar,
      name: customName.trim() || selectedChar.name,
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="bg-white border border-[#1A1A1A] p-6 sm:p-12 shadow-sm space-y-8">
        
        {/* Header */}
        <div className="border-b border-[#1A1A1A] pb-6 space-y-2">
          <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#1A1A1A]/60 block font-sans">
            Prologue · Resident Dossier
          </span>
          <h1 className="serif text-4xl sm:text-5xl font-light italic text-[#1A1A1A]">
            Choose Your Village Identity
          </h1>
          <p className="text-sm text-[#1A1A1A]/70 max-w-2xl font-sans">
            Longevity in Blue Zones is deeply rooted in <em>Ikigai</em> (reason for being) and everyday physical roles within a supportive intergenerational community.
          </p>
        </div>

        {/* Character Selection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PRESET_CHARACTERS.map((char) => {
            const isSelected = selectedChar.avatarId === char.avatarId;
            return (
              <div
                key={char.avatarId}
                onClick={() => handleSelect(char)}
                className={`p-6 border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? 'border-[#1A1A1A] bg-[#FDFBF7] ring-1 ring-[#1A1A1A] shadow-xs'
                    : 'border-[#1A1A1A]/20 bg-white hover:border-[#1A1A1A]/60'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className={`w-12 h-12 rounded-full border border-[#1A1A1A] flex items-center justify-center text-2xl ${isSelected ? 'bg-[#C27D56]/20 text-[#C27D56]' : 'bg-[#E2D1C3]/30'}`}>
                      {char.genderOrStyle === 'elder_woman' ? '👵' :
                       char.genderOrStyle === 'artisan' ? '🧔' :
                       char.genderOrStyle === 'sage' ? '🧙‍♂️' : '👴'}
                    </div>
                    <div>
                      <h3 className="serif text-2xl font-light text-[#1A1A1A] italic">{char.name}</h3>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-[#5A5A40] block font-sans">
                        {char.ikigaiFocus}
                      </span>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="w-2.5 h-2.5 bg-[#C27D56] rounded-full" />
                  )}
                </div>

                <p className="serif text-base italic text-[#1A1A1A]/80 border-t border-[#1A1A1A]/10 pt-3">
                  "{char.motto}"
                </p>
              </div>
            );
          })}
        </div>

        {/* Name Customization & Ikigai Confirmation */}
        <div className="bg-[#FDFBF7] border border-[#1A1A1A] p-6 space-y-4">
          <div>
            <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/70 block font-sans mb-1.5">
              Resident Name:
            </label>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              maxLength={20}
              placeholder="Enter name..."
              className="w-full max-w-sm px-4 py-2.5 bg-white border border-[#1A1A1A] text-[#1A1A1A] font-serif text-lg focus:outline-none focus:ring-1 focus:ring-[#C27D56]"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-[#1A1A1A]/70 pt-1">
            <Sparkles className="w-3.5 h-3.5 text-[#C27D56]" />
            <span className="font-sans">
              Selected Ikigai: <strong className="text-[#1A1A1A]">{selectedChar.ikigaiFocus}</strong>
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full sm:w-auto px-8 py-4 bg-[#1A1A1A] text-[#FDFBF7] text-xs uppercase font-bold tracking-[0.2em] hover:bg-[#C27D56] transition-colors cursor-pointer flex items-center justify-center gap-3 shadow-xs"
          >
            <span>Begin Day in Olea Village</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
