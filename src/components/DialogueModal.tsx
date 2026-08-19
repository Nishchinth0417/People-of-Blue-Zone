import React, { useState } from 'react';
import { StoryEvent, ChoiceOption, LocationInfo } from '../types';
import { Sparkles, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { CookingActivity } from './MiniActivities/CookingActivity';
import { GardeningActivity } from './MiniActivities/GardeningActivity';
import { TeaBrewingActivity } from './MiniActivities/TeaBrewingActivity';
import { VillageGameActivity } from './MiniActivities/VillageGameActivity';
import { soundManager } from '../utils/audio';

interface Props {
  event: StoryEvent;
  location: LocationInfo;
  onMakeChoice: (choice: ChoiceOption) => void;
}

export const DialogueModal: React.FC<Props> = ({
  event,
  location,
  onMakeChoice
}) => {
  const [activeMiniGame, setActiveMiniGame] = useState<'cooking' | 'gardening' | 'tea' | 'game' | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<ChoiceOption | null>(null);
  const [feedback, setFeedback] = useState<{ text: string; insight?: string } | null>(null);

  const handleSelectOption = (option: ChoiceOption) => {
    soundManager.playStepSound();
    setSelectedChoice(option);

    if (option.miniGameType) {
      setActiveMiniGame(option.miniGameType);
    } else {
      soundManager.playChoiceChime();
      setFeedback({
        text: option.feedbackText,
        insight: option.power9Insight
      });
    }
  };

  const handleMiniGameComplete = () => {
    if (!selectedChoice) return;
    soundManager.playChoiceChime();
    setActiveMiniGame(null);
    setFeedback({
      text: selectedChoice.feedbackText,
      insight: selectedChoice.power9Insight
    });
  };

  const handleProceed = () => {
    if (selectedChoice) {
      onMakeChoice(selectedChoice);
    }
  };

  return (
    <div className="bg-white border border-[#1A1A1A] p-6 sm:p-8 shadow-sm">
      
      {/* Event Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#1A1A1A] pb-4 mb-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#1A1A1A]/60 block font-sans">
            {event.time} · {location.name}
          </span>
          <h2 className="serif text-3xl sm:text-4xl font-light italic text-[#1A1A1A] mt-0.5">
            {event.title}
          </h2>
        </div>

        {event.npcName && (
          <div className="text-left sm:text-right border-l sm:border-l-0 sm:border-r border-[#1A1A1A]/20 pl-3 sm:pr-3">
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A]/50 block font-sans">
              Encounter
            </span>
            <p className="serif text-base italic text-[#1A1A1A]">{event.npcName}</p>
          </div>
        )}
      </div>

      {/* Narrative Context & Dialogue */}
      <div className="bg-[#FDFBF7] p-5 border border-[#1A1A1A]/20 mb-6 space-y-3">
        <p className="text-sm text-[#1A1A1A]/85 leading-relaxed font-sans">
          {event.context}
        </p>
        {event.dialogue && (
          <div className="pl-4 border-l-2 border-[#5A5A40] text-[#1A1A1A] serif text-lg italic leading-snug">
            "{event.dialogue}"
          </div>
        )}
      </div>

      {/* Embedded Mini-Activity Mode */}
      {activeMiniGame && (
        <div className="my-4 animate-in fade-in duration-300">
          {activeMiniGame === 'cooking' && <CookingActivity onComplete={handleMiniGameComplete} />}
          {activeMiniGame === 'gardening' && <GardeningActivity onComplete={handleMiniGameComplete} />}
          {activeMiniGame === 'tea' && <TeaBrewingActivity onComplete={handleMiniGameComplete} />}
          {activeMiniGame === 'game' && <VillageGameActivity onComplete={handleMiniGameComplete} />}
        </div>
      )}

      {/* Feedback After Making Choice */}
      {feedback && !activeMiniGame && (
        <div className="my-5 p-6 bg-[#E2D1C3]/30 border border-[#1A1A1A] space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#5A5A40]" />
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#5A5A40] font-sans">
              Choice Consequence
            </span>
          </div>
          
          <p className="serif text-xl italic text-[#1A1A1A] leading-relaxed">
            "{feedback.text}"
          </p>

          {feedback.insight && (
            <div className="bg-white p-4 border border-[#1A1A1A]/20 text-xs text-[#1A1A1A] flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-[#C27D56] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[10px] uppercase font-bold tracking-wider text-[#C27D56] block mb-1">
                  Longevity Principle
                </strong>
                <span className="text-[#1A1A1A]/80 font-sans leading-relaxed">{feedback.insight}</span>
              </div>
            </div>
          )}

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={handleProceed}
              className="px-8 py-3 bg-[#1A1A1A] text-[#FDFBF7] text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-[#C27D56] transition-colors cursor-pointer flex items-center gap-2"
            >
              <span>Continue Daily Routine</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Choice Buttons List */}
      {!feedback && !activeMiniGame && (
        <div className="space-y-3">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A]/60 block font-sans mb-2">
            Select Your Everyday Action:
          </span>
          <div className="space-y-2.5">
            {event.options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectOption(opt)}
                className="w-full text-left p-4 sm:p-5 border border-[#1A1A1A] bg-[#FDFBF7] hover:bg-white hover:border-[#C27D56] transition-all flex items-center justify-between gap-4 group cursor-pointer shadow-xs"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#5A5A40] group-hover:bg-[#C27D56]" />
                    <h4 className="serif text-lg font-normal text-[#1A1A1A] group-hover:italic group-hover:text-[#C27D56] transition-colors">
                      {opt.label}
                    </h4>
                  </div>
                  <p className="text-xs text-[#1A1A1A]/60 pl-3.5 font-sans">
                    {opt.description}
                  </p>
                  {opt.miniGameType && (
                    <span className="inline-block ml-3.5 mt-1 text-[9px] uppercase font-bold tracking-widest text-[#5A5A40]">
                      ✦ Interactive Task
                    </span>
                  )}
                </div>
                <div className="p-2 border border-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors shrink-0">
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
