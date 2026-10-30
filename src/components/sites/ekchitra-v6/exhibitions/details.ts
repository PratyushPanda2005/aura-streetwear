/**
 * What each exhibition's page on ekchitra.com says beyond the list: its
 * overview, the photographs of the show and the works listed with it —
 * copied from the gallery's own pages (text as published, bar an obvious
 * doubled comma) by a one-off scrape; pictures saved under
 * /sites/ekchitra-redesign/exhibitions/<slug>/ at up to 1600px. Keyed by
 * exhibitionSlug. Shows without a page there (the current ones) have no
 * entry. Pictures listed without any details (Editions, Unknowns 9) are
 * counted as views of the show, not works.
 */

export interface Picture {
  src: string;
  /** Natural width and height, px. */
  width: number;
  height: number;
}

export interface ShowWork extends Picture {
  title: string;
  artist?: string;
  medium?: string;
  size?: string;
  year?: string;
}

export interface ExhibitionDetail {
  /** The short line the overview opens with, where it has one. */
  tagline?: string;
  /** The overview's paragraphs, each with the small heading over it, if any. */
  overview: { heading?: string; text: string }[];
  /** Photographs of the show itself. */
  views: Picture[];
  works: ShowWork[];
}

const DIR = "/sites/ekchitra-redesign/exhibitions";

const pic = (src: string, width: number, height: number): Picture => ({
  src: `${DIR}/${src}`,
  width,
  height,
});

export const DETAILS: Record<string, ExhibitionDetail> = {
  "hyd-art": {
    overview: [
      {
        text: "Hyd Art 2025 – Navanaami is a thoughtfully curated celebration of Indian art, bringing together emerging and established artists from across the country alongside 30 leading contemporary artists from Hyderabad. The event features Keerthanam – A Tribute to Telugu Legends, a special homage to the region’s artistic heritage, along with a rare showcase of India’s modern masters, immersive installations, workshops, panel discussions, curatorial walks, and the Mahatma Book Release. Designed as a dynamic cultural platform, the exhibition creates meaningful dialogue between tradition and contemporary expression.",
      },
      {
        text: "The exhibition unfolds across curated zones including Masters of India, a vibrant national showcase of 30 emerging artists, a dedicated Hyderabad artists’ segment, and a special Mithila/Madhubani Art Show celebrating India’s rich folk traditions. Together, these sections offer collectors, art enthusiasts, and cultural patrons an engaging experience that bridges legacy, innovation, and regional identity, positioning Hyd Art 2025 as a landmark artistic gathering in the city’s cultural calendar.",
      },
    ],
    views: [
      pic("hyd-art/view-01.jpg", 1400, 935),
      pic("hyd-art/view-02.jpg", 1400, 935),
      pic("hyd-art/view-03.jpg", 1400, 935),
      pic("hyd-art/view-04.jpg", 1400, 935),
      pic("hyd-art/view-05.jpg", 1400, 935),
      pic("hyd-art/view-06.jpg", 1400, 935),
      pic("hyd-art/view-07.jpg", 1400, 935),
      pic("hyd-art/view-08.jpg", 1400, 935),
      pic("hyd-art/view-09.jpg", 933, 1400),
      pic("hyd-art/view-10.jpg", 1400, 933),
      pic("hyd-art/view-11.jpg", 1400, 933),
      pic("hyd-art/view-12.jpg", 1400, 933),
    ],
    works: [
      {
        ...pic("hyd-art/work-01.png", 1200, 1200),
        title: "Poolamma",
        artist: "Laxman Aelay",
        medium: "Acrylic on Linen canvas",
        size: "48x48 inch",
      },
      {
        ...pic("hyd-art/work-02.png", 1200, 1005),
        title: "Tail of a Blue Car",
        artist: "Thrigulla Murali",
        medium: "Oil on Canvas, Acrylic Background",
        size: "41 x 50 Inches",
      },
      {
        ...pic("hyd-art/work-03.png", 1200, 1382),
        title: "Modified Continuity",
        artist: "Sarvanan Parasuraman",
        medium: "Paper Board",
        size: "48 x 48 Inches",
      },
      {
        ...pic("hyd-art/work-04.png", 1200, 1202),
        title: "Arthanareeswara",
        artist: "Anupama Choudary",
        medium: "Mixed Media on Canvas",
        size: "36 x 36 Inches",
      },
    ],
  },
  swadhatri: {
    tagline: "Swadhatri: Rooted in Memory",
    overview: [
      {
        text: "Born on March 1, 1940, in Pamarru, Krishna district, B.A. Reddy grew up in a farming family as the eldest of seven children. His childhood was deeply connected to the rhythms of rural life—lush fields, flowing rivers, and close ties to nature shaped his early experiences. Unlike many children in his village, Reddy’s father never sent him to work in the fields. Instead, he encouraged his son’s creative inclinations, allowing him to explore his artistic instincts freely.",
      },
      {
        text: "Sensitive and artistically inclined he was captivated by the vibrant cultural traditions of his village. Festivals such as Sankranti, Nagapanchami, Gangalamma Jathara, Deepavali, and Vinayaka Chavithi left a lasting impression, later becoming central themes in his work. Until the 1960s, villages thrived as self-sufficient, culturally rich communities. Traditional art forms—including classical dance, folklore, Harikatha, Burrakatha, and leather puppetry—were an integral part of village festivities, deeply influencing Reddy’s artistic sensibilities.",
      },
    ],
    views: [
      pic("swadhatri/view-01.jpg", 1600, 1066),
      pic("swadhatri/view-02.jpg", 1600, 1066),
      pic("swadhatri/view-03.jpg", 1600, 1066),
      pic("swadhatri/view-04.jpg", 1600, 1066),
      pic("swadhatri/view-05.jpg", 1600, 1066),
      pic("swadhatri/view-06.jpg", 1600, 1066),
      pic("swadhatri/view-07.jpg", 1600, 1066),
    ],
    works: [
      {
        ...pic("swadhatri/work-01.jpg", 1600, 1193),
        title: "Amma",
        artist: "BA Reddy",
        size: "6 x 8 Inches",
      },
      {
        ...pic("swadhatri/work-02.jpg", 1600, 1201),
        title: "Akka Chelli",
        artist: "BA Reddy",
        size: "6 x 8 Inches",
      },
      {
        ...pic("swadhatri/work-03.jpg", 1593, 1600),
        title: "Abhayamu",
        artist: "BA Reddy",
        size: "8 x 8 Inches",
      },
      {
        ...pic("swadhatri/work-04.jpg", 1600, 1294),
        title: "Aananda Hela",
        artist: "BA Reddy",
        size: "18 x 14 Inches",
      },
    ],
  },
  "living-temple": {
    tagline: "A Celebration of Timeless Indian Heritage",
    overview: [
      {
        text: "Living Temple is a unique event that honours the resilience and beauty of traditional Indian art forms. Despite centuries of challenges, both ideological and physical, these art forms have endured and flourished through the unwavering dedication of their practitioners.",
      },
      {
        text: "The essence of Living Temple is to reconnect with this rich cultural legacy, bringing together a stunning array of Visual and Performing Arts, Contemporary Indian Art, Sculpture, and Literature from across the nation. Curated under one roof, this event offers a rare opportunity to experience the diverse, vibrant soul of India’s artistic heritage like never before Join us in celebrating the enduring spirit of Indian creativity, where tradition meets innovation in an unforgettable artistic journey.",
      },
    ],
    views: [
      pic("living-temple/view-01.jpg", 1066, 1600),
      pic("living-temple/view-02.jpg", 1600, 1066),
      pic("living-temple/view-03.jpg", 1600, 1066),
      pic("living-temple/view-04.jpg", 1600, 1066),
      pic("living-temple/view-05.jpg", 1600, 1066),
      pic("living-temple/view-06.jpg", 1600, 1066),
      pic("living-temple/view-07.jpg", 1600, 1066),
      pic("living-temple/view-08.jpg", 1600, 1066),
      pic("living-temple/view-09.jpg", 1600, 1066),
      pic("living-temple/view-10.jpg", 1600, 1066),
      pic("living-temple/view-11.jpg", 1600, 1066),
      pic("living-temple/view-12.jpg", 1600, 1066),
    ],
    works: [
      {
        ...pic("living-temple/work-01.jpg", 968, 1600),
        title: "Step-well-1",
        artist: "Charanjeet Singh",
        medium: "Acrylic on Canvas",
        size: "60 x 36 Inches",
        year: "2025",
      },
      {
        ...pic("living-temple/work-02.jpg", 1600, 1597),
        title: "Luminous Twilight",
        artist: "Om Soorya",
        medium: "acrylic on canvas",
        size: '48"x48"',
        year: "2023",
      },
      {
        ...pic("living-temple/work-03.jpg", 1089, 1600),
        title: "Underground Shiva Temple Gopuram",
        artist: "Parnavi Bangar",
        medium: "Digital print with acrylic layering",
        size: "25 x 35cm",
      },
      {
        ...pic("living-temple/work-04.jpg", 1471, 1600),
        title: "Embracing the Light",
        artist: "Vaishali Rastogi Sahni",
        medium: "Paper Sculpture",
        size: "103 x 83 x 88 cms",
        year: "2023",
      },
    ],
  },
  "naik-city": {
    overview: [
      {
        text: "Rajesh Naik’s life is a thrilling blend of street smarts, rebellion, and artistic brilliance—crafted in the chaotic symphony of Hyderabad’s Old City. Born to an auto driver, Naik didn’t just watch life pass by from the sidelines. By the time he was in seventh grade, he was behind the wheel of his father’s autorickshaw. Nights became his domain, where legality took a back seat, and the auto became his trusted sidekick and partner in adventure.",
      },
      {
        text: "The night had its own rhythm, and Naik thrived in it. Driving through the bustling lanes, he mingled with people from every corner of society. From street hustlers to late-night dreamers, every interaction gave Naik a crash course in humanity—particularly the quirky behaviors that surface after dark. For Naik, the city wasn’t just alive; it was a living, breathing storybook, begging to be explored.",
      },
      {
        text: "But Naik wasn’t all work and no play. Oh no! This guy had a rebellious streak a mile wide. Selling movie tickets in black? Check. Betting on bike races? Absolutely. Hanging out with his crew who loved rapping and street culture?",
      },
      {
        text: "Of course! Yet, amid all the street smarts and mischief, Naik had a burning love for art. Shaping his creative journey from an early age. His vivid color palette and attention to detail, a signature of his work, were deeply rooted in the vibrant world of his childhood. Growing up surrounded by the lively hues of the Lambada community and the intricate, colorful embroideries crafted by his mother, he absorbed a love for brightness and energy.",
      },
    ],
    views: [
      pic("naik-city/view-01.jpg", 719, 1600),
      pic("naik-city/view-02.jpg", 719, 1600),
      pic("naik-city/view-03.jpg", 1600, 719),
      pic("naik-city/view-04.jpg", 1600, 719),
      pic("naik-city/view-05.jpg", 1600, 719),
      pic("naik-city/view-06.jpg", 719, 1600),
      pic("naik-city/view-07.jpg", 1600, 719),
      pic("naik-city/view-08.jpg", 1600, 719),
      pic("naik-city/view-09.jpg", 719, 1600),
      pic("naik-city/view-10.jpg", 1600, 719),
      pic("naik-city/view-11.jpg", 719, 1600),
      pic("naik-city/view-12.jpg", 719, 1600),
    ],
    works: [
      {
        ...pic("naik-city/work-01.jpg", 1414, 1600),
        title: "Chal Mere Ghose Tik Tik Tik...",
        artist: "Rajesh Naik",
        medium: "Metal",
        size: "36 X 30 inches",
        year: "2024",
      },
      {
        ...pic("naik-city/work-02.jpg", 1401, 1600),
        title: "Mehnat ka fal Jarur Milega",
        artist: "Rajesh Naik",
        medium: "Metal",
        size: "36 X 30 inches",
        year: "2024",
      },
      {
        ...pic("naik-city/work-03.jpg", 1390, 1600),
        title: "Hirani Jaisi Chaal Rajini Jaisi Kamaal",
        artist: "Rajesh Naik",
        medium: "Metal",
        size: "36 X 30 inches",
        year: "2024",
      },
      {
        ...pic("naik-city/work-04.jpg", 1419, 1600),
        title: "Hathi Mera Sathi",
        artist: "Rajesh Naik",
        medium: "Metal",
        size: "36 X 30 inches",
        year: "2024",
      },
    ],
  },
  "house-of-unified-expression": {
    overview: [
      {
        text: 'Art knows no boundaries, and creativity is a universal language that transcends geographical limits. The inclusion of artists from across India in the "HUE - HOUSE OF UNIFIED EXPRESSION" art exhibition is a deliberate and inspired choice that resonates deeply with the exhibition\'s essence.',
      },
    ],
    views: [],
    works: [
      {
        ...pic("house-of-unified-expression/work-01.jpg", 1600, 1066),
        title: "The Primate and Avian Discourse",
        artist: "Dhruv Patel",
        medium: "Brass and wood",
        size: "12 X 17 X 10.5 (LBH) Inches",
        year: "2024",
      },
      {
        ...pic("house-of-unified-expression/work-02.jpg", 1600, 1600),
        title: "Petal Prince",
        artist: "Srinia Chowdhury",
        medium: "Stoneware Clay and coloured slips",
        size: "15.3 x 5.9 x 4.7 Inches",
        year: "2023",
      },
      {
        ...pic("house-of-unified-expression/work-03.jpg", 1600, 1031),
        title: "Under Control",
        artist: "Jagdeesh Tamminenni",
        medium: "Woodcut Block (Natural Kamba Wood)",
        size: "24 x 36 inches",
        year: "2023",
      },
      {
        ...pic("house-of-unified-expression/work-04.jpg", 1202, 1600),
        title: "Rebirth and Survival",
        artist: "Malchand Pareek",
        medium: "Mixed Media on Canvas",
        size: "36 X 48 Inches",
      },
    ],
  },
  "mirror-mirror-champa-tree": {
    overview: [
      {
        text: "Throughout Indian history, women have been celebrated for their multifaceted roles, embodying power, creativity, and the essence of life itself. From ancient epics to modern tales, diverse female characters like Lakshmi, Saraswathi, Shakthi, Meera, and Jhansi Ki Rani have showcased the richness of womanhood, transcending mere stereotypes of beauty or passivity.",
      },
      {
        text: "In today's world, however, external influences sometimes obscure this innate power, leading women to forget their true essence. Yet, they are more than just objects of desire; they are embodiments of strength, wisdom, and resilience. The exhibition seeks to illuminate the perspectives of young women artists, whose works delve into the complexities of gender, nostalgia, and metaphor, captivating viewers with their insight and introspection.",
      },
      {
        text: "The concept of \"women\" transcends mere gender boundaries, encompassing the essence of humanity itself. In our culture, the idea of equality isn't a question; it's a given. Women are acknowledged for their intrinsic value, their existence alone being enough to merit recognition and respect. The mirror, as a metaphor, reflects not just physical appearance but also inner truth.",
      },
      { text: "So, what does your mirror tell you?" },
    ],
    views: [],
    works: [
      {
        ...pic("mirror-mirror-champa-tree/work-01.jpg", 1287, 1600),
        title: "Anrchy 16",
        artist: "Sweeta Rai",
        medium: "Mix media on canvas",
        size: '36" x 48"',
        year: "2023",
      },
      {
        ...pic("mirror-mirror-champa-tree/work-02.jpg", 1600, 1600),
        title: "Mind Your Head! 5 - Veer",
        artist: "Srinia Chowdhury",
        medium: "Stoneware Clay (Ceramic)",
        size: '9.8" x 7" x 6.6" inches',
        year: "2023",
      },
      {
        ...pic("mirror-mirror-champa-tree/work-03.jpg", 1280, 1600),
        title: "Love Code 2",
        artist: "Bhartti Verma",
        medium: "Acrylic and Pen on Canvas",
        size: "8 x 6 Inches",
        year: "2024",
      },
      {
        ...pic("mirror-mirror-champa-tree/work-04.png", 720, 720),
        title: "Too Long your Thoughts to Earth Are Given",
        artist: "Priyanka Aelay",
        medium: "Acrylic on Lenin Canvas",
        year: "2023",
      },
    ],
  },
  "katha-kathan": {
    overview: [
      {
        text: "KathaKathan - India has a rich tradition of storytelling - from our ancient bards who travelled with nothing but stories in their quivers, to our potters and weavers who adorned their craft with re-creations of their daily lives, to dancers who told us of the love and beauty and anger of the Gods - we were spoilt for choice. And yet every new generation brings with it still new forms of storytelling, new mediums to express themselves and new styles to engage our senses.",
      },
      {
        text: "Keeping with that same tradition of balladeers and puppeteers and master craftsmen, this exhibition is yet another foray into the art of storytelling. The exhibition is divided into 10 sections, each section narrating a different part of the artist’s world and a different part of her soul. Love, anger and mischief express themselves differently in different stories and in different worlds. And so, with some familiar characters, a fresh perspective and a unique style, these works of art vibrantly add to the glorious tradition of katha kathan (storytelling).",
      },
    ],
    views: [],
    works: [],
  },
  "satirical-symphony": {
    overview: [
      {
        text: "Guided by the strong principles of his father, Paidi Raju—an esteemed senior artist, poet, sculptor, and art guru—Rajeswara Rao’s work is imbued with profound influence and inspiration. His father’s anecdotes and poetry serve as a rich source of learning for younger artists, demonstrating the power of words and actions. Known for his patience and kindness, Paidi Raju’s ethos is reflected in Rao’s personal and professional life. Rao considers it a blessing to be born into such a family, where his two sisters pursued dance. However, Rao aspired to carve his own identity, distinct from his father’s renowned legacy.",
      },
      {
        text: "A graduate of Andhra University (Class of ‘83), Rao’s journey took a serendipitous turn when a colleague guided him to the newly established Hyderabad Central University. Rao’s hunger to learn and immerse himself in the art world drove him to leave his comfort zone and move to the bustling city of Hyderabad. His early works delved into the themes of life and death, capturing the raw essence of human existence.",
      },
      {
        text: "For Rao, the mantra “Sit and think” is essential for an artist to realize their subject and path. He believes that attitude significantly contributes to one’s growth and work. Patience, he asserts, is key to stability in any field. In 1995, his marriage to Padma Reddy, an artist herself, marked another major turning point, profoundly influencing his work.",
      },
    ],
    views: [],
    works: [],
  },
  "once-upon-a-time": {
    overview: [
      {
        text: "India has a rich tradition of storytelling - from our ancient bards who travelled with nothing but stories in their quivers, to our potters and weavers who adorned their craft with re-creations of their daily lives, to dancers who told us of the love and beauty and anger of the Gods - we were spoilt for choice. And yet every new generation brings with it still new forms of storytelling, new mediums to express themselves and new styles to engage our senses.",
      },
      {
        text: "Keeping with that same tradition of balladeers and puppeteers and master craftsmen, this exhibition is yet another foray into the art of storytelling. The exhibition is narrating a different part of the artist’s world and a different part of her soul. Love, anger and mischief express themselves differently in different stories and in different worlds. And so, with some familiar characters, a fresh perspective and a unique style, these works of art vibrantly add to the glorious tradition of storytelling.",
      },
    ],
    views: [],
    works: [],
  },
  "tree-of-life": {
    overview: [
      {
        text: "Trees have had the most significant parts to play in our lives since the beginning of time. They symbolize prosperity, health, nature, and reflect life itself. Whether it is by giving shade in the sun, providing food and nourishment, or helping with medicine and beauty, trees are essential for the existence of life on Earth. As such, they hold a sacred place in history and culture of the world.",
      },
      {
        heading: "Religion",
        text: "In Hindu culture, trees are revered as divine beings. There are many examples in Hinduism that place trees as sacred symbols of the Gods. The Peepal tree, or the Sacred Fig, is considered a source of power, with the leaves and trunk representing Lord Shiva and Lord Vishnu, respectively. Also mentioned in the Bhagavad Geeta is the importance of Banyan tree: “The Banyan tree with its roots above, and its branches below, is imperishable.” In Jainism and Buddhism, Peepal holds a special place for meditation and relaxation. It is believed to be under a peepal tree, called Jaya Sri Maha Bodhi, one of the oldest trees present today, that Gautama Buddha received his enlightenment. In Islam, Sidra-tul-Muntaha is a large lote tree mentioned in the Quran, that is situated at the furthest boundary of the seventh sky, beyond which no creation can pass. Whereas in Christianity, the Tree of Life is the centre of the Heavenly and Earthly Eden and is the source of good and evil knowledge.",
      },
      {
        heading: "Culture",
        text: "The Tree of Life is an important symbol in nearly every culture. With its branches reaching into the sky, and roots deep in the Earth, it dwells in three worlds- a link between heaven, Earth, and the underworld. It is both, a feminine symbol bearing sustenance, and a masculine phallic symbol. The essence of a tree as giving being, that gives shelter, sustenance, and healing, is also an important factor of its prominence in all cultures. Whether it is the sycamore trees in Egyptian mythology, or symbol of the Christmas tree, trees reflect the life cycle of creation, shedding leaves, and sprouting new growth.",
      },
      {
        text: "Trees have long been linked with spirituality. An inverted tree is considered to be the map to inner spirituality, the branches and veins also mimicking the human nervous system. In some cases, the tree is an abode of the Gods, whereas, in others, the tree itself is a God. There is no doubt that trees give life, whether that is literally through the air we breathe or figuratively through the countless benefits they provide. Without them, the world would be left barren. Our exhibition, “the Tree of Life” aims to portray all these cultural representations of trees through the experienced lenses of our artists.",
      },
      {
        text: "This Festive season join us at our gallery, as we showcase some of the best artworks that depict the significance, personification, and eloquence of the Tree of Life.",
      },
    ],
    views: [],
    works: [],
  },
  chitram: {
    overview: [
      {
        text: "The human quest to impart motion to art led him to puppetry in the ancient times and to the celluloid in the modern era. In India, it was Dadasaheb Phalke, who first screened Raja Harischandra, in 1913, and the rest is the Indian cinematic history - the largest film industry in the world, far outstripping the hallowed Hollywood, so to say, by umpteen reel-miles.",
      },
      {
        text: "No wonder then that Indian cinema halls have become the temples of pastime for the young and the old alike that is across the length and breadth of our landscape of linguistics. If it’s not our puranas and folklore, then it’s the vivacity of our cultural variety that became the supply chains of cinematic themes, which keeps the film studios in shooting mode and the cinema halls houseful. What with the impetus provided, first by the Indian diaspora and then by the digital media, the Indian movies have gone on to the world stage. However, it’s the film stars that bring luster to the silver screen, and this humble endeavor is to celebrate their contributions to the Indian celluloid through their artistic excellence but on creative canvases.",
      },
    ],
    views: [],
    works: [
      {
        ...pic("chitram/work-01.jpg", 1558, 1600),
        title: "Untitled",
        artist: "Santhana Krishnan",
        medium: "Mixed Media on Wooden Box",
        size: "36” x 36”",
        year: "2022",
      },
      {
        ...pic("chitram/work-02.jpg", 1600, 1021),
        title: "Amitha Bachan",
        artist: "Shankar Pamarthy",
        medium: "Colored Pencil on Acid Free Paper",
        size: "15” x 22”",
        year: "2021",
      },
      {
        ...pic("chitram/work-03.jpg", 1192, 1600),
        title: "Lunch Box",
        artist: "Bhartti Verma",
        medium: "Acrylic and Pen on Paper",
        size: "30” x 23”",
        year: "2021",
      },
      {
        ...pic("chitram/work-04.jpg", 1600, 1600),
        title: "See without Looking",
        artist: "Anamika Ramachandran",
        medium: "News Paper on Board",
        size: "60” x 60”x 2” (each)",
      },
    ],
  },
  shreekaram: {
    overview: [
      {
        text: "The word ‘Shreekaaram’ radiates hope. When a spark of positivity kindles in the depths of the mind, it beckons a new start. Shreekaaram, means a new beginning. It empowers and infuses prospect for better, promising and quintessentially enlightening paths and destinations. All such initiations take place in the depths of the corners that are illuminated by an undying spirit and infallible strength for resilience.",
      },
      {
        text: "The present show titled, ‘Shreekaaram’ celebrates one such beginning, in all its pomp and glory. Shreekaaram, amalgamates the quintessential essence of art. It assimilates and subsumes an eclectic blend of varied genres and styles of works executed by talented artists from different parts of the country. While some artists are very senior and have carved a niche for themselves on the world art scene the other artists are very young but impressively promising. The wide arrays of works included in the show, altogether imbibe the strength and capacity to stimulate the thought process of the viewers through distinctly diverse perspectives and sensitivities.",
      },
      {
        text: "Each work promises a deep insight into an exceptional shade, anecdote, instance and nuance which is a part and parcel of life and constitutes essentially to make existence complete and meaningful. These works reinstate distinctly varied personal connotations, strong individualistic approaches and myriad point of views. Their diverse creative journeys manifest the eternal blessing of ‘hope and change’ that life bestows upon every human being, wherein each moment is as fresh and pious as a blank canvas.",
      },
    ],
    views: [],
    works: [],
  },
  "pause-and-reflect": {
    overview: [
      {
        text: "In the hustle and bustle of our daily lives, we often forget the importance of pausing, reflecting, and simply being in the moment. This group exhibition, featuring four distinct artists, invites you to pause and experience life through their unique perspectives. Through their visual language, each artist captures subtle memories and moments, encouraging viewers to reconnect with the simple joys of life.",
      },
      {
        text: "Reghu, portraying himself as a village craftsman, seeks to reclaim the lost territories of innocence and utopia. His works transport us to a simpler time, reminding us of the purity and beauty that once was.",
      },
      {
        text: "Mukhtar Ahmed’s fascination with the textures of walls, whether within homes or on their exteriors, captures the essence of time’s passage in abstract visual language. Weathered by rain and dust, the withered surfaces of abandoned buildings tell their stories, transforming the mundane into the extraordinary.",
      },
      {
        text: "Dhruv Patel’s playful langurs, mirroring human characteristics, bring a smile to our faces with their light-hearted antics. Yet, upon deeper reflection, these figures reveal the complexities of human desires and needs that drive our world.",
      },
      {
        text: "Dhushyant works with familiar objects, juxtaposing them with animals as if in a child’s play. He consciously uses popular everyday metaphors and visual symbolism. His delicately rendered watercolours draw viewers in with their familiarity, creating an engaging and accessible experience.",
      },
      {
        text: "Together, these artists create a tapestry of moments that invite us to pause, reflect, and find beauty in the world around us. This exhibition is more than just a display of art; it’s a gentle reminder to take a step back and appreciate life’s simple pleasures.",
      },
    ],
    views: [],
    works: [],
  },
  editions: {
    overview: [],
    views: [
      pic("editions/view-01.jpg", 1600, 1068),
      pic("editions/view-02.jpg", 1600, 1068),
      pic("editions/view-03.jpg", 1600, 1068),
      pic("editions/view-04.jpg", 1600, 1068),
      pic("editions/view-05.jpg", 1600, 1068),
      pic("editions/view-06.jpg", 1600, 1068),
      pic("editions/view-07.jpg", 1600, 1068),
      pic("editions/view-08.jpg", 1600, 1068),
      pic("editions/view-09.jpg", 1600, 1068),
      pic("editions/view-10.jpg", 1600, 1068),
      pic("editions/view-11.jpg", 1600, 1068),
      pic("editions/view-12.jpg", 1600, 1068),
      pic("editions/work-01.jpg", 1288, 1600),
      pic("editions/work-02.jpg", 1600, 1133),
      pic("editions/work-03.jpg", 1096, 1600),
      pic("editions/work-04.jpg", 1600, 1249),
    ],
    works: [],
  },
  daivatvam: {
    overview: [],
    views: [
      pic("daivatvam/view-01.jpg", 1066, 1600),
      pic("daivatvam/view-02.jpg", 1600, 1066),
      pic("daivatvam/view-03.jpg", 1600, 1066),
      pic("daivatvam/view-04.jpg", 1600, 1066),
      pic("daivatvam/view-05.jpg", 1600, 1066),
      pic("daivatvam/view-06.jpg", 1600, 1066),
      pic("daivatvam/view-07.jpg", 1600, 1066),
      pic("daivatvam/view-08.jpg", 1600, 1066),
      pic("daivatvam/view-09.jpg", 1600, 1066),
      pic("daivatvam/view-10.jpg", 1600, 1066),
      pic("daivatvam/view-11.jpg", 1600, 1066),
      pic("daivatvam/view-12.jpg", 1600, 1066),
    ],
    works: [],
  },
  "unknowns-9": {
    overview: [],
    views: [
      pic("unknowns-9/work-01.jpg", 1600, 1032),
      pic("unknowns-9/work-02.jpg", 1600, 1393),
      pic("unknowns-9/work-03.jpg", 1600, 1168),
      pic("unknowns-9/work-04.jpg", 1298, 1600),
    ],
    works: [],
  },
};
