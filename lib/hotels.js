// Hotel catalogue for Pine Travel. Add a hotel by copying one object below.
// Prices are plain numbers (PKR/night). Cottages are whole-unit bookings
// that contain multiple rooms (roomCount 1–10).

export const hotels = [
  // ───────────────────────────────────────────────────────────────────────
  // Pine Park Hotel Shogran — SCAFFOLD.
  // The room "photos" arrays are empty and the lineup below is a placeholder.
  // Replace the room names / prices / beds / sizes and drop the real images
  // from https://pineparkshogran.com/rooms/ into
  // public/images/hotels/pine-park-shogran/ , then list them in each room's
  // "photos" array (e.g. photos: ["/images/hotels/pine-park-shogran/standard-1.jpg"]).
  // rating / reviews / offer / feedback are intentionally omitted until real.
  // ───────────────────────────────────────────────────────────────────────
  {
    slug: "pine-park-shogran",
    name: "Pine Park Hotel Shogran",
    location: "Shogran, Kaghan Valley",
    region: "Khyber Pakhtunkhwa",
    tone: "green",
    tagline: "Pine-wrapped comfort in the meadows of Shogran",
    short: "A hillside hotel among the pines of Shogran — a cool-summer base for Siri Paye, Makra Peak and the Kaghan circuit.",
    about:
      "Pine Park Hotel sits among the cedar and pine forests of Shogran in the Kaghan Valley, a short jeep ride below the Siri Paye meadows. This page is wired for real content — add the room photos and details from pineparkshogran.com and every room below becomes a clickable gallery with its own booking form.",
    experience: {
      title: "Experience Shogran, in comfort",
      body: "Forest-facing rooms, warm interiors for the cool mountain nights, and Siri Paye jeep trips arranged at reception.",
      points: ["Forest & valley-facing rooms", "On-site restaurant", "Siri Paye jeep desk"],
    },
    facilities: [
      { icon: "Wifi", label: "Free Wi-Fi" },
      { icon: "Mountain", label: "Mountain view" },
      { icon: "UtensilsCrossed", label: "In-house restaurant" },
      { icon: "Flame", label: "Room heating" },
      { icon: "Car", label: "Free parking" },
      { icon: "ConciergeBell", label: "24/7 front desk" },
      { icon: "Bath", label: "Hot water" },
      { icon: "Zap", label: "Power backup" },
    ],
    features: [
      { icon: "Mountain", title: "Among the pines", body: "Set in Shogran's forest with cool summers and easy access to the Siri Paye meadows." },
      { icon: "Compass", title: "Siri Paye & Makra", body: "Jeeps and guides for Siri Paye and Makra Peak, arranged at the front desk." },
      { icon: "UtensilsCrossed", title: "On-site kitchen", body: "Hot desi food and breakfast served through the day." },
    ],
    gallery: ["green", "pine", "teal", "slate", "amber", "deep"],
    // ── Placeholder room lineup — replace with the real rooms + photos ──
    rooms: [
      { id: "standard", type: "room", name: "Standard Room", guests: 2, beds: "1 Double bed", size: "—", price: 12000, tone: "green", amenities: ["Forest view", "Heating", "Ensuite bath", "Free Wi-Fi"], photos: [], description: "" },
      { id: "deluxe", type: "room", name: "Deluxe Room", guests: 3, beds: "1 Double + 1 Single", size: "—", price: 16000, tone: "teal", amenities: ["Valley view", "Heating", "Ensuite bath", "Free Wi-Fi"], photos: [], description: "" },
      { id: "executive", type: "suite", name: "Executive Suite", guests: 4, beds: "1 King + sofa bed", size: "—", price: 22000, tone: "amber", amenities: ["Sitting lounge", "Heating", "Bathtub", "Balcony"], photos: [], description: "" },
      { id: "family-suite", type: "suite", name: "Family Suite", guests: 5, beds: "2 bedrooms", size: "—", price: 28000, tone: "slate", amenities: ["2 rooms", "Heating", "Sitting area", "Extra bedding"], photos: [], description: "" },
    ],
    feedback: [],
  },

  {
    slug: "pinecrest-resort-hunza",
    name: "Pinecrest Resort Hunza",
    location: "Karimabad, Hunza",
    region: "Gilgit-Baltistan",
    tone: "amber",
    rating: 4.9,
    reviews: 214,
    tagline: "Wake up to Rakaposhi from your window",
    short: "A warm mountain resort above Karimabad with panoramic views of Rakaposhi and the Hunza valley.",
    about:
      "Perched on the terraces above Karimabad, Pinecrest Resort blends traditional Hunzai hospitality with the comforts travellers expect. Every room faces the valley, mornings begin with apricot-blossom air and Rakaposhi glowing over breakfast, and evenings end around the bonfire. Whether you are here for a family holiday, an autumn photography trip or a quiet honeymoon, our team looks after the details so you can simply take in the north.",
    experience: {
      title: "Experience Luxury, mountain-style",
      body: "Heated rooms with locally woven textiles, a glass-fronted dining hall over the valley, and a terrace garden built for golden-hour tea. Understated, warm and unmistakably Hunza.",
      points: ["Valley-facing heated rooms", "Farm-to-table Hunzai cuisine", "Terrace garden & bonfire deck"],
    },
    facilities: [
      { icon: "Wifi", label: "Free Wi-Fi" },
      { icon: "Mountain", label: "Mountain view" },
      { icon: "UtensilsCrossed", label: "In-house restaurant" },
      { icon: "Flame", label: "Room heating" },
      { icon: "Car", label: "Free parking" },
      { icon: "ConciergeBell", label: "24/7 front desk" },
      { icon: "Bath", label: "Hot water" },
      { icon: "Zap", label: "Power backup" },
      { icon: "Trees", label: "Terrace garden" },
      { icon: "Coffee", label: "Breakfast included" },
      { icon: "Shirt", label: "Laundry service" },
      { icon: "Bus", label: "Airport transfer" },
    ],
    features: [
      { icon: "Mountain", title: "Panoramic valley rooms", body: "Every room and cottage opens to a Rakaposhi or Hunza-valley view — no courtyard-facing compromises." },
      { icon: "UtensilsCrossed", title: "Hunzai & Pakistani kitchen", body: "Apricot dishes, chapshuro, fresh trout and desi breakfasts, cooked with local produce." },
      { icon: "Flame", title: "Bonfire & BBQ evenings", body: "Nightly bonfire on the deck with optional BBQ platters and Hunzai music on weekends." },
      { icon: "Compass", title: "Day-trips arranged", body: "Attabad Lake, Passu Cones, Khunjerab and Eagle's Nest sunrise — booked at reception." },
      { icon: "Users", title: "Family & group cottages", body: "Self-contained cottages from 2 to 10 rooms for families, friends and full tour groups." },
      { icon: "Zap", title: "Backup power & hot water", body: "Round-the-clock power backup and solar-assisted hot water, even in peak winter." },
    ],
    gallery: ["amber", "pine", "slate", "teal", "green", "deep"],
    offer: { title: "Autumn in Hunza — 15% off", detail: "Book any room or cottage for 3 nights or more this autumn and save 15% on the total stay.", code: "PINE15", discountPct: 15, minNights: 3 },
    rooms: [
      { id: "deluxe", type: "room", name: "Deluxe Valley Room", guests: 2, beds: "1 Queen bed", size: "24 m²", price: 12000, tone: "amber", amenities: ["Valley view", "Heating", "Ensuite bath", "Free Wi-Fi"] },
      { id: "family", type: "room", name: "Family Room", guests: 4, beds: "2 Queen beds", size: "34 m²", price: 16000, tone: "green", amenities: ["Valley view", "Heating", "Kettle & minibar", "Extra bedding"] },
      { id: "suite", type: "suite", name: "Rakaposhi Suite", guests: 3, beds: "1 King + sofa bed", size: "42 m²", price: 22000, tone: "slate", amenities: ["Corner view", "Sitting lounge", "Bathtub", "Balcony"] },
      { id: "pine-cottage", type: "cottage", name: "Pine Cottage", roomCount: 2, guests: 4, beds: "2 bedrooms", size: "Private cottage", price: 30000, tone: "pine", amenities: ["2 bedrooms", "Living room", "Private porch", "Tea corner"] },
      { id: "cedar-cottage", type: "cottage", name: "Cedar Cottage", roomCount: 4, guests: 8, beds: "4 bedrooms", size: "Private cottage", price: 55000, tone: "teal", amenities: ["4 bedrooms", "Lounge & kitchen", "Garden access", "Group dining"] },
      { id: "deodar-lodge", type: "cottage", name: "Deodar Group Lodge", roomCount: 10, guests: 20, beds: "10 bedrooms", size: "Whole lodge", price: 130000, tone: "deep", amenities: ["10 bedrooms", "Private dining hall", "Bonfire pit", "Ideal for tour groups"] },
    ],
    feedback: [
      { name: "Sana Tariq", trip: "Family stay · October", rating: 5, quote: "The valley view from the family room was unreal. Kids loved the bonfire and staff felt like family." },
      { name: "Usman & Group", trip: "Deodar Lodge · Group tour", rating: 5, quote: "We booked the 10-room lodge for our group of 18. Smooth check-in, great food, zero hassle." },
      { name: "Hira Naveed", trip: "Honeymoon · September", rating: 5, quote: "Quiet, warm and beautiful. The Rakaposhi Suite balcony at sunrise is worth every rupee." },
    ],
  },

  {
    slug: "shangrila-view-skardu",
    name: "Shangrila View Skardu",
    location: "Kachura, Skardu",
    region: "Gilgit-Baltistan",
    tone: "slate",
    rating: 4.8,
    reviews: 168,
    tagline: "Where the cold desert meets alpine lakes",
    short: "A serene lakeside retreat near Upper Kachura, minutes from Shangrila and the road to Deosai.",
    about:
      "Set among poplars near Upper Kachura Lake, Shangrila View is a calm base for exploring Skardu — the cold desert, Shigar fort, Sadpara and the Deosai plains. Rooms are bright and simple, the kitchen leans on fresh lake trout and local apricots, and the lawn runs almost to the water. It suits slow lake days as easily as it does early jeep starts for the high plateau.",
    experience: {
      title: "Experience Luxury by the lake",
      body: "Lakeview rooms, a willow-shaded lawn, and warm evenings indoors when the desert cools. Simple, spacious and quietly premium.",
      points: ["Lakeview & garden rooms", "Fresh trout kitchen", "Jeep desk for Deosai"],
    },
    facilities: [
      { icon: "Wifi", label: "Free Wi-Fi" },
      { icon: "Waves", label: "Lake access" },
      { icon: "UtensilsCrossed", label: "Restaurant" },
      { icon: "Flame", label: "Room heating" },
      { icon: "Car", label: "Free parking" },
      { icon: "ConciergeBell", label: "Front desk" },
      { icon: "Bath", label: "Hot water" },
      { icon: "Zap", label: "Power backup" },
      { icon: "Trees", label: "Lakeside lawn" },
      { icon: "Coffee", label: "Breakfast included" },
      { icon: "Bus", label: "Jeep / transfer desk" },
      { icon: "Sun", label: "Bonfire evenings" },
    ],
    features: [
      { icon: "Waves", title: "Lakeside setting", body: "A private lawn running to Upper Kachura — perfect for tea, photos and slow mornings." },
      { icon: "UtensilsCrossed", title: "Fresh trout kitchen", body: "Lake-caught trout, Balti curries and desi breakfasts prepared to order." },
      { icon: "Compass", title: "Deosai & Shigar trips", body: "4x4 jeeps and guides for Deosai, Sadpara, Shigar fort and the cold desert." },
      { icon: "Flame", title: "Warm indoor evenings", body: "Heated rooms and a cosy lounge for when the desert night turns cold." },
      { icon: "Users", title: "Cottages for groups", body: "Multi-room cottages that keep families and tour groups together." },
      { icon: "Zap", title: "Reliable utilities", body: "Backup power and hot water throughout your stay." },
    ],
    gallery: ["slate", "teal", "deep", "green", "amber", "pine"],
    offer: { title: "Skardu long-stay — 12% off", detail: "Stay 4 nights or more and get 12% off your total — ideal for a full Skardu circuit.", code: "SKARDU12", discountPct: 12, minNights: 4 },
    rooms: [
      { id: "lakeview", type: "room", name: "Lakeview Room", guests: 2, beds: "1 Queen bed", size: "26 m²", price: 14000, tone: "slate", amenities: ["Lake view", "Heating", "Ensuite bath", "Wi-Fi"] },
      { id: "garden", type: "room", name: "Garden Twin Room", guests: 3, beds: "2 Single + 1", size: "30 m²", price: 15000, tone: "green", amenities: ["Garden view", "Heating", "Tea corner", "Extra bed"] },
      { id: "lake-suite", type: "suite", name: "Kachura Suite", guests: 3, beds: "1 King + sofa", size: "44 m²", price: 24000, tone: "teal", amenities: ["Panoramic lake view", "Lounge", "Bathtub", "Terrace"] },
      { id: "willow-cottage", type: "cottage", name: "Willow Cottage", roomCount: 3, guests: 6, beds: "3 bedrooms", size: "Private cottage", price: 42000, tone: "pine", amenities: ["3 bedrooms", "Living room", "Lawn access", "Kitchenette"] },
      { id: "poplar-cottage", type: "cottage", name: "Poplar Cottage", roomCount: 5, guests: 10, beds: "5 bedrooms", size: "Private cottage", price: 68000, tone: "deep", amenities: ["5 bedrooms", "Group lounge", "Dining area", "Bonfire pit"] },
      { id: "lakehouse", type: "cottage", name: "Lakehouse (Whole)", roomCount: 8, guests: 16, beds: "8 bedrooms", size: "Whole house", price: 108000, tone: "amber", amenities: ["8 bedrooms", "Private lawn", "Full kitchen", "Great for groups"] },
    ],
    feedback: [
      { name: "Bilal Ahmed", trip: "Lakeview · July", rating: 5, quote: "Opened the curtains to the lake every morning. Trout dinner on the lawn was the highlight." },
      { name: "Rida & Family", trip: "Willow Cottage · August", rating: 5, quote: "The 3-room cottage was perfect for us. Staff arranged our Deosai jeep in minutes." },
      { name: "Zeeshan Group", trip: "Lakehouse · Corporate trip", rating: 5, quote: "Booked the whole lakehouse for our team offsite. Clean, spacious and well managed." },
    ],
  },

  {
    slug: "riverpine-lodge-naran",
    name: "Riverpine Lodge Naran",
    location: "Naran Bazaar, Kaghan Valley",
    region: "Khyber Pakhtunkhwa",
    tone: "green",
    rating: 4.7,
    reviews: 190,
    tagline: "Riverside pines, minutes from Saif-ul-Malook",
    short: "A cosy riverside lodge in the heart of Naran, walking distance from the bazaar and the jeep stand.",
    about:
      "Right on the Kunhar river in Naran, Riverpine Lodge is built for easy mountain holidays — a short walk to the bazaar, the jeep stand for Lake Saif-ul-Malook, and the road up to Babusar Top. Rooms are snug and heated, the restaurant serves hot desi food late into the night, and the sound of the river carries into every room. It is a favourite for families and weekend groups from Islamabad and Rawalpindi.",
    experience: {
      title: "Experience Luxury on the Kunhar",
      body: "Riverfront balconies, wood-warm interiors and a heated dining hall — comfort after a long day on the jeep tracks.",
      points: ["Riverfront balcony rooms", "Late-night desi kitchen", "Walk to bazaar & jeep stand"],
    },
    facilities: [
      { icon: "Wifi", label: "Free Wi-Fi" },
      { icon: "Waves", label: "Riverfront" },
      { icon: "UtensilsCrossed", label: "Restaurant" },
      { icon: "Flame", label: "Room heating" },
      { icon: "Car", label: "Parking" },
      { icon: "ConciergeBell", label: "Front desk" },
      { icon: "Bath", label: "Hot water" },
      { icon: "Zap", label: "Power backup" },
      { icon: "Mountain", label: "Valley view" },
      { icon: "Coffee", label: "Breakfast" },
      { icon: "Bus", label: "Jeep desk" },
      { icon: "Sun", label: "Bonfire" },
    ],
    features: [
      { icon: "Waves", title: "On the Kunhar river", body: "Riverfront rooms with the sound of the water — balconies right above the flow." },
      { icon: "MapPin", title: "Central location", body: "Steps from Naran bazaar and the Saif-ul-Malook jeep stand." },
      { icon: "UtensilsCrossed", title: "Hot desi kitchen", body: "Karahi, BBQ and fresh naan served late — perfect after a cold day out." },
      { icon: "Compass", title: "Saif-ul-Malook & Babusar", body: "Jeeps and guides for the lake, Lulusar, Babusar Top and Naran valley." },
      { icon: "Users", title: "Group cottages", body: "Multi-room cottages for families and weekend groups." },
      { icon: "Flame", title: "Warm & snug", body: "Wood-warm heated rooms for the cool Kaghan nights." },
    ],
    gallery: ["green", "pine", "teal", "amber", "slate", "deep"],
    offer: { title: "Weekend escape — 10% off", detail: "Book 2 nights or more and take 10% off your riverside stay in Naran.", code: "NARAN10", discountPct: 10, minNights: 2 },
    rooms: [
      { id: "river-room", type: "room", name: "Riverfront Room", guests: 2, beds: "1 Queen bed", size: "22 m²", price: 10000, tone: "green", amenities: ["River view", "Balcony", "Heating", "Wi-Fi"] },
      { id: "family-room", type: "room", name: "Family Room", guests: 4, beds: "2 Queen beds", size: "32 m²", price: 14000, tone: "teal", amenities: ["Valley view", "Heating", "Extra bedding", "Kettle"] },
      { id: "pine-suite", type: "suite", name: "Kunhar Suite", guests: 3, beds: "1 King + sofa", size: "40 m²", price: 20000, tone: "amber", amenities: ["River-facing", "Sitting area", "Bathtub", "Balcony"] },
      { id: "fir-cottage", type: "cottage", name: "Fir Cottage", roomCount: 2, guests: 4, beds: "2 bedrooms", size: "Private cottage", price: 26000, tone: "pine", amenities: ["2 bedrooms", "Living room", "River porch", "Tea corner"] },
      { id: "spruce-cottage", type: "cottage", name: "Spruce Cottage", roomCount: 6, guests: 12, beds: "6 bedrooms", size: "Private cottage", price: 72000, tone: "slate", amenities: ["6 bedrooms", "Group lounge", "Dining hall", "Bonfire pit"] },
      { id: "riverlodge", type: "cottage", name: "Riverlodge (Whole)", roomCount: 9, guests: 18, beds: "9 bedrooms", size: "Whole lodge", price: 116000, tone: "deep", amenities: ["9 bedrooms", "Private riverfront", "Full kitchen", "Tour-group ready"] },
    ],
    feedback: [
      { name: "Ahsan Malik", trip: "Riverfront · June", rating: 5, quote: "Slept to the sound of the river. Walking distance to everything and the karahi was superb." },
      { name: "Nadia & Friends", trip: "Spruce Cottage · July", rating: 5, quote: "Six rooms for our group of eleven — kept us all together. Bonfire night was the best part." },
      { name: "Kamran Family", trip: "Family Room · August", rating: 5, quote: "Great base for Saif-ul-Malook. Warm rooms, helpful staff, easy jeep booking at the desk." },
    ],
  },
];

export function getHotel(slug) {
  return hotels.find((h) => h.slug === slug);
}

export function priceFrom(hotel) {
  return Math.min(...hotel.rooms.map((r) => r.price));
}

export function formatPKR(n) {
  return "Rs " + Number(n).toLocaleString("en-US");
}
