/**
 * Every artist on ekchitra.com/artists, with the statement and the works shown
 * on their own page there (title, medium and size as published). Five artists'
 * pages list their works; for the other ten, the works are the ones already
 * in the gallery's collection. Artists are shown through their work, never a
 * portrait.
 */

export interface ArtistWork {
  title: string;
  medium: string;
  size: string;
  image: string;
}

export interface Artist {
  name: string;
  /** Anchor on this page, used by the header menu. */
  id: string;
  /** The artist's page on ekchitra.com. */
  href: string;
  statement: string;
  works: ArtistWork[];
}

const DIR = "/sites/ekchitra-redesign/artists";
const COLLECTION = "/sites/ekchitra-redesign/artworks";
const SITE = "https://www.ekchitra.com/artists";

export const artistId = (name: string) =>
  `artist-${name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;

const artist = (
  name: string,
  slug: string,
  statement: string,
  works: ArtistWork[],
): Artist => ({
  name,
  id: artistId(name),
  href: `${SITE}/${slug}`,
  statement,
  works,
});

const work = (
  title: string,
  medium: string,
  size: string,
  image: string,
): ArtistWork => ({ title, medium, size, image });

const charanjeet = [
  ["Untitled - 6", "16.5 x 12 Inches"],
  ["Untitled - 4", "16.5 x 12 Inches"],
  ["Untitled - 3", "16.5 x 12 Inches"],
  ["Untitled - 2", "16.5 x 12 Inches"],
  ["Untitled - 1", "16.5 x 12 Inches"],
  ["Untitled - 6", "15 x 11 Inches"],
  ["Untitled - 5", "15 x 11 Inches"],
  ["Untitled - 4", "15 x 11 Inches"],
  ["Untitled - 3", "15 x 11 Inches"],
  ["Untitled - 2", "15 x 11 Inches"],
  ["Untitled - 1", "15 x 11 Inches"],
].map(([title, size], index) =>
  work(
    title,
    "Acrylic on Paper",
    size,
    `${DIR}/charanjeet-singh-${index + 1}.jpg`,
  ),
);

export const ARTISTS: Artist[] = [
  artist(
    "Anupama Choudhary",
    "anupama-choudhary",
    "This artist explores the vibrant intersection of pop art and Indian mythology, employing a comic-book style to bring their vision to life. Their work reflects a deep appreciation for the rich narratives and characters found in Indian folklore. By merging traditional themes with contemporary aesthetics, the artist creates pieces that resonate with both cultural heritage and modern sensibilities.",
    [
      work(
        "Garuda",
        "Mixed Media on Canvas",
        "36 x 36 Inches",
        `${DIR}/anupama-choudhary-1.jpg`,
      ),
      work(
        "Arthanareeswara",
        "Mixed Media on Canvas",
        "36 x 36 Inches",
        `${DIR}/anupama-choudhary-2.jpg`,
      ),
      work(
        "Warhalseque",
        "Mixed Media on Canvas",
        "36 x 36 Inches",
        `${DIR}/anupama-choudhary-3.jpg`,
      ),
    ],
  ),
  artist(
    "Ashok Juttu",
    "ashok-juttu",
    "Their works are postmodernist explorations, lightly touched by notions of deconstructionism, where the artist unravels surfaces that bear the scars and whispers of time’s passage, rock faces eroded by wind, walls peeling under neglect, cave paintings fading into myth, and traditional art on village homes weathered by the elements.",
    [
      work(
        "Unexplored Heritage - 051",
        "Acrylic, Fabric & Acid Wash on Canvas",
        "78 x 96 Inches",
        `${DIR}/ashok-juttu-1.jpg`,
      ),
      work(
        "Untitled - 1",
        "Acrylic Ink & Acrylic Pens on Canvas",
        "60 x 66 Inches",
        `${DIR}/ashok-juttu-2.jpg`,
      ),
    ],
  ),
  artist(
    "Chandrapal Panjre",
    "chandrapal-panjre",
    "Artwork-making is an enjoyable and meditative process for him. The elements of his artwork represent rural lifestyle and rural culture. What he creates is a map of his inner exploration — his own world. He pieces together scraps of cloth as if they were canvas and colours, and travels through them with a needle and thread.",
    [
      work(
        "Untitled - 1",
        "Mixed Media",
        "24 x 30 Inches",
        `${COLLECTION}/untitled-1--chandrapal-panjre.png`,
      ),
    ],
  ),
  artist(
    "Charanjeet Singh",
    "charanjeet-singh",
    "Charanjeet Singh is a contemporary artist whose creations echo the whispers of history and advocate for water conservation. Drawing inspiration from the ancient step wells of India and the rich tradition of Mughal miniature paintings, Singh seamlessly weaves together these influences to convey a crucial message about the preservation of water and the timeless lessons of history.",
    charanjeet,
  ),
  artist(
    "Dilip Kumar",
    "dilip-kumar",
    "Dilipkumar Kesavan is an artist based in Chennai whose work is deeply rooted in the textures and stories of his surroundings. His creative process begins each day with his journey along the scenic coastal road to his studio in Mahabalipuram, filled with sights of swaying palms, scattered shells, and vibrant greens.",
    [
      work(
        "Paths - 2",
        "Acrylic on Plywood",
        "53 x 48 Inches",
        `${DIR}/dilip-kumar-1.jpg`,
      ),
      work(
        "Paths - 1",
        "Acrylic on Plywood",
        "53 x 50 Inches",
        `${DIR}/dilip-kumar-2.jpg`,
      ),
    ],
  ),
  artist(
    "Farhad Hussain",
    "farhad-hussain",
    "The painting presents a surreal scene where the woman appears in quiet harmony with the birds around her. The flying birds create a sense of movement, contrasting with her composed expression. Elements like the rose, violin, and teacup symbolize beauty, music, and reflection.",
    [
      work(
        "Harmony of Nature and Mind",
        "Acrylic on Canvas",
        "36 x 36 Inches",
        `${COLLECTION}/harmony-of-nature-and-mind--farhad-hussain.png`,
      ),
    ],
  ),
  artist(
    "Kolipitchai Prabhakar",
    "kolipitchai-prabhakar",
    "The artist believes that many visual artists naturally return to their native landscapes, drawing inspiration from cultural roots and childhood memories etched deep within their consciousness. With this same intention, he has spent the past two years documenting his native region.",
    [
      work(
        "Vernacular House",
        "Acrylic on Canvas",
        "24 x 36 Inches",
        `${COLLECTION}/vernacular-house-2--kolipitchai-prabhakar.png`,
      ),
    ],
  ),
  artist(
    "Manish Sharma",
    "manish-sharma",
    "His art poignantly explores themes of nostalgia and cultural preservation. Born in the culturally rich town of Bikaner, Rajasthan, Sharma has witnessed the rapid changes and cultural erosion in his hometown, and emphasizes the importance of safeguarding cultural identity and history in the face of globalization.",
    [
      work(
        "Sites of Remembering",
        "Wood, Iron, Acrylic and PU",
        "36 x 65 x 7 Inches",
        `${COLLECTION}/sites-of-remembering--manish-sharma.png`,
      ),
    ],
  ),
  artist(
    "Parul Kaur",
    "parul-kaur",
    "Parul Kaur is a Baroda-based artist currently working in Surat. Watercolour is her primary medium, through which she explores how artificial, temporary, and man-made interventions affect the human mind and shape emotional responses.",
    [
      work(
        "Between Presence and Absence 3",
        "Watercolor on Stamp Papers",
        "14 x 20 Inches",
        `${COLLECTION}/between-presence-and-absence-3--parul-kaur-trimmed.png`,
      ),
    ],
  ),
  artist(
    "Rahul & Gunjan",
    "rahul-%26-gunjan",
    "Threadarte, which began as an experiment in 2004 to deal with textile waste, became Rahul and Gunjan’s unique language. They collect and sort waste yarns from various sources and integrate them through manual process, incorporating coloured and textured yarns, strips of fabric, metallic threads and metals to create painterly installations.",
    [
      work(
        "Finding My Ground",
        "Collected Wool Silk, Linen, Cotton & Steel",
        "64 x 84 Inches",
        `${COLLECTION}/finding-my-ground--rahul-and-gunjan.png`,
      ),
    ],
  ),
  artist(
    "Rajesh Naik",
    "rajesh-naik",
    "Born in the suburbs of Hyderabad, the artist began supporting his family from an early age, driving an autorickshaw at night. This early immersion into the gritty realities of life exposed him to a unique local ghetto culture, and his focus has always been on using art to make a meaningful difference.",
    [
      work(
        "Meri Maa Ki Dua",
        "Metal",
        "30 x 30 Inches",
        `${COLLECTION}/meri-maa-ki-dua--rajesh-naik.png`,
      ),
    ],
  ),
  artist(
    "Sarvanan Parasuraman",
    "sarvanan-parasuraman",
    "“Modified Continuity” is a series of artworks that emerges from their attempts to continually refine and elevate their stance on the things they once believed, practiced, achieved, or experienced — recognising that what persists is essentially an extension of what came before.",
    [
      work(
        "Modified Continuity",
        "Paper Board",
        "48 x 48 Inches",
        `${COLLECTION}/modified-continuity--sarvanan-parasuraman.png`,
      ),
    ],
  ),
  artist(
    "Selva Kumar",
    "selva-kumar",
    "He has over 22 years of experience in traditional and digital sculpting. His journey began with a strong foundation in clay and fine arts; he has been recognised internationally with two awards in watercolour painting, and contributed to Hollywood productions including Boss Baby, Puss in Boots and Kung Fu Panda.",
    [
      work(
        "Embrace of Light",
        "Stainless Steel and Corten Steel",
        "36 x 38 x 16 Inches",
        `${COLLECTION}/embrace-of-light--selvakumar.png`,
      ),
    ],
  ),
  artist(
    "Subodh Kerkar",
    "subodh-kekar",
    "Subodh describes himself as an “ocean artist.” The ocean, he says, exists both inside and outside his works; it is his master and his muse. He believes that artists are sensors, receptors, and transmitters of ideas within a society.",
    [
      work(
        "Head 1",
        "Ceramic Clay with Red Oxide",
        "18.5 x 11 Inches",
        `${COLLECTION}/head-1--subodh-kerkar-trimmed.png`,
      ),
    ],
  ),
  artist(
    "Vinod Daroz",
    "vinod-daroz",
    "Vinod Daroz, an Indian artist born into a family of traditional jewellers, carries forward a heritage of refined craftsmanship and meticulous attention to detail. Mentored by renowned ceramist Jyotsna Bhatt, he was introduced to the world of studio pottery and ceramics.",
    [
      work(
        "Sanctum (From the series of Aikyam)",
        "Porcelain and Stoneware with Liquid Gold",
        "12 x 12 x 5.5 Inches Each",
        `${DIR}/vinod-daroz-1.jpg`,
      ),
    ],
  ),
];

/** Every work by every artist. */
export const ARTIST_WORK_COUNT = ARTISTS.reduce(
  (total, item) => total + item.works.length,
  0,
);
