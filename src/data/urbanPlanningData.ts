import { UrbanPlanningConcept } from '../types';

export const URBAN_PLANNING_CONCEPTS: UrbanPlanningConcept[] = [
  {
    id: 'walkability',
    title: 'The 15-Minute Human-Scale Grid',
    lifestylePillar: 'Move Naturally (Everyday Activity)',
    builtEnvironmentFeature: 'Cobblestone lanes, continuous pedestrian sidewalks, traffic-calmed streets, short block lengths, and gentle topographic stairs.',
    sprawlContrast: 'Car-centric multi-lane arterials, missing sidewalks, isolated cul-de-sacs requiring a 15-minute car drive for a carton of milk.',
    blueZoneAdvantage: 'Residents accumulate 8,000–12,000 steps naturally per day simply running daily errands, without setting foot in a gym.',
    icon: 'Footprints'
  },
  {
    id: 'third_places',
    title: 'Piazzas, Shaded Benches & "Third Places"',
    lifestylePillar: 'Social Connection & Right Tribe',
    builtEnvironmentFeature: 'Central car-free public squares, fountain plazas, shaded pergolas, and public seating spaced every 100 meters.',
    sprawlContrast: 'Privatized, pay-to-exist indoor spaces, hostile architecture preventing lingering, parking lots isolating buildings.',
    blueZoneAdvantage: 'Encourages spontaneous, low-pressure conversations between neighbours of all ages, eliminating social isolation and loneliness.',
    icon: 'Users'
  },
  {
    id: 'edible_landscapes',
    title: 'Neighbourhood Food Networks & Community Gardens',
    lifestylePillar: 'Plant Slant & Food Security',
    builtEnvironmentFeature: 'Integrated allotments, public fruit trees (fig, citrus, olive), herb planters, and permanent open-air farmers markets.',
    sprawlContrast: 'Food deserts dominated by fast-food drive-thrus, industrial convenience stores, and zoning prohibiting urban agriculture.',
    blueZoneAdvantage: 'Guarantees immediate access to unprocessed, mineral-rich produce and provides physical purpose through gardening chores.',
    icon: 'Apple'
  },
  {
    id: 'intergenerational_design',
    title: 'Accessible Streets & Intergenerational Hubs',
    lifestylePillar: 'Loved Ones First & Elder Dignity',
    builtEnvironmentFeature: 'Zero-step accessible entrances, well-lit pathways, mixed-use community workshops, and co-located daycares & elder centers.',
    sprawlContrast: 'Age-segregated retirement institutions on town peripheries and single-family zoning that forces elderly isolation.',
    blueZoneAdvantage: 'Elders remain visible, active, and respected community leaders who teach skills and care for youth, retaining cognitive vitality.',
    icon: 'HeartHandshake'
  },
  {
    id: 'downshift_sanctuaries',
    title: 'Biophilic Corridors & Quiet Nature Sanctuaries',
    lifestylePillar: 'Downshift & Chronic Stress Reduction',
    builtEnvironmentFeature: 'Pocket parks, coastal outlooks, nature trails, water fountains, and acoustic buffers dampening motorized noise.',
    sprawlContrast: 'Constant ambient traffic noise, concrete heat islands, lack of tree canopy shade, and billboard visual pollution.',
    blueZoneAdvantage: 'Reduces cortisol levels, regulates heart rate variability, and invites restorative afternoon siestas and reflective walks.',
    icon: 'Trees'
  }
];

export const BUILT_ENVIRONMENT_LAYERS = [
  {
    id: 'walkable_network',
    name: 'Walkable Pathway Network',
    description: 'Safe, shade-canopied pedestrian routes connecting every residence to shops and gardens within 400m.',
    color: '#38bdf8'
  },
  {
    id: 'social_nodes',
    name: 'Public Social Nodes',
    description: 'Car-free piazzas, community pergolas, and open-air cafés fostering daily spontaneous interactions.',
    color: '#fbbf24'
  },
  {
    id: 'productive_greenery',
    name: 'Productive Green Spaces',
    description: 'Heirloom community gardens, shared olive groves, and composting hubs creating active purpose.',
    color: '#4ade80'
  },
  {
    id: 'civic_civility',
    name: 'Intergenerational Amenities',
    description: 'Community repair workshop, library, bocce court, and resting benches every 80 meters.',
    color: '#c084fc'
  }
];
