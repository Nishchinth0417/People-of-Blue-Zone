import React, { useState } from 'react';
import { Flame, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface Ingredient {
  id: string;
  name: string;
  category: 'legume' | 'green' | 'grain' | 'healthy_fat' | 'spice';
  icon: string;
  nutrient: string;
  fullnessScore: number;
}

const LONGEVITY_INGREDIENTS: Ingredient[] = [
  { id: 'fava_beans', name: 'Slow-Cooked Fava Beans', category: 'legume', icon: '🫘', nutrient: 'L-dopa, prebiotic fiber & plant protein', fullnessScore: 25 },
  { id: 'wild_greens', name: 'Steamed Wild Greens (Horta)', category: 'green', icon: '🥬', nutrient: 'High bioflavonoids & polyphenols', fullnessScore: 15 },
  { id: 'sourdough', name: 'Ancient Grain Sourdough', category: 'grain', icon: '🥖', nutrient: 'Low glycemic index & lactic fermentation', fullnessScore: 20 },
  { id: 'olive_oil', name: 'Extra Virgin Olive Oil', category: 'healthy_fat', icon: '🫒', nutrient: 'Oleocanthal (natural anti-inflammatory)', fullnessScore: 15 },
  { id: 'garlic_rosemary', name: 'Garlic & Wild Rosemary', category: 'spice', icon: '🌿', nutrient: 'Allicin, rosmarinic acid & gut microbiome booster', fullnessScore: 10 },
  { id: 'purple_sweet_potato', name: 'Purple Sweet Potato (Beni Imo)', category: 'grain', icon: '🍠', nutrient: 'Powerful anthocyanin antioxidants', fullnessScore: 25 },
  { id: 'raw_walnuts', name: 'Crushed Raw Walnuts', category: 'healthy_fat', icon: '🌰', nutrient: 'Omega-3 ALA for heart & vascular health', fullnessScore: 15 }
];

interface Props {
  onComplete: (qualityBonus: number, haraHachiBuSuccess: boolean) => void;
}

export const CookingActivity: React.FC<Props> = ({ onComplete }) => {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([LONGEVITY_INGREDIENTS[0], LONGEVITY_INGREDIENTS[1]]);
  const [cooked, setCooked] = useState<boolean>(false);

  const currentFullness = selectedIngredients.reduce((acc, ing) => acc + ing.fullnessScore, 0);

  const toggleIngredient = (ing: Ingredient) => {
    if (cooked) return;
    soundManager.playStepSound();
    if (selectedIngredients.some((item) => item.id === ing.id)) {
      setSelectedIngredients(selectedIngredients.filter((item) => item.id !== ing.id));
    } else {
      setSelectedIngredients([...selectedIngredients, ing]);
    }
  };

  const handleCookAndEat = () => {
    soundManager.playChoiceChime();
    setCooked(true);
    const isOptimal = currentFullness >= 70 && currentFullness <= 90;
    setTimeout(() => {
      onComplete(isOptimal ? 15 : 8, isOptimal);
    }, 1500);
  };

  const isOptimal = currentFullness >= 70 && currentFullness <= 90;

  return (
    <div className="bg-white text-[#1A1A1A] p-6 border border-[#1A1A1A] max-w-xl mx-auto my-2 shadow-xs">
      <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3 mb-4">
        <div>
          <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#5A5A40] block font-sans">
            Longevity Kitchen
          </span>
          <h3 className="serif text-2xl font-light italic text-[#1A1A1A]">Hara Hachi Bu Calibration</h3>
        </div>
        <div className="text-right">
          <span className="text-[9px] uppercase tracking-widest font-mono text-[#C27D56] font-bold">Goal: 80% Full</span>
        </div>
      </div>

      {/* Satiety Gauge */}
      <div className="mb-5 bg-[#FDFBF7] p-4 border border-[#1A1A1A]">
        <div className="flex justify-between items-center text-xs mb-2 font-sans font-medium">
          <span className="text-[#1A1A1A]/70 uppercase tracking-wider text-[10px]">Digestive Satiety Meter:</span>
          <span className={`font-mono text-xs font-bold ${isOptimal ? 'text-[#5A5A40]' : currentFullness > 90 ? 'text-[#C27D56]' : 'text-[#1A1A1A]'}`}>
            {currentFullness}% {isOptimal ? '(Optimal 80% Range)' : currentFullness > 90 ? '(Overeating Strain)' : '(Light Appetizer)'}
          </span>
        </div>
        <div className="relative h-2.5 bg-[#1A1A1A]/10 overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${
              isOptimal ? 'bg-[#5A5A40]' :
              currentFullness > 90 ? 'bg-[#C27D56]' :
              'bg-[#1A1A1A]/60'
            }`}
            style={{ width: `${Math.min(currentFullness, 100)}%` }}
          />
        </div>
        <p className="text-[11px] text-[#1A1A1A]/70 mt-2 italic serif text-center">
          "Hara Hachi Bu" — eat until you are 8 parts full out of 10.
        </p>
      </div>

      {/* Select Ingredients */}
      <div className="space-y-2 mb-5">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A]/60 block font-sans">
          Select Fresh Harvest Ingredients:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
          {LONGEVITY_INGREDIENTS.map((ing) => {
            const isSelected = selectedIngredients.some((item) => item.id === ing.id);
            return (
              <button
                key={ing.id}
                type="button"
                onClick={() => toggleIngredient(ing)}
                className={`flex items-start gap-2.5 p-2.5 text-left border transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-[#E2D1C3]/30 border-[#1A1A1A] text-[#1A1A1A]' 
                    : 'bg-white border-[#1A1A1A]/20 hover:border-[#1A1A1A] text-[#1A1A1A]/80'
                }`}
              >
                <span className="text-xl select-none">{ing.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium truncate font-sans">{ing.name}</p>
                    <span className="text-[10px] text-[#5A5A40] font-mono font-bold">+{ing.fullnessScore}%</span>
                  </div>
                  <p className="text-[10px] text-[#1A1A1A]/60 truncate font-sans">{ing.nutrient}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Meal Summary & Cook Action */}
      <div className="border-t border-[#1A1A1A] pt-4 flex items-center justify-between">
        <div className="text-xs text-[#1A1A1A]/70 font-sans">
          <span>Items: </span><strong className="text-[#1A1A1A]">{selectedIngredients.length} selected</strong>
        </div>
        <button
          type="button"
          disabled={selectedIngredients.length === 0 || cooked}
          onClick={handleCookAndEat}
          className="px-6 py-2.5 bg-[#1A1A1A] text-[#FDFBF7] hover:bg-[#C27D56] text-[10px] uppercase font-bold tracking-[0.2em] transition-all cursor-pointer disabled:opacity-40"
        >
          {cooked ? 'Savoring Mindful Meal...' : 'Prepare & Savor'}
        </button>
      </div>
    </div>
  );
};
