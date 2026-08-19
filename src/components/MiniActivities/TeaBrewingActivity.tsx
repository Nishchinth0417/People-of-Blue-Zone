import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface Herb {
  id: string;
  name: string;
  region: string;
  flavor: string;
  medicinalBenefit: string;
  icon: string;
}

const BLUE_ZONE_HERBS: Herb[] = [
  { id: 'greek_mountain_tea', name: 'Greek Mountain Tea (Sideritis)', region: 'Ikaria', flavor: 'Earthy, floral & sweet', medicinalBenefit: 'Boosts BDNF brain health & lowers blood pressure', icon: '🌾' },
  { id: 'wild_sage', name: 'Wild Hillside Sage', region: 'Ikaria / Sardinia', flavor: 'Aromatic & herbaceous', medicinalBenefit: 'Powerful memory enhancement & antispasmodic', icon: '🌿' },
  { id: 'rosemary', name: 'Fresh Rosemary Sprig', region: 'Sardinia', flavor: 'Piney & woodsy', medicinalBenefit: 'Improves cerebral circulation & cellular repair', icon: '🌲' },
  { id: 'jasmine_green_tea', name: 'Sanpin-cha (Jasmine Green Tea)', region: 'Okinawa', flavor: 'Sweet jasmine & gentle green', medicinalBenefit: 'Catechin EGCG antioxidant longevity powerhouse', icon: '🍵' },
  { id: 'chamomile_lemon', name: 'Wild Chamomile & Lemon Peel', region: 'Nicoya / Greece', flavor: 'Honey-citrus & soothing', medicinalBenefit: 'Calms nervous system & prepares restorative sleep', icon: '🌼' }
];

interface Props {
  onComplete: (bonus: number) => void;
}

export const TeaBrewingActivity: React.FC<Props> = ({ onComplete }) => {
  const [selectedHerbs, setSelectedHerbs] = useState<Herb[]>([BLUE_ZONE_HERBS[0]]);
  const [brewing, setBrewing] = useState<boolean>(false);

  const toggleHerb = (herb: Herb) => {
    if (brewing) return;
    soundManager.playStepSound();
    if (selectedHerbs.some(h => h.id === herb.id)) {
      if (selectedHerbs.length > 1) {
        setSelectedHerbs(selectedHerbs.filter(h => h.id !== herb.id));
      }
    } else {
      if (selectedHerbs.length < 3) {
        setSelectedHerbs([...selectedHerbs, herb]);
      }
    }
  };

  const handleBrew = () => {
    soundManager.playChoiceChime();
    setBrewing(true);
    setTimeout(() => {
      onComplete(16);
    }, 1500);
  };

  return (
    <div className="bg-white text-[#1A1A1A] p-6 border border-[#1A1A1A] max-w-xl mx-auto my-2 shadow-xs">
      <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3 mb-4">
        <div>
          <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#5A5A40] block font-sans">
            Botanical Infusion
          </span>
          <h3 className="serif text-2xl font-light italic text-[#1A1A1A]">Wild Mountain Tea</h3>
        </div>
        <span className="text-[9px] uppercase tracking-widest font-mono text-[#5A5A40] font-bold">
          {selectedHerbs.length} / 3 Selected
        </span>
      </div>

      <div className="space-y-2 mb-5">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A]/60 block font-sans">
          Select Wild Longevity Botanicals:
        </span>
        <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
          {BLUE_ZONE_HERBS.map((herb) => {
            const isSelected = selectedHerbs.some(h => h.id === herb.id);
            return (
              <button
                key={herb.id}
                type="button"
                onClick={() => toggleHerb(herb)}
                className={`w-full flex items-center gap-3 p-3 text-left border transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-[#E2D1C3]/30 border-[#1A1A1A] text-[#1A1A1A]' 
                    : 'bg-white border-[#1A1A1A]/20 hover:border-[#1A1A1A] text-[#1A1A1A]/80'
                }`}
              >
                <span className="text-xl select-none">{herb.icon}</span>
                <div className="flex-1 min-w-0 font-sans">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-[#1A1A1A]">{herb.name}</p>
                    <span className="text-[9px] uppercase text-[#5A5A40] font-mono font-bold">{herb.region}</span>
                  </div>
                  <p className="text-[10px] text-[#1A1A1A]/70 mt-0.5">{herb.medicinalBenefit}</p>
                </div>
                {isSelected && (
                  <div className="bg-[#5A5A40] text-white p-0.5 rounded-full">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-[#1A1A1A] pt-4 flex items-center justify-between font-sans">
        <p className="text-[11px] text-[#1A1A1A]/70 italic serif">
          "A daily pot of wild herbal tea calms blood pressure and protects cellular health."
        </p>
        <button
          type="button"
          disabled={selectedHerbs.length === 0 || brewing}
          onClick={handleBrew}
          className="px-5 py-2.5 bg-[#1A1A1A] text-[#FDFBF7] hover:bg-[#C27D56] text-[10px] uppercase font-bold tracking-[0.2em] transition-all cursor-pointer disabled:opacity-40"
        >
          {brewing ? 'Steeping Botanicals...' : 'Steep & Sip'}
        </button>
      </div>
    </div>
  );
};
