import { BlueZoneRegion } from '../types';

export const BLUE_ZONE_REGIONS: BlueZoneRegion[] = [
  {
    id: 'okinawa',
    name: 'Okinawa',
    country: 'Japan',
    coordinates: { x: 82, y: 44 },
    tagline: 'The Land of Immortals & Lifelong Moai Circles',
    coreSecrets: [
      'Moai: Lifelong social support circles committed to mutual emotional and financial care',
      'Hara Hachi Bu: 2,500-year-old Confucian mantra to stop eating when 80% full',
      'Ikigai: Clear, cherished sense of purpose giving a daily reason to wake up with joy',
      'Daily gardening: Natural low-intensity movement with daily sunlight & fresh vitamin D'
    ],
    dietStaples: [
      'Purple sweet potatoes (beni imo) high in anthocyanins',
      'Goya (bitter melon) rich in charantin for glucose balance',
      'Tofu, miso, and nutrient-dense seaweeds (kombu, wakame)',
      'Turmeric (uchin) and jasmine green tea (sanpin-cha)'
    ],
    culturalPractice: 'Yuimaru — The spirit of mutual community cooperation where villagers harvest crops together and support elders with respect.',
    keyStats: 'Historically had the highest prevalence of centenarians in the world and lowest rates of chronic disease.',
    quote: '"At 80, I am merely a youth. If they invite me to the heavens at 90, I shall say: come back when I am 100."',
    landscapeDescription: 'Subtropical archipelago with walkable coastal villages, coral stone garden walls, and flourishing front gardens.',
    color: '#0284c7' // sky/ocean blue
  },
  {
    id: 'sardinia',
    name: 'Sardinia (Ogliastra & Barbagia)',
    country: 'Italy',
    coordinates: { x: 49, y: 35 },
    tagline: 'Mountain Shepherds with Centenarian Men',
    coreSecrets: [
      'Steep mountain walks: Daily natural cardiovascular exercise herding sheep across hillsides',
      'Elders revered: Grandparents live with family, imparting wisdom, stability, and affection',
      'Laughter & Sardinian humor: Meeting in the village piazza every late afternoon',
      'Cannonau wine: Drunk moderately with meals, containing 3x higher polyphenols'
    ],
    dietStaples: [
      'Whole-grain sourdough flatbread (pane carasau)',
      'Fava beans, chickpeas, and wild mountain greens',
      'Pecorino sardo cheese made from grass-fed sheep (rich in Omega-3)',
      'Garden tomatoes, fennel, garlic, and cold-pressed olive oil'
    ],
    culturalPractice: 'A chent\'annos! — The ancient Sardinian toast wishing you to live "to one hundred years", embedded in daily community life.',
    keyStats: 'Highest concentration of male centenarians globally, with men living as long as women in the mountainous interior.',
    quote: '"The secret is simple: walk the slopes, love your family, laugh with your neighbours, and drink a little wine."',
    landscapeDescription: 'Rugged mountainous terrain with steep, cobblestone pedestrian stairways connecting tightly knit hillside stone houses.',
    color: '#ea580c' // terracotta / amber
  },
  {
    id: 'ikaria',
    name: 'Ikaria',
    country: 'Greece',
    coordinates: { x: 53, y: 37 },
    tagline: 'The Island Where People Forget to Die',
    coreSecrets: [
      'Afternoon siesta: Daily 30-minute naps shown to lower heart disease mortality by 35%',
      'Herbal mountain teas: Wild marjoram, rosemary, sage, and mint acting as mild diuretics & antioxidants',
      'No strict clocks: Living by natural biological rhythms rather than hurried artificial deadlines',
      'Social cohesion & Panigiria: Vibrant village festivals with folk dancing, music, and local wine'
    ],
    dietStaples: [
      'Over 150 varieties of wild mountain greens (horta) dressed in lemon and olive oil',
      'Black-eyed peas, lentils, and chickpeas',
      'Raw, unheated pine and heather honey',
      'Wild oregano, rosemary, and Greek mountain sage'
    ],
    culturalPractice: 'Parea — An intimate circle of friends who gather spontaneously each day to talk, share food, and decompress from stress.',
    keyStats: '1 in 3 Ikarians reaches their 90s, with virtually zero cases of dementia and much lower rates of depression.',
    quote: '"We simply forget to die because we are too busy dancing, gardening, and enjoying our friends."',
    landscapeDescription: 'Windswept Aegean island with terraced vineyards, rocky footpaths, and intimate village tavernas perched over the sea.',
    color: '#059669' // emerald / sage
  },
  {
    id: 'nicoya',
    name: 'Nicoya Peninsula',
    country: 'Costa Rica',
    coordinates: { x: 23, y: 46 },
    tagline: 'Pura Vida & The Sacred Plan de Vida',
    coreSecrets: [
      'Plan de Vida: A deep, life-affirming reason to live and contribute to children and neighbours',
      'Calcium-rich hard water: Mineral-heavy drinking water that fortifies bones and cardiovascular health',
      'Physical chores: Joyful daily outdoor movement like chopping firewood and tending horses',
      'Intergenerational homes: Strong family and neighbour networks providing daily hugs and security'
    ],
    dietStaples: [
      'The "Three Sisters": Corn, beans, and squash creating a complete protein complex',
      'Nixtamalized whole corn tortillas soaked in mineral lime',
      'Tropical nutrient-rich fruits: Papaya, banana, pejibaye, and sweet oranges',
      'Gallo pinto (rice and black beans simmered with cilantro and sweet peppers)'
    ],
    culturalPractice: 'Pura Vida — A deep worldview of gratitude, peaceful calm, and valuing human bonds above material wealth.',
    keyStats: 'Nicoyan men at age 60 have the highest life expectancy in the world and lowest middle-age mortality.',
    quote: '"Every morning I thank God for the sunrise, step onto the soil, and go see who needs a helping hand."',
    landscapeDescription: 'Sun-drenched tropical peninsula surrounded by lush rainforest, cattle trails, and unpaved, walkable village lanes.',
    color: '#16a34a' // rainforest green
  },
  {
    id: 'loma_linda',
    name: 'Loma Linda',
    country: 'California, USA',
    coordinates: { x: 19, y: 36 },
    tagline: 'An Oasis of Health, Faith, & 24-Hour Sabbath Sanctuary',
    coreSecrets: [
      'Weekly 24-hour Sabbath: A complete day of rest from commerce, electronics, and career pressure each week',
      'Plant-based vegetarian diet: Centered on whole grains, nuts, legumes, and fresh fruits',
      'Active volunteering: Deep sense of civic mission helping disadvantaged communities',
      'Like-minded social group: Surrounding oneself with peers who reinforce healthy habits'
    ],
    dietStaples: [
      'Almonds, walnuts, and seeds eaten daily (lowers heart disease risk significantly)',
      'Oatmeal, quinoa, whole grains, and sourdough bread',
      'Abundant fresh leafy salads, cruciferous vegetables, and legumes',
      'Abundant pure water throughout the day (5+ glasses daily)'
    ],
    culturalPractice: 'Sanctuary of Rest — Disconnecting from work every Friday sunset to Saturday sunset to walk in nature with family and worship.',
    keyStats: 'Residents live up to 10 years longer than the average American, with drastically reduced rates of cancer and cardiovascular disease.',
    quote: '"Health is not an end in itself; it is the energy that allows us to serve our community and love others."',
    landscapeDescription: 'Sunny valley setting lined with citrus trees, community gardens, walking trails, and intergenerational wellness centers.',
    color: '#8b5cf6' // peaceful purple
  }
];

export const POWER_9_PRINCIPLES = [
  {
    id: 'move_naturally',
    title: 'Move Naturally',
    icon: 'Footprints',
    summary: 'The world’s longest-lived people don’t pump iron or run marathons. They live in environments that nudge them into moving naturally every 20 minutes without thinking about it.',
    examples: 'Gardening, walking to the bakery, steep village hills, hand-kneading bread.'
  },
  {
    id: 'purpose',
    title: 'Purpose (Ikigai / Plan de Vida)',
    icon: 'Sparkles',
    summary: 'Having a clear sense of why you wake up in the morning is worth up to seven extra years of life expectancy.',
    examples: 'Mentoring youngsters, tending community crops, woodworking, passing down family stories.'
  },
  {
    id: 'downshift',
    title: 'Downshift',
    icon: 'Coffee',
    summary: 'Stress leads to chronic inflammation. Blue Zone centenarians have daily stress-shedding rituals built into their routine.',
    examples: 'Ikarians take a siesta, Sardinians enjoy happy hour, Okinawans honor ancestors, Adventists pray.'
  },
  {
    id: '80_percent_rule',
    title: '80% Rule (Hara Hachi Bu)',
    icon: 'Salad',
    summary: 'Saying a phrase before meals reminding yourself to stop eating when your stomach is 80% full prevents weight gain and metabolic strain.',
    examples: 'Smallest meal in late afternoon or early evening; eating slowly without distractions.'
  },
  {
    id: 'plant_slant',
    title: 'Plant Slant',
    icon: 'Leaf',
    summary: 'Beans (fava, black, soy, lentil) are the cornerstone of centenarian diets. Meat is eaten only on rare occasions or as a minor garnish.',
    examples: 'Legumes, wild greens, sourdough, nuts, tubers, olive oil, fresh herbs.'
  },
  {
    id: 'wine_at_five',
    title: 'Moderate Polyphenols & Herbal Infusions',
    icon: 'Wine',
    summary: 'People in 4 of 5 Blue Zones drink 1–2 glasses of polyphenol-rich local wine or antioxidant mountain herbal teas daily with food and friends.',
    examples: 'Sardinian Cannonau, Greek mountain sage tea, Okinawan turmeric & jasmine infusions.'
  },
  {
    id: 'belong',
    title: 'Belong & Sacred Community',
    icon: 'HeartHandshake',
    summary: 'Belonging to a faith-based or community-centered group and attending gatherings can add 4–14 years of life expectancy.',
    examples: 'Village assemblies, faith services, civic boards, community centers.'
  },
  {
    id: 'loved_ones_first',
    title: 'Loved Ones First',
    icon: 'Users',
    summary: 'Aging grandparents are kept nearby or in the home, lowering disease and mortality rates for children in the household too.',
    examples: 'Committed life partners, investing time in children, multigenerational dinners.'
  },
  {
    id: 'right_tribe',
    title: 'Right Tribe (Moai)',
    icon: 'Smile',
    summary: 'The longest-lived people choose—or are born into—social circles that support healthy, joyful, active behaviors.',
    examples: 'Lifelong Okinawan Moai circles, daily piazza strolls, mutual aid societies.'
  }
];
