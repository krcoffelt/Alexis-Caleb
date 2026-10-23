// Single source of truth for every wedding fact shown on the site.
// Facts come from content/publish-candidate-content.md (Joy snapshot, Oct 23 2026).
// Items marked CONFIRM still need couple sign-off before launch.

export const site = {
  couple: {
    displayName: "Alexis & Caleb",
    monogramSubtitle: "Caleb & Alexis",
    fullNames: "Alexis Guillen & Caleb Jardina-Kish",
  },
  date: {
    iso: "2027-05-11T16:00:00-05:00", // 4:00 PM America/Cancun (UTC-5, no DST)
    long: "Tuesday, May 11, 2027",
    short: "May 11, 2027",
    timeZone: "America/Cancun",
  },
  venue: {
    name: "Hotel Xcaret México",
    city: "Playa del Carmen, Quintana Roo",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Hotel+Xcaret+M%C3%A9xico+Playa+del+Carmen",
  },
  rsvp: {
    deadline: "December 7, 2026", // CONFIRM: FAQ value; Joy announcement still says TBD
  },
  booking: {
    coordinator: "Amy Cate",
    // CONFIRM: contactId parameter is blank in the source link.
    url: "https://booking.destinationweddings.com/attend/event?eventId=949610&contactId=",
    paymentPlanDeadline: "January 26, 2027", // CONFIRM with coordinator
    dayPass: "$150 to $200 per day pass", // CONFIRM currency / eligibility
  },
  registry: {
    // CONFIRM: hydrated Joy CTA. An older Honeyfund link also exists.
    url: "https://withjoy.com/alexis-and-caleb-may-2027/registry",
  },
  // Optional contact line from the visible Joy FAQ. Set to null to hide it.
  contact: { name: "Alexis", phone: "812-493-5336" } as { name: string; phone: string } | null,
  photographer: "Reilley Photography",
  // Hero water footage: "Serene Reflections on a Summer Pool Surface" by
  // Stefanie Jockschat, Pexels video 31083303 (Pexels License: free to use,
  // no attribution required). Swap the file to change the clip.
  oceanVideo: { src: "/media/ocean-loop.mp4", poster: "/media/ocean-poster.jpg" },
  // Aerial shoreline: Pexels video 6901752 by ArtHouse Studio (Pexels License).
  shorelineVideo: { src: "/media/shoreline.mp4", poster: "/media/shoreline-poster.jpg" },
};

export type ScheduleEvent = {
  day: string;
  date: string;
  time: string;
  title: string;
  attire?: string;
  body: string;
  photo: string;
  photoAlt: string;
};

export const schedule: ScheduleEvent[] = [
  {
    day: "Sunday",
    date: "May 9, 2027",
    time: "4:00 PM",
    title: "Welcome Party",
    attire: "All White Event",
    body: "Please join us at our welcome party for all our guests. More details to come!",
    photo: "fountain-dance",
    photoAlt: "Alexis and Caleb dancing beside a stone fountain",
  },
  {
    day: "Tuesday",
    date: "May 11, 2027",
    time: "4:00 PM",
    title: "Wedding Day",
    body: "The big day at Hotel Xcaret México. Final timings will be shared as soon as they’re set.",
    photo: "shoulders",
    photoAlt: "Alexis riding on Caleb's shoulders in a meadow",
  },
  {
    day: "Tuesday",
    date: "May 11, 2027",
    time: "Time to be announced",
    title: "Ceremony & Reception",
    attire: "Funky Formal",
    body: "We’re getting married! We’d love to share a few words with everyone. Dinner, drinks, and dancing to follow!",
    photo: "carry-kiss",
    photoAlt: "Caleb carrying Alexis in a garden",
  },
];

export const milestones = [
  {
    n: 1,
    title: "The Day We Met",
    when: "Spring 2021 · San Antonio",
    photo: "met-close",
    photoAlt: "Caleb holding Alexis's face as she smiles",
    body: "Caleb took a contract in San Antonio and we were working the same job. He was head of security, and I was in the medical tent. His first words about Texas: “It’s hot as hell here.”",
  },
  {
    n: 2,
    title: "Our First Date",
    when: "Señor Fish · San Antonio",
    photo: "first-date",
    photoAlt: "Alexis and Caleb laughing together",
    body: "Caleb ordered oysters, and little did I know it was his first time trying them! We spent hours talking, and that day became the stepping stone for where we are today.",
  },
  {
    n: 3,
    title: "The Easiest Yes",
    when: "Venice, Italy",
    photo: "venice-ring",
    photoAlt: "Alexis's hand with her engagement ring",
    body: "Italy will always have a special place in our hearts. Surrounded by some of the people closest to us, our trip ended with our engagement in Venice. It was beautiful, dreamy and so present.",
  },
];

export const storyIntro =
  "Caleb and I met in spring of 2021 while working together on a short contract. What we both thought was going to be a summer fling is now our forever. Two years of long distance and three years of living together, here we are five years later! We’re excited to make it official and share our special day with all of you!";

// Full Q&A, faithful to the hydrated Joy copy (spelling-only cleanup).
export const storyQA = [
  {
    q: "How did you two meet?",
    a: [
      "At work! Caleb took a contract in San Antonio and we were working on the same job. Caleb was head of security and I was working in the medical tent. He introduced himself and assured me if I needed anything, to reach out.",
      "Our first conversation, I asked Caleb how he was liking TX, and his words were, “It’s hot as hell here.” (It was 101 degrees that day in May.) Then he proceeded to tell me it had just snowed a couple of days ago in Buffalo, and my first words to my cousin were, “Eww, I would hate to live there.” Joke’s on me! lol",
    ],
  },
  {
    q: "Who made the first move? How?",
    a: [
      "Caleb made the first move. I was coming back from lunch and he happened to be standing in front of my tent and asked me for recommendations for good wings and sushi around the area. I had a large stain on my scrubs from the wings I had just eaten and recommended those ones! We laughed about it, exchanged numbers and went on our first group date shortly after!",
    ],
  },
  {
    q: "Who initiated the first kiss?",
    a: [
      "Caleb! He kissed me on his way back to his hotel after our first group date. I was not expecting it but it was sooo romantic, and I was blushing so hard I remember the bouncers laughing at me!",
    ],
  },
  {
    q: "What’s your most unforgettable date?",
    a: [
      "Our first date will always be our favorite. We went to Señor Fish in San Antonio and Caleb ordered oysters, and little did I know it was his first time trying them! It’s now one of our go-to appetizers, and it was the day we spent hours talking and getting to know each other. That day was the stepping stone for where we are today.",
    ],
  },
  {
    q: "What’s your favorite thing to do together?",
    a: ["We both LOVE the outdoors! Fishing is our favorite hobby, and going on a new foodie adventure is our go-to!"],
  },
  {
    q: "Where are you going for your honeymoon?",
    a: ["We’re undecided. Our priority is putting love into our home and preparing to start our own family!"],
  },
  {
    q: "What’s the best meal you’ve shared together?",
    a: [
      "We spent Valentine’s Day together last year in NYC and tried omakase for the first time. We shared our favorite food, sushi! Each piece was carefully curated by the chef and it was the BEST dining experience we’ve ever had!",
    ],
  },
  {
    q: "What’s the most memorable trip you’ve taken together?",
    a: [
      "Italy, of course! It will always have a special place in our hearts. Celebrating the union of one couple set the tone, then came quality time with some of the people closest to our hearts, ending in our engagement in Venice at the end of our trip. It was beautiful, dreamy, and the way we felt so present the whole trip is something we’ll always be thankful for.",
    ],
  },
];

export const faqs: { q: string; a: string }[] = [
  { q: "What’s the RSVP deadline?", a: `Please RSVP by ${site.rsvp.deadline}.` },
  { q: "Can I bring a date?", a: "All guests are allowed a +1." },
  {
    q: "Are kids welcome?",
    a: "We love your little ones, but the ceremony and reception are adults-only, with the exception of our daughter and her cousins.",
  },
  { q: "What’s the dress code?", a: "Funky formal for the ladies and beach formal for the guys." },
  {
    q: "What kind of shoes should I wear (or skip)?",
    a: "Ladies, please leave the stilettos at home. Seriously! There might be some uneven ground, so go for block heels or sandals instead. We don’t want anyone ruining their shoes or twisting an ankle!",
  },
  { q: "Is the wedding indoors or outdoors?", a: "The ceremony and reception will be outdoors, weather permitting." },
  {
    q: "What’s the weather like?",
    a: "Welcome to Mexico! Expect warm, tropical weather, usually 80 to 90°F, with the possibility of a quick rain shower. Evenings are comfortable, usually 70 to 75°F. We recommend lightweight clothes, sunscreen, and a little patience for the humidity. ;)",
  },
  {
    q: "Can we take photos during the wedding?",
    a: "Absolutely! We’d love for you to snap photos and share them with us. We just ask that you don’t take photos or videos during the ceremony.",
  },
  ...(site.contact
    ? [
        {
          q: "Who do I reach out to with questions?",
          a: `For questions, reach out to ${site.contact.name} at ${site.contact.phone}.`,
        },
      ]
    : []),
];

export const gallery = [
  { slug: "grass-laugh", alt: "Alexis laughing with her head in Caleb's lap" },
  { slug: "spin", alt: "Caleb lifting Alexis in a blooming garden" },
  { slug: "stone-arch", alt: "Alexis and Caleb beneath a stone archway" },
  { slug: "fishing", alt: "Alexis and Caleb fishing from a picnic blanket" },
  { slug: "kiss-close", alt: "Caleb kissing Alexis's cheek" },
  { slug: "field-wide-2", alt: "Alexis on Caleb's shoulders, small in a wide open meadow" },
  { slug: "barn-kiss", alt: "A kiss beside a weathered barn" },
  { slug: "field-cuddle", alt: "The couple cuddled together in tall grass" },
  { slug: "barn-hold", alt: "Alexis and Caleb embracing beside a weathered barn" },
  { slug: "fence", alt: "Alexis leaning over a wooden fence toward Caleb" },
  { slug: "embrace-bw", alt: "Black-and-white photo of Alexis hugging Caleb" },
  { slug: "field-sit", alt: "Alexis hugging Caleb from behind in a field" },
];
