export type TimeOfDay = 
  | '07:00' // Morning Awakening
  | '08:00' // Breakfast
  | '09:30' // Village Walk
  | '11:00' // Purpose Task
  | '13:00' // Lunch & Connection
  | '15:00' // Free Time & Siesta
  | '17:30' // Community Gathering
  | '19:30' // Dinner & Sunset
  | '21:00' // Evening Reflection
  | '22:00'; // Night & Bedtime

export interface CharacterProfile {
  name: string;
  avatarId: string;
  genderOrStyle: 'elder_man' | 'elder_woman' | 'artisan' | 'sage';
  ikigaiFocus: string;
  motto: string;
}

export interface WellbeingStats {
  movement: number;
  social: number;
  purpose: number;
  food: number;
  happiness: number;
  stress: number; // lower is better
  community: number;
}

export interface LocationInfo {
  id: string;
  name: string;
  tagline: string;
  category: 'home' | 'street' | 'nature' | 'social' | 'nourishment' | 'purpose';
  x: number; // percentage on map (0-100)
  y: number; // percentage on map (0-100)
  iconName: string;
  description: string;
  urbanDesignNote: string;
  colorTheme: string;
}

export interface ChoiceOption {
  id: string;
  label: string;
  description: string;
  statEffects: Partial<WellbeingStats>;
  feedbackText: string;
  power9Insight?: string;
  miniGameType?: 'cooking' | 'gardening' | 'tea' | 'game' | 'walking';
}

export interface StoryEvent {
  id: string;
  time: TimeOfDay;
  title: string;
  locationId: string;
  npcName?: string;
  npcRole?: string;
  npcAvatar?: string;
  dialogue: string;
  context: string;
  options: ChoiceOption[];
}

export interface BlueZoneRegion {
  id: string;
  name: string;
  country: string;
  coordinates: { x: number; y: number }; // Relative position on world map (0-100)
  tagline: string;
  coreSecrets: string[];
  dietStaples: string[];
  culturalPractice: string;
  keyStats: string;
  quote: string;
  landscapeDescription: string;
  color: string;
}

export interface UrbanPlanningConcept {
  id: string;
  title: string;
  lifestylePillar: string;
  builtEnvironmentFeature: string;
  sprawlContrast: string;
  blueZoneAdvantage: string;
  icon: string;
}

export type GameView = 
  | 'welcome' 
  | 'character_create' 
  | 'village_sim' 
  | 'wellbeing_report' 
  | 'world_map' 
  | 'urban_lens';
