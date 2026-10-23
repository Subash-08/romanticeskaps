export type Stay = {
  place: string;
  nights: number;
  property: string;
  room: string;
  meals: string;
};

export type ItineraryDay = {
  day: number;
  title: string;
  description: string;
  distance?: string;
};

export type HoneymoonPackage = {
  slug: string;
  code: string;
  title: string;
  destination: string;
  region: string;
  duration: string;
  nights: number;
  days: number;
  travellers: string;
  priceFrom: number;
  priceLabel: string;
  mealPlan: string;
  summary: string;
  image: string;
  imagePosition: string;
  tags: string[];
  highlights: string[];
  stays: Stay[];
  transport: string[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  notes: string[];
  cancellation?: string[];
};

export const honeymoonPackages: HoneymoonPackage[] = [
  {
    slug: "kerala-backwaters-and-munnar",
    code: "KER",
    title: "Munnar & Backwater Romance",
    destination: "Kerala",
    region: "South India",
    duration: "3 nights / 4 days",
    nights: 3,
    days: 4,
    travellers: "2 adults",
    priceFrom: 49340,
    priceLabel: "From Rs. 49,340 per couple",
    mealPlan: "CP or MAP; all meals aboard the houseboat",
    summary: "Tea-covered hills, waterfalls and one unhurried night aboard a private-style Alleppey houseboat.",
    image: "/images/island.jpg",
    imagePosition: "center 56%",
    tags: ["Hill country", "Houseboat", "Private car"],
    highlights: ["Munnar tea country", "Eravikulam National Park", "Alleppey houseboat cruise", "Kochi sightseeing"],
    stays: [
      { place: "Munnar", nights: 2, property: "Vega Munnar or similar", room: "Vega Delight room", meals: "Breakfast" },
      { place: "Alleppey", nights: 1, property: "Premium houseboat", room: "Premium room for two", meals: "Lunch, dinner and breakfast" },
    ],
    transport: ["Private air-conditioned sedan from Kochi pickup to drop", "Driver-cum-guide", "Sightseeing, tolls, parking and fuel as listed"],
    itinerary: [
      { day: 1, title: "Kochi to Munnar", distance: "Approx. 150 km", description: "Drive into the hills via Adimali, Cheeyappara and Valara waterfalls and scenic viewpoints. Arrive in Munnar, check in, then visit the tea factory and museum when timing permits." },
      { day: 2, title: "Munnar sightseeing", distance: "Approx. 100 km", description: "Explore Eravikulam National Park, Photo Point, Mattupetty Dam, Kundala Dam and the tea museum, with an overnight stay in Munnar." },
      { day: 3, title: "Munnar to Alleppey", distance: "Approx. 190 km", description: "Travel to Alleppey and board the houseboat around noon. Cruise through Kuttanad villages, paddy fields and coir-making landscapes with all meals included onboard." },
      { day: 4, title: "Alleppey to Kochi", distance: "Approx. 90 km", description: "Breakfast onboard, followed by the drive to Kochi with en-route sightseeing before your departure drop." },
    ],
    inclusions: ["Accommodation for three nights", "Meals according to the selected CP or MAP option", "All meals on the houseboat", "Private vehicle for itinerary transfers and sightseeing", "Driver allowance, tolls, parking and fuel"],
    exclusions: ["Airfare or train fare", "Entry tickets and activity charges", "Meals or services not listed", "Personal expenses and tips", "Costs caused by weather, roadblocks or other unforeseen events"],
    notes: ["Sample travel date in the supplied quotation: 20 October 2026.", "Hotel check-in is generally 2:00 pm and check-out 11:00 am.", "Munnar rooms may be non-air-conditioned because of the hill climate.", "Rooms and rates remain subject to availability at confirmation."],
    cancellation: ["More than 30 days before arrival: 10% charge", "15-21 days before arrival: 15% charge", "7-15 days before arrival: 50% charge", "Less than 7 days before arrival: full retention"],
  },
  {
    slug: "kashmir-valleys-and-shikara",
    code: "SXR",
    title: "Kashmir Valleys & Shikara",
    destination: "Kashmir",
    region: "North India",
    duration: "5 nights / 6 days",
    nights: 5,
    days: 6,
    travellers: "2 adults",
    priceFrom: 50500,
    priceLabel: "From Rs. 50,500 per couple",
    mealPlan: "MAP - breakfast and dinner",
    summary: "A private journey through Srinagar, Gulmarg, Pahalgam and Sonamarg with a Shikara ride and mountain experiences.",
    image: "/images/island.jpg",
    imagePosition: "left center",
    tags: ["Mountains", "Shikara", "Private sedan"],
    highlights: ["Dal Lake Shikara ride", "Gulmarg Gondola phases 1 and 2", "Pahalgam valleys", "Sonamarg and Mughal gardens"],
    stays: [
      { place: "Srinagar / Gulmarg plan", nights: 5, property: "Downtown, Ennco Resorts, Palm Spring or similar", room: "Double deluxe room", meals: "Breakfast and dinner" },
      { place: "Upgrade option", nights: 5, property: "Namrose Resorts or similar", room: "Double deluxe room", meals: "Breakfast and dinner" },
    ],
    transport: ["Private non-air-conditioned Toyota Etios or Amaze", "Srinagar Airport pickup and drop", "Sightseeing and transfers listed in the itinerary"],
    itinerary: [
      { day: 1, title: "Arrive in Srinagar", description: "Airport welcome and private transfer to the hotel. In the evening, enjoy a 60-minute Shikara ride before dinner and your overnight stay." },
      { day: 2, title: "Gulmarg excursion", description: "Drive to the Meadow of Flowers. The plan includes Gondola tickets for phases 1 and 2; optional skiing, snowboarding and local union-taxi sightseeing are payable directly." },
      { day: 3, title: "Pahalgam excursion", description: "Travel through Pampore saffron fields, bat factories, apple orchards and the dry-fruit market. Aru, Chandanwari and Betaab Valley transport is locally payable." },
      { day: 4, title: "Sonamarg excursion", description: "Visit the Meadow of Gold. Thajiwas Glacier, Fishing Point, Zojila Pass and Zero Point depend on opening conditions and local transport arrangements." },
      { day: 5, title: "Srinagar gardens", description: "Visit Nishat Bagh, Cheshma Shahi, Shalimar Bagh, the botanical garden, Hazratbal Mosque and Shankaracharya Temple, subject to opening and local conditions." },
      { day: 6, title: "Departure from Srinagar", description: "Breakfast at the hotel followed by your private transfer to Srinagar Airport." },
    ],
    inclusions: ["Five nights' accommodation", "Breakfast and dinner", "Private airport transfers and sightseeing vehicle", "Gondola tickets for phases 1 and 2", "60-minute Shikara ride", "Pony ride to Thajiwas Glacier", "Tolls, parking, fuel and driver allowance"],
    exclusions: ["Airfare or train fare", "Pahalgam ABC valley union cabs", "Local vehicles or pony rides not specifically included", "Garden, park and monument tickets", "Winter chain vehicle where required", "Insurance, personal expenses and costs from weather or security disruption", "GST when a tax invoice is requested"],
    notes: ["A second quoted hotel option was Rs. 62,500 per couple.", "Gondola-counter transfer from the parking area is not included.", "Snow, road, security and permit conditions can alter the operating itinerary.", "Rooms and rates remain subject to availability at confirmation."],
  },
  {
    slug: "gangtok-and-darjeeling",
    code: "IXB",
    title: "Gangtok & Darjeeling",
    destination: "Sikkim & Darjeeling",
    region: "East India",
    duration: "4 nights / 5 days",
    nights: 4,
    days: 5,
    travellers: "2 adults",
    priceFrom: 58000,
    priceLabel: "From Rs. 58,000 per couple",
    mealPlan: "MAP - breakfast and dinner",
    summary: "High-altitude lakes, Himalayan viewpoints and two distinct hill towns connected by a private point-to-point journey.",
    image: "/images/dinner.jpg",
    imagePosition: "center 35%",
    tags: ["Himalayas", "Tsomgo Lake", "Tea country"],
    highlights: ["Tsomgo Lake and New Baba Mandir", "Tiger Hill sunrise", "Darjeeling tea gardens", "Peace Pagoda"],
    stays: [
      { place: "Gangtok", nights: 2, property: "Maple Residency or similar", room: "Executive room", meals: "Breakfast and dinner" },
      { place: "Darjeeling", nights: 2, property: "Sumi Vista or similar", room: "Premium room with Kanchenjunga view", meals: "Breakfast and dinner" },
    ],
    transport: ["Innova, Xylo or similar for the Tsomgo Lake sector", "WagonR or similar for airport transfers and other sectors", "Point-to-point non-air-conditioned hill transport"],
    itinerary: [
      { day: 1, title: "Bagdogra to Gangtok", distance: "Approx. 125 km / 5 hours", description: "Meet on arrival at Bagdogra Airport and transfer to Gangtok. Check in and keep the rest of the day at leisure." },
      { day: 2, title: "Tsomgo Lake & Baba Mandir", distance: "Approx. 120 km / 8 hours", description: "A high-altitude excursion to Tsomgo Lake and New Baba Mandir. Weather, snow and landslides may limit the route or require alternate sightseeing." },
      { day: 3, title: "Gangtok to Darjeeling", distance: "Approx. 110 km / 4 hours", description: "After breakfast, drive to Darjeeling and check in. The remainder of the day is free." },
      { day: 4, title: "Tiger Hill & Darjeeling", distance: "Approx. 130 km / 8 hours", description: "Start early for Tiger Hill, then visit the Himalayan Mountaineering Institute, zoo, Tenzing Rock, Tibetan Refugee Centre, tea-garden viewpoint and Peace Pagoda." },
      { day: 5, title: "Darjeeling to Bagdogra", distance: "Approx. 70 km / 3 hours", description: "Check out after breakfast and transfer to Bagdogra Airport for your onward journey." },
    ],
    inclusions: ["Four nights' accommodation", "Breakfast and dinner", "Private point-to-point transfers and sightseeing", "Permit fees and hotel taxes listed in the itinerary", "Rates for Indian nationals"],
    exclusions: ["Airfare or train fare", "Entrance and guide charges", "Toy Train, ropeway and optional activities", "Room heaters", "Sikkim sustainability fee when applicable", "Personal expenses and insurance", "Costs arising from landslides, roadblocks or political disruption"],
    notes: ["Original quotation validity was three days; live pricing must be reconfirmed.", "A government photo ID other than Aadhaar or PAN may be required for Tsomgo permits.", "Nathula Pass is optional, permit-dependent and closed on Mondays.", "Hill vehicles are assigned by sector and air-conditioning does not operate in hill areas."],
    cancellation: ["Booking to 30 days: communication charge or 10% plus GST, as applicable", "30-15 days: 25%", "14-7 days: 50%", "7-3 days: 75%", "Within 2 days or no-show: 100%"],
  },
  {
    slug: "shimla-and-manali",
    code: "CHD",
    title: "Shimla & Manali Escape",
    destination: "Himachal Pradesh",
    region: "North India",
    duration: "5 nights / 6 days",
    nights: 5,
    days: 6,
    travellers: "2 adults",
    priceFrom: 39600,
    priceLabel: "From Rs. 39,600 per couple",
    mealPlan: "MAP - breakfast and dinner",
    summary: "A classic mountain honeymoon pairing Shimla's heritage promenade with Manali, Solang Valley and the Atal Tunnel route.",
    image: "/images/island.jpg",
    imagePosition: "center 50%",
    tags: ["Mountain towns", "Solang Valley", "Private sedan"],
    highlights: ["Kufri and Shimla Mall Road", "Kullu Valley drive", "Old Manali landmarks", "Solang Valley and Atal Tunnel"],
    stays: [
      { place: "Shimla", nights: 2, property: "Woodrina or similar", room: "Deluxe room", meals: "Breakfast and dinner" },
      { place: "Manali", nights: 3, property: "A Star Regency or similar", room: "Deluxe room", meals: "Breakfast and dinner" },
    ],
    transport: ["Private sedan for the proposed itinerary", "Chandigarh pickup and drop", "Sightseeing and excursions listed in the itinerary"],
    itinerary: [
      { day: 1, title: "Chandigarh to Shimla", description: "Pickup from Chandigarh Railway Station and drive to Shimla for hotel check-in and an overnight stay." },
      { day: 2, title: "Kufri & Shimla", description: "Visit Kufri, followed by Shimla heritage sights, Christ Church, Gaiety Theatre, Scandal Point and Mall Road." },
      { day: 3, title: "Shimla to Manali", distance: "Approx. 265 km / 8 hours", description: "Check out after breakfast and travel through Sundernagar and Kullu Valley to Manali." },
      { day: 4, title: "Manali local sightseeing", description: "Visit Hadimba Temple, Manu Temple on foot, Vashisht Bath and Van Vihar, followed by time in the local market." },
      { day: 5, title: "Solang Valley & Atal Tunnel", description: "Excursion towards Solang Valley and the Atal Tunnel route. Rohtang Pass is optional, permit-dependent and directly payable when operating." },
      { day: 6, title: "Manali to Chandigarh", distance: "Approx. 320 km", description: "Check out and drive to Chandigarh for the scheduled railway-station drop." },
    ],
    inclusions: ["Five nights' accommodation", "Breakfast and dinner", "Private sedan transport", "Sightseeing and excursions listed in the itinerary", "One child under five without an extra bed, when applicable"],
    exclusions: ["Personal expenses", "Guide and entry charges", "Room heaters", "Rohtang Pass excursion and permit", "Insurance", "Upgrades", "Costs arising from route, date or weather changes"],
    notes: ["Fuel-price changes may revise the transport cost.", "Rohtang Pass is normally closed from November to May and on Tuesdays when operating.", "Hotels listed are proposed or similar and subject to confirmation."],
  },
  {
    slug: "andaman-island-honeymoon",
    code: "IXZ",
    title: "Andaman Island Honeymoon",
    destination: "Andaman Islands",
    region: "Bay of Bengal",
    duration: "4 nights / 5 days",
    nights: 4,
    days: 5,
    travellers: "2 adults",
    priceFrom: 42000,
    priceLabel: "From Rs. 42,000 per couple",
    mealPlan: "MAP - breakfast and dinner",
    summary: "Port Blair history, Havelock sunsets and island-hopping by private ferry with individual air-conditioned transfers.",
    image: "/images/dinner.jpg",
    imagePosition: "center 55%",
    tags: ["Island", "Private ferry", "Beach"],
    highlights: ["Cellular Jail light and sound show", "Ross and North Bay islands", "Radhanagar Beach", "Kalapathar Beach"],
    stays: [
      { place: "Port Blair", nights: 3, property: "Hotel Sweneha, TGS Dine or similar", room: "Double room", meals: "Breakfast and dinner" },
      { place: "Havelock", nights: 1, property: "Radhakrishna Resort or similar", room: "Double room", meals: "Breakfast and dinner" },
    ],
    transport: ["Individual air-conditioned vehicle for listed transfers", "Private ferry tickets between Port Blair and Havelock", "Airport pickup and drop"],
    itinerary: [
      { day: 1, title: "Arrive in Port Blair", description: "Airport transfer and time to rest, followed by Cellular Jail, Corbyn's Cove and the light and sound show when operating." },
      { day: 2, title: "Ross Island & North Bay", description: "Explore the former British administrative island and continue to North Bay, where optional water sports are available at additional cost." },
      { day: 3, title: "Port Blair to Havelock", description: "Travel by private ferry, check in and visit Radhanagar Beach for an island sunset." },
      { day: 4, title: "Kalapathar & Port Blair", description: "Visit Kalapathar Beach, return to Port Blair by ferry and keep the evening free for shopping." },
      { day: 5, title: "Departure", description: "Breakfast followed by your transfer to Port Blair Airport." },
    ],
    inclusions: ["Four nights' accommodation", "Breakfast and dinner", "Entry tickets for listed sightseeing", "Private ferry tickets", "Individual air-conditioned transfers and listed sightseeing"],
    exclusions: ["Flights", "Water sports", "Lunch", "Personal expenses, room service, drinks, tips and laundry", "Additional sightseeing", "Costs from weather, flight or ferry cancellations", "5% GST"],
    notes: ["Cellular Jail attractions are generally closed on Mondays.", "Ferry schedules and island sightseeing depend on weather and port operations.", "Hotels listed are proposed or similar and subject to availability."],
  },
];

export function getPackage(slug: string) {
  return honeymoonPackages.find((item) => item.slug === slug);
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
}
