import { LocationInfo, StoryEvent, TimeOfDay } from '../types';

export const VILLAGE_LOCATIONS: LocationInfo[] = [
  {
    id: 'house',
    name: "Player's Cottage",
    tagline: 'Sunlit stone cottage with herb terrace & kitchen',
    category: 'home',
    x: 18,
    y: 72,
    iconName: 'Home',
    description: 'A cozy hillside cottage with whitewashed stone walls, a breeze-catching terrace, and pots of rosemary and wild thyme.',
    urbanDesignNote: 'Compact, human-scale domestic space with a direct front terrace opening onto the pedestrian laneway.',
    colorTheme: 'from-amber-600 to-orange-700'
  },
  {
    id: 'street',
    name: 'Cobblestone Village Lane',
    tagline: 'Main pedestrian artery with shaded benches & citrus trees',
    category: 'street',
    x: 35,
    y: 56,
    iconName: 'Footprints',
    description: 'A gently stepped limestone lane where neighbours greet each other daily. Shaded by mature olive trees and bougainvillea.',
    urbanDesignNote: 'Traffic-calmed pedestrian street designed for human pacing, accidental collisions of friendship, and frequent resting alcoves.',
    colorTheme: 'from-sky-600 to-blue-700'
  },
  {
    id: 'square',
    name: 'Community Piazza & Agora',
    tagline: 'Heart of village life with stone fountain & bocce court',
    category: 'social',
    x: 52,
    y: 48,
    iconName: 'Users',
    description: 'The vibrant center of Olea Village. Features a 200-year-old stone fountain, shaded pergolas, communal chess & domino tables, and stone benches.',
    urbanDesignNote: 'The supreme "Third Place" — a zero-cost civic living room that prevents loneliness and integrates generations.',
    colorTheme: 'from-amber-500 to-yellow-600'
  },
  {
    id: 'market',
    name: "Local Farmer's & Fisher's Market",
    tagline: 'Open-air stalls of heirloom produce, legumes & olive oil',
    category: 'nourishment',
    x: 42,
    y: 32,
    iconName: 'ShoppingBag',
    description: 'Vibrant market stalls laden with purple sweet potatoes, fava beans, wild mountain herbs, fresh figs, sourdough bread, and extra virgin olive oil.',
    urbanDesignNote: 'Decentralized local food market within 5 minutes walking distance, making fresh unadulterated whole food the effortless default choice.',
    colorTheme: 'from-emerald-600 to-green-700'
  },
  {
    id: 'garden',
    name: 'Allotment & Olive Grove',
    tagline: 'Shared community vegetable beds & compost stations',
    category: 'purpose',
    x: 74,
    y: 34,
    iconName: 'Sprout',
    description: 'Tiered garden beds brimming with heirloom tomatoes, Swiss chard, dark leafy greens, zucchini, and an ancient communal olive grove.',
    urbanDesignNote: 'Shared civic agriculture providing gentle low-impact physical exercise, social collaboration, and vitamin D exposure.',
    colorTheme: 'from-green-600 to-emerald-800'
  },
  {
    id: 'cafe',
    name: 'Kafenio & Tea House',
    tagline: 'Shaded terrace serving herbal infusions & mountain teas',
    category: 'social',
    x: 65,
    y: 62,
    iconName: 'Coffee',
    description: 'An open-air café under a wisteria trellis. Villagers linger for hours sipping wild sage tea, Greek mountain tea, and chatting about life.',
    urbanDesignNote: 'Spontaneous meeting space where nobody is rushed out after drinking, anchoring the village social fabric.',
    colorTheme: 'from-amber-700 to-orange-800'
  },
  {
    id: 'trail',
    name: 'Hillside Trail & Coastal Overlook',
    tagline: 'Scenic footpath with panoramic sea breezes & wild herbs',
    category: 'nature',
    x: 82,
    y: 75,
    iconName: 'Trees',
    description: 'A winding dirt path rising up the terraced hillside. Wild thyme and pine perfume the air, offering breathtaking views of the sparkling bay.',
    urbanDesignNote: 'Natural topography integrated into daily transit, building cardiovascular resilience through everyday gradient walking.',
    colorTheme: 'from-teal-600 to-cyan-700'
  },
  {
    id: 'centre',
    name: 'Community Workshop & Hub',
    tagline: 'Intergenerational hall for craft, mentoring & repairs',
    category: 'purpose',
    x: 25,
    y: 28,
    iconName: 'Hammer',
    description: 'A warm stone building where elders teach woodwork, sewing, traditional cooking, and storytelling to children and young apprentices.',
    urbanDesignNote: 'Multi-use civic infrastructure that honors elders as custodians of community wisdom, fostering a lifelong Plan de Vida / Ikigai.',
    colorTheme: 'from-indigo-600 to-purple-700'
  }
];

export const STORY_TIMELINE: StoryEvent[] = [
  {
    id: 'event_0700',
    time: '07:00',
    title: 'Morning Awakening',
    locationId: 'house',
    npcName: 'Morning Sunshine',
    npcRole: 'Natural Rhythms',
    npcAvatar: '🌅',
    context: 'The golden morning sun streams through your wooden shutters. The air is fresh with the scent of sea salt and wild rosemary. How do you welcome this new day?',
    dialogue: 'Your body wakes naturally without a shrill alarm clock. Outside, swallows dart across the terracotta roof.',
    options: [
      {
        id: 'opt_0700_stretch_garden',
        label: 'Step onto the terrace, do gentle morning stretches & water herbs',
        description: 'Breathe the crisp mountain-sea air, loosen joints, and tend your basil pots.',
        statEffects: { movement: 12, happiness: 14, purpose: 10, stress: -10 },
        feedbackText: 'You feel supple, centered, and invigorated by the warm sun on your shoulders.',
        power9Insight: 'Move Naturally: Centenarians start their day with organic movement and natural sunlight to calibrate their circadian rhythm.',
        miniGameType: 'gardening'
      },
      {
        id: 'opt_0700_mindful_tea',
        label: 'Brew a warm cup of wild Greek mountain sage tea & sit quietly',
        description: 'Sip slowly on your porch while listening to the distant village church bells.',
        statEffects: { happiness: 12, stress: -18, social: 4, movement: 4 },
        feedbackText: 'The herbal warmth calms your nervous system and sets a peaceful tempo for the day.',
        power9Insight: 'Downshift: Establishing a tranquil morning ritual shields the body from chronic cortisol surges.',
        miniGameType: 'tea'
      },
      {
        id: 'opt_0700_rushed_screen',
        label: 'Reach for your smartphone immediately to check notifications & news',
        description: 'Scroll through headlines, emails, and global updates from bed.',
        statEffects: { stress: 15, happiness: -5, movement: 0 },
        feedbackText: 'The stream of urgent notifications makes your chest tighten slightly before the day even begins.',
        power9Insight: 'Digital Disconnect: Blue Zone elders live by biological time rather than reactive digital urgency.'
      }
    ]
  },
  {
    id: 'event_0800',
    time: '08:00',
    title: 'Nourishing Breakfast',
    locationId: 'house',
    npcName: 'Village Kitchen',
    npcRole: 'Culinary Wisdom',
    npcAvatar: '🫒',
    context: 'Your kitchen pantry is stocked with simple local ingredients. What will you prepare for your morning meal?',
    dialogue: 'A balanced breakfast gives you steady fuel without feeling heavy or lethargic.',
    options: [
      {
        id: 'opt_0800_sourdough_tomatoes',
        label: 'Rustic sourdough bread with crushed tomatoes, garlic, extra virgin olive oil & walnuts',
        description: 'Traditional Mediterranean starter rich in slow-release carbs, polyphenols, and healthy fats.',
        statEffects: { food: 22, happiness: 12, stress: -5 },
        feedbackText: 'Delightful! The crunchy sourdough and rich olive oil leave you energized and satisfied without feeling sluggish.',
        power9Insight: 'Plant Slant: Fermented sourdough and raw extra virgin olive oil foster a diverse, anti-inflammatory gut microbiome.',
        miniGameType: 'cooking'
      },
      {
        id: 'opt_0800_purple_porridge',
        label: 'Okinawan purple sweet potato porridge with toasted sesame seeds & jasmine tea',
        description: 'Antioxidant-dense staple packed with complex fiber and anthocyanins.',
        statEffects: { food: 24, happiness: 10, stress: -6 },
        feedbackText: 'Sweet, earthy, and comforting. Your energy feels steady and clear.',
        power9Insight: 'Hara Hachi Bu: Nutrient-dense, low-caloric-density tubers are a primary longevity staple in traditional Okinawa.'
      },
      {
        id: 'opt_0800_packaged_cereal',
        label: 'Ultra-processed sugary cereal with powdered creamer and instant coffee',
        description: 'Quick processed option consumed standing up over the sink.',
        statEffects: { food: -8, stress: 8, happiness: 2 },
        feedbackText: 'You get a quick sugar spike followed by a mid-morning crash and mild bloating.',
        power9Insight: 'Food Quality: Blue Zone diets contain almost zero ultra-processed foods or refined sugars.'
      }
    ]
  },
  {
    id: 'event_0930',
    time: '09:30',
    title: 'The Village Walk & Neighborly Bonds',
    locationId: 'street',
    npcName: 'Mateo & Sofia',
    npcRole: 'Longtime Neighbours',
    npcAvatar: '🚶‍♂️',
    context: 'You step out onto the cobblestone laneway. Mateo (age 78) is sweeping his stone doorstep, and Sofia is pruning her jasmine archway.',
    dialogue: '"Good morning! Are you heading up toward the market? Come walk with us, the weather is spectacular today!"',
    options: [
      {
        id: 'opt_0930_walk_talk',
        label: 'Walk together up the limestone slope, chatting about family & village news',
        description: 'Enjoy a leisurely, brisk incline walk accompanied by laughter and friendly banter.',
        statEffects: { movement: 18, social: 22, happiness: 15, community: 16, stress: -8 },
        feedbackText: 'The steep walk gets your heart pumping nicely, and Mateo shares a hilarious joke that has you all smiling.',
        power9Insight: 'Right Tribe & Move Naturally: Everyday social walking weaves cardiovascular exercise seamlessly into companionship.'
      },
      {
        id: 'opt_0930_quick_solo',
        label: 'Politely wave from a distance and hurry past on your own',
        description: 'Focus on reaching your destination quickly with your head down.',
        statEffects: { movement: 10, social: 2, happiness: 2 },
        feedbackText: 'You move quickly, though you missed a chance for a warm morning interaction.',
        power9Insight: 'Social Contagion: Spontaneous neighbourhood greetings release oxytocin and protect against loneliness.'
      },
      {
        id: 'opt_0930_ride_moped',
        label: 'Call a motor scooter ride to avoid walking the 300 meters uphill',
        description: 'Take motorized transport for a short village distance.',
        statEffects: { movement: -4, stress: 5, food: 0 },
        feedbackText: 'You saved 4 minutes, but missed out on natural leg strength training and fresh air.',
        power9Insight: 'Built Environment: Walkable streets make natural movement the default path of least resistance.'
      }
    ]
  },
  {
    id: 'event_1100',
    time: '11:00',
    title: 'Purpose & Meaningful Contribution',
    locationId: 'garden',
    npcName: 'Grandma Elena',
    npcRole: 'Community Garden Steward',
    npcAvatar: '👵',
    context: 'At the community allotment, Grandma Elena is inspecting the heirloom fava bean trellis. Nearby, young apprentices in the workshop are learning traditional wood joining.',
    dialogue: '"Welcome! Many hands make light work. We have beans to harvest, olive branches to mulch, or you can help teach wood carving in the workshop!"',
    options: [
      {
        id: 'opt_1100_harvest_beans',
        label: 'Tend the community garden beds: Weed, prune & harvest crisp fava pods',
        description: 'Kneel in the rich soil, stretch, lift baskets, and breathe the earthy compost fragrance.',
        statEffects: { purpose: 24, movement: 20, food: 14, community: 20, stress: -10 },
        feedbackText: 'You fill two wicker baskets with vibrant greens and fava beans. Elena hands you a bunch to take home.',
        power9Insight: 'Ikigai / Plan de Vida: Meaningful physical labor with visible shared benefits gives profound cognitive and physical vigor.',
        miniGameType: 'gardening'
      },
      {
        id: 'opt_1100_workshop_mentoring',
        label: 'Head to the Community Workshop: Teach young apprentices a woodworking skill',
        description: 'Show curious youth how to carve sturdy wooden spoons and repair olive oil crates.',
        statEffects: { purpose: 26, social: 22, community: 24, happiness: 18 },
        feedbackText: 'The kids are enthralled watching your hands work. You feel deeply valued and connected across generations.',
        power9Insight: 'Intergenerational Living: Transmitting skills to the next generation reinforces self-worth and sharpens mental acuity.'
      },
      {
        id: 'opt_1100_sit_bench',
        label: 'Sit on a bench alone, passively checking the time and feeling bored',
        description: 'Spend the late morning detached from village activities.',
        statEffects: { purpose: -5, happiness: -2, stress: 6 },
        feedbackText: 'Without an engaging task or connection, the hours feel aimless and flat.',
        power9Insight: 'Purpose: Lacking a daily reason to jump out of bed correlates with faster cognitive decline.'
      }
    ]
  },
  {
    id: 'event_1300',
    time: '13:00',
    title: 'Midday Meal & Hara Hachi Bu',
    locationId: 'cafe',
    npcName: 'Chef Nikos & The Long Table',
    npcRole: 'Village Tavern Keeper',
    npcAvatar: '🍲',
    context: 'The sun is high and warm. Villagers are gathering under the shaded pergola of the Kafenio for a relaxed lunch. Steam rises from fresh pots of bean stew.',
    dialogue: '"Take a seat at the long table! Today we have slow-cooked minestrone with sourdough, fresh garden greens, and crushed olives. Remember to eat till 80% full!"',
    options: [
      {
        id: 'opt_1300_shared_bean_stew',
        label: 'Eat slow-simmered bean & wild green stew at the communal table with neighbours (80% full)',
        description: 'Practice Hara Hachi Bu, share stories, and chew mindfully over 45 minutes.',
        statEffects: { food: 26, social: 24, happiness: 16, stress: -12, community: 18 },
        feedbackText: 'Delicious, rich in legumes and herbs. You stop eating when comfortably contented, feeling light and refreshed.',
        power9Insight: '80% Rule & Plant Slant: Eating slowly in good company allows leptin signals to register satiety before overeating.',
        miniGameType: 'cooking'
      },
      {
        id: 'opt_1300_fast_solo_heavy',
        label: 'Order a heavy fried meat platter to-go, eating rapidly while walking alone',
        description: 'Gorge quickly on high-sodium processed food to save time.',
        statEffects: { food: -12, stress: 10, happiness: -4, movement: 2 },
        feedbackText: 'You feel heavy, lethargic, and experience a post-meal energy crash that makes your eyes droop with fatigue.',
        power9Insight: 'Dietary Impact: Heavy, fast eating burdens digestion and triggers chronic postprandial inflammation.'
      },
      {
        id: 'opt_1300_garden_salad_terrace',
        label: 'Prepare a crisp heirloom tomato & chickpea salad at your own cottage terrace',
        description: 'Enjoy a peaceful, mindful meal looking out over the olive trees.',
        statEffects: { food: 22, happiness: 14, stress: -10, social: 4 },
        feedbackText: 'A fresh, hydrating meal that leaves you clear-headed and calm.',
        power9Insight: 'Legume Powerhouse: One cup of beans daily is linked to an extra 4 years of life expectancy in demographic studies.'
      }
    ]
  },
  {
    id: 'event_1500',
    time: '15:00',
    title: 'Afternoon Rest & Nature Sanctuary',
    locationId: 'trail',
    npcName: 'Afternoon Breeze',
    npcRole: 'The Power of Rest',
    npcAvatar: '🌿',
    context: 'The midday heat settles over the village. The shops close their shutters for the traditional quiet afternoon hours. How do you spend this free time?',
    dialogue: 'In Ikaria and Sardinia, the afternoon hours are sacred for decompressing, resetting the nervous system, or connecting with nature.',
    options: [
      {
        id: 'opt_1500_siesta_nap',
        label: 'Take a restorative 30-minute siesta in the cool, shaded breeze of your bedroom',
        description: 'Lie down peacefully with the shutters half-open to the gentle hum of cicadas.',
        statEffects: { stress: -25, happiness: 16, purpose: 5, movement: 0 },
        feedbackText: 'You wake up 30 minutes later completely rejuvenated, with mental clarity and low blood pressure.',
        power9Insight: 'Downshift (Siesta): Ikarian studies reveal that regular 30-minute afternoon naps reduce coronary heart mortality by over 35%.'
      },
      {
        id: 'opt_1500_nature_hike',
        label: 'Take a contemplative walk along the hillside coastal nature trail',
        description: 'Walk gently among wild pine, rosemary, and sage bushes with panoramic sea vistas.',
        statEffects: { movement: 22, happiness: 20, stress: -18, purpose: 8 },
        feedbackText: 'The sea breeze and pine fragrance wash away all mental tension. You feel deeply rooted in the natural world.',
        power9Insight: 'Move Naturally & Shinrin-Yoku: Gentle uneven terrain challenges balance, proprioception, and cardiovascular stamina.'
      },
      {
        id: 'opt_1500_frantic_overwork',
        label: 'Stay glued to a computer screen frantically worrying about distant deadlines',
        description: 'Work non-stop during the rest hours with intense caffeine stimulants.',
        statEffects: { stress: 24, happiness: -10, social: -6 },
        feedbackText: 'Your shoulders are knotted with tension and your eyes sting with strain.',
        power9Insight: 'Stress Management: Chronic unyielding stress is a major catalyst for chronic cardiovascular and metabolic disease.'
      }
    ]
  },
  {
    id: 'event_1730',
    time: '17:30',
    title: 'Evening Piazza Gathering & Games',
    locationId: 'square',
    npcName: 'Pietro, Lucia & The Village Moai',
    npcRole: 'Village Elders & Friends',
    npcAvatar: '🎲',
    context: 'As the sun dips toward the horizon, the village piazza comes alive. Elders set up wooden dominoes and bocce ball, children play tag around the fountain, and acoustic music drifts from a balcony.',
    dialogue: '"Ah, there you are! Come join our domino match, or sit by the fountain and help us plan the harvest festival next Sunday!"',
    options: [
      {
        id: 'opt_1730_join_game_social',
        label: 'Join Pietro and Lucia for a lively game of dominoes & storytelling in the piazza',
        description: 'Engage in witty banter, playful strategy, and genuine belly laughs with lifelong friends.',
        statEffects: { social: 28, happiness: 24, community: 22, stress: -14, movement: 6 },
        feedbackText: 'Rousing laughter fills the square! Playing together sharpens your wits and deepens your sense of belonging.',
        power9Insight: 'Right Tribe & Belong: Shared playful rituals and genuine social bonds trigger endorphins and immune resilience.',
        miniGameType: 'game'
      },
      {
        id: 'opt_1730_community_organizing',
        label: 'Help the village committee organize the upcoming seasonal harvest fair',
        description: 'Help coordinate seating, local musicians, and community bread-baking rosters.',
        statEffects: { purpose: 24, community: 26, social: 18, happiness: 16 },
        feedbackText: 'Everyone appreciates your thoughtful ideas. You feel an unmistakable sense of pride in your neighbourhood.',
        power9Insight: 'Belong: Civic engagement and mutual responsibility anchor individuals in a protective community safety net.'
      },
      {
        id: 'opt_1730_stay_aloof',
        label: 'Stand on the outer edge, watching passively with folded arms before leaving early',
        description: 'Observe from a distance without participating.',
        statEffects: { social: 4, community: 4, happiness: 2 },
        feedbackText: 'You witnessed the festive energy, but kept your emotional distance.',
        power9Insight: 'Social Integration: Active participation—rather than passive observation—is what builds neuroprotective social resilience.'
      }
    ]
  },
  {
    id: 'event_1930',
    time: '19:30',
    title: 'Sunset Dinner & Wine at 5',
    locationId: 'square',
    npcName: 'The Sunset Banquet',
    npcRole: 'Evening Celebration',
    npcAvatar: '🍷',
    context: 'Twilight paints the sky in shades of violet and amber. Fairy lights flicker on across the piazza pergolas. Neighbours gather for a light evening supper of garden vegetables, chickpeas, and a modest glass of Cannonau wine.',
    dialogue: '"To good health, true friends, and another beautiful day on this earth! A chent\'annos!"',
    options: [
      {
        id: 'opt_1930_moderate_supper',
        label: 'Enjoy a light plant-based supper with family & a single glass of polyphenol-rich Cannonau wine',
        description: 'Savor roasted peppers, fava purée, olives, whole sourdough, and toasts with cherished loved ones.',
        statEffects: { food: 22, social: 26, happiness: 22, stress: -16, community: 20 },
        feedbackText: 'A sublime evening! You drink moderately with food, bathed in warmth and genuine conversation.',
        power9Insight: 'Wine @ 5 & Loved Ones First: Moderate daily consumption of polyphenol-rich wine with meals and loved ones reduces cardiac strain.'
      },
      {
        id: 'opt_1930_herbal_infusion_supper',
        label: 'Sip a soothing brew of wild rosemary & lemon balm alongside a bowl of warm lentil soup',
        description: 'A calming alcohol-free dinner focused on restorative herbs and light digestion.',
        statEffects: { food: 25, happiness: 20, stress: -18, social: 18 },
        feedbackText: 'The warm herbal soup and fragrant tea settle your stomach peacefully, preparing you for deep restorative rest.',
        power9Insight: 'Herbal Medicine: Daily herbal teas in Ikaria act as gentle natural diuretics and anti-inflammatories.'
      },
      {
        id: 'opt_1930_excess_binge',
        label: 'Binge drink heavily late into the night while consuming heavy junk food alone',
        description: 'Overindulge in alcohol and ultra-processed late-night snacks.',
        statEffects: { food: -18, stress: 20, happiness: -8, social: 5 },
        feedbackText: 'You feel bloated, dehydrated, and restless with impending sleep disruption.',
        power9Insight: 'Moderation: Longevity cultures drink in consistent, modest amounts with food, never in binge patterns.'
      }
    ]
  },
  {
    id: 'event_2100',
    time: '21:00',
    title: 'Evening Wind-Down & Gratitude',
    locationId: 'house',
    npcName: 'Quiet Twilight',
    npcRole: 'Restful Sanctuary',
    npcAvatar: '🕯️',
    context: 'You walk back to your cottage under a canopy of bright stars. The village is peaceful. In your bedroom, a soft candle flickers on the cedar bedside table.',
    dialogue: 'How will you spend the final hour before sleep to prepare your mind and body for restorative rest?',
    options: [
      {
        id: 'opt_2100_journal_gratitude',
        label: 'Write 3 moments of gratitude in your journal & practice slow diaphragmatic breathing',
        description: 'Reflect on the laughter, the garden harvest, and the warmth of your neighbours.',
        statEffects: { happiness: 22, stress: -22, purpose: 16 },
        feedbackText: 'A wave of deep gratitude washes over you. Your heart rate slows to a tranquil, rhythmic beat.',
        power9Insight: 'Downshift & Gratitude: Ending the day with focused appreciation downregulates the sympathetic nervous system.'
      },
      {
        id: 'opt_2100_herbal_tea_reading',
        label: 'Sip chamomile & lavender tea while reading a gentle classic book by soft lamp light',
        description: 'Unwind your thoughts without the harsh blue light of screens.',
        statEffects: { happiness: 18, stress: -20, food: 8 },
        feedbackText: 'Your eyelids grow naturally heavy as the soothing botanical aromas fill the bedroom.',
        power9Insight: 'Sleep Hygiene: Screen-free winding down protects melatonin production for deep cellular repair.'
      },
      {
        id: 'opt_2100_doomscroll',
        label: 'Stare into a glaring smartphone screen reading stressful arguments until midnight',
        description: 'Doomscroll social media in the dark with blue light blasting your retinas.',
        statEffects: { stress: 26, happiness: -12 },
        feedbackText: 'Your mind is racing with anxiety, delaying your sleep onset and fracturing sleep quality.',
        power9Insight: 'Restful Sleep: Blue Zone elders naturally average 7.5 to 8.5 hours of dark, quiet sleep each night.'
      }
    ]
  },
  {
    id: 'event_2200',
    time: '22:00',
    title: 'Peaceful Night & Day Review',
    locationId: 'house',
    npcName: 'Restful Night',
    npcRole: 'The Gift of Sleep',
    npcAvatar: '🌙',
    context: 'The village lanterns dim. The gentle sound of waves and crickets lulls the valley into slumber. You blow out the candle and sink into fresh linen sheets.',
    dialogue: 'You have lived through a full day in Olea Village. Let us reflect on how your everyday habits, movement, food, purpose, and community shaped your wellbeing.',
    options: [
      {
        id: 'opt_2200_review_day',
        label: 'Close your eyes, drift to sleep & generate your Wellbeing Profile',
        description: 'Complete your day and discover the real-world Blue Zones and urban planning secrets.',
        statEffects: { happiness: 10, stress: -10 },
        feedbackText: 'Rest peacefully. Your day has woven a tapestry of longevity, purpose, and connection.',
        power9Insight: 'Longevity is not an individual chore—it is the natural outcome of living in a supportive environment.'
      }
    ]
  }
];
