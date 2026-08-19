import React, { useState } from 'react';
import { URBAN_PLANNING_CONCEPTS, BUILT_ENVIRONMENT_LAYERS } from '../data/urbanPlanningData';
import { 
  Building2, 
  Footprints, 
  Users, 
  Apple, 
  HeartHandshake, 
  Trees, 
  ArrowLeft, 
  Layers, 
  CheckCircle, 
  AlertTriangle,
  Compass
} from 'lucide-react';
import { soundManager } from '../utils/audio';

interface Props {
  onBackToGame: () => void;
  onOpenWorldMap: () => void;
}

export const UrbanPlanningExplorer: React.FC<Props> = ({
  onBackToGame,
  onOpenWorldMap
}) => {
  const [selectedConcept, setSelectedConcept] = useState(URBAN_PLANNING_CONCEPTS[0]);

  const getConceptIcon = (iconName: string) => {
    switch (iconName) {
      case 'Footprints': return <Footprints className="w-4 h-4 text-[#5A5A40]" />;
      case 'Users': return <Users className="w-4 h-4 text-[#C27D56]" />;
      case 'Apple': return <Apple className="w-4 h-4 text-[#5A5A40]" />;
      case 'HeartHandshake': return <HeartHandshake className="w-4 h-4 text-[#C27D56]" />;
      case 'Trees': return <Trees className="w-4 h-4 text-[#5A5A40]" />;
      default: return <Building2 className="w-4 h-4 text-[#1A1A1A]" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 bg-white p-6 sm:p-8 border border-[#1A1A1A] shadow-sm">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#1A1A1A]/60 block font-sans">
            Architectural & Urban Policy Analysis
          </span>
          <h1 className="serif text-3xl sm:text-5xl font-light italic text-[#1A1A1A] mt-1">
            Built Environment & Longevity
          </h1>
          <p className="text-sm text-[#1A1A1A]/70 mt-1 max-w-2xl font-sans">
            Healthy habits aren't just willpower—they are shaped by physical streetscapes, shaded pedestrian networks, and zero-cost public third places.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={onOpenWorldMap}
            className="flex-1 sm:flex-none px-4 py-2.5 border border-[#1A1A1A] text-[#1A1A1A] text-[10px] uppercase font-bold tracking-widest hover:bg-[#FDFBF7] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5 text-[#C27D56]" />
            <span>5 Blue Zones</span>
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

      {/* Built Environment Layers Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {BUILT_ENVIRONMENT_LAYERS.map((layer) => (
          <div key={layer.id} className="bg-white p-5 border border-[#1A1A1A] space-y-1.5 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5" style={{ backgroundColor: layer.color === '#0284c7' ? '#5A5A40' : layer.color === '#ea580c' ? '#C27D56' : '#1A1A1A' }} />
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A] font-sans">{layer.name}</h4>
            </div>
            <p className="text-xs text-[#1A1A1A]/70 font-sans leading-relaxed">
              {layer.description}
            </p>
          </div>
        ))}
      </div>

      {/* Interactive Concept Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Concept Selector */}
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A]/60 block font-sans mb-1">
            Explore Urban Health Pillars:
          </span>
          {URBAN_PLANNING_CONCEPTS.map((concept) => {
            const isSelected = selectedConcept.id === concept.id;
            return (
              <button
                key={concept.id}
                type="button"
                onClick={() => {
                  soundManager.playStepSound();
                  setSelectedConcept(concept);
                }}
                className={`w-full text-left p-4 border transition-all flex items-start gap-3.5 cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#1A1A1A] ring-1 ring-[#1A1A1A] shadow-xs'
                    : 'bg-[#FDFBF7] border-[#1A1A1A]/20 hover:border-[#1A1A1A]'
                }`}
              >
                <div className="p-2 border border-[#1A1A1A]/30 bg-white shrink-0 mt-0.5">
                  {getConceptIcon(concept.icon)}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="serif text-lg font-light italic text-[#1A1A1A]">{concept.title}</h4>
                  <span className="text-[9px] uppercase tracking-wider font-bold text-[#5A5A40] block font-sans mt-0.5">
                    {concept.lifestylePillar}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Detailed Contrast Explorer */}
        <div className="lg:col-span-2 bg-white border border-[#1A1A1A] p-6 sm:p-10 shadow-sm space-y-6">
          <div className="border-b border-[#1A1A1A] pb-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#5A5A40] block font-sans">
              Pillar: {selectedConcept.lifestylePillar}
            </span>
            <h2 className="serif text-3xl sm:text-4xl font-light italic text-[#1A1A1A] mt-1">
              {selectedConcept.title}
            </h2>
          </div>

          {/* Physical Infrastructure Design */}
          <div className="bg-[#FDFBF7] p-5 border border-[#1A1A1A] space-y-2">
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A] block font-sans flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-[#C27D56]" />
              <span>Physical Infrastructure Design</span>
            </span>
            <p className="text-sm text-[#1A1A1A]/85 font-sans leading-relaxed">
              {selectedConcept.builtEnvironmentFeature}
            </p>
          </div>

          {/* Comparative Split */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Sprawl */}
            <div className="bg-[#E2D1C3]/30 border border-[#1A1A1A]/40 p-5 space-y-2">
              <div className="flex items-center gap-1.5 text-[#1A1A1A] font-bold text-[10px] uppercase tracking-wider font-sans">
                <AlertTriangle className="w-3.5 h-3.5 text-[#C27D56]" />
                <span>Car-Centric Sprawl Reality</span>
              </div>
              <p className="text-xs text-[#1A1A1A]/75 font-sans leading-relaxed">
                {selectedConcept.sprawlContrast}
              </p>
            </div>

            {/* Blue Zone Village */}
            <div className="bg-[#5A5A40]/10 border border-[#5A5A40] p-5 space-y-2">
              <div className="flex items-center gap-1.5 text-[#5A5A40] font-bold text-[10px] uppercase tracking-wider font-sans">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Blue Zone Village Outcome</span>
              </div>
              <p className="text-xs text-[#1A1A1A]/85 font-sans leading-relaxed">
                {selectedConcept.blueZoneAdvantage}
              </p>
            </div>
          </div>

          {/* Takeaway */}
          <div className="bg-[#FDFBF7] border-l-2 border-[#1A1A1A] p-4 text-xs text-[#1A1A1A]">
            <strong className="text-[10px] uppercase font-bold tracking-wider text-[#1A1A1A] block font-sans mb-1">
              Municipal Planning Takeaway:
            </strong>
            <span className="serif text-base italic leading-snug">
              "Designing walkable mixed-use streetscapes, shaded pedestrian networks, and zero-cost public third places creates a high-longevity ecosystem by default."
            </span>
          </div>
        </div>
      </div>

      {/* Planning Matrix Table */}
      <div className="bg-white border border-[#1A1A1A] p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="serif text-2xl font-light italic text-[#1A1A1A] border-b border-[#1A1A1A] pb-3">
          The Built Environment Matrix: Lifestyle Behaviour & Planning Support
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-[#1A1A1A] text-[10px] uppercase tracking-widest text-[#1A1A1A]/60 font-bold">
                <th className="py-3 px-4">Lifestyle Behaviour</th>
                <th className="py-3 px-4">Planning / Design Support</th>
                <th className="py-3 px-4">Public Health Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1A1A]/10 text-[#1A1A1A]/80">
              <tr>
                <td className="py-3.5 px-4 font-bold text-[#5A5A40]">Walk Naturally</td>
                <td className="py-3.5 px-4">Safe, connected sidewalks, short blocks & traffic-calmed lanes</td>
                <td className="py-3.5 px-4 text-[#1A1A1A]/60 italic font-serif text-sm">8,000+ daily steps without forced exercise</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-[#C27D56]">Meet People</td>
                <td className="py-3.5 px-4">Public piazzas, central fountains, open-air cafés & seating every 100m</td>
                <td className="py-3.5 px-4 text-[#1A1A1A]/60 italic font-serif text-sm">Dramatically lowers chronic loneliness and cortisol</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-[#5A5A40]">Eat Local Whole Food</td>
                <td className="py-3.5 px-4">Accessible neighborhood markets and local farmer food hubs</td>
                <td className="py-3.5 px-4 text-[#1A1A1A]/60 italic font-serif text-sm">Makes fresh legumes, sourdough & greens the easiest option</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-[#1A1A1A]">Stay Active & Grounded</td>
                <td className="py-3.5 px-4">Community gardens, walking trails & mixed-use neighbourhoods</td>
                <td className="py-3.5 px-4 text-[#1A1A1A]/60 italic font-serif text-sm">Maintains muscle tone, joint mobility and balance</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-[#C27D56]">Support Older Adults</td>
                <td className="py-3.5 px-4">Zero-step accessible streets, resting benches, shade & co-located services</td>
                <td className="py-3.5 px-4 text-[#1A1A1A]/60 italic font-serif text-sm">Keeps elders active, independent and respected</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-[#5A5A40]">Maintain Purpose</td>
                <td className="py-3.5 px-4">Intergenerational workshops, community allotments & civic spaces</td>
                <td className="py-3.5 px-4 text-[#1A1A1A]/60 italic font-serif text-sm">Provides lifelong Ikigai / Plan de Vida and dignity</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
